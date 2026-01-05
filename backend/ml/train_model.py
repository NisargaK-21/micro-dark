import pandas as pd
import joblib
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

MODEL_FILE = Path(__file__).parent / "model" / "marketing_detector.pkl"
DATA_CSV = Path(__file__).parent / "data" / "posts.csv"


def _load_db_posts():
    """Attempt to load posts from DB if available (optional)."""
    try:
        from app.database.postgres import get_session
        from app.models.post import Post
        sess = next(get_session())
        rows = sess.query(Post).all()
        texts = [r.content for r in rows if r.content]
        labels = [1 if r.is_marketing else 0 for r in rows if r.content is not None]
        if len(texts) and len(texts) == len(labels):
            import pandas as pd
            return pd.DataFrame({"text": texts, "label": labels})
    except Exception:
        return None
    return None


def train_model(save_path: str = None, include_db: bool = False, test_size: float = 0.2):
    """Train model from CSV and optionally DB posts. Returns evaluation report."""
    print("Preparing dataset...")
    dfs = []

    if DATA_CSV.exists():
        dfs.append(pd.read_csv(DATA_CSV))

    if include_db:
        db_df = _load_db_posts()
        if db_df is not None:
            dfs.append(db_df)

    if not dfs:
        raise RuntimeError("No training data found (CSV or DB)")

    df = pd.concat(dfs, ignore_index=True)
    df = df.dropna(subset=["text", "label"])  # ensure required columns

    X = df["text"]
    y = df["label"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=42
    )

    model = Pipeline([
        ("tfidf", TfidfVectorizer(
            max_features=5000,
            ngram_range=(1, 2),
            stop_words="english"
        )),
        ("clf", LogisticRegression(max_iter=1000))
    ])

    print("Training model...")
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    report = classification_report(y_test, y_pred, output_dict=True)
    print("Model evaluation:\n", classification_report(y_test, y_pred))

    out_path = Path(save_path) if save_path else MODEL_FILE
    joblib.dump(model, out_path)
    print(f"Model saved to {out_path}")

    return report


if __name__ == "__main__":
    train_model()


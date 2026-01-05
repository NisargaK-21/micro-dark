FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install system deps and python deps
COPY backend/requirements.txt /app/requirements.txt
RUN apt-get update && apt-get install -y build-essential gcc libpq-dev --no-install-recommends \
    && python -m pip install --upgrade pip \
    && pip install -r requirements.txt \
    && apt-get remove -y build-essential gcc \
    && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

# Copy backend source
COPY backend/ /app

EXPOSE 8000

# Default command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

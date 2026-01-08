import os
from openai import AzureOpenAI
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

# Azure OpenAI client
openai_client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_KEY"),
    api_version="2024-02-15-preview",
    azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
)

# Azure AI Language client
language_client = TextAnalyticsClient(
    endpoint=os.getenv("AZURE_LANGUAGE_ENDPOINT"),
    credential=AzureKeyCredential(os.getenv("AZURE_LANGUAGE_KEY"))
)

def analyze_marketing_content(text: str):
    # Azure OpenAI – risk classification
    ai_response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Detect illegal or suspicious marketing content."},
            {"role": "user", "content": text}
        ]
    )

    # Azure AI Language – key phrase extraction
    language_response = language_client.extract_key_phrases([text])

    return {
        "azure_openai_analysis": ai_response.choices[0].message.content,
        "key_phrases": language_response[0].key_phrases
    }

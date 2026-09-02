import os
import time
from pathlib import Path

from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load backend/.env so GEMINI_API_KEY is available.
_backend_dir = Path(__file__).resolve().parent.parent
load_dotenv(_backend_dir / ".env")

SYSTEM_INSTRUCTION = (
    "You are a friendly multilingual livelihood assessment assistant for the "
    "PM-AJAY scheme. Help beneficiaries identify their education, current "
    "livelihood, skills, interests, experience, location and employment "
    "preference. Ask only one question at a time. Be empathetic and simple. "
    "Support English, Hindi and Marathi. Do not give recommendations yet. "
    "First collect information."
)

MODEL_NAME = "gemini-3.7-flash"


def generate_reply(user_message: str) -> str:
    """Send the user's message to Gemini and return the text reply."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return (
            "The Gemini API key is missing. "
            "Add GEMINI_API_KEY to your backend/.env file and restart the server."
        )

    try:
        client = genai.Client(api_key=api_key)
        response = None
        for attempt in range(3):
            try:
                response = client.models.generate_content(
                    model=MODEL_NAME,
                    contents=user_message,
                    config=types.GenerateContentConfig(
                        system_instruction=SYSTEM_INSTRUCTION,
                    ),
                )
                break
            except Exception as e:
                error_text = str(e)
                is_busy = ("503" in error_text) or ("UNAVAILABLE" in error_text.upper())
                if is_busy and attempt < 2:
                    wait_seconds = 2 if attempt == 0 else 4
                    print(
                        "Gemini is busy (503). Waiting "
                        + str(wait_seconds)
                        + " seconds, then retrying..."
                    )
                    time.sleep(wait_seconds)
                    continue
                raise

        if response.text:
            return response.text
        return "Sorry, I did not receive a reply. Please try again."
    except Exception as e:
        error_text = str(e)
        if api_key:
            error_text = error_text.replace(api_key, "[REDACTED]")
        print("Gemini error:", type(e).__name__)
        print(error_text)
        return "Sorry, I could not get a reply from Gemini right now. Please try again."

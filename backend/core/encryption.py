import os
from cryptography.fernet import Fernet
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(os.path.join(BASE_DIR, ".env"))

ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")
if ENCRYPTION_KEY is None:
    raise ValueError("ENCRYPTION_KEY not found in environment variables.")

fernet = Fernet(ENCRYPTION_KEY)

from google.cloud import storage
from urllib.parse import urlparse, unquote
import os

def delete_gcs_files_by_url(url):
    try:
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        auth_file_path = os.path.join(BASE_DIR, 'auth.json')

        client = storage.Client.from_service_account_json(auth_file_path)
        bucket_name = "postingmedia"
        bucket = client.bucket(bucket_name)


        parsed_url = urlparse(url)
        blob_path = unquote(parsed_url.path).replace(f"/{bucket_name}/", "", 1).lstrip("/")

        blob = bucket.blob(blob_path)
        if blob.exists():
            blob.delete()
            return True
        else:
            return False
    except:
        return False

from google.cloud import storage

client = storage.Client.from_service_account_json('auth.json')

def upload_media_to_gcs(bucket_name, local_file_path, gcs_destination_path, client, make_public=False):
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(gcs_destination_path)

    with open(local_file_path, "rb") as file_obj:
        blob.upload_from_file(
            file_obj,
            timeout=600,  # 5 minutes
            rewind=True,  # Rewind for retries
            content_type=None  # Can detect type automatically
        )
    if make_public:
        blob.make_public()
        public_url = f"https://storage.googleapis.com/{bucket_name}/{gcs_destination_path}"
        print(f"Public URL: {public_url}")
        return public_url
    else:
        gs_path = f"gs://{bucket_name}/{gcs_destination_path}"
        print(f"GS Path: {gs_path}")
        return gs_path



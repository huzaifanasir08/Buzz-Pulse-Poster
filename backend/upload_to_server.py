from google.cloud import storage

client = storage.Client.from_service_account_json('auth.json')

def upload_media_to_gcs(bucket_name, local_file_path, gcs_destination_path, client, make_public=False):
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(gcs_destination_path)

    blob.upload_from_filename(local_file_path)

    if make_public:
        blob.make_public()
        public_url = f"https://storage.googleapis.com/{bucket_name}/{gcs_destination_path}"
        print(f"Public URL: {public_url}")
        return public_url
    else:
        gs_path = f"gs://{bucket_name}/{gcs_destination_path}"
        print(f"GS Path: {gs_path}")
        return gs_path

# Usage
bucket_name = "postingmedia"
video_path = "video1.mp4"
public_url = upload_media_to_gcs(
    bucket_name=bucket_name,
    local_file_path=video_path,
    gcs_destination_path=f"Videos/{video_path}",
    client=client,
    make_public=True
)

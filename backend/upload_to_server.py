from google.cloud import storage

def upload_media(file_path, media_type, bucket_name="postingmedia"):
    """
    Uploads an image or video to a specific folder in the GCS bucket.
    
    :param file_path: Local path of the file to upload
    :param media_type: "Images" or "Videos"
    :param bucket_name: Name of the GCS bucket
    :return: Public URL of the uploaded file
    """
    # Initialize the GCS client
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)

    # Extract file name from the file_path
    import os
    file_name = os.path.basename(file_path)

    # Build blob path
    blob_path = f"{media_type}/{file_name}"
    blob = bucket.blob(blob_path)

    # Upload the file
    blob.upload_from_filename(file_path)

    # Make it publicly accessible (optional)
    blob.make_public()

    print(f"Uploaded to: {blob.public_url}")
    return blob.public_url

# import requests
# import time

# # Proxy and credentials
# proxy_host = "146.0.75.178"
# proxy_port = "20180"
# username = "user80"
# password = "SgpEMjcw"
# change_ip_url = "http://146.0.75.178:20480/changeip/client/73041950421522020542"

# # Proxy config
# proxies = {
#     "http": f"http://{username}:{password}@{proxy_host}:{proxy_port}",
#     "https": f"http://{username}:{password}@{proxy_host}:{proxy_port}"
# }

# # Your API target
# target_url = "https://api.example.com/data"

# # Total requests
# total_requests = 10  # Change this as needed

# for i in range(total_requests):
#     # Rotate IP every 2 requests (except before the very first one)
#     if i % 2 == 0 and i != 0:
#         print(f"\nRotating IP before request {i + 1}...")
#         try:
#             change_response = requests.get(change_ip_url, timeout=10)
#             if change_response.ok:
#                 print("IP rotation triggered.")
#             else:
#                 print("Failed to rotate IP.")
#         except Exception as e:
#             print("Rotation error:", e)
        
#         time.sleep(6)  # Wait for IP to change

#     # Make the API request
#     print(f"\nRequest {i + 1}: Sending to {target_url}")
#     try:
#         response = requests.get(target_url, proxies=proxies, timeout=15)
#         print("Status:", response.status_code)
#         print("Response:", response.text[:200])
#     except Exception as e:
#         print("Request error:", e)





# import requests
# import time

# # Proxy and credentials
# proxy_host = "146.0.75.178"
# proxy_port = "20180"
# username = "user80"
# password = "SgpEMjcw"
# change_ip_url = "http://146.0.75.178:20480/changeip/client/73041950421522020542"

# # Proxy config
# proxies = {
#     "http": f"http://{username}:{password}@{proxy_host}:{proxy_port}",
#     "https": f"http://{username}:{password}@{proxy_host}:{proxy_port}"
# }

# # Your API target
# target_url = "https://api.example.com/data"

# # Total requests
# total_requests = 10  # Change this as needed

# for i in range(total_requests):
#     # Rotate IP every 2 requests (except before the very first one)
#     if i % 2 == 0 and i != 0:
#         print(f"\nRotating IP before request {i + 1}...")
#         try:
#             change_response = requests.get(change_ip_url, timeout=10)
#             if change_response.ok:
#                 print("IP rotation triggered.")
#             else:
#                 print("Failed to rotate IP.")
#         except Exception as e:
#             print("Rotation error:", e)
        
#         time.sleep(6)  # Wait for IP to change

#     # Make the API request
#     print(f"\nRequest {i + 1}: Sending to {target_url}")
#     try:
#         response = requests.get(target_url, proxies=proxies, timeout=15)
#         print("Status:", response.status_code)
#         print("Response:", response.text[:200])
#     except Exception as e:
#         print("Request error:", e)




# import requests
# import time


# # Proxy and credentials
# proxy_host = "146.0.75.178"
# proxy_port = "20180"
# username = "user80"
# password = "SgpEMjcw"
# change_ip_url = "http://146.0.75.178:20480/changeip/client/73041950421522020542"

# # Instagram API URLs
# upload_url = "https://graph.instagram.com/v22.0/17841473540671347/media"
# publish_url = "https://graph.instagram.com/v22.0/17841473540671347/media_publish"

# # Access token
# access_token = "IGAATr5EZBEaZC5BZAE9lc20xV3lzUUp2eHBGTTQzN2xQMkh6WkZAHbm41SjllM1RNbWNLYktfS0F5bHhLeV82SW0yZAlZAELS1hNHBzODdMRmVTQ0JjbzBrRU1KNkNHTHJGTnVQaUJMVjZAwQzhkQldLSkVRZADZAUNUk2MDc4UGFWT0g5NAZDZD"

# # Proxy config
# proxies = {
#     "http": f"http://{username}:{password}@{proxy_host}:{proxy_port}",
#     "https": f"http://{username}:{password}@{proxy_host}:{proxy_port}"
# }

# # Payload base
# media_payload = {
#     "image_url": "https://storage.googleapis.com/postingmedia/Images/0561f699-19ba-443c-8c9f-0a6653ae2a7b_Screenshot%202025-03-01%20024124.png",   # Replace with your image
#     "is_carousel_item": "false",
#     "caption": "let's go! for a new adventure!",
#     "access_token": access_token
# }







# # Number of post cycles
# post_count = 1

# for i in range(post_count):
#     if i != 0:
#         print(f"\n🔄 Rotating IP before request group {i + 1}...")
#         try:
#             rotate = requests.get(change_ip_url, timeout=10)
#             if rotate.ok:
#                 print("✅ IP rotation triggered.")
#             else:
#                 print("❌ Failed to rotate IP.")
#         except Exception as e:
#             print("Rotation error:", e)
#         time.sleep(6)

#     print(f"\n🚀 Request Set {i + 1}: Uploading media...")
#     try:
#         upload_resp = requests.post(upload_url, data=media_payload, proxies=proxies, timeout=20)
#         print("Upload status:", upload_resp.status_code)
#         print("Upload response:", upload_resp.text)

#         if upload_resp.ok:
#             creation_id = upload_resp.json().get("id")
#             if not creation_id:
#                 print("❌ No creation_id returned. Skipping publish step.")
#                 continue

#             publish_payload = {
#                 "creation_id": creation_id,
#                 "access_token": access_token
#             }

#             print("📤 Publishing media with creation_id:", creation_id)
#             publish_resp = requests.post(publish_url, data=publish_payload, proxies=proxies, timeout=20)
#             print("Publish status:", publish_resp.status_code)
#             print("Publish response:", publish_resp.text)
#         else:
#             print("❌ Upload failed. Skipping publish.")

#     except Exception as e:
#         print("Request error:", e)




import requests
import time
from .models import MediaPost
from django.utils.timezone import now, localtime




def post_reel(account_id, access_token, media_payload, proxies):
        try:
            # Instagram API URLs
            upload_url = f"https://graph.instagram.com/v22.0/{account_id}/media"
            publish_url = f"https://graph.instagram.com/v22.0/{account_id}/media_publish"
            try:
                upload_resp = requests.post(upload_url, data=media_payload, proxies=proxies, timeout=20)

                if upload_resp.ok:
                    creation_id = upload_resp.json().get("id")
                    if not creation_id:
                        return None, 'No instagram post id returned in upload response'

                    publish_payload = {
                        "creation_id": creation_id,
                        "access_token": access_token
                    }

                    publish_resp = requests.post(publish_url, data=publish_payload, proxies=proxies, timeout=20)
                    if publish_resp.ok:
                        return True, 'Instagram post published successfully'
                    return False, publish_resp.text
                else:
                    return None, upload_resp.text

            except Exception as e:
                return None, f'Request error: {e}'


        except Exception as e:
            return None, f'Request error: {e}'


def post_media(account_id, access_token, media_payload, proxies):
        try:
            # Instagram API URLs
            upload_url = f"https://graph.instagram.com/v22.0/{account_id}/media"
            publish_url = f"https://graph.instagram.com/v22.0/{account_id}/media_publish"
            try:
                upload_resp = requests.post(upload_url, data=media_payload, proxies=proxies, timeout=20)

                if upload_resp.ok:
                    creation_id = upload_resp.json().get("id")
                    if not creation_id:
                        return None, 'No instagram post id returned in upload response'

                    publish_payload = {
                        "creation_id": creation_id,
                        "access_token": access_token
                    }

                    publish_resp = requests.post(publish_url, data=publish_payload, proxies=proxies, timeout=20)
                    if publish_resp.ok:
                        return True, 'Instagram post published successfully'
                    return False, publish_resp.text
                else:
                    return None, upload_resp.text

            except Exception as e:
                return None, f'Request error: {e}'


        except Exception as e:
            return None, f'Request error: {e}'


def post_media():

    try:
        utc_now = now()       
        eastern_time = localtime(utc_now)  # setting timezone to EST localtime

        post_obj = ( 
        MediaPost.objects
        .filter(scheduled_time__lte=eastern_time, has_tried=False)
        .order_by('scheduled_time') 
        .first()
        ) # Get the first post that is scheduled to be posted and has not been tried yet    

        if post_obj is None:
            return  # No posts to process
        
        proxies = {
        "http": f"http://{post_obj.instagram_account.proxy}",
        "https": f"http://{post_obj.instagram_account.proxy}"
        }

        # if type is post
        if post_obj.post_type == 'post':
            media_payload = {

                "image_url": post_obj.media_url,
                "is_carousel_item": "false",  # Assuming no carousel items, change as needed
                "caption": post_obj.caption,
                "access_token": post_obj.instagram_account.access_token,
            }
            HAS_POSTED, logs = post_media( 
            account_id=post_obj.instagram_account.account_id,
            access_token=post_obj.instagram_account.access_token,
            media_payload=media_payload,
            proxies=proxies
        )
            
        # post type is reel
        else:
            media_payload = {
                "image_url": post_obj.media_url,
                "is_carousel_item": "false",  
                "access_token": post_obj.instagram_account.access_token,
            }
            HAS_POSTED, logs = post_reel( 
            account_id=post_obj.instagram_account.account_id,
            access_token=post_obj.instagram_account.access_token,
            media_payload=media_payload,
            proxies=proxies
        )

        if HAS_POSTED:
            post_obj.has_tried = True
            post_obj.has_posted = True
            post_obj.logs = logs
            post_obj.save()
        else:
            post_obj.has_tried = True
            post_obj.has_posted = False
            post_obj.logs = logs

    except Exception as e:
        print("Error in posting media:", e)
    


# # Number of post cycles
# post_count = 1

# for i in range(post_count):
#     if i != 0:
#         print(f"\n🔄 Rotating IP before request group {i + 1}...")
#         try:
#             rotate = requests.get(change_ip_url, timeout=10)
#             if rotate.ok:
#                 print("✅ IP rotation triggered.")
#             else:
#                 print("❌ Failed to rotate IP.")
#         except Exception as e:
#             print("Rotation error:", e)
#         time.sleep(6)

#     print(f"\n🚀 Request Set {i + 1}: Uploading media...")
#     try:
#         upload_resp = requests.post(upload_url, data=media_payload, proxies=proxies, timeout=20)
#         print("Upload status:", upload_resp.status_code)
#         print("Upload response:", upload_resp.text)

#         if upload_resp.ok:
#             creation_id = upload_resp.json().get("id")
#             if not creation_id:
#                 print("❌ No creation_id returned. Skipping publish step.")
#                 continue

#             publish_payload = {
#                 "creation_id": creation_id,
#                 "access_token": access_token
#             }

#             print("📤 Publishing media with creation_id:", creation_id)
#             publish_resp = requests.post(publish_url, data=publish_payload, proxies=proxies, timeout=20)
#             print("Publish status:", publish_resp.status_code)
#             print("Publish response:", publish_resp.text)
#         else:
#             print("❌ Upload failed. Skipping publish.")

#     except Exception as e:
#         print("Request error:", e)

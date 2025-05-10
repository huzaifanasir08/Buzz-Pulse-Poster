import requests
import time
from .models import MediaPost
from django.utils.timezone import now, localtime
from . import updateInstaAcc, delete_from_gcs
import pytz



def post_reel(account_id, access_token, media_payload, proxies):
        try:
            # Instagram API URLs
            upload_url = f"https://graph.instagram.com/v22.0/{account_id}/media"
            publish_url = f"https://graph.instagram.com/v22.0/{account_id}/media_publish"
            change_ip_url = "http://146.0.75.178:20480/changeip/client/73041950421522020542"
            try:
                try:
                    rotate = requests.get(change_ip_url, timeout=10)
                    time.sleep(7)
                except:
                    pass
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
            change_ip_url = "http://146.0.75.178:20480/changeip/client/73041950421522020542"
            try:
                try:
                    rotate = requests.get(change_ip_url, timeout=10)
                    time.sleep(7)
                except:
                    pass
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


def post():
    try:
        utc_now = now()       
        eastern_time = localtime(utc_now) 
        eastern_time = eastern_time.replace(tzinfo=pytz.UTC)
        print("Current Eastern Time:", eastern_time)

        post_obj = ( 
        MediaPost.objects
        .filter(scheduled_time__lte=eastern_time, has_tried=False)
        .order_by('scheduled_time') 
        .first()
        ) # Get the first post that is scheduled to be posted and has not been tried yet    
        
        if post_obj is None:
            print('Not Found')
            return  # No posts to process
        print('Found')
        proxies = {
        "http": f"http://{post_obj.instagram_account.proxy}",
        "https": f"http://{post_obj.instagram_account.proxy}"
        }

        # if type is post
        if post_obj.post_type == 'post':
            media_payload = {

                "image_url": post_obj.media_url,
                "is_carousel_item": "false",  # Assuming no carousel items, change as needed
                "caption": f'{post_obj.caption} {post_obj.hashtags}',
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
                "media_type": "REELS",  
                "caption": f"{post_obj.caption} {post_obj.hashtags}",
                "access_token": post_obj.instagram_account.access_token,
            }
            HAS_POSTED, logs = post_reel( 
            account_id=post_obj.instagram_account.account_id,
            access_token=post_obj.instagram_account.access_token,
            media_payload=media_payload,
            proxies=proxies
        )

        if HAS_POSTED:
            ip = ''
            try:
                response = requests.get("https://api.ipify.org", proxies=proxies, timeout=5)
                ip = response.text
            except:
                ip = 'Some thing went wrong'
            HAS_DELETED = delete_from_gcs.delete_gcs_files_by_url(post_obj.media_url)
            if HAS_DELETED:
                post_obj.file_deleted = True
            else:
                post_obj.file_deleted = False
            post_obj.has_tried = True
            post_obj.has_posted = True
            post_obj.logs = f'{logs}. Tried proxy: {ip} '
            post_obj.save()
            count = MediaPost.objects.filter(id=post_obj.instagram_account.id, has_tried=False).count()
            if count < 1:
                updateInstaAcc.update_account(post_obj.instagram_account.id, True)             
        else:
            ip = ''
            try:
                response = requests.get("https://api.ipify.org", proxies=proxies, timeout=5)
                ip = response.text
            except:
                ip = 'Some thing went wrong'
            HAS_DELETED = delete_from_gcs.delete_gcs_files_by_url(post_obj.media_url)
            if HAS_DELETED:
                post_obj.file_deleted = True
            else:
                post_obj.file_deleted = False
            post_obj.has_tried = True
            post_obj.has_posted = False
            post_obj.logs = f'{logs}. Tried proxy: {ip} '
            count = MediaPost.objects.filter(id=post_obj.instagram_account.id, has_tried=False).count()
            if count < 1:
                updateInstaAcc.update_account(post_obj.instagram_account.id, True)

    except Exception as e:
        print("Error in posting media:", e)
    
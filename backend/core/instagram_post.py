import requests
import time
from .models import MediaPost
from django.utils.timezone import now, localtime
from . import delete_from_gcs
import pytz
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.utils import timezone



def send_email(time, message):
    try:
        port = 587
        smtp_server = "mail.jinnahtech.com"
        login = "huzaifa.nasir@jinnahtech.com"
        password = "HuzaifaButt2003"
        sender_email = "huzaifa.nasir@jinnahtech.com"
        receivers = ["huzaifa.nasir@datafunction.ca"]
        text = f"""\
Dear Administrator,

I'm sending this message to inform about an error.
The problem occurred during posting to instagram at {time}: {message}

Thank you for your time to read this message.

Best regards,

Huzaifa Nasir
Backend Developer
Data Function
0320-1511248
"""
        msg = MIMEMultipart()
        msg["Subject"] = "Error during Instagram Posting"
        msg["From"] = sender_email
        msg["To"] = ", ".join(receivers)

        text = MIMEText(text, "plain")
        msg.attach(text)

        with smtplib.SMTP(smtp_server, port) as server:
            server.starttls()
            server.login(login, password)
            server.sendmail(sender_email, receivers, msg.as_string())

        # print('Email Sent')
        return True

    except Exception as e:
        print(f"Email not sent: {e}")
        return False





def post_reel(account_id, access_token, media_payload, proxies):
        try:
            # Instagram API URLs
            upload_url = f"https://graph.instagram.com/v22.0/{account_id}/media"
            publish_url = f"https://graph.instagram.com/v22.0/{account_id}/media_publish"
            change_ip_url = "http://146.0.75.178:20480/changeip/client/73041950421522020542"
            for i in range(3):
                try:
                    try:
                        rotate = requests.get(change_ip_url, timeout=10)
                        time.sleep(7)
                    except:
                        pass
                    upload_resp = requests.post(upload_url, data=media_payload, proxies=proxies, timeout=30)

                    if upload_resp.ok:
                        creation_id = upload_resp.json().get("id")
                        if not creation_id:
                            return False, 'No instagram post id returned in upload response'

                        publish_payload = {
                            "creation_id": creation_id,
                            "access_token": access_token
                        }
                        Found = False
                        for _ in range(5):  # Try for ~175 seconds
                            try:
                                time.sleep(35)
                                check_url = f"https://graph.instagram.com/v22.0/{creation_id}?fields=status_code&access_token={access_token}"
                                status_resp = requests.get(check_url, proxies=proxies, timeout=10)
                                if status_resp.ok:
                                    status = status_resp.json().get("status_code")
                                    if status == "FINISHED":
                                        Found = True
                                        break
                                    else:
                                        Found = False
                            except:
                                Found = False  
                        if not Found:
                            send_email(timezone.now(), f'Error during upload media to instagram: Taking too long to process')
                            return False, f"Failed to upload media to Instagram. Taking too long to process."  

                        publish_resp = requests.post(publish_url, data=publish_payload, proxies=proxies, timeout=20)
                        if publish_resp.ok:
                            return True, 'Instagram reel published successfully'
                        
                        send_email(timezone.now(), f'Error during upload media to instagram: {publish_resp.text}')
                        return False, f'Error during uploading media to instagram: {publish_resp.text}'
                    
                    else:
                        send_email(timezone.now(), f'Error during upload media to instagram: {upload_resp.text}')
                        return False, f'Error during upload media to instagram: {upload_resp.text}'

                except Exception as e:
                    time.sleep(60)

            send_email(timezone.now(), 'Tried 3 times. But failed to post media as taking too long.')  
            return False, f'Tried 3 times. But failed to post media as taking too long.'

        except Exception as e:
            send_email(timezone.now(), str(e))
            return False, f'Request error: {e}'


def post_media(account_id, access_token, media_payload, proxies):
        try:
            # Instagram API URLs
            upload_url = f"https://graph.instagram.com/v22.0/{account_id}/media"
            publish_url = f"https://graph.instagram.com/v22.0/{account_id}/media_publish"
            change_ip_url = "http://146.0.75.178:20480/changeip/client/73041950421522020542"
            for i in range(3):
                try:
                    try:
                        rotate = requests.get(change_ip_url, timeout=10)
                    except:
                        pass
                    upload_resp = requests.post(upload_url, data=media_payload, proxies=proxies, timeout=30)

                    if upload_resp.ok:
                        creation_id = upload_resp.json().get("id")
                        if not creation_id:
                            return False, 'No instagram post id returned in upload response'

                        publish_payload = {
                            "creation_id": creation_id,
                            "access_token": access_token
                        }
                        time.sleep(10)

                        publish_resp = requests.post(publish_url, data=publish_payload, proxies=proxies, timeout=30)

                        if publish_resp.ok:
                            return True, 'Instagram post published successfully'
                        
                        send_email(timezone.now(), f'Error during upload media to instagram: {publish_resp.text}')
                        return False,  f'Error during uploading media to instagram: {publish_resp.text}'
                    
                    else:
                        send_email(timezone.now(), f'Error during upload media to instagram: {upload_resp.text}')
                        return False, f'Error during upload media to instagram: {upload_resp.text}'

                except Exception as e:
                    print(f"Error in post_media: {e}")
                    time.sleep(60)
            send_email(timezone.now(), 'Tried 3 times. But failed to post media as taking too long.')
            return False, f'Tried 3 times. But failed to post media as taking too long.'

        except Exception as e:
            send_email(timezone.now(), str(e))
            return False, f'Request error: {e}'


def post():
    try:
        utc_now = now()       
        eastern_time = localtime(utc_now) 
        eastern_time = eastern_time.replace(tzinfo=pytz.UTC)

        post_obj = ( 
        MediaPost.objects
        .filter(scheduled_time__lte=eastern_time, has_tried=False)
        .order_by('scheduled_time') 
        .first()
        ) # Get the first post that is scheduled to be posted and has not been tried yet    
        
        if post_obj is None:
            return 
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
                "video_url": post_obj.media_url,
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
            post_obj.save()
            count = MediaPost.objects.filter(id=post_obj.instagram_account.id, has_tried=False).count()

    except Exception as e:
        send_email(timezone.now(), str(e))
    
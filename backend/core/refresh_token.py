from .models import InstagramAccount
from datetime import datetime, timedelta, timezone
from django.utils.timezone import now, localtime
import requests
import pytz
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email(time, account, message):
    try:
        port = 587
        smtp_server = "mail.jinnahtech.com"
        login = "huzaifa.nasir@jinnahtech.com"
        password = "HuzaifaButt2003"
        sender_email = "huzaifa.nasir@jinnahtech.com"
        receivers = ["huzaifa.nasir@datafunction.ca"]
        text = f"""\
Dear Administrator,

I'm sending this message to inform about Acceess Token Update.
The problem occurred during refreshing the access token at {time} for {account}: {message}

Thank you for your time to read this message.

Best regards,

Huzaifa Nasir
Backend Developer
Data Function
0320-1511248
"""
        msg = MIMEMultipart()
        msg["Subject"] = "Errored Refreshing Access Token"
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


def refresh_token():
        try:
            utc_now = now()       
            eastern_time = localtime(utc_now) 
            eastern_time = eastern_time.replace(tzinfo=pytz.UTC)
            lowered_time = eastern_time - timedelta(days=50)
            url = 'https://graph.instagram.com/refresh_access_token'
            grant_type = 'ig_refresh_token'
            insta_obj = ( 
            InstagramAccount.objects
            .filter(access_token_date__lte=lowered_time)
            .order_by('access_token_date') 
            .first()
            )
            if insta_obj is None:
                    return None
            else:
                try:
                    old_access_token = insta_obj.access_token 
                    data = { 
                        'grant_type': grant_type,
                        'access_token': old_access_token
                    }

                    response = requests.get(url, params=data)
                    if response.status_code == 200:
                        res_data = response.json()
                        try:
                            new_accessToken = res_data.get('access_token')
                            insta_obj.access_token = new_accessToken
                            insta_obj.save()
                            
                        except Exception as e:
                            send_email(eastern_time, insta_obj.username, str(e))
                            
                        
                    else:
                        send_email(eastern_time, insta_obj.username, response.text)

                except Exception as e:
                    send_email(eastern_time, insta_obj.username, str(e))

        except Exception as e:
            eastern_time = timezone.now()
            send_email(eastern_time, insta_obj.username, str(e))

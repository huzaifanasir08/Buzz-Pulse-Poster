import redis
from celery import shared_task
from django.utils import timezone
from time import sleep
from . import mysqlconfig, instagram_post, refresh_token

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Configure Redis connection with password and host
redis_client = redis.StrictRedis(
    host=mysqlconfig.redis_host,     
    port=mysqlconfig.redis_port,                
    db=mysqlconfig.redis_db,                     
    password=mysqlconfig.redis_password,   
    decode_responses=mysqlconfig.redis_decode_responses      
)

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
The problem occurred during start of the scheduled task execution at {time}: {message}

Thank you for your time to read this message.

Best regards,

Huzaifa Nasir
Backend Developer
Data Function
0320-1511248
"""
        msg = MIMEMultipart()
        msg["Subject"] = "Errored Scheduled Task Execution"
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


# Define the task
@shared_task
def check_and_post():
    lock_key = "check_and_post_lock"
    task_timeout = 600

    if redis_client.setnx(lock_key, 'locked'):
        try:

            redis_client.expire(lock_key, task_timeout) 

            # Task logic (e.g., posting to Instagram)
            instagram_post.post()
            refresh_token.refresh_token()
   
        except Exception as e:
            send_email(timezone.now(), str(e))
            print(f"Error posting: {e}")
        finally:
            redis_client.delete(lock_key)
    else:
        pass

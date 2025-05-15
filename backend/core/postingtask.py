import redis
from celery import shared_task
from django.utils import timezone
from time import sleep
from . import mysqlconfig, instagram_post, refresh_token


# Configure Redis connection with password and host
redis_client = redis.StrictRedis(
    host=mysqlconfig.redis_host,     
    port=mysqlconfig.redis_port,                
    db=mysqlconfig.redis_db,                     
    password=mysqlconfig.redis_password,   
    decode_responses=mysqlconfig.redis_decode_responses      
)

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
            print(f"Error posting: {e}")
        finally:
            redis_client.delete(lock_key)
    else:
        pass

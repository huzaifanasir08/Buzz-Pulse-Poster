from core import models
from django.utils.timezone import now, localtime
import pytz

def bg_task():
    utc_now = now()       
    eastern_time = localtime(utc_now) 
    eastern_time = eastern_time.replace(tzinfo=pytz.UTC)
    print("Current Eastern Time:", eastern_time)

    post_to_post = (
        models.MediaPost.objects
        .filter(scheduled_time__lte=eastern_time, has_tried=False)
        .order_by('scheduled_time') 
        .first()
    )
    if post_to_post is None:
        print("No posts to process")
        return
    print(post_to_post.scheduled_time)

    if eastern_time > post_to_post.scheduled_time:
        print("passed")
    else:
        print("has to come")
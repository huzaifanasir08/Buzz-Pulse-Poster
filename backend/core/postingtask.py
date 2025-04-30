# tasks.py
from celery import shared_task
from django.utils import timezone
from .models import MediaPost  # your model

@shared_task
def check_and_post():
    # now = timezone.now()
    # posts_to_post = MediaPost.objects.filter(is_posted=False, time_to_post__lte=now)

    # for post in posts_to_post:
        try:
            # Your posting function here
            # post_to_instagram(post)  # define this function yourself
            print('Posting to Instagram...')
            # Mark as posted
            # post.is_posted = True
            # post.save()

        except Exception as e:
            print(f"Error posting: {e}")
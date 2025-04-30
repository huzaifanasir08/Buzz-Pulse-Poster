from django.db import models
from django.conf import settings
from cryptography.fernet import InvalidToken
from core.encryption import fernet

class InstagramAccount(models.Model):
    username = models.CharField(max_length=150, unique=True)
    access_token = models.TextField(max_length=500, default='')
    proxy = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    # created_at = models.DateTimeField(auto_now_add=True)
    # last_login = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return self.username
    

class MediaPost(models.Model):

    instagram_account = models.ForeignKey(InstagramAccount, on_delete=models.CASCADE)
    post_type = models.CharField(max_length=20)
    media_url = models.CharField(max_length=500, default="")  # URL of the media file
    caption = models.TextField(blank=True)
    hashtags = models.TextField(blank=True)
    scheduled_time = models.DateTimeField(null=True, blank=True)  # Specific time
    # time_gap = models.CharField(max_length=10, null=True, blank=True)  # e.g., 10m, 1h, 1d
    created_at = models.DateTimeField(auto_now_add=True)
    is_posted = models.BooleanField(default=False)


class MediaFile(models.Model):
    media_post = models.ForeignKey(MediaPost, on_delete=models.CASCADE, related_name='media_files')
    file_url = models.URLField()   
    status = models.CharField(max_length=20)
    uploaded_at = models.DateTimeField(auto_now_add=True)
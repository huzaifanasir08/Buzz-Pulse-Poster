from django.db import models
from django.conf import settings
from cryptography.fernet import InvalidToken
from core.encryption import fernet

class ApplicationUser(models.Model):
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    password = models.CharField(max_length=500, default='')
    profile_picture = models.CharField(max_length=500, default='')
    
    def __str__(self):
        return self.first_name + " " + self.last_name
    

class InstagramAccount(models.Model):
    username = models.CharField(max_length=150, unique=True)
    access_token_type = models.CharField(max_length=50, blank=True, null=True, default="Short Term")
    access_token = models.TextField(max_length=500, default='')
    access_token_date = models.DateTimeField(auto_now=True)
    account_id = models.CharField(max_length=100, blank=True, null=True, default="")
    proxy = models.CharField(max_length=255, blank=True, null=True)
    free_for_posting = models.BooleanField(default=True)
    
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
    has_tried = models.BooleanField(default=False)
    has_posted = models.BooleanField(default=False)
    logs = models.TextField(blank=True, null=True)  # Store logs or error messages


class MediaFile(models.Model):
    media_post = models.ForeignKey(MediaPost, on_delete=models.CASCADE, related_name='media_files')
    file_url = models.URLField()   
    status = models.CharField(max_length=20)
    uploaded_at = models.DateTimeField(auto_now_add=True)




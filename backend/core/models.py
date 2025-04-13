from django.db import models
from django.conf import settings
from cryptography.fernet import InvalidToken
from core.encryption import fernet

class InstagramAccount(models.Model):
    username = models.CharField(max_length=150, unique=True)
    _password = models.TextField(db_column='password', default= 'password')  # actual encrypted field
    proxy = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)
    
    @property
    def password(self):
        return fernet.decrypt(self._password.encode()).decode()

    @password.setter
    def password(self, raw):
        self._password = fernet.encrypt(raw.encode()).decode()
    def __str__(self):
        return self.username
    

class MediaPost(models.Model):
    POST_TYPE_CHOICES = [
        ('photo_video', 'Photo & Video'),
        ('reel', 'Reel'),
    ]

    instagram_account = models.ForeignKey(InstagramAccount, on_delete=models.CASCADE)
    post_type = models.CharField(max_length=20, choices=POST_TYPE_CHOICES)
    description = models.TextField(blank=True)
    scheduled_time = models.DateTimeField(null=True, blank=True)  # Specific time
    time_gap = models.CharField(max_length=10, null=True, blank=True)  # e.g., 10m, 1h, 1d
    created_at = models.DateTimeField(auto_now_add=True)
    is_posted = models.BooleanField(default=False)


class MediaFile(models.Model):
    media_post = models.ForeignKey(MediaPost, on_delete=models.CASCADE, related_name='media_files')
    file_url = models.URLField()   
    status = models.CharField(max_length=20)
    uploaded_at = models.DateTimeField(auto_now_add=True)
from django.db import models
from django.conf import settings
from cryptography.fernet import InvalidToken
from core.encryption import fernet


SOCIAL_CHOICES = [
    ('instagram', 'Instagram'),
]

class SocialAccount(models.Model):
    platform = models.CharField(max_length=20, choices=SOCIAL_CHOICES)
    username = models.CharField(max_length=100)
    access_token = models.TextField()
    refresh_token = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Post(models.Model):
    account = models.ForeignKey(SocialAccount, on_delete=models.CASCADE)
    caption = models.TextField()
    media = models.FileField(upload_to='uploads/')
    scheduled_time = models.DateTimeField()
    status = models.CharField(max_length=20, default='pending')  # pending, posted, failed
    posted_time = models.DateTimeField(null=True, blank=True)

class PostLog(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    status = models.CharField(max_length=20)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

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

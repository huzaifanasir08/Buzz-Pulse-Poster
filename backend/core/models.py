from django.db import models
from django.conf import settings
from cryptography.fernet import InvalidToken
from core.encryption import fernet
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class ApplicationUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError("Username is required")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if not extra_fields.get('is_staff'):
            raise ValueError('Superuser must have is_staff=True.')
        if not extra_fields.get('is_superuser'):
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, password, **extra_fields)

class ApplicationUser(AbstractBaseUser, PermissionsMixin):  # ✅ Inherit PermissionsMixin
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    profile_picture = models.CharField(max_length=500, default='')
    app_id = models.CharField(max_length=225, default='')
    app_secret = models.CharField(max_length=225, default='')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    objects = ApplicationUserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    # ✅ These are needed for Django Admin permission checks
    def has_perm(self, perm, obj=None):
        return self.is_superuser or perm in self.get_user_permissions()

    def has_module_perms(self, app_label):
        return self.is_superuser or app_label in [perm.split('.')[0] for perm in self.get_user_permissions()]


class InstagramAccount(models.Model):
    username = models.CharField(max_length=150, unique=True)
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
    file_deleted = models.BooleanField(default=False)
    logs = models.TextField(blank=True, null=True)  # Store logs or error messages



class MediaFile(models.Model):
    media_post = models.ForeignKey(MediaPost, on_delete=models.CASCADE, related_name='media_files')
    file_url = models.URLField()   
    status = models.CharField(max_length=20)
    uploaded_at = models.DateTimeField(auto_now_add=True)




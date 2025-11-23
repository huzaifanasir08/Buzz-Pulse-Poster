from django.contrib import admin
from django.contrib import messages

from .models import InstagramAccount, MediaPost, ApplicationUser
from .postingtask import check_and_post

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _
from django import forms

class ApplicationUserAdmin(BaseUserAdmin):
    model = ApplicationUser
    list_display = ('username', 'is_staff', 'is_superuser')
    search_fields = ('username',)
    ordering = ('username',)

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'profile_picture')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'is_staff', 'is_superuser'),
        }),
    )

#check_and_post.delay()
      

  
class InstagramAccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'account_id', 'proxy')
    search_fields = ('username',)
    list_filter = ('free_for_posting',)

class MediaPostAdmin(admin.ModelAdmin):
    list_display = ('id', 'instagram_account', 'post_type', 'scheduled_time', 'has_tried', 'has_posted', 'file_deleted', 'logs')
    search_fields = ('instagram_account__username',)
    list_filter = ('scheduled_time',)

# Register models
admin.site.register(ApplicationUser, ApplicationUserAdmin)
admin.site.register(InstagramAccount, InstagramAccountAdmin)
admin.site.register(MediaPost, MediaPostAdmin)

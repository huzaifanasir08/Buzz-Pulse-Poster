from django.contrib import admin
from django.contrib import messages
from django.core.management import call_command
from .models import InstagramAccount, MediaPost, MediaFile
from .postingtask import check_and_post
import subprocess

class InstagramAccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'access_token', 'proxy', 
                    'is_active')
    search_fields = ('username',)
    list_filter = ('id',)
    actions = [
        'trigger_run_task',
    ]

    def trigger_run_task(self, request, queryset):
        check_and_post.delay()
        self.message_user(request, "The Task has been triggered.")
    
    trigger_run_task.short_description = "Trigger Task"


# Register the ScrapingStatus model with the updated admin class
admin.site.register(InstagramAccount, InstagramAccountAdmin)

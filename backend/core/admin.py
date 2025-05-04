from django.contrib import admin
from django.contrib import messages
from django.core.management import call_command
from .models import InstagramAccount, MediaPost, MediaFile, ApplicationUser
from .postingtask import check_and_post
import subprocess

class ApplicationUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'password')
    search_fields = ('username',)
    list_filter = ('id',)


class InstagramAccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'account_id', 'access_token', 'proxy', 
                    'free_for_posting')
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
admin.site.register(ApplicationUser)




# class InstagramAccountAdmin(admin.ModelAdmin):
#     list_display = ('id', 'username', 'account_id', 'access_token', 'proxy', 
#                     'free_for_posting')
#     search_fields = ('username',)
#     list_filter = ('id',)
#     actions = [
#         'trigger_run_task',
#     ]

#     def trigger_run_task(self, request, queryset):
#         check_and_post.delay()
#         self.message_user(request, "The Task has been triggered.")
    
#     trigger_run_task.short_description = "Trigger Task"


# # Register the ScrapingStatus model with the updated admin class
# admin.site.register(InstagramAccount, InstagramAccountAdmin)

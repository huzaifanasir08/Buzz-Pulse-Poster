from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MediaPostViewSet, MediaFileViewSet, CreateInstagramAccount, user_info, oauth_redirect, login_view,profile
from . import views
from django.contrib import admin
from django.views.generic import RedirectView

router = DefaultRouter()
# router.register(r'accounts', SocialAccountViewSet)
router.register(r'posts', MediaFileViewSet)
# router.register(r'logs', PostLogViewSet)
router.register(r'media-posts', MediaPostViewSet, basename='media-post')

urlpatterns = [
    path('', RedirectView.as_view(url='/admin/', permanent=True)),
    path('createaccount/', views.CreateInstagramAccount, name='CreateInstagramAccount'),
    path('accountslist/', views.accounts_list, name='accounts_list'),
    path('allaccountlist/', views.get_accounts_list, name='get_accounts_list'),
    path('upload_to_gcs/', views.upload_to_gcs, name='upload_to_gcs'),
    path('savedata/', views.save_post_details, name='save_post_details'),
    path('userinfo/', views.user_info, name='user_info'),
    path('statistics', views.media_post_stats, name='media_post_stats'),
    path('redirect-token/', oauth_redirect, name='oauth_redirect'),
    path('login/', login_view),
    path('profile/', profile),

]

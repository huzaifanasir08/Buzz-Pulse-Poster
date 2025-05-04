from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MediaPostViewSet, MediaFileViewSet, CreateInstagramAccount, user_info, oauth_redirect
from . import views
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
# router.register(r'accounts', SocialAccountViewSet)
router.register(r'posts', MediaFileViewSet)
# router.register(r'logs', PostLogViewSet)
router.register(r'media-posts', MediaPostViewSet, basename='media-post')

urlpatterns = [
    path('', include(router.urls)),
    path('createaccount/', views.CreateInstagramAccount, name='CreateInstagramAccount'),
    path('accountlist/', views.accounts_list, name='accounts_list'),
    path('upload_to_gcs/', views.upload_to_gcs, name='upload_to_gcs'),
    path('savedata/', views.save_post_details, name='save_post_details'),
    path('userinfo/', views.user_info, name='user_info'),
    path('statistics', views.media_post_stats, name='media_post_stats'),
    path('redirect-token/', oauth_redirect, name='oauth_redirect'),
    path('login/', obtain_auth_token),

]

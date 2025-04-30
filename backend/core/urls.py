from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MediaPostViewSet, MediaFileViewSet, CreateInstagramAccount
from . import views

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
]

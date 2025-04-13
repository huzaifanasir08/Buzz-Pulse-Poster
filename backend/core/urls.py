from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MediaPostViewSet, MediaFileViewSet, InstagramAccountViewSet

router = DefaultRouter()
# router.register(r'accounts', SocialAccountViewSet)
router.register(r'posts', MediaFileViewSet)
# router.register(r'logs', PostLogViewSet)
router.register(r'accounts', InstagramAccountViewSet)
router.register(r'media-posts', MediaPostViewSet, basename='media-post')

urlpatterns = [
    path('', include(router.urls)),
]

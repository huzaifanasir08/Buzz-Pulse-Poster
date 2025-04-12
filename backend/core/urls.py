from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SocialAccountViewSet, PostViewSet, PostLogViewSet, InstagramAccountViewSet

router = DefaultRouter()
# router.register(r'accounts', SocialAccountViewSet)
router.register(r'posts', PostViewSet)
router.register(r'logs', PostLogViewSet)
router.register(r'accounts', InstagramAccountViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

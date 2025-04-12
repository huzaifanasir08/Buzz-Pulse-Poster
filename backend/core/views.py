from rest_framework import viewsets
from .models import SocialAccount, Post, PostLog, InstagramAccount
from .serializers import SocialAccountSerializer, PostSerializer, PostLogSerializer, InstagramAccountSerializer, InstagramAccountListSerializer

class SocialAccountViewSet(viewsets.ModelViewSet):
    queryset = SocialAccount.objects.all()
    serializer_class = SocialAccountSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostLogViewSet(viewsets.ModelViewSet):
    queryset = PostLog.objects.all()
    serializer_class = PostLogSerializer

# class InstagramAccountViewSet(viewsets.ModelViewSet):
#     queryset = InstagramAccount.objects.all()
#     serializer_class = InstagramAccountSerializer

class InstagramAccountViewSet(viewsets.ModelViewSet):
    queryset = InstagramAccount.objects.all()

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return InstagramAccountListSerializer
        return InstagramAccountSerializer

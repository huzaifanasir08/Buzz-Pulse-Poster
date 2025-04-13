from rest_framework import viewsets
from .models import MediaPost, MediaFile, InstagramAccount
from .serializers import MediaPostSerializer, MediaFileSerializer, InstagramAccountSerializer, InstagramAccountListSerializer


class MediaPostViewSet(viewsets.ModelViewSet):
    queryset = MediaPost.objects.all().order_by('-created_at')
    serializer_class = MediaPostSerializer
    
class MediaFileViewSet(viewsets.ModelViewSet):
    queryset = MediaFile.objects.all()
    serializer_class = MediaFileSerializer

# class InstagramAccountViewSet(viewsets.ModelViewSet):
#     queryset = InstagramAccount.objects.all()
#     serializer_class = InstagramAccountSerializer

class InstagramAccountViewSet(viewsets.ModelViewSet):
    queryset = InstagramAccount.objects.all()

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return InstagramAccountListSerializer
        return InstagramAccountSerializer

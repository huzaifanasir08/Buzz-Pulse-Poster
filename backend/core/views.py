from rest_framework import viewsets
from .models import MediaPost, MediaFile, InstagramAccount
from .serializers import MediaPostSerializer, MediaFileSerializer, InstagramAccountSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response



class MediaPostViewSet(viewsets.ModelViewSet):
    queryset = MediaPost.objects.all().order_by('-created_at')
    serializer_class = MediaPostSerializer
    
class MediaFileViewSet(viewsets.ModelViewSet):
    queryset = MediaFile.objects.all()
    serializer_class = MediaFileSerializer

# class InstagramAccountViewSet(viewsets.ModelViewSet):
#     queryset = InstagramAccount.objects.all()
#     serializer_class = InstagramAccountSerializer

@api_view(['POST'])
def CreateInstagramAccount(request):
    serializer = InstagramAccountSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

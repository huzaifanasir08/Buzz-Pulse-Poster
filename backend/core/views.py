from rest_framework import viewsets
from .models import MediaPost, MediaFile, InstagramAccount
from .serializers import MediaPostSerializer, MediaFileSerializer, InstagramAccountSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from google.cloud import storage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import MultiPartParser
import os
import upload_to_server
import uuid
from datetime import datetime, timedelta
from . import savetodb



def calculate_next_post_time(selected_time_str, day_ahead):
    now = datetime.now()
    
    selected_hour, selected_minute = map(int, selected_time_str.split(":"))
    
    # Create a datetime for today at the selected time
    next_post = now.replace(hour=selected_hour, minute=selected_minute, second=0, microsecond=0)
    
    # If the selected time already passed today, schedule for tomorrow
    if next_post <= now:
        next_post += timedelta(days=day_ahead)
    
    return next_post


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

@csrf_exempt
@api_view(['POST'])
def upload_to_gcs(request):
    file_urls = []
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    auth_file_path = os.path.join(BASE_DIR, 'auth.json')
    client = storage.Client.from_service_account_json(auth_file_path)
    bucket_name = "postingmedia"

    uploaded_files = request.FILES.values()
    results = []

    for uploaded_file in uploaded_files:
        unique_filename = f"{uuid.uuid4()}_{uploaded_file.name}"
        gcs_destination_path = f"Images/{unique_filename}"

        # Upload directly from the uploaded file (in memory)
        bucket = client.bucket(bucket_name)
        blob = bucket.blob(gcs_destination_path)

        blob.upload_from_file(
            uploaded_file.file,   # <-- directly use the file object
            size=uploaded_file.size,
            content_type=uploaded_file.content_type,
            timeout=600,           # Optional: Increase timeout for large files
            rewind=True            # Important for retries
        )

        blob.make_public()  # if you want public URL

        public_url = blob.public_url

        results.append({'filename': uploaded_file.name, 'url': public_url})
        print(f"Uploaded {uploaded_file.name} to {public_url}")
    
    return JsonResponse({
        'status': 'success',
        'uploaded_file': results,
        'file_url': public_url
    })

@csrf_exempt
@api_view(['POST'])
def save_post_details(request):
    now = datetime.now()
    times = []
    data = request.data
    account_id = data.get('account_id')
    # account_username = data.get('account_username')
    caption = data.get('caption')
    hashtags = data.get('hashtags')
    media_urls = data.get('media_urls')
    post_mode = data.get('post_mode')
    post_type = data.get('post_type')
    if post_mode == 'delay':
        schedule_time = data.get('safety_delay_seconds')
        for i in range(len(media_urls)):
            # print("Scheduled time:", scheduled_time)
            scheduled_time = now + timedelta(hours=schedule_time*i)
            times.append(scheduled_time)
        HAS_INSERTED = savetodb.saveDataInDb(post_type, caption, times, now, False, account_id, hashtags, media_urls)
        if HAS_INSERTED:
            print("Data inserted successfully")
            return JsonResponse({
                'status': 'success',
                # 'account_username':account_username,
                'message': 'Posts saved successfully'
            })
        else:
            print("Data insertion failed")
            return JsonResponse({
                'status': 'error',
                # 'account_username':account_username,
                'message': 'Posts not saved'
            })
    elif post_mode == 'daily':
        scheduled_time = data.get('daily_post_time')
        for i in range(len(media_urls)):
            next_post_time = calculate_next_post_time(scheduled_time, i)
            dt = datetime.fromisoformat(str(next_post_time))
            mysql_format_date = dt.strftime("%Y-%m-%d %H:%M:%S")

            times.append(mysql_format_date)
        HAS_INSERTED = savetodb.saveDataInDb(post_type, caption, times, now, False, account_id, hashtags, media_urls)
        if HAS_INSERTED:
            print("Data inserted successfully")
            return JsonResponse({
                'status': 'success',
                # 'account_username':account_username,
                'message': 'Posts saved successfully',
                'time': times
            })
        else:
            print("Data insertion failed")
            return JsonResponse({
                'status': 'error',
                # 'account_username':account_username,
                'message': 'Posts not saved'
            })
    



    # return JsonResponse({
    #     'status': 'success',
    #     'account_username':account_username
    # })

def accounts_list(request):
    if request.method == 'GET':
        accounts = InstagramAccount.objects.all()
        data = {
            "accounts": [
                {
                    "id": account.id,
                    "username": account.username
                }
                for account in accounts
            ]
        }
        return JsonResponse(data)
    else:
        return JsonResponse({"error": "GET method required"}, status=405)
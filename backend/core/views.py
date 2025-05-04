from rest_framework import viewsets
from .models import MediaPost, MediaFile, InstagramAccount, ApplicationUser
from .serializers import MediaPostSerializer, MediaFileSerializer, InstagramAccountSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from google.cloud import storage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import MultiPartParser
import os
import upload_to_server
import uuid
from datetime import datetime, timedelta
from . import savetodb
from django.utils.timezone import now, localtime
import random
from django.http import HttpResponse
import requests


def user_info(request):
    if request.method == 'GET':
        user = ApplicationUser.objects.get(id=1)  # Assuming you want the first user
        data = {
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "profile_picture": user.profile_picture
        }
        return JsonResponse(data)
    else:
        return JsonResponse({"error": "GET method required"}, status=405)



def calculate_next_post_time(selected_time_str, day_ahead):
    utc_now = now()                       
    eastern_time = localtime(utc_now) 
    
    selected_hour, selected_minute = map(int, selected_time_str.split(":"))
    
    # Create a datetime for today at the selected time
    next_post = eastern_time.replace(hour=selected_hour, minute=selected_minute, second=0, microsecond=0)
    
    # If the selected time already passed today, schedule for tomorrow
    if next_post <= eastern_time:
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
        # print(f"Uploaded {uploaded_file.name} to {public_url}")
    
    return JsonResponse({
        'status': 'success',
        'uploaded_file': results,
        'file_url': public_url
    })

@csrf_exempt
@api_view(['POST'])
def save_post_details(request):
    utc_now = now()                       
    eastern_time = localtime(utc_now) 
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
            scheduled_time = eastern_time + timedelta(hours=schedule_time*i, minutes=random.randint(1, 15))
            times.append(scheduled_time)
        logs = ''
        HAS_INSERTED = savetodb.saveDataInDb(post_type, caption, times, eastern_time, False, account_id, hashtags, media_urls, False, logs)
        if HAS_INSERTED:
            # print("Data inserted successfully")
            return JsonResponse({
                'status': 'success',
                # 'account_username':account_username,
                'message': 'Posts saved successfully'
            })
        else:
            # print("Data insertion failed")
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
        HAS_INSERTED = savetodb.saveDataInDb(post_type, caption, times, eastern_time, False, account_id, hashtags, media_urls)
        if HAS_INSERTED:
            return JsonResponse({
                'status': 'success',
                # 'account_username':account_username,
                'message': 'Posts saved successfully',
                'time': times
            })
        else:
            # print("Data insertion failed")
            return JsonResponse({
                'status': 'error',
                # 'account_username':account_username,
                'message': 'Posts not saved'
            })

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
    


@api_view(["GET"])
def media_post_stats(request):
    # Group by date
    # data = MediaPost.objects.annotate(date=TruncDate('scheduled_time')).values('date').annotate(
    #     total=Count('id'),
    #     post_count=Count('id', filter=Q(post_type='post')),
    #     reel_count=Count('id', filter=Q(post_type='reel')),
    #     tried=Count('id', filter=Q(has_tried=True)),
    #     posted=Count('id', filter=Q(has_posted=True)),
    #     failed=Count('id', filter=Q(has_tried=True, has_posted=False))
    # ).order_by('date')
    data = [
        {
            'date': '2025-04-28',
            'total': 14,
            'post_count': 7,
            'reel_count': 7,
            'has_tried': 9,
            'has_posted': 5,
            'failed': 4,
        },
        {
            'date': '2025-04-29',
            'total': 10,
            'post_count': 9,
            'reel_count': 1,
            'has_tried': 2,
            'has_posted': 10,
            'failed': 1,
        },
        {
            'date': '2025-04-30',
            'total': 14,
            'post_count': 4,
            'reel_count': 13,
            'has_tried': 9,
            'has_posted': 6,
            'failed': 5,
        },
        {
            'date': '2025-05-01',
            'total': 13,
            'post_count': 2,
            'reel_count': 12,
            'has_tried': 5,
            'has_posted': 3,
            'failed': 2,
        },
        {
            'date': '2025-01-02',
            'total': 17,
            'post_count': 10,
            'reel_count': 3,
            'has_tried': 2,
            'has_posted': 6,
            'failed': 7,
        },
    ]

    return Response(data)

@csrf_exempt
def oauth_redirect(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        code = data.get('code')
        print(code)
        if code:
            client_id = 1385265725991934
            client_secret = '442ae491972249afaa38ca0a60dce325' 
            grant_type = 'authorization_code'
            redirect_uri = 'https://scheduleinstagramposts.com/auth.html'
            url = 'https://api.instagram.com/oauth/access_token'

            
            
            data = {
                'client_id': client_id,
                'client_secret': client_secret,  
                'grant_type': grant_type,
                'redirect_uri': redirect_uri,  # Must match the one used in auth
                'code': code
            }
            print(data)
            response = requests.post(url, data=data)
            if response.status_code == 200:
                res_data = response.json()
                print(res_data)
                try:
                    accessToken = res_data.get('access_token')
                    userID = res_data.get('user_id')
                    return JsonResponse({
                    'status': 'success',
                    'access_token': accessToken,
                    'user_id': userID
                })

                except Exception as e:
                    print(f'Error in getting auth code: {e}')
                    return JsonResponse({
                    'status': f'Error: {e}',
                    'access_token': 'No authorization code found',
                    'user_id': "None"
                })
            else:
                return JsonResponse({
                    'status': 'Something went wrong',
                    'access_token': 'No authorization code found',
                    'user_id': 'None'
                })
        else:
            return JsonResponse({
                    'status': 'No authorization code found',
                    'access_token': 'No authorization code found',
                    'user_id': 'None'
                })
        


        
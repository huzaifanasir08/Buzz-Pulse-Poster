from rest_framework import viewsets
from .models import MediaPost, MediaFile, InstagramAccount, ApplicationUser
from .serializers import MediaPostSerializer, MediaFileSerializer, InstagramAccountSerializer,ApplicationUserSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from google.cloud import storage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import MultiPartParser
import os
from zoneinfo import ZoneInfo
import upload_to_server
import uuid
from datetime import datetime, timedelta, timezone
from . import savetodb, updateInstaAcc
from django.utils.timezone import now, localtime
import random
from django.http import HttpResponse
import requests
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token
import time

def user_info(request):
    if request.method == 'GET':
        user = ApplicationUser.objects.get(id=2)  # Assuming you want the first user
        data = {
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "profile_picture": user.profile_picture
        }
        return JsonResponse(data)
    else:
        return JsonResponse({"error": "GET method required"}, status=405)






def now():
    eastern = ZoneInfo("America/New_York")
    return datetime.now(tz=eastern)

def get_base_start_time(selected_time_str):
    current_time = now()
    selected_hour, selected_minute = map(int, selected_time_str.split(":"))

    # Construct today's scheduled time in EST
    base_time = current_time.replace(hour=selected_hour, minute=selected_minute, second=0, microsecond=0)

    # If the scheduled time today has passed, start from tomorrow
    if base_time <= current_time:
        base_time += timedelta(days=1)

    return base_time

def calculate_next_post_time(base_time, day_offset):
    post_time = base_time + timedelta(days=day_offset)
    random_seconds = random.randint(1, 900)
    post_time += timedelta(seconds=random_seconds)
    return post_time


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
        gcs_destination_path = f"MediaFiles/{unique_filename}"

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
    urls = []
    if len(media_urls) < 1:
        return JsonResponse({
                    'status': 'success',
                    # 'account_username':account_username,
                    'message': 'No post to save.'
                })
    
    if post_mode == 'delay':
        schedule_time = data.get('safety_delay_seconds')
        for i in range(len(media_urls)):
            # print("Scheduled time:", scheduled_time)
            scheduled_time = eastern_time + timedelta(hours=schedule_time*i+1, seconds=random.randint(1, 900))
            times.append(scheduled_time)
            if media_urls[i].lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp')):
                post_type = 'post'
            elif media_urls[i].lower().endswith(('.mp4', '.mov', '.avi', '.wmv', '.flv', '.mkv', '.webm')):
                post_type = 'reels'
            else:
                return JsonResponse({
                'status': 'error',
                # 'account_username':account_username,
                'message': 'Invalid file'
            })
            
            urls.append([post_type, media_urls[i] ])
        logs = ''
        HAS_INSERTED = savetodb.saveDataInDb(post_type, caption, times, eastern_time, False, account_id, hashtags, urls, False, logs)
        if HAS_INSERTED:
            IS_UPDATED = updateInstaAcc.update_account(account_id, False)
            if IS_UPDATED:
                return JsonResponse({
                    'status': 'success',
                    # 'account_username':account_username,
                    'message': 'Posts saved successfully'
                })
            return JsonResponse({
                    'status': 'success',
                    # 'account_username':account_username,
                    'message': 'Posts saved successfully but account not updated'
                })
        return JsonResponse({
                'status': 'error',
                # 'account_username':account_username,
                'message': 'Posts not saved'
            })
    elif post_mode == 'daily':
        scheduled_time = data.get('daily_post_time')
        print(scheduled_time)
        print('----------------')
        base_time = get_base_start_time(scheduled_time)
        for i in range(len(media_urls)):
            next_post_time = calculate_next_post_time(base_time, i)
            dt = datetime.fromisoformat(str(next_post_time))
            mysql_format_date = dt.strftime("%Y-%m-%d %H:%M:%S")
            times.append(mysql_format_date)
            if media_urls[i].lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp')):
                post_type = 'post'
            elif media_urls[i].lower().endswith(('.mp4', '.mov', '.avi', '.wmv', '.flv', '.mkv', '.webm')):
                post_type = 'reels'
            else:
                return JsonResponse({
                'status': 'error',
                # 'account_username':account_username,
                'message': 'Invalid file'
            })
            urls.append([post_type, media_urls[i] ])
        logs = ''
        HAS_INSERTED = savetodb.saveDataInDb(post_type, caption, times, eastern_time, False, account_id, hashtags, urls, False, logs)
        if HAS_INSERTED:
            IS_UPDATED = updateInstaAcc.update_account(account_id, False)
            if IS_UPDATED:
                return JsonResponse({
                    'status': 'success',
                    # 'account_username':account_username,
                    'message': 'Posts saved successfully',
                    'time': times
                })
            return JsonResponse({
                    'status': 'success',
                    # 'account_username':account_username,
                    'message': 'Posts saved successfully but account not updated',
                    'time': times
            })
        return JsonResponse({
                'status': 'error',
                # 'account_username':account_username,
                'message': 'Posts not saved'
        })

def accounts_list(request):
    if request.method == 'GET':
        accounts = InstagramAccount.objects.filter(free_for_posting=True)
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
    

def get_accounts_list(request):
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

    account_id = request.GET.get('id')
    data = savetodb.get_data(account_id)
    graph_data = []
    total = 0
    post_count = 0
    reel_count = 0
    has_tried = 0
    has_posted = 0
    failed = 0
    files_deleted = 0
    for record in data:      
        rc = {'date': record[0], 'total': record[1], 'post_count': int(record[2]), 'reel_count':  int(record[3]), 'has_tried': int(record[4]), 'has_posted': int(record[5]), 'failed': int(record[6])} 
        graph_data.append(rc)  
        total = total + record[1]
        post_count = post_count + int(record[2])
        reel_count = reel_count + int(record[3])
        has_tried = has_tried + int(record[4])
        has_posted = has_posted + int(record[5])
        failed = failed + int(record[6])
        files_deleted = files_deleted + int(record[7])

    total_rec = [total, post_count, reel_count, has_tried, has_posted, failed, files_deleted]
    postData = {
        'total_rec': total_rec,
        'graph_data': graph_data}
        
    return Response(postData)

@csrf_exempt
def oauth_redirect(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        code = data.get('code')
        if code:
            user = ApplicationUser.objects.get(id=2)
            client_id = user.app_id
            client_secret = user.app_secret
            grant_type = 'authorization_code'
            redirect_uri = 'https://scheduleinstagramposts.com/auth.html'
            url = 'https://api.instagram.com/oauth/access_token'
            exchange_token_url = 'https://graph.instagram.com/access_token'  
            info_url = "https://graph.instagram.com/v22.0/me"
            
            data = {
                'client_id': client_id,
                'client_secret': client_secret,  
                'grant_type': grant_type,
                'redirect_uri': redirect_uri,  # Must match the one used in auth
                'code': code
            }
            response = requests.post(url, data=data)
            if response.status_code == 200:
                res_data = response.json()
                try:
                    accessToken = res_data.get('access_token')
                    userID = res_data.get('user_id')
                    params ={
                        'grant_type': 'ig_exchange_token',
                        'client_secret': client_secret, 
                        'access_token': accessToken,
                    }
                    time.sleep(1)
                    response = requests.get(exchange_token_url, params=params)
                    if response.status_code == 200:
                        res_data = response.json()
                        accessToken = res_data.get('access_token')
                        info_params = {
                            "fields": "user_id",
                            "access_token": accessToken
                        }
                        response = requests.get(info_url, params=info_params)
                        if response.status_code == 200:
                            info_data = response.json()
                            user_id = info_data.get('user_id')
                            return JsonResponse({
                            'status': 'success',
                            'access_token': accessToken,
                            'user_id': user_id
                            })
                        return JsonResponse({
                            'status': 'Something went wrong',
                            'access_token': 'No authorization code found',
                            'user_id': 'None'
                        })
                    return JsonResponse({
                            'status': 'Something went wrong',
                            'access_token': 'No authorization code found',
                            'user_id': 'None'
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
        
        
@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        # Check if the username exists
        user = ApplicationUser.objects.get(username=username)

        # Check password
        if not user.check_password(password):
            raise AuthenticationFailed('Invalid credentials')

        # Generate or get token
        token, created = Token.objects.get_or_create(user=user)

        # Return token if credentials are correct
        return Response({'token': token.key})

    except ApplicationUser.DoesNotExist:
        raise AuthenticationFailed('Invalid credential')



@csrf_exempt
@api_view(["GET", "PUT"])
def profile(request):
    user = ApplicationUser.objects.get(id=2)
    if request.method == "GET":
        serializer = ApplicationUserSerializer(user)
        return Response(serializer.data)
    if request.method == "PUT":
        serializer = ApplicationUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
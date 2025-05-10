from .models import InstagramAccount
from datetime import datetime, timedelta, timezone
from django.utils.timezone import now, localtime
import requests
import pytz


def refresh_token():
        try:
            utc_now = now()       
            eastern_time = localtime(utc_now) 
            eastern_time = eastern_time.replace(tzinfo=pytz.UTC)
            print("Current Eastern Time:", eastern_time)
            lowered_time = eastern_time - timedelta(days=1)
            print(lowered_time)
            url = 'https://graph.instagram.com/refresh_access_token'
            grant_type = 'ig_refresh_token'
            insta_obj = ( 
            InstagramAccount.objects
            .filter(access_token_date__lte=lowered_time)
            .order_by('access_token_date') 
            .first()
            )
            if insta_obj is None:
                    return None
            else:
                try:
                    old_access_token = insta_obj.access_token 
                    
                    data = { 
                        'grant_type': grant_type,
                        'access_token': old_access_token
                    }

                    response = requests.get(url, params=data)
                    if response.status_code == 200:
                        res_data = response.json()
                        try:
                            new_accessToken = res_data.get('access_token')
                            insta_obj.access_token = new_accessToken
                            insta_obj.save()
                            print('New saved')
                            
                        except Exception as e:
                            pass
                            
                        
                    else:
                        pass
                except:
                     pass
        except:
             pass

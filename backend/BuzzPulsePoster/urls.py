from django.contrib import admin
from django.urls import path, include
from django.conf.urls import handler404
# from core import views

# URL patterns for your project
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),  # Replace 'core.urls' with your app's URL patterns
]

# # Custom error page handler for 404 errors
# handler404 = 'core.views.custom_404'
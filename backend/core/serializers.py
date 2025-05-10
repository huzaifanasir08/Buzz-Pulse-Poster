from rest_framework import serializers
from .models import MediaPost, MediaFile, InstagramAccount, ApplicationUser


class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = ['file_url']


class MediaPostSerializer(serializers.ModelSerializer):
    media_files = MediaFileSerializer(many=True)
    
    class Meta:
        model = MediaPost
        fields = [
            'id', 'instagram_account', 'post_type', 'description',
            'scheduled_time', 'time_gap', 'media_files'
        ]

    def validate(self, data):
        if data.get('scheduled_time') and data.get('time_gap'):
            raise serializers.ValidationError("Provide either scheduled_time or time_gap, not both.")
        if not data.get('scheduled_time') and not data.get('time_gap'):
            raise serializers.ValidationError("Either scheduled_time or time_gap must be provided.")
        return data

    def create(self, validated_data):
        media_data = validated_data.pop('media_files')
        post = MediaPost.objects.create(**validated_data)
        for media in media_data:
            MediaFile.objects.create(media_post=post, **media)
        return post

class InstagramAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstagramAccount
        fields = '__all__'
        

class ApplicationUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationUser
        fields = ['first_name', 'last_name']  # add or remove fields as needed

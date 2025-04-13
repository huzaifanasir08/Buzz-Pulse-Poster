from rest_framework import serializers
from .models import MediaPost, MediaFile, InstagramAccount


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
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = InstagramAccount
        fields = ['id', 'username', 'password', 'proxy', 'is_active', 'created_at', 'last_login']

    def create(self, validated_data):
        instance = InstagramAccount()
        instance.username = validated_data['username']
        instance.password = validated_data['password']  # this calls setter -> encrypts
        instance.proxy = validated_data.get('proxy')
        instance.save()
        return instance

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            instance.password = validated_data['password']
        instance.proxy = validated_data.get('proxy', instance.proxy)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance

class InstagramAccountListSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstagramAccount
        fields = ['id', 'username', 'proxy', 'is_active', 'last_login']

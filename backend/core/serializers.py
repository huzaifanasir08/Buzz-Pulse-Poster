from rest_framework import serializers
from .models import SocialAccount, Post, PostLog, InstagramAccount

class SocialAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialAccount
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class PostLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLog
        fields = '__all__'

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

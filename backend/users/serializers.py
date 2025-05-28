from  rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser, Profile, Skill, SkillPost, SkillPostLike, SkillPostComment
from users import models
import json

CustomUser = get_user_model()

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name']

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name']

class ProfileSerializer(serializers.ModelSerializer):
    skills = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    class Meta:
        model = Profile
        fields = '__all__'

class ProfileEditSerializer(serializers.ModelSerializer):
    skills = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Skill.objects.all()
    )
    class Meta:
        model = Profile
        fields = '__all__'

class UserWithProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    commonSkills = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'username', 'email', 'profile', 'commonSkills']
    def get_commonSkills(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            try: 
                current_profile = Profile.objects.get(user=request.user)
                target_profile = getattr(obj, 'profile', None)
                if current_profile and target_profile:
                    current_skills = set(current_profile.skills.values_list('name', flat=True))
                    target_skills = set(target_profile.skills.values_list('name', flat=True))
                    common_skills = current_skills.intersection(target_skills)
                    return list(common_skills)
            except Profile.DoesNotExist:
                return []
        return []

class ProfileWithUserSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    skills = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    class Meta:
        model = Profile
        fields = ['user', 'bio', 'skills', 'github', 'linkedin', 'location', 'photo']

class SkillPostSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)

    class Meta:
        model = SkillPost
        fields = ['id', 'first_name', 'user_id', 'user_email', 'content', 'image', 'created_at']
        read_only_fields = ['user_id','first_name', 'user_email', 'created_at']

class SkillPostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillPostLike 
        fields = ['id', 'user', 'post', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class SkillPostCommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = SkillPostComment
        fields = ['id', 'post', 'user_email', 'username', 'content', 'created_at']
        read_only_fields = ['user_email', 'username', 'created_at']
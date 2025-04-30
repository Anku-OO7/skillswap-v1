from  rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser, Profile, Skill
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

# from django.shortcuts import render

# Create your views here.
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import CustomUser, Profile, Skill
from .serializers import CustomUserSerializer, ProfileSerializer, ProfileEditSerializer, UserWithProfileSerializer, ProfileWithUserSerializer
import logging
from django.http import JsonResponse
from django.db.models import Q
import json
from rest_framework.generics import RetrieveAPIView, ListAPIView
from django.contrib.auth import get_user_model
from .models import SkillPost, SkillPostLike, SkillPostComment
from .serializers import SkillPostSerializer, SkillPostCommentSerializer

logger = logging.getLogger(__name__)
User = get_user_model()

#signup view
class SignupView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
    
        if not email or not password:
            return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        if CustomUser.objects.filter(email=email).exists():
            return Response({"error": "Email is already taken."}, status=status.HTTP_400_BAD_REQUEST)
        

        user = CustomUser.objects.create_user(email=email, password=password)
        Profile.objects.create(user=user) #Automatically create a profile
        return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)
    
# Login view 
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get('password')

        if not email or not password:
            return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    'refresh': str(refresh),
                    'access':str(refresh.access_token),
                }, status=status.HTTP_200_OK,
            )
        return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

#Profile Views (Authenticated Users only)    

class ProfileView(APIView):
    permission_classes = [IsAuthenticated] #only authenticated users can access

    def get(self, request): 
        profile, _ = Profile.objects.get_or_create(user=request.user)
        serializer = ProfileWithUserSerializer(profile)

        data = serializer.data
        data["first_name"] = request.user.first_name
        data["email"] = request.user.email

        return Response(data)
    def put(self, request):
        profile, _ = Profile.objects.get_or_create(user=request.user)
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditUserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        profile = Profile.objects.get(user=CustomUser.objects.get(id=request.user.id))
        serializer = ProfileSerializer(profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully", "data": serializer.data})
        return Response(serializer.errors, status=400)

class ProfileListCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = "pk"

class ProfileDetailView(RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
# Skill management views

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_skills(request):
    profile = Profile.objects.get(user=request.user)
    skills = profile.skills.values_list('name', flat=True)
    return Response({"skills": list(skills)})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_user_skill(request):
    profile = Profile.objects.get(user=request.user)
    skill_name = request.data.get('skill', '').strip().lower()

    if not skill_name:
        return Response({"error": "Skill is required"}, status=400)
    
    skill_obj, created = Skill.objects.get_or_create(name=skill_name)
    if skill_obj in profile.skills.all():
        return Response({"message": "skill already exists"}, status=200)
    
    profile.skills.add(skill_obj)
    return Response({"message": "Skill added successfully"})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_user_skill(request):
    profile = Profile.objects.get(user=request.user)
    skill_name = request.data.get('skill', '').strip().lower()

    if not skill_name:
        return Response({"error": "Skill is required"}, status=400)
    
    skill_obj = Skill.objects.filter(name=skill_name).first()
    if not skill_obj or skill_obj not in profile.skills.all():
        return Response({"message": "Skill not found"}, status=404)
    
    profile.skills.remove(skill_obj)
    return Response({"message": "Skill removed successfully"})

# Search & suggestions 

@api_view(["GET"])
@permission_classes([AllowAny])
def search_profiles(request):
    skill_query = request.GET.get('skill', '')

    if not skill_query:
        return JsonResponse({"error": 'No skill provided'}, status=400)
    skill_names = [skill.strip().lower() for skill in skill_query.lower().split(',') if skill.strip()]
    # search for the skill
    # skill_instance = Skill.objects.filter(name__icontains=skill_query)
    # if not skill_instance.exists():
    #     return JsonResponse({"message": "No profile found with this skill"}, status=404)
    # get profiles where skils exactly match
    matched_skills = Skill.objects.filter(name__in=skill_names)
    # get profiles where skill is contained in the skill field but not exact match
    # partial_match_profiles = Profile.objects.filter(skills__icontains=skill_query).exclude(id__in=matched_profiles)
    #combine both querysets (exactmatches first)
    # sorted_profiles = list(matched_profiles) + list(partial_match_profiles)

    if not matched_skills.exists():
        return JsonResponse({"message": "No profile found with this skill"}, status=404)
    profiles = Profile.objects.filter(skills__in=matched_skills).distinct()

    if not profiles.exists():
        return JsonResponse({'message': 'No profile found with this skill'}, status=404)
    # matched_profiles = Profile.objects.filter(skills__in=matched_skills).distinct()
    serializer = ProfileSerializer(profiles, many=True)
    return JsonResponse({"results": serializer.data}, status=200)

@api_view(["GET"])
@permission_classes([AllowAny])
def skill_suggestions(request):
    query = request.GET.get('q', '')  #get the search term from frontend
    if not query:
        return JsonResponse({'suggestions': []})  #return empty if no query
    # fetch all skills from profiles
    skills = Skill.objects.values_list('name', flat=True)

    # all_skills = []
    # for Skill_list in skills_data:
        # if isinstance(Skill_list, list):
            # all_skills.extend(Skill_list)

    #flatten the list of skills(since it's sorted as a listy in JSONField)
    # unique_skills = set(all_skills)

    # fiter skills that match the query (case-insensitive)
    matching_skills = [s for s in skills if query.lower() in s.lower()]
    return JsonResponse({'suggestions': matching_skills})

# Protected view (requires authentication)
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You are authenticated!"}, status=status.HTTP_200_OK)

# search users by skill
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user #get the logged-in user
    try:    
        profile = Profile.objects.get(user=user) # get the profiles
    except Profile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=400)

    data = request.data
    first_name = data.get("first_name")
    if first_name:
        user.first_name = first_name
        user.save()

    # user.last_name = data.get("last_name", user.last_name)
    profile.bio = data.get("bio", profile.bio) #update bio
    profile.github = data.get("github", profile.github) #update github
    profile.linkedin = data.get("linkedin", profile.linkedin) #update likedin
    profile.location = data.get("location", profile.location) #update location
    profile.photo = data.get("photo", profile.photo)
    
    if "skills" in data:
        skills_list = data["skills"]        #expecting a list of skills
        if isinstance(skills_list, list):       # ensure it's a list
            profile.skills.clear()            
            skills = [Skill.objects.get_or_create(name=skill_name.strip())[0] for skill_name in skills_list] # fetch or create skill
            profile.skills.add(*skills)  # add to profile
        else:
            return Response({"error": "skills must be a list"}, status=400)
    profile.save() #save changes

    return Response(ProfileSerializer(profile).data, status=200)

def get_skills_list(request):
    with open("skills.json", "r", encoding="utf-8") as file:
        skills = json.load(file)
    return JsonResponse({"skills": skills}, safe=False)

class UserListView(ListAPIView):
    serializer_class = UserWithProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.exclude(id=self.request.user.id)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        return {'request' :  self.request} 
    
@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def edit_profile(request):
    try: 
        profile = Profile.objects.get(user=request.user)
    except Profile.DoesNotExist:
        return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProfileEditSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Profile updated successfully", "profile": serializer.data}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
        })
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def matches_view(request):
    user = request.user

    try: 
        profile = Profile.objects.get(user=user)
    except Profile.DoesNotExist:
        return Response({"error": "profile not found"}, status=status.HTTP_404_NOT_FOUND)
    
    user_skills = set(profile.skills.values_list('name', flat=True))

    if not user_skills:
        return Response({
            "message": "You don't have any skills yet. Add some to get matches."
        }, status=200)
    
    matched_profiles = Profile.objects.filter(skills__name__in=user_skills).exclude(user=user).distinct()

    if not matched_profiles.exists():
        return Response({"message": "No matches found at the moment."}, status=200)

    matches = []
    for matched_profile in matched_profiles:
        matched_user_skills = set(matched_profile.skills.values_list('name', flat=True))
        common_skills = list(user_skills.intersection(matched_user_skills))

        matches.append({
            "id": matched_profile.user.id,
            "first_name": matched_profile.user.first_name or "",
            "email": matched_profile.user.email,
            "photo": matched_profile.photo,
            "bio": matched_profile.bio or "",
            "commonSkills": common_skills,
        })

    matches.sort(key=lambda x: len(x['commonSkills']), reverse=True)
    return Response({ "matches": matches }, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request, uid):
    try:
        profile = Profile.objects.get(user__id=uid)
        serializer = ProfileWithUserSerializer(profile)
        data = serializer.data

        data['first_name'] = profile.user.first_name
        data['email'] = profile.user.email

        return Response(data, status=status.HTTP_200_OK)
    except Profile.DoesNotExist:
        return Response({"error": "User profile not found."}, status=status.HTTP_404_NOT_FOUND)
    
class SkillPostListCreateView(generics.ListCreateAPIView):
    serializer_class = SkillPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SkillPost.objects.all().order_by('-created_at')

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
        return Response(serializer.data, status=201)
    
class SkillPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SkillPost.objects.all()
    serializer_class = SkillPostSerializer
    permission_classes = [permissions.IsAuthenticated]

class ToggleLikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, post_id):
        post = SkillPost.objects.get(pk=post_id)
        user = request.user

        like, created = SkillPostLike.objects.get_or_create(post=post, user=user)

        if not created:
            like.delete()
            return Response({'liked': False})
        else:
            return Response({'liked': True})
        
class SkillPostCommentListCreateView(generics.ListCreateAPIView):
    serializer_class = SkillPostCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return SkillPostComment.objects.filter(post_id=post_id)
    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        serializer.save(user=self.request.user, post_id=post_id)
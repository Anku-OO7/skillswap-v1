from django.urls import path
from users.views import CurrentUserView, SignupView, LoginView, ProtectedView, ProfileView, add_user_skill, edit_profile, get_user_profile, get_user_skills, matches_view, remove_user_skill, search_profiles, update_profile, get_skills_list, ProfileDetailView, ProfileListCreateView, UserListView, skill_suggestions
urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('protected/', ProtectedView.as_view(), name='protected'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/<int:uid>/', get_user_profile, name='get_user_profile'),
    # path("profile/<int:pk>/", ProfileDetailView.as_view(), name="profile-detail"),

    path('search_profiles/', search_profiles, name='search_profiles'),
    path("update_profile/", update_profile, name="update_profile"),
    path("skills/list/", get_skills_list, name="get-skills-list"),
    path('profiles/', ProfileListCreateView.as_view(), name='profile-list-create'),
    path('', UserListView.as_view(), name='user-list'),
    path('skill-suggestions/', skill_suggestions, name='skill-suggestions'),
    path("profile/update/", update_profile, name="update-profile"),
    path('skills/', get_user_skills),
    path('skills/add/', add_user_skill),
    path('skills/remove/', remove_user_skill),
    path('edit_profile/', edit_profile, name='edit-profile'),
    path('user/', CurrentUserView.as_view()),
    path('matches/', matches_view, name='matches'),
]
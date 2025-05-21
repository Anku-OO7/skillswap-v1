from django.contrib import admin
from .models import Profile, SkillPost
# Register your models here.

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'location')

@admin.register(SkillPost)
class SkillPostAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'content', 'created_at')
    search_fields = ('user__email', 'content')
    list_filter = ('created_at',)
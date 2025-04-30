from django.contrib.auth.models import AbstractBaseUser , BaseUserManager, PermissionsMixin, AbstractUser
from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from django.db import migrations, models
from django.db.models import JSONField 

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)
    
class CustomUser(AbstractUser):
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)               # models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True) # make all email unique
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email" #login using email instead of username
    REQUIRED_FIELDS = [] # Username is required in addition to email
    
    def __str__(self):
        return self.email 

class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    skills = models.ManyToManyField(Skill, blank=True)
    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    photo = models.URLField(blank=True, null=True) 

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user.id,
            "bio": self.bio,
            "skills": JSONField(default=list, blank=True),
            "github": self.github,
            "linkedin": self.linkedin,
            "location": self.location,
            "photo": self.photo,
        }

class Migration(migrations.Migration):
    dependencies = [
        ('users', '0015_alter_profile_location_alter_profile_skills_and_more'),
    ]
    operations =[
        migrations.AddField(
            model_name='profile',
            name='skills_temp',
            field=models.TextField(null=True, blank=True),
        ),
    ]
    # def __str__(self):
    #     return self.user.email

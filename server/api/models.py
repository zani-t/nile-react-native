from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    title = models.CharField(max_length=255)
    img = models.TextField()
    source = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    url = models.TextField()
from django.db import models
from django.contrib.auth.models import User

class Movies(models.Model):
    title = models.CharField(max_length=256)
    image = models.CharField(max_length=256)
    year = models.CharField(max_length=256)
    user = models.ForeignKey(User, unique=False, on_delete=models.CASCADE)



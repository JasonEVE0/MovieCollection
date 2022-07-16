from rest_framework import serializers
from .models import Movies

class MoviesSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Movies
        fields = ['title', 'image', 'year', 'user']

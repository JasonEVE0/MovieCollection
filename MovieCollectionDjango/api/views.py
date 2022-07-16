import requests
from django.conf import settings
from django.db import IntegrityError
from django.contrib.auth.models import User
from django.utils.datastructures import MultiValueDictKeyError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .serializers import MoviesSerializer
from .models import Movies


class Register(APIView):
    def post(self, request):
        try:
            email = request.data['username']
        except MultiValueDictKeyError:
            return Response({"detail": "Invalid username."}, status=400)
        try:
            password = request.data['password']
        except MultiValueDictKeyError:
            return Response({"detail": "Invalid password."}, status=400)

        try:
            user = User.objects.create_user(username=email, email=email, password=password)
            token = Token.objects.create(user=user)
        except (IntegrityError, ValueError):
            return Response({"detail": "That username already exists."}, status=400)

        return Response({"token": token.key}, status=200)


class Authenticate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        token = Token.objects.get(user=request.user)
        return Response({"token": token.key}, status=200)

class Top250(APIView):
    def get(self, request):
        response = requests.get(f"https://imdb-api.com/en/API/Top250Movies/{settings.API_KEY}")
        top_250_movies_json = response.json()
        return Response(top_250_movies_json)


class Search(APIView):
    def post(self, request):
        term = request.data['term']
        response = requests.get(f"https://imdb-api.com/en/API/Search/{settings.API_KEY}/{term}")
        search_movies_json = response.json()
        return Response(search_movies_json)


class AddMovie(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = MoviesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data)
        return Response(serializer.errors)

    def get(self, request):
        movies = Movies.objects.filter(user=request.user)
        serializer = MoviesSerializer(movies, many=True)
        return Response(serializer.data)


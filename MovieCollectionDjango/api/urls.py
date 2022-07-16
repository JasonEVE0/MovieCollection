from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path('register/', views.Register.as_view()),
    path('login/', obtain_auth_token),
    path('authenticate/', views.Authenticate.as_view()),
    path("top250/", views.Top250.as_view()),
    path("addmovie/", views.AddMovie.as_view()),
    path("searchmovie/", views.Search.as_view()),
]
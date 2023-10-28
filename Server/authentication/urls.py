
from django.urls import path
# from rest_framework_simplejwt import views as jwt_views
from .views import *

urlpatterns = [
    #  path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh')
    path('login/', MyTokenObtainPairView.as_view(), name='user_login'),
    path("register/", UserRegisterationAPIView.as_view(), name="create-user"),
    
]

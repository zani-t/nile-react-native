from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='register_user'),
    
    path('articles/', views.ArticleView.as_view(), name='articles'),
    path('articles/<uuid:id>', views.ArticleView.as_view(), name='articles'),

    path('query/', views.query, name='query'),
]
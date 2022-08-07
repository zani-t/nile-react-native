from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

import newspaper
import ast

from . import serializers
from . import models

# Token view
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.MyTokenObtainPairSerializer

# User registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = ([AllowAny])
    serializer_class = serializers.RegisterSerializer

# Article retrieval
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getArticles(request):
    user = request.user
    articles = user.article_set.all()
    serializer = serializers.ArticleSerializer(articles, many=True)
    return Response(serializer.data)

# Article views
@permission_classes([IsAuthenticated])
class ArticleView(APIView):

    def get(self, request, id=None):
        user = request.user
        articles = user.article_set.all()
        serializer = serializers.ArticleSerializer(articles, many=True)
        return Response(serializer.data)
    
    def post(self, request, id=None):
        serializer = serializers.ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print('error')

# Article entry creation
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def test(request):
    serializer = serializers.ArticleSerializer(request.data)
    return Response(serializer.data)

# Article entry revision


# Newspaper query
@csrf_exempt
@api_view(['POST'])
def query(request):
    url = ast.literal_eval(request.body.decode("utf-8")).get('url', 'NULL_URL')

    if url == 'NULL_URL':
        return Response({'ARTICLE_NOT_FOUND', url})

    new_article = newspaper.Article(url)
    new_article.download()
    new_article.parse()

    article_info = {}
    article_info['title'] = new_article.title if new_article.title else 'NULL_TITLE'
    article_info['image'] = new_article.top_image if new_article.top_image else 'NULL_IMG'
    article_info['source'] = \
        newspaper.Source(new_article.source_url).brand.upper() \
        if newspaper.Source(new_article.source_url).brand \
            else 'NULL_BRAND'
    article_info['url'] = url

    return Response(article_info)

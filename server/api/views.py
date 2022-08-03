from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import ArticleSerializer
# from .models import Article

from newspaper import Article
from newspaper import Source
import ast

@api_view(['GET'])
def test(request):
    return Response({'test': 'hello'})

# Token views
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Custom claims
        token['email'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Article Retrieval
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getArticles(request):
    user = request.user
    articles = user.article_set.all()
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)

# Article Creation

# Article Update

# Newspaper query
@csrf_exempt
@api_view(['POST'])
def query(request):
    url = ast.literal_eval(request.body.decode("utf-8")).get('url', 'NULL_URL')

    if url == 'NULL_URL':
        return Response({'ARTICLE_NOT_FOUND', url})

    new_article = Article(url)
    new_article.download()
    new_article.parse()

    article_info = {}
    article_info['title'] = new_article.title if new_article.title else 'NULL_TITLE'
    article_info['image'] = new_article.top_image if new_article.top_image else 'NULL_IMG'
    article_info['source'] = \
        Source(new_article.source_url).brand.upper() \
        if Source(new_article.source_url).brand \
            else 'NULL_BRAND'
    article_info['url'] = url

    return Response(article_info)

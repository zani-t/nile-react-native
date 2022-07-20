from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from newspaper import Article
from newspaper import Source
import ast

# Create your views here.
@csrf_exempt
def query(request):
    if request.method == 'POST':
        url = ast.literal_eval(request.body.decode("utf-8")).get('url', 'NULL_URL')

        new_article = Article(url)
        new_article.download()
        new_article.parse()

        article_info = {}
        article_info['title'] = new_article.title
        article_info['image'] = new_article.top_image
        article_info['source'] = Source(new_article.source_url).brand.upper()
        article_info['url'] = url

        return JsonResponse(article_info)
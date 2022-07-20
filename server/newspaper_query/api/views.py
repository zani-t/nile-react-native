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

        if url == 'NULL_URL':
            return JsonResponse({'ARTICLE_NOT_FOUND', url})

        new_article = Article(url)
        new_article.download()
        new_article.parse()

        article_info = {}
        article_info['title'] = new_article.title if new_article.title else 'NULL_TITLE'
        article_info['image'] = new_article.top_image if new_article.top_image else 'NULL_IMG'
        article_info['source'] = Source(new_article.source_url).brand.upper() if Source(new_article.source_url).brand else 'NULL_BRAND'
        article_info['url'] = url

        return JsonResponse(article_info)
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.utils.dateparse import parse_date
from .models import User
import json

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'success': True, 'message': 'CSRF cookie set'})

from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def login_view(request):
    if request.method == "OPTIONS":
        response = JsonResponse({'detail': 'OK'})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, X-CSRFToken"
        return response

    try:
        data = json.loads(request.body)
        acc_username = data.get('acc_username')
        acc_password = data.get('acc_password')  # Expected: birthdate in 'YYYY-MM-DD'

        if not acc_username or not acc_password:
            return JsonResponse({'success': False, 'message': 'Missing credentials'}, status=400)

        birthdate = parse_date(acc_password)
        if not birthdate:
            return JsonResponse({'success': False, 'message': 'Invalid birthdate format'}, status=400)

        try:
            user = User.objects.get(acc_username=acc_username, acc_password=birthdate)
            return JsonResponse({
                'success': True,
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'name': f"{user.f_name} {user.l_name}",
                    'year_graduated': user.year_graduated,
                    # add more fields if needed
                }
            })
        except User.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Invalid CTU ID or birthdate'}, status=401)

    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid JSON'}, status=400)

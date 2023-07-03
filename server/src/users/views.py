from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import *
from .serializer import *


# @permission_classes([permissions.IsAdminUser])
# @api_view(['POST'])
# def create_project(request):
#     serializer = CreateProjectSerializer(request.data)
#
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




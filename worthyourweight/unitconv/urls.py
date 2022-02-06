from django.urls import path

from . import views

urlpatterns = [
    # path('<String:url>', views.convert, name="convert"),
    # /fib/fibAPI?N=[some non-negative number] -> var URL = `http://localhost:8000/fib/fibAPI?n=${n}`;
    #'http://localhost:8000/unitconv/convert?from=${fromUnit}&to=t_oz&value=${weight}'
    # path('fibAPI', views.fibAPI, name="fibAPI"),

    path('convert', views.convert, name="convert"),
    path('',views.main, name="main")
]
# urlpatterns = [
#     path('', views.blogHome, name='blogHome'),
#     path('home/', views.blogHome, name='home'),
#     path('archive/', views.blogArchive, name='archive'),
#     path('home/<int:id>/', views.blogEntry, name='entry'),
#     path('<int:id>/comment/', views.comment, name="comment")
# ]
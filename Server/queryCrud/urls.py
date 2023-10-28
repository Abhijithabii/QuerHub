
from django.urls import path
from .views import *


urlpatterns = [
  path('create/', QuestionCreateView.as_view(), name='create_question' ),
  path('questionSingleView/<int:question_id>/', QuestionAnswersAndLikes.as_view(), name='single_question_view'),
  path('create-answer/', CreateAnswer.as_view(), name='create-answer'),
  path('like-answer/<int:answer_id>/', LikeAnswer.as_view(), name='like-answer'),
    
]

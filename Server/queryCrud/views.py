from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status
from .serializers import *

# Create your views here.


class QuestionCreateView(APIView):
    def get(self, request):
        questions = Question.objects.all()
        serializer = QUestionViewSerializer(questions, many=True)
        return Response(serializer.data)


    def post(self, request):
        serializer = QuestionCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
class QuestionAnswersAndLikes(APIView):
    def get(self, request, question_id):
        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            return Response({"message": "Question not found"}, status=404)
        
        answers = Answer.objects.filter(question=question)
        
      
        answers_with_likes = []
        answers_with_likes.append({'post':question.text})
        answers_with_likes.append({'post_id':question.id})
        
        
        for answer in answers:
            likes = Likes.objects.filter(answer=answer)
            answer_data = AnswerSerializer(answer).data
            likes_data = likes.count()
            answer_data['likes'] = likes_data
            answers_with_likes.append(answer_data)
       
        return Response(answers_with_likes)
    


class CreateAnswer(APIView):
    def post(self, request, format=None):
        serializer = AnswerCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class LikeAnswer(APIView):
    def post(self, request, answer_id):
        user_id = request.data.get('user_id')

        try:
            answer = Answer.objects.get(id=answer_id)
        except Answer.DoesNotExist:
            return Response({"message": "Answer not found"}, status=status.HTTP_404_NOT_FOUND)

        like, created = Likes.objects.get_or_create(user_id=user_id, answer=answer)

        if created:
            return Response({"message": "Liked successfully"}, status=status.HTTP_201_CREATED)
        else:
            like.delete()
            return Response({"message": "Unliked"}, status=status.HTTP_200_OK)

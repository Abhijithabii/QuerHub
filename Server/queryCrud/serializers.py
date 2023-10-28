from rest_framework import serializers
from .models import *
from authentication.models import *

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CustomUser
        fields = ['id', 'username', 'email']


class QUestionViewSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    class Meta:
        model = Question
        fields = ['id', 'user', 'text']


class QuestionCreateSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(),source='user', write_only=True,)
    class Meta:
        model = Question
        fields = ['id', 'user_id', 'text' ]

    def create(self, validated_data):
        user = validated_data.pop('user')
        question = Question.objects.create(user=user, **validated_data)
        return question


class AnswerSerializer(serializers.ModelSerializer):
    question = QUestionViewSerializer()
    class Meta:
        model = Answer
        fields = ['id', 'user', 'question', 'text' ]


class AnswerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__' 
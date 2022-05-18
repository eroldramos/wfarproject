from rest_framework import serializers
from core.models import WFAR

class GetAllWFAR(serializers.ModelSerializer):
    class Meta:
        model = WFAR
        fields = '__all__'
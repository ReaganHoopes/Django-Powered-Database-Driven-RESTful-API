from django.db import models

# Create your models here.

class Convert(models.Model):
    fromUnit = models.CharField(max_length=200)
    toUnit = models.CharField(max_length=200)
    value = models.FloatField()



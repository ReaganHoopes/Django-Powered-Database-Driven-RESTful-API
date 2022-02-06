from urllib.request import urlopen
from django.http import JsonResponse
from django.shortcuts import render
import json
from django.shortcuts import get_object_or_404, render
# Create your views here.
from .models import Convert
import math


def convert(request):
    # print out all of the headers
    for h in request.headers:
        print(f"  {h} => {request.headers[h]}")
    resp = {}
    if not 'from' in request.GET:
        resp['error'] = "GET parameter 'from' is required"
    elif not 'to' in request.GET:
       resp['error'] = "GET parameter 'to' is required"
    elif not 'value' in request.GET:
        resp['error'] = "GET parameter 'value' is required"
    else:
        fromUnit = request.GET['from']
        try:
            weight = float(request.GET['value'])
        except:
            weight = "NAN"
        toUnit = request.GET['to']
        units = ['t_oz', 'T', 'g', 'kg', 'lb', 'oz']

        if not fromUnit:
            resp['error'] = "GET parameter 'from' must be non-blank"
        elif not weight:
            resp['error'] = "GET parameter 'value' must be non-blank"
        elif not toUnit:
            resp['error'] = "GET parameter 'to' must be non-blank"
        elif fromUnit not in units:
            resp['error'] = "GET parameter 'from' is invalid"
        elif toUnit not in units:
            resp['error'] = "GET parameter 'to' is invalid"
        elif weight == "NAN":
            resp['error'] = "GET parameter 'value' is invalid"
        else:
            weight = float(weight)
            if weight < 0:
                resp['error'] = "GET parameter 'value' must be a non-negative integer"
            else:
                try:
                    troyOz = Convert.objects.get(fromUnit=fromUnit, toUnit="t_oz").value
                    desiredUnitConversion = Convert.objects.get(fromUnit = toUnit, toUnit = "t_oz").value
                    desiredUnitAmount = troyOz / desiredUnitConversion
                    resp['unit'] = toUnit
                    resp['value'] = desiredUnitAmount * weight
                except:
                    resp['error'] = "Invalid Unit Conversion Request"

    j = JsonResponse(resp)
    j['Access-Control-Allow-Origin'] = '*'
    return j

def main(request):
    return render(request, 'unitconv/main.html')

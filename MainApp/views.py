from django.shortcuts import render

# Create your views here.
import requests

import json
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import newspaper
import nltk
from autocorrect import spell

from nltk import word_tokenize
import enchant
import re

def home(request):
    if request.method=="GET":
        # API_KEY= "cc963fc87bc13bdcfbbb90665803c6b4"
        

        h={"text":"heyyyyyyyyyyyyyy"}

        geodata = json.dumps(h)
        return HttpResponse( geodata)
@csrf_exempt            
def getInput(request):
    newdata={}
    if request.method=="POST":
        # API_KEY= "cc963fc87bc13bdcfbbb90665803c6b4"
        # data=request.POST.get('data','')
        data=request.POST.get('data')
        print(request,"requests")
        # nltk.download('punkt')
        d = enchant.Dict("en_US")
        non_dict_words = list(set([word.encode('ascii', 'ignore') for word in word_tokenize(data) if d.check(word) is False and re.match('^[a-zA-Z ]*$',word)] ))
        spelling=list(([x.decode("utf-8") for x in non_dict_words]) )
        corrected=list(([spell(x) for x in spelling]) )
        new_list=""
        for word in data.split():
                new_list+=spell(word)+" "
                        
                
                                
                                

                
        print(new_list,"newwww")

        print(corrected,"corrected")
        jsonObj={"spelling":spelling,"corrected":corrected,"list":new_list}
        return JsonResponse(jsonObj, safe=False)
        
    return HttpResponse(None)
        # h={"text":"heyyyyyyyyyyyyyy"}
    
        # geodata = json.dumps(h)
     
    
 
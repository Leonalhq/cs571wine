# -*- coding: utf-8 -*-
"""
Created on Mon Apr 12 20:41:14 2021

@author: Yu Wang
"""

import pandas as pd
top_n_word = 45

variety = set()

df = pd.read_csv("winemag-data_first150k.csv")

        
all_variety_list = ['Pinot Noir', 'Chardonnay', 'Cabernet Sauvignon', 
                    'Red Blend', 'Bordeaux-style Red Blend', 'Riesling', 
                    'Sauvignon Blanc', 'Syrah', 'Merlot', 'Zinfandel', 
                    'Rosé', 'Malbec', 'Sangiovese', 'White Blend', 
                    'Nebbiolo', 'Portuguese Red', 'Tempranillo', 'Sparkling Blend', 
                    'Corvina, Rondinella, Molinara', 'Rhône-style Red Blend']
    
## filter all the word not want
filter_word = {'and', 'the', 'of', 'a', 'with', 'flavors', 'is', 
               'in', 'this', 'wine', 'to','but','This', 'from', 
               'on', 'for', 'that', 'into', 'has', 'good', 'shows', 'its', 
               'at', 'well', 'mouth', 'offers', 'like', 'an', 'now', 'are', 'as',
               'nose', 'it', 'by', 'some', 'theres', 'more', 'up', 'very', 'not', 'or', 
               'notes', 'finish', 'fine', 'drink', 'years', 'nice', 'be', 'just', 'structure', 
               'while', 'price', 'bit', 'little', 'you', 'out', 'me', 'us', 'texture', 'through', 
               'over', 'all',  'will', 'style', 'touch', 'opens', 'made', 'sample', 'there', 'structured', 
               'age', 'style', 'all', 'long', 'color', 'expression', 'alongside', 'delivers', 'than', 'here'} 


fruit_purple = {"citrus", "grapefruit", "lemon", "berry", "blackberry", 
          "raspberry", "strawberry",  "currant", "fruit", "cherry", 
          "apricot", "peach", "apple" ,"tropical", "pineapple", "melon", 
          "banana", "strawberry", "jam", "raisin", "prune"}  

spice_orange = {"spice", "aromas", "spicy", "licorice", "anise", "black", "pepper cloves" } 

floral_pink = {"aromas",  "floral", "geranium",  "violet",  "rose",  "orange",  "blossom" } 

microbiological_red = { "microbiological","scents" ,"yeasty", "leesy" , "lactic",  "yogurt",  "sweaty",  "sauerkraut" , "mousy" , "horsey" }

sherry_yellow = {"sherry","oxidized"}

pungent_green1 = { "cool",	"menthol", "hot",	"alcohol"} 

chemical = {"chemical", "pungent", "sulfur",  "dioxide", "ethanol",  "acetic",  "acid",  "ethyl", 
            "acetate",  "burnt",  "cabbage", "skunk",  "garlic",  "gas", "mercaptain", "hydrogen", 
            "sulfide", "rubbery", "petroleum", "diesel", "kerosene", "plastic", "tar"} 

earthy = {"moldy", "earthy", "mushroom", "dusty"} 

wood = {"wood","woody", "burned", "smoky", "burnt", "toast", "coffee", "phenolic", 
        "medicinal", "phenolic", "bacon", "resinous", "oak",  "cedar",  "vanilla" }

cameral = {"cameral","caramel", "honey", "butterscotch", "diacetyl" ,"butter", "soy", "sauce", "chocolate", "molasses" }

nut = {	"nut","nutty", "walnut", "hazelnut", "almond" }

veggie = {"veggie","vegetable","fresh", "cut", "green",  "grass" ,"bell", "pepper", "eucalyptus", 
          "mint", "canned", "cooked",  "green", "beans", 
          "asparagus", "olive", "black", "olive", "artichoke", "dried", "hay", "straw", "tea", "tobacco"}



all_variety_list_description = {}
for wine_name in all_variety_list: 
    variety_review = {}
    for index, row in df.iterrows(): 
        if row['variety'] == wine_name: 
            sentence = row['description'].lower().replace(',', '').replace('.', '').replace('?', '').replace('%', '').replace(':', '').replace('\'', '').split(' ')
            for word in sentence: 
                if word not in filter_word: 
                    if word in variety_review: 
                        variety_review[word]['count'] += 1
                    else: 
                        color = "#21130d"
                        
                        if word in fruit_purple: 
                            color = "#590AB5"
                        if word in spice_orange: 
                            color = "#FF4E02"
                        if word in floral_pink: 
                            color = "#E192FB"
                        if word in microbiological_red: 
                            color = "#FF1802"
                        if word in sherry_yellow: 
                            color = "#FEEA00"
                        if word in pungent_green1: 
                            color = "#03D04D"
                        if word in earthy: 
                            color = "#48F007"
                        if word in wood: 
                            color = "#B5016E"
                        if word in cameral: 
                            color = "#FFFF00"
                        if word in nut: 
                            color = "#FF4300"
                        if word in veggie: 
                            color = "#08E10A"
                        variety_review[word] = {'count': 1, 'color': color}  
            sorted_variety_review = dict(sorted(variety_review.items(), key=lambda item: item[1]["count"])) 
            list_sorted_variety_review = list(sorted_variety_review.keys())
            list_sorted_variety_review.reverse()
            list_sorted_variety_review = list_sorted_variety_review[:top_n_word]
            top_n_word_dic = {} 
            
            for every_word in list_sorted_variety_review: 
                top_n_word_dic[every_word] = {'count':sorted_variety_review[every_word]['count'] ,
                                              'color':sorted_variety_review[every_word]['color'] } 
            #print(top_n_word_dic)
                
    all_variety_list_description[wine_name] = top_n_word_dic 
    #print(all_variety_list_description)
                      
#print(all_variety_list_description)
#print(variety_review[0]['count'])

#sorted_variety_review.reverse()


import json
with open('1.json', 'w') as json_file:
  json.dump(all_variety_list_description, json_file)

# -*- coding: utf-8 -*-
"""
Created on Mon Apr 12 20:41:14 2021

@author: Yu Wang
"""

import pandas as pd
top_n_word = 45

variety = set()

df = pd.read_csv("winemag-data_first150k.csv")
country_selected = 'US' 


        
all_variety_list = ['Pinot Noir', 'Chardonnay', 'Cabernet Sauvignon', 
                    'Red Blend', 'Bordeaux-style Red Blend', 'Riesling', 
                    'Sauvignon Blanc', 'Syrah', 'Merlot', 'Zinfandel', 
                    'Rosé', 'Malbec', 'Sangiovese', 'White Blend', 
                    'Nebbiolo', 'Portuguese Red', 'Tempranillo', 'Sparkling Blend', 
                    'Corvina', 'Pinot Gris', 'Gewürztraminer', 'Rhône-style Red Blend']
US_variety_list = ['Pinot Noir', 'Cabernet Sauvignon', 'Chardonnay', 'Syrah',
                   'Red Blend', 'Zinfandel', 'Merlot', 'Sauvignon Blanc',
                   'Bordeaux-style Red Blend', 'Riesling', 'Cabernet Franc',
                   'Rosé', 'Pinot Gris', 'Viognier', 'Petite Sirah', 'Rhône-style Red Blend',
                   'Sparkling Blend', 'White Blend', 'Malbec', 'Grenache', 'Sangiovese', 'Gewürztraminer']
Spain_variety_list = ['Tempranillo', 'Red Blend', 'Tempranillo Blend', 'Sparkling Blend',
                      'Albariño', 'Garnacha', 'White Blend', 'Verdejo', 'Mencía',
                      'Tinta de Toro', 'Rosé', 'Monastrell', 'Viura', 'Tinto Fino', 'Sherry',
                      'Godello', 'Chardonnay', 'Rosado', 'Cabernet Sauvignon',
                      'Tempranillo-Cabernet Sauvignon', 'Garnacha Blanca', 'Moscatel']
Portugal_variety_list = ['Portuguese Red', 'Portuguese White', 'Port', 'Rosé', 'Touriga Nacional',
                         'Alvarinho', 'Arinto', 'Portuguese Sparkling', 'Syrah', 'Alicante Bouschet',
                         'Encruzado', 'Fernão Pires', 'Castelão', 'Verdelho', 'Loureiro', 'Baga',
                         'Touriga Nacional-Cabernet Sauvignon', 'Trincadeira', 'Sauvignon Blanc',
                         'Pinot Noir', 'Chardonnay', 'Touriga Nacional Blend']
Italy_variety_list = ['Red Blend', 'Nebbiolo', 'Sangiovese', 'White Blend', 'Sangiovese Grosso',
                      'Glera', 'Corvina, Rondinella, Molinara', 'Pinot Grigio', 'Barbera',
                      'Pinot Bianco', 'Sparkling Blend', 'Aglianico', 'Chardonnay', 'Sauvignon',
                      'Garganega', 'Prosecco', 'Montepulciano', 'Moscato', 'Pinot Nero',
                      'Verdicchio', 'Vermentino', 'Turbiana', ]
France_variety_list = ['Bordeaux-style Red Blend', 'Chardonnay', 'Pinot Noir', 'Rosé',
                       'Champagne Blend', 'Bordeaux-style White Blend', 'Gamay',
                       'Sauvignon Blanc', 'Rhône-style Red Blend', 'Riesling', 'Gewürztraminer',
                       'Pinot Gris', 'Malbec', 'Sparkling Blend', 'Red Blend', 'Melon',
                       'Chenin Blanc', 'White Blend', 'Rhône-style White Blend',
                       'Pinot Blanc', 'Cabernet Franc', 'Syrah']
Australia_variety_list = ['Shiraz', 'Chardonnay', 'Cabernet Sauvignon', 'Riesling',
                          'Pinot Noir', 'Grenache', 'Red Blend', 'Sauvignon Blanc',
                          'Shiraz-Viognier', 'Sparkling Blend', 'Viognier',
                          'Shiraz-Cabernet Sauvignon', 'Rosé', 'Bordeaux-style Red Blend',
                          'Pinot Grigio', 'G-S-M', 'Sauvignon Blanc-Semillon', 'Sémillon',
                          'Merlot', 'White Blend', 'Syrah', 'Shiraz-Grenache']


## filter all the word not want
filter_word = {'and', 'the', 'of', 'a', 'with', 'flavors', 'is', 'no', "on",
               'in', 'this', 'wine', 'to','but','This', 'from', 'too', 'if', 'then',
               'on', 'for', 'that', 'into', 'has', 'good', 'shows', 'its', 'have',
               'at', 'well', 'mouth', 'offers', 'like', 'an', 'now', 'are', 'as', 'too',
               'nose', 'it', 'by', 'some', 'theres', 'more', 'up', 'very', 'not', 'or', 
               'notes', 'finish', 'fine', 'drink', 'years', 'nice', 'be', 'just', 'structure', 
               'while', 'price', 'bit', 'little', 'you', 'out', 'me', 'us', 'texture', 'through', 
               'over', 'all',  'will', 'style', 'touch', 'opens', 'made', 'sample', 'there', 'structured', 
               'age', 'style', 'all', 'long', 'color', 'expression', 'alongside', 'delivers', 'than', 'here', 
               'so', 'which', 'new', 'should', 'yet', 'pretty', 'wines', 'cru', 'after', 'big', 'needs', 
               'give', 'ready', 'character', 'would', 'loads', 'which', 'aromas', 'also', 'feels', 'note', 'after', 
               'still', 'feel', 'mouthfeel', 'palate', 'ripe', 'close', 'slightly', 'hints', 'best', 'one', '100', 
               'weight', 'pair', 'heres', 'flavor', 'along', 'much', 'hard', 'used', 'extra', 'provide', 'main', 
               'informal', 'times', 'cab', 'great', 'thats', 'hint', 'almost', 'time', 'almost', '(one',
               'only', 'mostly', 'only', 'could', 'about', 'doesnt', 'year', 'somewhat', 'gives', 'until', 
               'both', 'own', 'really', 'de', 'what', 'can', 'go', '9', 'does'}


fruit_purple = {"sauvignon","cabernet", "citrus", "grapefruit", "lemon", "berry", "blackberry",
          "raspberry", "strawberry",  "currant", "fruit", "cherry", 'viognier', 'grenache', 'chardonnay',
          "apricot", "peach", "apple" ,"tropical", "pineapple", "melon", 'tempranillo', 'malbec',
          "banana", "strawberry", "jam", "raisin", "prune", 'cherries', 'fruits', 'pinot', 'pinots',
          'pear', 'lime', 'plum', 'currants', 'raspberries' ,'tangerine', 'fruity', 'grape', 'pineapples',
          'cranberry', 'blackberries', 'napa', 'gooseberry', 'blueberry', 'grapes', 'syrah', 'pears',
            'sangiovese', 'sangioveses', 'mourvèdre', 'grenache', 'counoise', 'cinsault','watermelon',
            'peaches', 'apples', 'limes', 'strawberries', 'lemons', 'fig', 'zinfandel','roussanne',
                'traminer', 'gewurztraminer', 'corvina', "nectarine", "viura", "citrusy", "macabeo",
                "verdejo", "monastrell", "godello", "moscatel", "gewurz"}

spice_orange = {"spice", "aromas", "spicy", "licorice", "anise", "black", "pepper cloves", "stalky",
                'spices', 'cassis', 'peppery', 'cinnamon', 'black-fruit', 'candied', 'stemmy',
                "aromatic"}

floral_pink = {"aromas",  "floral", "geranium",  "violet",  "rose" 'rosé',  "orange",
               "blossom", 'clove', 'honeysuckle', 'bouquet'}

microbiological_red = { "microbiological","scents", 'yeast',"yeasty", "leesy" , "lactic",  "yogurt",  "sweaty",  "sauerkraut" , "mousy" , "horsey" }

sherry_yellow = {"sherry","oxidized"}

pungent_green1 = { "cool",	"menthol", "hot",	"alcohol"} 

chemical = {"chemical", "pungent", "sulfur",  "dioxide", "ethanol",  "acetic", "acids", "acid", "acidity" , "ethyl",
            "acetate",  "burnt",  "cabbage", "skunk",  "garlic",  "gas", "mercaptain", "hydrogen", "sugary",
            "sulfide", "rubbery", "petroleum", "diesel", "kerosene", "plastic", "tar"}

earthy = {"moldy", "earthy", "mushroom", "dusty", 'earth', 'minerality', 'mineral', "minerally"}

wood = {"wood","woody", "burned", "smoky", "burnt", "toast", "coffee", "phenolic", 'espresso',"resiny",
        "medicinal", "phenolic", "bacon", "resinous", "oak", 'oaky', "cedar",  "vanilla", 'cocoa',
        "rubber"}

cameral = {"cameral","caramel", "honey", "butterscotch", "diacetyl" ,"butter", "marmalade",
           "soy", "sauce", "chocolate", "molasses", 'sugar', "buttery"}

nut = {	"nut","nutty", "walnut", "hazelnut", "almond" }

veggie = {"veggie","vegetable","fresh", "cut", "green",  "grass" ,"bell", "pepper", "eucalyptus", 
          "mint", "canned", "cooked",  "green", "beans", "sandalwood", "tomato",
          "asparagus", "olive", "black", "olive", "artichoke", "dried", "hay", "straw", "tea", "tobacco", 'herbal', 
          'grassy', 'herb', 'chard', 'herbs', 'lemongrass', 'riesling', "papaya"}



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
                        if word in chemical: 
                            color = "#20a3fe"
                            
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

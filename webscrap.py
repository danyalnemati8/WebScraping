from bs4 import BeautifulSoup
import requests
import re

url = "https://www.newegg.com/p/pl?N=100007709%204131&d=3080&isdeptsrh=1"

result = requests.get(url).text
doc = BeautifulSoup(result, "html.parser")

prices = doc.find_all(["li", "strong"], class_="price-current")

for price in prices:
    print(price)
    print("\n")
    

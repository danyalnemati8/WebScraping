from bs4 import BeautifulSoup
import requests
import re

url = "https://www.newegg.com/p/pl?N=100007709%204131%20601357247&d=3080&page=1&isdeptsrh=1"

result = requests.get(url).text
doc = BeautifulSoup(result, "html.parser")

prices = doc.find_all(["li", "strong"], class_="price-current")
n = 0
for price in prices:
    print(price.find("strong"))
    print(price.find("sup"))
    print("result number = ", end="")
    print(n)
    n = n + 1
    print("\n")
    

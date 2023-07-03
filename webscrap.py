from bs4 import BeautifulSoup
import requests
import re

count = 1
n = 1

while count <= 3:
    url = f"https://www.newegg.com/p/pl?N=100007709%204131%20601357247%204814&d=3080&PageSize=36&isdeptsrh=1&page={count}"
    
    print("count =", count)
    print(url)

    result = requests.get(url).text
    doc = BeautifulSoup(result, "html.parser")

    prices = doc.find_all("li", class_="price-current")
    count += 1
    
    for price in prices:
        strong = price.find("strong")
        sup = price.find("sup")
        
        if strong and sup:
            print("$" + strong.text, end="")
            print(sup.text)
        else:
            print("Price information not found")

        print("result number =", n)
        n += 1
        print("\n")

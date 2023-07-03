from bs4 import BeautifulSoup
import requests
import re
count = 1
n = 1
while count < 4:
    url = f"https://www.newegg.com/p/pl?N=100007709%204131%20601357247%204814&d=3080&PageSize=36&isdeptsrh=1&page={count}"
    
    
    print("count = ", end="")
    print(count)
    print(url)

    result = requests.get(url).text
    doc = BeautifulSoup(result, "html.parser")

    prices = doc.find_all(["li", "strong"], class_="price-current")
    count = count + 1
    
    for price in prices:
        print(price.find("strong"))
        print(price.find("sup"))
        print("result number = ", end="")
        print(n)
        n = n + 1
        print("\n")
    

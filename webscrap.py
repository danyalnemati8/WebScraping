from bs4 import BeautifulSoup
import requests
import re

count = 1
n = 1

prices_list = []  # Empty list to store prices
result_numbers_list = []  # Empty list to store result numbers

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
            price_value = strong.text + sup.text
            prices_list.append(price_value)
            result_numbers_list.append(n)
            print("$" + price_value)
        else:
            print("Price information not found")

        n += 1
        print("result number =", n)
        print("\n")

# Print the final lists
print("Prices:", prices_list)
print("Result Numbers:", result_numbers_list)

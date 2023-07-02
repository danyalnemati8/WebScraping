from bs4 import BeautifulSoup
import requests
import re

url = "https://www.newegg.com/Newegg-Deals/EventSaleStore/ID-9447?N=100006662"

result = requests.get(url)
doc = BeautifulSoup(result.text, "html.parser")

prices = doc.find_all(text=re.compile("\$.*"))

print(prices)


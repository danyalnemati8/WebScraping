from bs4 import BeautifulSoup
import requests
import re
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import datetime

# Define the scope and credentials
scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
credentials = ServiceAccountCredentials.from_json_keyfile_name('scraper-project-391720-5521d58f18ef.json', scope)

# Authorize the credentials
client = gspread.authorize(credentials)

# Open the Google Sheet
sheet_url = 'https://docs.google.com/spreadsheets/d/1Bzedq9WqMuvgaV9VdpGXVJ4kXEjC5iVpslgnMFNYMkk/edit#gid=0'
sheet = client.open_by_url(sheet_url).sheet1

# Get the existing data from the Google Sheet
existing_data = sheet.get_all_values()

last_date = datetime.datetime.strptime(existing_data[-1][1], '%m/%d/%Y').date()
current_date = datetime.date.today()

if last_date == current_date:
    exit(1)

# Determine the starting row for appending new data
starting_row = len(existing_data) + 1

n = 1

prices_list = []  # Empty list to store prices
result_numbers_list = []  # Empty list to store result numbers
links_list = []

url = "https://www.newegg.com/p/pl?N=4814%20601361654%20100007709&d=3060&Order=3"

result = requests.get(url).text
doc = BeautifulSoup(result, "html.parser")

prices = doc.find_all("li", class_="price-current", limit=25)
links = doc.find_all("a", class_="item-title", limit=25)


for i in range(len(prices)):
    strong = prices[i].find("strong")
    sup = prices[i].find("sup")

    if strong and sup:
        price_value = strong.text.replace(",", "") + sup.text.replace(",", "")
        prices_list.append(price_value)
        result_numbers_list.append(n)
        link = links[i]['href']
        links_list.append(link)
        print("$" + price_value)
        print("Link:", link)
    else:
        continue

    print("Result number =", n)
    print("\n")
    n += 1
    if n > 15:
        break

# Prepare data for updating the sheet
data = []
for i in range(len(result_numbers_list)):
    if i < len(prices_list):
        month = str(datetime.now().month)
        year = str(datetime.now().year)
        day = str(datetime.now().day)
        data.append([links_list[i], str(month + "/" + day + "/" + year), prices_list[i], "3060 GPU's"])
    else:
        data.append([links_list[i], "Price information not found"])

# Remove the last entry if it is blank
if data[-1][1] == '':
    data.pop()

# Update the sheet by appending new data
sheet.update(f'A{starting_row}:D', data)

from bs4 import BeautifulSoup
import requests
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import date

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

# Determine the starting row for appending new data
starting_row = len(existing_data) + 1

n = 1

prices_list = []  # Empty list to store prices
result_numbers_list = []  # Empty list to store result numbers

url = "https://www.newegg.com/p/pl?N=4814%20601357250%20100007709&d=3070&Order=5"

result = requests.get(url).text
doc = BeautifulSoup(result, "html.parser")

prices = doc.find_all("li", class_="price-current", limit=15)

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
        prices_list.append("not found")
        result_numbers_list.append(n)

    print("result number =", n)
    print("\n")
    n += 1

# Prepare data for updating the sheet
data = []
for i in range(len(result_numbers_list)):
    if i < len(prices_list):
        data.append([result_numbers_list[i], prices_list[i], str(date.today()), "3070 GPU's"])
    else:
        data.append([result_numbers_list[i], "Price information not found"])

# Remove the last entry if it is blank
if data[-1][1] == '':
    data.pop()

# Update the sheet by appending new data
sheet.update(f'E{starting_row}:H', data)

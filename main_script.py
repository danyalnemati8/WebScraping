# main_script.py

import multiprocessing
import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Define the scope and credentials
scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
credentials = ServiceAccountCredentials.from_json_keyfile_name('scraper-project-391720-5521d58f18ef.json', scope)

# Authorize the credentials
client = gspread.authorize(credentials)

# Open the Google Sheet
sheet_url = 'https://docs.google.com/spreadsheets/d/1Bzedq9WqMuvgaV9VdpGXVJ4kXEjC5iVpslgnMFNYMkk/edit#gid=0'
sheet = client.open_by_url(sheet_url).sheet1


def run_file(file_name):
    exec(open(file_name).read())

if __name__ == '__main__':
    file_names = ['3060scraper.py', '3070scraper.py', '3080scraper.py', '3090scraper.py']

    processes = []
    for file_name in file_names:
        process = multiprocessing.Process(target=run_file, args=(file_name,))
        processes.append(process)
        process.start()

    for process in processes:
        process.join()

    sheet.delete_rows(2,15)
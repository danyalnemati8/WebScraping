# Web Scraping and Google Sheets Integration

This repository contains Python scripts for web scraping GPU prices from different websites and updating a Google Sheet with the scraped data. The scraping is performed using the BeautifulSoup library, and the Google Sheets integration is achieved using the gspread library.

## Prerequisites

Before running the scripts, make sure you have the following:

- Python 3.x installed
- Required Python libraries installed (requests, BeautifulSoup, gspread, oauth2client)
- Google account with access to Google Sheets API and a service account key file (JSON format) for authentication

## Setup

1. Clone the repository to your local machine:

https://github.com/danyalnemati8/WebScraping


2. Install the required Python libraries:

pip install requests BeautifulSoup4 gspread oauth2client


3. Place the service account key file (JSON format) obtained from the Google Cloud Console in the project directory.

4. Update the URLs in the scripts to the desired websites for scraping GPU prices.

5. Update the Google Sheets URL in the scripts to the URL of your target Google Sheet.

## Usage

1. Run the main_script.py to run all scrapers.

2. The script will scrape the GPU prices from the specified website, update the data in the Google Sheet, and display the scraped prices on the console.

3. The Google Sheet will be updated with the scraped data, including the result number, price, date, and GPU model.


## Note

- Make sure to adjust the file paths, Google Sheet URL, and other variables in the scripts to match your specific setup.

- The scripts are currently set to scrape a limited number of prices (15 in this case). You can adjust the limit as per your requirements.

- Ensure you have proper permissions and access to the Google Sheet for updating the data.

- It's recommended to run the scripts periodically to keep the data up-to-date.


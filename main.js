
let FULL_URL = 'https://docs.google.com/spreadsheets/d/1Bzedq9WqMuvgaV9VdpGXVJ4kXEjC5iVpslgnMFNYMkk/edit#gid=0';

fetch(FULL_URL)
  .then(response => response.text())
  .then(html => {
    // Create a temporary element to parse the HTML content
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;

    // Use DOM manipulation to extract data from the parsed HTML
    const tableRows = tempElement.querySelectorAll('table tr');

   // Process the extracted data as needed
   tableRows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const rowData = Array.from(cells)
      .map(cell => cell.textContent);

    // Process the rowData until an empty cell is encountered
    
    //plot 3070 data for now 
    const lastIndex = 8
    const finalRowData = lastIndex === -1 ? rowData : rowData.slice(4, lastIndex);

    console.log(finalRowData);
  });
})
.catch(error => {
  console.error(error);
});


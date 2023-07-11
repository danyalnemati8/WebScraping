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
    const labels = [];
    const data = [];
    // Start iterating from index 1 to skip the first row
    for (let i = 2; i < tableRows.length; i++) {
      const row = tableRows[i];
      const cells = row.querySelectorAll('td');
      const cellDataF = cells[5] ? cells[5].textContent : ''; // Data from column F
      const cellDataG = cells[6] ? cells[6].textContent : ''; // Data from column G

      // Filter out empty cells
      if (cellDataF.trim() !== '' && cellDataG.trim() !== '') {
        labels.push(cellDataF);
        data.push(parseFloat(cellDataG));
      }
    }
      

    // Create a new Chart.js chart
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Data',
          data: data,
          backgroundColor: 'rgba(0, 123, 255, 0.5)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Dates'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Prices'
            },
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => {
    console.error(error);
  });

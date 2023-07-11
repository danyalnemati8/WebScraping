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
    const datasets = [];
    tableRows.forEach(row => {
      const cells = row.querySelectorAll('td');
      const rowData = Array.from(cells)
        .map(cell => cell.textContent);

      // Filter out empty cells
      const nonEmptyData = rowData.slice(4, 8).filter(cellData => cellData.trim() !== '');

      if (nonEmptyData.length > 0) {
        labels.push(rowData[0]); // Use the value from column A as the label
        datasets.push({
          label: 'Data',
          data: nonEmptyData,
          backgroundColor: 'rgba(0, 123, 255, 0.5)'
        });
      }
    });

    // Create a new Chart.js chart
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => {
    console.error(error);
  });



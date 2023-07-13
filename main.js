const FULL_URL = 'https://docs.google.com/spreadsheets/d/1Bzedq9WqMuvgaV9VdpGXVJ4kXEjC5iVpslgnMFNYMkk/edit#gid=0';

fetch(FULL_URL)
  .then(response => response.text())
  .then(html => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;

    const tableRows = tempElement.querySelectorAll('table tr');

    const data = [];
    for (let i = 2; i < tableRows.length; i++) {
      const row = tableRows[i];
      const cells = row.querySelectorAll('td');
      const cellDataF = cells[5] ? cells[5].textContent : '';
      const cellDataG = cells[6] ? parseFloat(cells[6].textContent) : NaN;

      if (cellDataF.trim() !== '' && !isNaN(cellDataG)) {
        data.push({ x: new Date(cellDataF), y: cellDataG });
      }
    }

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('body')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.x))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y))
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale)
      .ticks(d3.timeDay)
      .tickFormat(d3.timeFormat('%b %d'));

    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5)
      .attr('fill', 'rgba(0, 123, 255, 0.5)');

    const mean = d3.mean(data, d => d.y);
    const median = d3.median(data, d => d.y);

    svg.append('line')
      .attr('class', 'mean-line')
      .attr('x1', 0)
      .attr('y1', yScale(mean))
      .attr('x2', width)
      .attr('y2', yScale(mean))
      .attr('stroke', 'rgba(255, 0, 0, 0.8)')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4 4');

    svg.append('line')
      .attr('class', 'median-line')
      .attr('x1', 0)
      .attr('y1', yScale(median))
      .attr('x2', width)
      .attr('y2', yScale(median))
      .attr('stroke', 'rgba(0, 255, 0, 0.8)')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4 4');

    svg.append('text')
      .attr('class', 'mean-label')
      .attr('x', width - 10)
      .attr('y', yScale(mean) - 5)
      .attr('text-anchor', 'end')
      .attr('fill', 'rgba(255, 0, 0, 0.8)')
      .text('Mean: ' + mean.toFixed(2));

    svg.append('text')
      .attr('class', 'median-label')
      .attr('x', width - 10)
      .attr('y', yScale(median) - 5)
      .attr('text-anchor', 'end')
      .attr('fill', 'rgba(0, 255, 0, 0.8)')
      .text('Median: ' + median.toFixed(2));

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text('Dates');

    svg.append('text')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 15)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Prices');
  })
  .catch(error => {
    console.error(error);
  });

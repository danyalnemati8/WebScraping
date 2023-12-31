FULL_URL = 'https://docs.google.com/spreadsheets/d/1Bzedq9WqMuvgaV9VdpGXVJ4kXEjC5iVpslgnMFNYMkk/edit#gid=0';

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
      const cellDataF = cells[13] ? cells[13].textContent : '';
      const cellDataG = cells[14] ? parseFloat(cells[14].textContent) : NaN;

      if (cellDataF.trim() !== '' && !isNaN(cellDataG)) {
        data.push({ x: new Date(cellDataF), y: cellDataG });
      }
    }

    const groupedData = groupDataByDate(data);
    const meanData = calculateMeanData(groupedData);
    const medianData = calculateMedianData(groupedData);

    const margin = { top: 50, right: 20, bottom: 50, left: 50 };
    const width = 350 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const svg = d3.select('body')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const chartWidth = width + margin.left + margin.right;
    const chartHeight = height + margin.top + margin.bottom;

    svg.append('rect')
      .attr('x', -margin.left)
      .attr('y', -margin.top)
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('rx', 10) // Set the horizontal radius of the rounded corners
      .attr('ry', 10) 
      .attr('fill', 'white'); // Set the background color of the chart to white

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

    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(meanData)
      .attr('class', 'mean-line')
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255, 0, 0, 0.8)')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.append('path')
      .datum(medianData)
      .attr('class', 'median-line')
      .attr('fill', 'none')
      .attr('stroke', 'rgba(135, 0, 255, 0.8)')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text('3090 Series');

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

      const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - 120}, 10)`); // Updated position
    
    legend.append('text')
      .attr('x', 10)
      .attr('y', 0)
      .style('font-size', '12px')
      .text('Mean');
    
    legend.append('line')
      .attr('x1', -5)
      .attr('y1', -5)
      .attr('x2', 8)
      .attr('y2', -5)
      .attr('stroke', 'rgba(255, 0, 0, 0.8)')
      .attr('stroke-width', 2);
    
    legend.append('text')
      .attr('x', 10)
      .attr('y', 20)
      .style('font-size', '12px')
      .text('Median');
    
    legend.append('line')
      .attr('x1', -5)
      .attr('y1', 15)
      .attr('x2', 8)
      .attr('y2', 15)
      .attr('stroke', 'rgba(135, 0, 255, 0.8)')
      .attr('stroke-width', 2);
    
  })
  .catch(error => {
    console.error(error);
  });

function groupDataByDate(data) {
  const groupedData = {};
  data.forEach(datum => {
    const date = datum.x.toDateString();
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(datum.y);
  });
  return groupedData;
}

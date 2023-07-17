const FULL_URL = 'https://docs.google.com/spreadsheets/d/1Bzedq9WqMuvgaV9VdpGXVJ4kXEjC5iVpslgnMFNYMkk/edit#gid=0';

fetch(FULL_URL)
  .then(response => response.text())
  .then(html => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;

    const tableRows = tempElement.querySelectorAll('table tr');

    const linkData = [];
    for (let i = 2; i < tableRows.length; i++) {
      const row = tableRows[i];
      const cells = row.querySelectorAll('td');
      const link = cells[0] ? cells[0].textContent : '';
      const timestamp = cells[1] ? new Date(cells[1].textContent) : null;

      if (link.trim() !== '' && timestamp) {
        linkData.push({ link, timestamp });
      }
    }

    const sortedLinks = linkData.sort((a, b) => b.timestamp - a.timestamp);
    const recentLinks = sortedLinks.slice(0, 15);

    const container = document.querySelector('.container');
    const linkList = document.createElement('ul');
    linkList.classList.add('link-list');

    recentLinks.forEach(link => {
      const listItem = document.createElement('li');
      const linkElement = document.createElement('a');
      linkElement.href = link.link;
      linkElement.textContent = link.link;
      listItem.appendChild(linkElement);
      linkList.appendChild(listItem);
    });

    container.appendChild(linkList);
  })
  .catch(error => {
    console.error(error);
  });

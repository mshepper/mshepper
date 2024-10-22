function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  alert(startdate);
  alert(enddate);
}
async function fetchData() {
  try {
      const response = await fetch('https://compute.samford.edu/zohauth/clients/datajson');
      const data = await response.json();
      const startDate = new Date('2023-01-01'); // Replace with your start date
      const endDate = new Date('2023-12-31'); // Replace with your end date
      populateTable(data, startDate, endDate);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

function populateTable(data, startDate, endDate) {
  const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear existing table rows

  data.forEach(item => {
      const itemDate = new Date(item.datetime); // Adjust based on actual date format in your data
      if (itemDate >= startDate && itemDate <= endDate) {
          const row = document.createElement('tr');
          const cellId = document.createElement('td');
          const cellSpeed = document.createElement('td');
          const cellResult = document.createElement('td');
          const cellDatetime = document.createElement('td');

          cellId.innerHTML = `<a href="details.html?id=${item.id}">Pitch ${item.id}</a>`;
          cellSpeed.textContent = item.speed || '--';
          cellResult.textContent = item.result || '--';
          cellDatetime.textContent = item.datetime || '--';

          row.appendChild(cellId);
          row.appendChild(cellSpeed);
          row.appendChild(cellResult);
          row.appendChild(cellDatetime);
          tableBody.appendChild(row);
      }
  });
}

function populateTable(data) {
  const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear existing table rows

  data.forEach(item => {
      const row = document.createElement('tr');
      const cellId = document.createElement('td');
      const cellSpeed = document.createElement('td');
      const cellResult = document.createElement('td');
      const cellDatetime = document.createElement('td');

      cellId.innerHTML = `<a href="details.html?id=${item.id}">Pitch ${item.id}</a>`;
      cellSpeed.textContent = item.speed || '--';
      cellResult.textContent = item.result || '--';
      cellDatetime.textContent = item.datetime || '--';

      row.appendChild(cellId);
      row.appendChild(cellSpeed);
      row.appendChild(cellResult);
      row.appendChild(cellDatetime);
      tableBody.appendChild(row);
  });
}

// Fetch data when the page loads
window.onload = fetchData;
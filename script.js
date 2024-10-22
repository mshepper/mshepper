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
      const tableBody = document.getElementById('pitchTable').getElementsByTagName('tbody')[0];

      data.forEach(item => {
          const row = tableBody.insertRow();
          const cellID = row.insertCell(0);
          const cellSpeed = row.insertCell(1);
          const cellResult = row.insertCell(2);
          const cellDatetime = row.insertCell(3);

          cellID.innerHTML = `<a href="details.html?id=${item.id}">Pitch ${item.id}</a>`;
          cellSpeed.textContent = item.speed;
          cellResult.textContent = item.result || '--';
          cellDatetime.textContent = item.datetime || '--';
      });
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Fetch data when the page loads
window.onload = fetchData;
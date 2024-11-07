document.addEventListener('DOMContentLoaded', function() {
  const stationList = [
      { name: 'Station 1', status: 'online', location: 'Downtown', connector: 'Type 2', power: '22kW', pricing: '$0.25/kWh' },
      { name: 'Station 2', status: 'offline', location: 'Uptown', connector: 'CCS', power: '50kW', pricing: 'Not Available' },
      { name: 'Station 3', status: 'online', location: 'Suburb', connector: 'CHAdeMO', power: '50kW', pricing: '$0.20/kWh' },
      { name: 'Station 4', status: 'online', location: 'City Center', connector: 'Type 2', power: '22kW', pricing: '$0.30/kWh' }
  ];

  const stationListElement = document.getElementById('station-list');

  stationList.forEach(station => {
      const li = document.createElement('li');
      
      li.innerHTML = `
          <div class="station-name">${station.name}</div>
          <div class="status ${station.status}">${station.status.charAt(0).toUpperCase() + station.status.slice(1)}</div>
          <div class="location">${station.location}</div>
          <div class="connector-type">Connector Type: ${station.connector}</div>
          <button class="view-button" onclick="viewDetails('${station.name}')">View</button>
      `;
      
      stationListElement.appendChild(li);
  });
});

function viewDetails(stationName) {
  // Store the station name in localStorage for the next page
  localStorage.setItem('selectedStation', stationName);
  // Redirect to the detailed page
  window.location.href = 'details.html';
}

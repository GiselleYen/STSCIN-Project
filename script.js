document.addEventListener('DOMContentLoaded', function() {
  // Step 1: Subscribe to Charge Point Operator (CPO)
  subscribeToCPO()
      .then(() => {
          // Step 2: Load charging stations after subscription is successful
          loadChargingStations();
      })
      .catch(error => {
          console.error("Failed to subscribe to CPO:", error);
          // Optionally, show an error message to the user
          alert("Unable to subscribe to the Charge Point Operator. Please try again later.");
      });
});

// Function to simulate subscription to CPO
function subscribeToCPO() {
  return new Promise((resolve, reject) => {
      // Simulate a delay for subscription (e.g., API call delay)
      setTimeout(() => {
          console.log("Subscribed to Charge Point Operator");
          resolve(); // Call resolve if subscription is successful
      }, 1000); // Adjust delay as needed
  });
}

// Function to load and display charging stations
function loadChargingStations() {
  const stationList = [
      { name: 'Station 1', status: 'available', location: 'Downtown', connector: 'Type 2', power: '22kW', pricing: '$0.25/kWh' },
      { name: 'Station 2', status: 'in-use', location: 'Uptown', connector: 'CCS', power: '50kW', pricing: 'Not Available' },
      { name: 'Station 3', status: 'available', location: 'Suburb', connector: 'CHAdeMO', power: '50kW', pricing: '$0.20/kWh' },
      { name: 'Station 4', status: 'available', location: 'City Center', connector: 'Type 2', power: '22kW', pricing: '$0.30/kWh' }
  ];

  const stationListElement = document.getElementById('station-list');

  stationList.forEach(station => {
      const li = document.createElement('li');
      
      const viewButton = station.status === 'in-use' 
          ? `<button class="view-button disabled">View</button>` 
          : `<button class="view-button" onclick="viewDetails('${station.name}')">View</button>`;
      
      li.innerHTML = `
          <div class="station-name">${station.name}</div>
          <div class="status ${station.status}">${station.status.charAt(0).toUpperCase() + station.status.slice(1)}</div>
          <div class="location">${station.location}</div>
          <div class="connector-type">Connector Type: ${station.connector}</div>
          ${viewButton}
      `;
      
      stationListElement.appendChild(li);
  });
}

function viewDetails(stationName) {
  // Store the station name in localStorage for the next page
  localStorage.setItem('selectedStation', stationName);
  // Redirect to the detailed page
  console.log("hello");
  window.location.href = 'details.html';
}

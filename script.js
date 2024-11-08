document.addEventListener('DOMContentLoaded', function() {
    subscribeToCPO()
        .then(() => {
            loadChargingStations();
        })
        .catch(error => {
            console.error("Failed to subscribe to CPO using OCPI:", error);
            // Optionally, show an error message to the user
            alert("Unable to subscribe to the Charge Point Operator. Please try again later.");
        });
  });
  
  function subscribeToCPO() {
    return new Promise((resolve, reject) => {
        console.log("Sending OCPI subscription request");
        console.log({
            url: "https://charging-system-url.com/ocpi/callback",
            types: [
                "START_SESSION",
                "STOP_SESSION",
                "CHARGING_STATUS",
                "CDR",
                "AUTHORIZATION"
            ]
        });
        // Simulate a delay for subscription (e.g., API call delay)
        setTimeout(() => {
            console.log("Subscribed to XXX Vendor via OCPI");
            const response = {
                status_code: 1000,
                status_message: "Subscription successful",
                data: {
                    subscription_id: "sub-123456",
                    stations: [
                        {
                            id: "st-001",
                            name: "Station 1",
                            status: "available",
                            location: "Level 5",
                            connector: "Type 2",
                            power: "22kW",
                            pricing: "RM0.25/kWh",
                            last_updated: "2024-11-01T10:00:00Z"
                        },
                        {
                            id: "st-002",
                            name: "Station 2",
                            status: "in-use",
                            location: "Level 5",
                            connector: "CCS",
                            power: "50kW",
                            pricing: "Not Available",
                            last_updated: "2024-11-08T12:30:00Z"
                        },
                        {
                            id: "st-003",
                            name: "Station 3",
                            status: "available",
                            location: "Level 5",
                            connector: "CHAdeMO",
                            power: "50kW",
                            pricing: "RM0.20/kWh",
                            last_updated: "2024-11-05T09:15:00Z"
                        },
                        {
                            id: "st-004",
                            name: "Station 4",
                            status: "available",
                            location: "Level 5",
                            connector: "Type 2",
                            power: "22kW",
                            pricing: "RM0.30/kWh",
                            last_updated: "2024-11-07T14:45:00Z"
                        }
                    ]
                }
            };
            console.log(response);
            resolve(response); 
        }, 1500);
    });
}


  function loadChargingStations() {
    const stationList = [
        { name: 'Station 1', status: 'available', location: 'Level 5', connector: 'Type 2', power: '22kW', pricing: 'RM0.25/kWh' },
        { name: 'Station 2', status: 'in-use', location: 'Level 5', connector: 'CCS', power: '50kW', pricing: 'Not Available' },
        { name: 'Station 3', status: 'available', location: 'Level 5', connector: 'CHAdeMO', power: '50kW', pricing: 'RM0.20/kWh' },
        { name: 'Station 4', status: 'available', location: 'Level 5', connector: 'Type 2', power: '22kW', pricing: 'RM0.30/kWh' }
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
    
    console.log("Navigating to details page for station: " + stationName);
    window.location.href = 'details.html';
  }
  
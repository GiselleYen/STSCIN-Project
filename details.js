document.addEventListener('DOMContentLoaded', function() {
    const stationList = [
        { name: 'Station 1', status: 'available', location: 'Downtown', connector: 'Type 2', power: '22kW', pricing: '$0.25/kWh' },
        { name: 'Station 2', status: 'in-use', location: 'Uptown', connector: 'CCS', power: '50kW', pricing: 'Not Available' },
        { name: 'Station 3', status: 'available', location: 'Suburb', connector: 'CHAdeMO', power: '50kW', pricing: '$0.20/kWh' },
        { name: 'Station 4', status: 'available', location: 'City Center', connector: 'Type 2', power: '22kW', pricing: '$0.30/kWh' }
    ];

    const selectedStationName = localStorage.getItem('selectedStation');
    const station = stationList.find(s => s.name === selectedStationName);

    if (station) {
        // Display station details
        const detailsDiv = document.getElementById('station-details');
        detailsDiv.innerHTML = `
            <div><strong>Name:</strong> ${station.name}</div>
            <div><strong>Status:</strong> ${station.status.charAt(0).toUpperCase() + station.status.slice(1)}</div>
            <div><strong>Location:</strong> ${station.location}</div>
            <div><strong>Connector Type:</strong> ${station.connector}</div>
            <div><strong>Power Rating:</strong> ${station.power}</div>
            <div><strong>Pricing:</strong> ${station.pricing}</div>
        `;
    }
});

// Function to simulate OCPP authorization request
function authorizeOCPP() {
    return new Promise((resolve, reject) => {
        console.log("Requesting OCPP authorization...");

        // Simulate a delay for authorization (e.g., network request)
        setTimeout(() => {
            const isAuthorized = Math.random() > 0.3; // 70% chance of success
            if (isAuthorized) {
                console.log("OCPP authorization successful.");
                resolve();
            } else {
                console.log("OCPP authorization failed.");
                reject("Authorization failed. Please try again.");
            }
        }, 1000); // Adjust delay as needed
    });
}

function startCharging() {
    authorizeOCPP()
        .then(() => {
            // Freeze for 1 seconds after successful authorization
            setTimeout(() => {
                // After 1 seconds, proceed to the charging session page
                window.location.href = 'charging-session.html';
            }, 1000); // 1-second delay
        })
        .catch(error => {
            // Display authorization failure message
            alert(error);
        });
}

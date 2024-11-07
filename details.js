document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the station name from localStorage
    const stationName = localStorage.getItem('selectedStation');
    
    // Sample station data (could be retrieved from an API)
    const stationList = [
        { name: 'Station 1', status: 'online', location: 'Downtown', connector: 'Type 2', power: '22kW', pricing: '$0.25/kWh' },
        { name: 'Station 2', status: 'offline', location: 'Uptown', connector: 'CCS', power: '50kW', pricing: 'Not Available' },
        { name: 'Station 3', status: 'online', location: 'Suburb', connector: 'CHAdeMO', power: '50kW', pricing: '$0.20/kWh' },
        { name: 'Station 4', status: 'online', location: 'City Center', connector: 'Type 2', power: '22kW', pricing: '$0.30/kWh' }
    ];

    const station = stationList.find(s => s.name === stationName);

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

function goBack() {
    // Go back to the previous page (charging station list)
    window.history.back();
}

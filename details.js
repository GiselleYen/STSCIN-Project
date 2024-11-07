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

function startCharging() {
    // Redirect to the charging session page
    window.location.href = 'charging-session.html';
}

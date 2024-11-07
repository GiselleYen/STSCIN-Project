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
        const detailsElement = document.getElementById('station-details');
        detailsElement.innerHTML = `
            <h2>${station.name}</h2>
            <p><strong>Status:</strong> ${station.status.charAt(0).toUpperCase() + station.status.slice(1)}</p>
            <p><strong>Location:</strong> ${station.location}</p>
            <p><strong>Connector Type:</strong> ${station.connector}</p>
            <p><strong>Power Rating:</strong> ${station.power}</p>
            <p><strong>Pricing:</strong> ${station.pricing}</p>
        `;
    } else {
        alert('Station not found!');
    }
});

function startCharging() {
    // Redirect to the charging session page
    window.location.href = 'charging-session.html';
}

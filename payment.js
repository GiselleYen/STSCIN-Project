document.addEventListener('DOMContentLoaded', function() {
    // Simulated session data
    const sessionData = {
        stationName: localStorage.getItem('selectedStation'),
        energyConsumed: parseFloat(localStorage.getItem('energyAdded') || 0),  // Energy consumed (in kWh)
        chargingTime: parseFloat(localStorage.getItem('chargingTime') || 0),    // Convert seconds to minutes
        totalCost: parseFloat(localStorage.getItem('totalCost') || 0.00)        // Total cost for the session
    };

    // Display session details on the payment page
    document.getElementById('payment-station-name').innerText = sessionData.stationName;
    document.getElementById('payment-energy-consumed').innerText = `${sessionData.energyConsumed} kWh`;
    document.getElementById('payment-charging-time').innerText = `${sessionData.chargingTime} seconds`;  // Keep 2 decimal points
    document.getElementById('payment-cost').innerText = sessionData.totalCost.toFixed(2);
});

function payNow() {
    // Simulate a payment process (you can later integrate actual payment functionality here)
    alert('Payment successful! Remember unplug the charger plug and return it to the holder');

    // Redirect to a confirmation page or back to the main page
    window.location.href = 'index.html';
}

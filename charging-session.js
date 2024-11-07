document.addEventListener('DOMContentLoaded', function() {
    // Declare sessionData at the right scope
    const sessionData = {
        stationName: localStorage.getItem('selectedStation'),
        energyAdded: 0,      // kWh
        chargingTime: 0,     // minutes
        estimatedCost: 0.00, // USD
        costPerkWh: 0.25,    // Example cost per kWh (you can update this dynamically)
    };

    // Display station name
    document.getElementById('station-name').innerText = sessionData.stationName;

    // Function to update live session data
    function updateSessionData() {
        // Simulate adding energy and time
        sessionData.energyAdded += 0.1;  // Add 0.1 kWh per interval
        sessionData.chargingTime += 1;   // Add 1 minute per interval
        sessionData.estimatedCost = (sessionData.energyAdded * sessionData.costPerkWh).toFixed(2);

        // Update the HTML with new values
        document.getElementById('energy-added').innerText = `${sessionData.energyAdded.toFixed(1)} kWh`;
        document.getElementById('charging-time').innerText = `${sessionData.chargingTime} min`;
        document.getElementById('estimated-cost').innerText = sessionData.estimatedCost;

        // Continue updating every minute (simulating live data update)
        if (sessionData.energyAdded < 100) {  // Simulate up to 100 kWh max
            setTimeout(updateSessionData, 60000);  // Update every minute
        }
    }

    // Start updating the session data when the page loads
    updateSessionData();

    // Attach stopCharging to button click using event listener
    const stopChargingButton = document.getElementById('stop-charging-btn');
    stopChargingButton.addEventListener('click', stopCharging);

    function stopCharging() {
        // Save session data to localStorage before redirecting to the payment page
        localStorage.setItem('energyAdded', sessionData.energyAdded);
        localStorage.setItem('chargingTime', sessionData.chargingTime);
        localStorage.setItem('totalCost', sessionData.estimatedCost);

        // Redirect to the payment page
        window.location.href = 'payment.html';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Declare sessionData at the right scope
    const sessionData = {
        stationName: localStorage.getItem('selectedStation'),
        energyAdded: 0,      // kWh
        chargingTime: 0,     // seconds
        estimatedCost: 0.00, // USD
        costPerkWh: 0.25,    // Example cost per kWh (you can update this dynamically)
        endTime: 0           // Random end time in seconds
    };

    // Display station name
    document.getElementById('station-name').innerText = sessionData.stationName;

    // Function to update live session data every second
    function updateSessionData() {
        // Simulate adding energy and time every second
        sessionData.energyAdded += 0.00167;  // Add approximately 0.1 kWh per minute (0.1 kWh / 60 seconds)
        sessionData.chargingTime += 1;       // Add 1 second per interval
        sessionData.estimatedCost = (sessionData.energyAdded * sessionData.costPerkWh).toFixed(2);

        // Update the HTML with new values
        document.getElementById('energy-added').innerText = `${sessionData.energyAdded.toFixed(3)} kWh`;
        document.getElementById('charging-time').innerText = `${sessionData.chargingTime} sec`;
        document.getElementById('estimated-cost').innerText = sessionData.estimatedCost;

        // Continue updating every second
        if (sessionData.energyAdded < 100) {  // Simulate up to 100 kWh max
            setTimeout(updateSessionData, 1000);  // Update every second
        }
    }

    // Function to generate a random end time (in seconds) within 0 to 60 seconds
    function generateRandomEndTime() {
        // Set the end time to a random number between 0 and 60 seconds
        sessionData.endTime = Math.floor(Math.random() * 61);  // Random between 0 and 60 seconds
        updateEndTimeDisplay();
    }

    // Function to update the remaining time display
    function updateEndTimeDisplay() {
        const endTimeDisplay = document.getElementById('end-time');
        let remainingTime = sessionData.endTime;

        // Update the countdown every second
        const countdownInterval = setInterval(function() {
            if (remainingTime > 0) {
                remainingTime--;
                const seconds = remainingTime % 60;
                endTimeDisplay.innerText = `${seconds} sec`;
            } else {
                clearInterval(countdownInterval);
                stopCharging();  // Automatically stop the charging when the time is up
            }
        }, 1000);
    }

    // Function to stop the charging session
    function stopCharging() {
        // Save session data to localStorage before redirecting to the payment page
        localStorage.setItem('energyAdded', sessionData.energyAdded);
        localStorage.setItem('chargingTime', sessionData.chargingTime);
        localStorage.setItem('totalCost', sessionData.estimatedCost);

        // Redirect to the payment page
        window.location.href = 'payment.html';
    }

    // Start the session data updates when the page loads
    updateSessionData();

    // Generate a random end time when the page loads
    generateRandomEndTime();

    // Attach stopCharging to button click using event listener
    const stopChargingButton = document.getElementById('stop-charging-btn');
    stopChargingButton.addEventListener('click', stopCharging);
});

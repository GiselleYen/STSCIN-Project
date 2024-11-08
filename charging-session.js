document.addEventListener('DOMContentLoaded', function() {
    const sessionData = {
        stationName: localStorage.getItem('selectedStation'),
        energyAdded: 0,      // kWh
        chargingTime: 0,     // seconds
        estimatedCost: 0.00, // USD
        costPerkWh: 0.25,    // Example cost per kWh (you can update this dynamically)
        endTime: 0           // Random end time in seconds
    };

    document.getElementById('station-name').innerText = sessionData.stationName;

    let sessionUpdateTimeout;

    // Function to update live session data every second
    function updateSessionData() {
        const requestChargingProfile = {
            event: "REQUEST_CHARGING_PROFILE",
            stationName: sessionData.stationName,
            timestamp: new Date().toISOString()
        };

        console.log("Sending OCPI Request:", JSON.stringify(requestChargingProfile));

        const responseChargingProfile = simulateChargingProfileResponse();

        console.log("Received OCPI Response:", JSON.stringify(responseChargingProfile));

        // Update session data based on received response
        sessionData.energyAdded = responseChargingProfile.energyAdded;
        sessionData.chargingTime = responseChargingProfile.chargingTime;
        sessionData.estimatedCost = responseChargingProfile.estimatedCost;
        sessionData.endTime = responseChargingProfile.estimatedEndTime;

        // Update the HTML with new values
        document.getElementById('energy-added').innerText = `${sessionData.energyAdded.toFixed(3)} kWh`;
        document.getElementById('charging-time').innerText = `${sessionData.chargingTime} sec`;
        document.getElementById('estimated-cost').innerText = `RM ${sessionData.estimatedCost}`;
        document.getElementById('end-time').innerText = `${sessionData.endTime} sec`;

        // Continue updating every second if energy added is less than 100 kWh
        if (sessionData.energyAdded < 100) {  // Simulate up to 100 kWh max
            sessionUpdateTimeout = setTimeout(updateSessionData, 1000);  // Update every second
        }
    }

    // Function to simulate receiving a charging profile response (mock data)
    function simulateChargingProfileResponse() {
        // Increment values to simulate charging progress
        sessionData.energyAdded += 0.0061;  // Add approximately 0.1 kWh per minute (0.1 kWh / 60 seconds)
        sessionData.chargingTime += 1;       // Add 1 second per interval
        const estimatedCost = (sessionData.energyAdded * sessionData.costPerkWh).toFixed(2);
        const estimatedEndTime = Math.max(0, sessionData.endTime - 1);  // Decrease estimated end time

        return {
            event: "CHARGING_PROFILE",
            stationName: sessionData.stationName,
            energyAdded: parseFloat(sessionData.energyAdded.toFixed(3)),
            chargingTime: sessionData.chargingTime,
            estimatedCost: estimatedCost,
            estimatedEndTime: estimatedEndTime
        };
    }

    // Function to generate a random end time (in seconds) within 0 to 60 seconds
    function generateRandomEndTime() {
        // Set the end time to a random number between 0 and 60 seconds
        sessionData.endTime = Math.floor(Math.random() * 61);  // Random between 0 and 60 seconds
    }

    // Function to stop the charging session
    function stopCharging() {
        localStorage.setItem('energyAdded', sessionData.energyAdded);
        localStorage.setItem('chargingTime', sessionData.chargingTime);
        localStorage.setItem('totalCost', sessionData.estimatedCost);

        const stopChargingRequest = {
            event: "STOP_CHARGING",
            stationName: sessionData.stationName,
            energyAdded: sessionData.energyAdded,
            chargingTime: sessionData.chargingTime,
            totalCost: sessionData.estimatedCost,
            timestamp: new Date().toISOString(),
            message: "Charging session stopped"
        };

        console.log("Sending OCPI Stop Charging Request:", JSON.stringify(stopChargingRequest));
        clearTimeout(sessionUpdateTimeout);

        setTimeout(function() {
            window.location.href = 'payment.html';
        }, 2000);  // 2 seconds
    }

    // Start the session data updates when the page loads
    generateRandomEndTime();
    updateSessionData();

    // Attach stopCharging to button click using event listener
    const stopChargingButton = document.getElementById('stop-charging-btn');
    stopChargingButton.addEventListener('click', stopCharging);
});

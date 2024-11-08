document.addEventListener('DOMContentLoaded', function() {
    const stationList = [
        { name: 'Station 1', status: 'available', location: 'Level 5', connector: 'Type 2', power: '22kW', pricing: 'RM0.25/kWh' },
        { name: 'Station 2', status: 'in-use', location: 'Level 5', connector: 'CCS', power: '50kW', pricing: 'Not Available' },
        { name: 'Station 3', status: 'available', location: 'Level 5', connector: 'CHAdeMO', power: '50kW', pricing: 'RM0.20/kWh' },
        { name: 'Station 4', status: 'available', location: 'Level 5', connector: 'Type 2', power: '22kW', pricing: 'RM0.30/kWh' }
    ];

    const selectedStationName = localStorage.getItem('selectedStation');
    const station = stationList.find(s => s.name === selectedStationName);

    if (station) {
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
        const jsonData = [
            2,
            "19223201",
            "Authorize",
            {
                "customData": {
                    "vendorId": "string"
                },
                "idToken": {
                    "customData": {
                        "vendorId": "string"
                    },
                    "additionalInfo": [
                        {
                            "customData": {
                                "vendorId": "string"
                            },
                            "additionalIdToken": "string",
                            "type": "string"
                        }
                    ],
                    "idToken": "string",
                    "type": "Central"
                },
                "certificate": "string",
                "iso15118CertificateHashData": [
                    {
                        "customData": {
                            "vendorId": "string"
                        },
                        "hashAlgorithm": "SHA256",
                        "issuerNameHash": "string",
                        "issuerKeyHash": "string",
                        "serialNumber": "string",
                        "responderURL": "string"
                    }
                ]
            }
        ];
        console.log(jsonData);        

        setTimeout(() => {
            const isAuthorized = Math.random() > 0.3; // 70% chance of success
            if (isAuthorized) {
                console.log("OCPP authorization successful.");
                const successResponse = [
                    3,
                    "19223201",
                    {
                        "idTagInfo": {
                            "status": "Accepted",
                            "expiryDate": "2024-12-31T23:59:59Z",
                            "parentIdTag": "parent-12345"
                        }
                    }
                ];
                console.log(successResponse);
                setTimeout(() => {
                    resolve();
                }, 5000);
            } else {
                console.log("OCPP authorization failed.");
                const failedResponse = [
                    3,
                    "19223201",
                    {
                        "idTagInfo": {
                            "status": "Invalid",
                            "expiryDate": null,
                            "parentIdTag": null
                        }
                    }
                ];
                console.log(failedResponse);
                reject("Authorization failed. Please try again.");
            }
        }, 2000); // Adjust delay as needed
    });
}

function startCharging() {
    authorizeOCPP()
        .then(() => {
            setTimeout(() => {
                window.location.href = 'charging-session.html';
            }, 1000); // 1-second
        })
        .catch(error => {
            alert(error);
        });
}

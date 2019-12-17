function mockIncidents() {
    const fakeIncidents = Array.from(Array(3).keys()).reduce((acc, id) => {
        acc[id] = {
            id,
            address: 'Berlin, 10963, DE',
            description: "Stolen during nighttime from the house's closed yard.",
            locationDescription: null,
            locationType: null,
            media: {
                imageUrl: id === 0 ? 'https://something-wrong.org1/large_bike-3.jpg' : null,
                imageUrlThumb: id === 0 ? 'https://something-wrong.org1/small_bike-3.jpg' : null,
            },
            occurredAt: 1571918301,
            source: {
                name: 'BikeIndex.org',
                htmlUrl: 'https://bikeindex.org/bikes/669448',
                apiUrl: 'https://bikeindex.org/api/v1/bikes/669448',
            },
            title: 'Stolen 2017 State Bicycle Co. Matte Black 5',
            type: 'Theft',
            typeProperties: null,
            updatedAt: 1573322470,
            url: 'https://bikewise.org/api/v1/incidents/109462',
        };
        return acc;
    }, []);

    window.api.get = function(...args) {
        const [url] = args;

        if (url === '/incidents') {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve({ status: 200, data: { incidents: fakeIncidents } });
                }, 2000);
            });
        }

        return window.api.get(...args);
    };

    window.mockResolved = true;
}

function mockIncidentsWithError() {
    window.api.get = function(...args) {
        const [url] = args;

        if (url === '/incidents') {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve({ status: 400, data: {} });
                }, 2000);
            });
        }

        return window.api.get(...args);
    };

    window.mockResolved = true;
}

function mockEmptyIncidents() {
    window.api.get = function(...args) {
        const [url] = args;

        if (url === '/incidents') {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve({ status: 200, data: { incidents: [] } });
                }, 2000);
            });
        }

        return window.api.get(...args);
    };

    window.mockResolved = true;
}

module.exports = {
    mockIncidents,
    mockIncidentsWithError,
    mockEmptyIncidents,
};

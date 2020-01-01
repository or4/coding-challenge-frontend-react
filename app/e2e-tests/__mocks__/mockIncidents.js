function mockIncidents() {
    const imageUrl = ['https://files.bikeindex.org/uploads/Pu/139855/large_bike-3.jpg', 'https:/foo.bar/1.jpg'];
    const imageUrlThumb = ['https://files.bikeindex.org/uploads/Pu/139855/small_bike-3.jpg', 'https:/foo.bar/1.jpg'];

    const reduceFunc = (acc, id) => {
        acc[id] = {
            id,
            address: 'Berlin, 10963, DE',
            description: "Stolen during nighttime from the house's closed yard.",
            locationDescription: null,
            locationType: null,
            media: {
                imageUrl: imageUrl[id] || null,
                imageUrlThumb: imageUrlThumb[id] || null,
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
    };

    const fakeIncidents3 = Array.from(Array(3).keys()).reduce(reduceFunc, []);
    const fakeIncidents74 = Array.from(Array(74).keys()).reduce(reduceFunc, []);

    window.e2e.api.get = function(...args) {
        const [url, data] = args;

        if (url === '/incidents') {
            if (data.perPage !== 10) {
                return new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve({ status: 200, data: { incidents: fakeIncidents74 } });
                    }, 2000);
                });
            }

            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve({ status: 200, data: { incidents: fakeIncidents3 } });
                }, 2000);
            });
        }

        return window.e2e.api.get(...args);
    };

    window.mockResolved = true;
}

function mockIncidentsWithError() {
    window.e2e.api.get = function(...args) {
        const [url] = args;

        if (url === '/incidents') {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve({ status: 400, data: {} });
                }, 2000);
            });
        }

        return window.e2e.api.get(...args);
    };

    window.mockResolved = true;
}

function mockEmptyIncidents() {
    window.e2e.api.get = function(...args) {
        const [url] = args;

        if (url === '/incidents') {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve({ status: 200, data: { incidents: [] } });
                }, 2000);
            });
        }

        return window.e2e.api.get(...args);
    };

    window.mockResolved = true;
}

module.exports = {
    mockIncidents,
    mockIncidentsWithError,
    mockEmptyIncidents,
};

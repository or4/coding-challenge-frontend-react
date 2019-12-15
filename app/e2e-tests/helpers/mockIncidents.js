function mockIncidents() {
    const fakeIncidents = [0, 1, 2].reduce((acc, id) => {
        acc[id] = {
            id,
            address: 'Berlin, 10963, DE',
            description: "Stolen during nighttime from the house's closed yard.",
            locationDescription: null,
            locationType: null,
            media: {
                imageUrl: null,
                imageUrlThumb: null,
            },
            occurredAt: 1571918301,
            source: {
                name: 'BikeIndex.org',
                htmlUrl: 'https://bikeindex.org/bikes/669448',
                apiUrl: 'https://bikeindex.org/api/v1/bikes/669448',
            },
            title: 'Stolen 2017 State Bicycle Co. Matte Black 5 - 59 Core Line: Fixed Gear(black)',
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
                }, 1000);
            });
        }

        return window.api.get(...args);
    };

    window.mockResolved = true;
}

module.exports = {
    mockIncidents,
};

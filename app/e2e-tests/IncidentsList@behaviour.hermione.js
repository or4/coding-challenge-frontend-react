const { assert } = require('chai');
const { mockIncidents, mockIncidentsWithError } = require('./helpers/mockIncidents');
const timeout = 5000;

describe('Behaviour. Incidents list', () => {
    describe('I want to see a list of reported bike thefts for the Berlin area.', () => {
        describe('For each incident I want to see title, description, image, occurredAt, address', () => {
            it('should render title', function() {
                return this.browser
                    .url('/')
                    .execute(mockIncidents)
                    .waitForVisible('[data-test-id="incidents-list"]', timeout)
                    .execute(() => {
                        const incidents = document.body.querySelectorAll('[data-test-id="incident"]');

                        const result = {
                            incidentsCount: incidents.length,
                        };

                        const incident = incidents.length > 0 ? incidents[0] : null;
                        if (incident === null) {
                            return result;
                        }

                        const titles = incident.querySelectorAll('[data-test-id="incident__title"]');
                        result.titlesCount = titles.length;

                        result.incidentTitleText = titles.length > 0 && titles[0].textContent;

                        return result;
                    })
                    .then(result => {
                        const { value } = result;
                        const { incidentsCount, titlesCount, incidentTitleText } = value;

                        assert.isOk(incidentsCount > 0, 'Should be at least one incident');
                        assert.isOk(titlesCount === 1, 'Should be one title');
                        const titleText = 'Stolen 2017 State Bicycle Co. Matte Black 5';
                        assert.isOk(incidentTitleText === titleText, 'It should match text value');
                    });
            });

            it('should render description', function() {
                return this.browser
                    .url('/')
                    .execute(mockIncidents)
                    .waitForVisible('[data-test-id="incidents-list"]', timeout)
                    .execute(() => {
                        const incidents = document.body.querySelectorAll('[data-test-id="incident"]');

                        const result = {
                            incidentsCount: incidents.length,
                        };

                        const incident = incidents.length > 0 ? incidents[0] : null;
                        if (incident === null) {
                            return result;
                        }

                        const descriptions = incident.querySelectorAll('[data-test-id="incident__description"]');
                        result.descriptionsCount = descriptions.length;
                        result.incidentDescriptionText = descriptions.length > 0 && descriptions[0].textContent;

                        return result;
                    })
                    .then(result => {
                        const { value } = result;
                        const { incidentsCount, descriptionsCount, incidentDescriptionText } = value;

                        assert.isOk(incidentsCount > 0, 'Should be at least one incident');
                        assert.isOk(descriptionsCount === 1, 'Should be one description');
                        const descriptionText = "Stolen during nighttime from the house's closed yard.";
                        assert.isOk(incidentDescriptionText === descriptionText, 'It should match text value');
                    });
            });

            it('should have image', function() {
                return this.browser
                    .url('/')
                    .execute(mockIncidents)
                    .waitForVisible('[data-test-id="incidents-list"]', timeout)
                    .execute(() => {
                        const incidents = document.body.querySelectorAll('[data-test-id="incident"]');

                        const result = {
                            incidentsCount: incidents.length,
                        };

                        const images = incidents[0].querySelectorAll('[data-test-id="incident-image__image"]');
                        result.imageCount = images.length;
                        result.imageSrc = images.length > 0 && images[0].style.backgroundImage;

                        const previews = incidents[1].querySelectorAll('[data-test-id="incident-image__preview"]');
                        result.previewCount = previews.length;

                        return result;
                    })
                    .then(result => {
                        const { value } = result;
                        const { incidentsCount, previewCount, imageCount, imageSrc } = value;

                        assert.isOk(incidentsCount > 0, 'Should be at least one incident');
                        assert.isOk(previewCount === 1, 'First incident should have a preview');
                        assert.isOk(imageCount === 1, 'Second incident should have a image');
                        const expected = 'url("https://something-wrong.org1/small_bike-3.jpg")';
                        assert.isOk(imageSrc === expected, 'Image source should match the url');
                    });
            });

            describe('I want that date must be in format "Tue Nov 27 2018"', () => {
                it('should render date', function() {
                    return this.browser
                        .url('/')
                        .execute(mockIncidents)
                        .waitForVisible('[data-test-id="incidents-list"]', timeout)
                        .execute(() => {
                            const incidents = document.body.querySelectorAll('[data-test-id="incident"]');

                            const result = {
                                incidentsCount: incidents.length,
                            };

                            const dates = incidents[0].querySelectorAll('[data-test-id="incident__date"]');
                            result.datesCount = dates.length;
                            result.incidentDateText = dates.length > 0 && dates[0].textContent;

                            return result;
                        })
                        .then(result => {
                            const { value } = result;
                            const { incidentsCount, datesCount, incidentDateText } = value;

                            assert.isOk(incidentsCount > 0, 'Should be at least one incident');
                            assert.isOk(datesCount === 1, 'It should have a occurred date');
                            assert.isOk(incidentDateText === 'Thu Oct 24 2019', 'It should match text value');
                        });
                });
            });

            describe('I want that address must be in format "Berlin, 10405, DE"', () => {
                it('should render address', function() {
                    return this.browser
                        .url('/')
                        .execute(mockIncidents)
                        .waitForVisible('[data-test-id="incidents-list"]', timeout)
                        .execute(() => {
                            const incidents = document.body.querySelectorAll('[data-test-id="incident"]');

                            const result = {
                                incidentsCount: incidents.length,
                            };

                            const addresss = incidents[0].querySelectorAll('[data-test-id="incident__address"]');
                            result.addresssCount = addresss.length;
                            result.incidentAddressText = addresss.length > 0 && addresss[0].textContent;

                            return result;
                        })
                        .then(result => {
                            const { value } = result;
                            const { incidentsCount, addresssCount, incidentAddressText } = value;

                            assert.isOk(incidentsCount > 0, 'Should be at least one incident');
                            assert.isOk(addresssCount === 1, 'It should have a address');
                            assert.isOk(incidentAddressText === 'Berlin, 10963, DE', 'It should match text value');
                        });
                });
            });
        });
    });

    // describe('I want to see the first 10 bike theft cases, with the ability to - paginate (10 cases per page).', () => {});
    // describe('I want to see a total number of bike theft cases.', () => {});
    // describe('I want to filter reported bike thefts by partial case title.', () => {});
    // describe('I want to filter reported bike thefts by date range.', () => {});
});

// describe('Incident details: for each reported bike theft I want to see:', () => {
//     describe('Case title', () => {});
//     describe('Case description', () => {});
//     describe('Date of the theft', () => {});
//     describe('Date of when the case was reported', () => {});
//     describe('Location of the theft', () => {});
//     describe('Picture of the bike, if available', () => {});
// });

describe('Behaviour. Common cases', () => {
    describe('I want to see a loading state until the list is available.', () => {
        it('should render loading state', function() {
            return this.browser
                .url('/')
                .execute(mockIncidents)
                .waitForVisible('[data-test-id="loading"]', timeout)
                .execute(() => {
                    const loading = document.body.querySelectorAll('[data-test-id="loading"]');
                    const loadingText = loading.length > 0 && loading[0].textContent;

                    return {
                        loadingCount: loading.length,
                        loadingText,
                    };
                })
                .then(result => {
                    const { value } = result;
                    const { loadingCount, loadingText } = value;

                    assert.isOk(loadingCount === 1, 'It should be one loading component');
                    assert.isOk(loadingText === 'Loading ...', 'It should match text value');
                });
        });
    });

    describe('I want to see an error state if the list is unavailable.', () => {
        it('should render error state', function() {
            return this.browser
                .url('/')
                .execute(mockIncidentsWithError)
                .waitForVisible('[data-test-id="error"]', timeout)
                .execute(() => {
                    const error = document.body.querySelectorAll('[data-test-id="error"]');
                    const errorText = error.length > 0 && error[0].textContent;

                    return {
                        errorCount: error.length,
                        errorText,
                    };
                })
                .then(result => {
                    const { value } = result;
                    const { errorCount, errorText } = value;

                    assert.isOk(errorCount === 1, 'It should be one error component');
                    assert.isOk(errorText === 'Ooops, something went wrong', 'It should match text value');
                });
        });
    });
    describe('I want to see an empty state if there are no results.', () => {});
});

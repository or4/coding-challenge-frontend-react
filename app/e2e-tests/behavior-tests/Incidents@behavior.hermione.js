const { assert } = require('chai');

const { appStart, timeout } = require('../utils/app');
const { mockIncidentsWithError, mockEmptyIncidents } = require('../__mocks__/mockIncidents');

describe('Behaviour. Incidents list', () => {
    describe('I want to see a list of reported bike thefts for the Berlin area.', () => {
        it('should render thefts', function() {
            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    return window.e2e.responses[0].incidents.map(({ type }) => type);
                })
                .then(result => {
                    assert.isOk(result.value.length > 0, 'Count incidents should more than one');
                    assert.isOk(result.value.every(type => type === 'Theft'), "Each indcident type should be 'Theft'");
                });
        });

        it('should have address in Berlin', function() {
            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    return window.e2e.responses[0].incidents.map(({ address }) => address);
                })
                .then(result => {
                    assert.isOk(result.value.length > 0, 'Count incidents should more than one');
                    // eslint-disable-next-line prettier/prettier
                    assert.isOk(result.value.every(addresss => addresss.indexOf('Berlin') !== -1), 'Each indcident should be in Berlin');
                });
        });
    });

    describe('For each incident I want to see title, description, image, occurredAt, address', () => {
        it('should render title, description, image, occurredAt, address', function() {
            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    const incident = document.body.querySelector('[data-test-id="incident"]');

                    return {
                        titles: incident.querySelectorAll('[data-test-id="incident__title"]').length,
                        descriptions: incident.querySelectorAll('[data-test-id="incident__description"]').length,
                        images: incident.querySelectorAll('[data-test-id="incident-image__image"]').length,
                        previews: incident.querySelectorAll('[data-test-id="incident-image__preview"]').length,
                        dates: incident.querySelectorAll('[data-test-id="incident__date"]').length,
                        addresses: incident.querySelectorAll('[data-test-id="incident__address"]').length,
                    };
                })
                .then(result => {
                    const { value } = result;
                    const { titles, descriptions, images, previews, dates, addresses } = value;

                    assert.isOk(titles === 1, 'Incident should have one title');
                    assert.isOk(descriptions === 1 || descriptions === 0, 'Incident should have description or not');
                    // eslint-disable-next-line prettier/prettier
                    assert.isOk(images === 1 || previews === 1, 'Incident should have one image or one preview');
                    assert.isOk(dates === 1, 'Incident should have one date');
                    assert.isOk(addresses === 1, 'Incident should have one address');
                });
        });
    });

    describe('I want to see the first 10 bike theft cases, with the ability to - paginate (10 cases per page).', () => {
        it('should render 10 incidents per page', function() {
            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    return document.body.querySelectorAll('[data-test-id="incident"]').length;
                })
                .then(result => {
                    assert.isOk(result.value === 10, 'Should be 10 incidents per page');
                });
        });

        it('should change page by next button', function() {
            let prevTitle;

            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="pagination-next"]', timeout)
                .execute(() => {
                    const firstIncident = document.body.querySelector('[data-test-id="incident"]');
                    const incidentTitle = firstIncident.querySelector('[data-test-id="incident__title"]').textContent;

                    const nextButton = document.body.querySelector('[data-test-id="pagination-next"]');
                    nextButton.click();

                    return incidentTitle;
                })
                .then(result => {
                    prevTitle = result.value;
                })
                .waitForVisible('[data-test-id="pagination"]', timeout)
                .execute(() => {
                    const firstIncident = document.body.querySelector('[data-test-id="incident"]');

                    return firstIncident.querySelector('[data-test-id="incident__title"]').textContent;
                })
                .then(({ value }) => {
                    assert.isOk(value !== prevTitle, 'Should be different incidents titles from different pages');
                });
        });

        it('should change page by prev button', function() {
            let prevTitle;
            let nextTitle;

            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="pagination-next"]', timeout)
                .execute(() => {
                    const firstIncident = document.body.querySelector('[data-test-id="incident"]');
                    const incidentTitle = firstIncident.querySelector('[data-test-id="incident__title"]').textContent;

                    const nextButton = document.body.querySelector('[data-test-id="pagination-next"]');
                    nextButton.click();

                    return incidentTitle;
                })
                .then(result => {
                    prevTitle = result.value;
                })
                .waitForVisible('[data-test-id="pagination-prev"]', timeout)
                .execute(() => {
                    const firstIncident = document.body.querySelector('[data-test-id="incident"]');

                    const prevButton = document.body.querySelector('[data-test-id="pagination-prev"]');
                    prevButton.click();

                    return firstIncident.querySelector('[data-test-id="incident__title"]').textContent;
                })
                .then(result => {
                    nextTitle = result.value;
                })
                .waitForVisible('[data-test-id="pagination-next"]', timeout)
                .execute(() => {
                    const firstIncident = document.body.querySelector('[data-test-id="incident"]');

                    return firstIncident.querySelector('[data-test-id="incident__title"]').textContent;
                })
                .then(result => {
                    assert.isOk(nextTitle !== prevTitle, 'Should be different incidents titles from different pages');
                    assert.isOk(result.value === prevTitle, 'Should be equal titles after change page to prev');
                });
        });

        it('should change pages by number buttons', function() {
            let prevTitle;
            let nextTitle;

            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="pagination-next"]', timeout)
                .execute(() => {
                    const firstIncident = document.body.querySelector('[data-test-id="incident"]');
                    const incidentTitle = firstIncident.querySelector('[data-test-id="incident__title"]').textContent;

                    const secondPageButton = document.body.querySelector('[data-test-id="pagination-page-2"]');
                    secondPageButton.click();

                    return incidentTitle;
                })
                .then(result => {
                    prevTitle = result.value;
                })
                .waitForVisible('[data-test-id="pagination-prev"]', timeout)
                .execute(() => {
                    const firstIncident = document.body.querySelector('[data-test-id="incident"]');

                    const firstPageButton = document.body.querySelector('[data-test-id="pagination-page-1"]');
                    firstPageButton.click();

                    return firstIncident.querySelector('[data-test-id="incident__title"]').textContent;
                })
                .then(result => {
                    nextTitle = result.value;
                })
                .waitForVisible('[data-test-id="pagination-next"]', timeout)
                .execute(() => {
                    const firstIncident = document.body.querySelector('[data-test-id="incident"]');

                    return firstIncident.querySelector('[data-test-id="incident__title"]').textContent;
                })
                .then(result => {
                    assert.isOk(nextTitle !== prevTitle, 'Should be different incidents titles from different pages');
                    assert.isOk(result.value === prevTitle, 'Should be equal titles after change page to prev');
                });
        });
    });

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
                .execute(appStart)
                .waitForVisible('[data-test-id="loading"]', timeout)
                .execute(() => {
                    return Array.prototype.map.call(
                        document.body.querySelectorAll('[data-test-id="loading"]'),
                        ({ textContent }) => textContent
                    );
                })
                .then(result => {
                    assert.isOk(result.value.length === 1, 'It should be one loading component');
                    assert.isOk(result.value[0] === 'Loading ...', 'It should match text value');
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
                    return Array.prototype.map.call(
                        document.body.querySelectorAll('[data-test-id="error"]'),
                        ({ textContent }) => textContent
                    );
                })
                .then(result => {
                    assert.isOk(result.value.length === 1, 'It should be one error component');
                    assert.isOk(result.value[0] === 'Ooops, something went wrong', 'It should match text value');
                });
        });
    });

    describe('I want to see an empty state if there are no results.', () => {
        it('should render empty state', function() {
            return this.browser
                .url('/')
                .execute(mockEmptyIncidents)
                .waitForVisible('[data-test-id="incidents-list__empty"]', timeout)
                .execute(() => {
                    return Array.prototype.map.call(
                        document.body.querySelectorAll('[data-test-id="incidents-list__empty"]'),
                        ({ textContent }) => textContent
                    );
                })
                .then(result => {
                    assert.isOk(result.value.length === 1, 'It should be one empty component');
                    assert.isOk(result.value[0] === 'No results', 'It should match text value');
                });
        });
    });
});

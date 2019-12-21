const { assert } = require('chai');

const { timeout } = require('../utils/app');
const { mockIncidents, mockIncidentsWithError, mockEmptyIncidents } = require('../__mocks__/mockIncidents');

describe('Functional. Incidents Page', () => {
    describe('Incidents count', () => {
        it('should be three incidents', function() {
            return this.browser
                .url('/')
                .execute(mockIncidents)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => document.body.querySelectorAll('[data-test-id="incident"]').length)
                .then(result => {
                    assert.isOk(result.value === 3, 'Should be three mocked incidents');
                });
        });
    });

    describe('Incident title', () => {
        it('should match mocked value', function() {
            return this.browser
                .url('/')
                .execute(mockIncidents)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    const incident = document.body.querySelector('[data-test-id="incident"]');

                    return Array.prototype.map.call(
                        incident.querySelectorAll('[data-test-id="incident__title"]'),
                        ({ textContent }) => textContent
                    );
                })
                .then(result => {
                    assert.isOk(result.value.length === 1, 'Should be one title');
                    const titleText = 'Stolen 2017 State Bicycle Co. Matte Black 5';
                    assert.isOk(result.value[0] === titleText, 'It should match text value');
                });
        });
    });

    describe('Description incident', () => {
        it('should match mocked value', function() {
            return this.browser
                .url('/')
                .execute(mockIncidents)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    const incident = document.body.querySelector('[data-test-id="incident"]');

                    return Array.prototype.map.call(
                        incident.querySelectorAll('[data-test-id="incident__description"]'),
                        ({ textContent }) => textContent
                    );
                })
                .then(result => {
                    assert.isOk(result.value.length === 1, 'Should be one description');
                    const descriptionText = "Stolen during nighttime from the house's closed yard.";
                    assert.isOk(result.value[0] === descriptionText, 'It should match text value');
                });
        });
    });

    describe('Image incident', () => {
        it('should have a image src', function() {
            return this.browser
                .url('/')
                .execute(mockIncidents)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    const incident = document.body.querySelector('[data-test-id="incident"]');

                    return Array.prototype.map.call(
                        incident.querySelectorAll('[data-test-id="incident-image__image"]'),
                        image => image.style.backgroundImage
                    );
                })
                .then(result => {
                    assert.isOk(result.value.length === 1, 'First mocked incident should have one image');
                    const imageUrl = 'url("https://files.bikeindex.org/uploads/Pu/139855/small_bike-3.jpg")';
                    assert.isOk(result.value[0] === imageUrl, 'It should match the value');
                });
        });

        it('should have a preview', function() {
            return this.browser
                .url('/')
                .execute(mockIncidents)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    const incident = document.body.querySelectorAll('[data-test-id="incident"]')[2];

                    return incident.querySelectorAll('[data-test-id="incident-image__preview"]').length;
                })
                .then(result => {
                    assert.isOk(result.value === 1, 'Second mocked incident should have one preview');
                });
        });
    });

    describe('Incident occurred at', () => {
        it('should match format', function() {
            return this.browser
                .url('/')
                .execute(mockIncidents)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    const incident = document.body.querySelector('[data-test-id="incident"]');

                    return Array.prototype.map.call(
                        incident.querySelectorAll('[data-test-id="incident__date"]'),
                        ({ textContent }) => textContent
                    );
                })
                .then(result => {
                    assert.isOk(result.value.length === 1, 'It should have one occurred date');
                    assert.isOk(result.value[0] === 'Thu Oct 24 2019', 'It should match text value');
                });
        });
    });

    describe('Incident address', () => {
        it('should match mocked value', function() {
            return this.browser
                .url('/')
                .execute(mockIncidents)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    const incident = document.body.querySelector('[data-test-id="incident"]');

                    return Array.prototype.map.call(
                        incident.querySelectorAll('[data-test-id="incident__address"]'),
                        date => date.textContent
                    );
                })
                .then(result => {
                    assert.isOk(result.value.length === 1, 'It should have one address');
                    assert.isOk(result.value[0] === 'Berlin, 10963, DE', 'It should match text value');
                });
        });
    });

    describe('Loading state', () => {
        it('should render loading state', function() {
            return this.browser
                .url('/')
                .execute(mockIncidents)
                .waitForVisible('[data-test-id="loading"]', timeout)
                .execute(() =>
                    Array.prototype.map.call(
                        document.body.querySelectorAll('[data-test-id="loading"]'),
                        ({ textContent }) => textContent
                    )
                )
                .then(result => {
                    assert.isOk(result.value.length === 1, 'It should be one loading component');
                    assert.isOk(result.value[0] === 'Loading ...', 'It should match text value');
                });
        });
    });

    describe('Error state', () => {
        it('should render error state', function() {
            return this.browser
                .url('/')
                .execute(mockIncidentsWithError)
                .waitForVisible('[data-test-id="error"]', timeout)
                .execute(() =>
                    Array.prototype.map.call(
                        document.body.querySelectorAll('[data-test-id="error"]'),
                        ({ textContent }) => textContent
                    )
                )
                .then(result => {
                    assert.isOk(result.value.length === 1, 'It should be one error component');
                    assert.isOk(result.value[0] === 'Ooops, something went wrong', 'It should match text value');
                });
        });
    });

    describe('Empty state', () => {
        it('should render empty state', function() {
            return this.browser
                .url('/')
                .execute(mockEmptyIncidents)
                .waitForVisible('[data-test-id="incidents-list__empty"]', timeout)
                .execute(() =>
                    Array.prototype.map.call(
                        document.body.querySelectorAll('[data-test-id="incidents-list__empty"]'),
                        ({ textContent }) => textContent
                    )
                )
                .then(result => {
                    assert.isOk(result.value.length === 1, 'It should be one empty component');
                    assert.isOk(result.value[0] === 'No results', 'It should match text value');
                });
        });
    });
});

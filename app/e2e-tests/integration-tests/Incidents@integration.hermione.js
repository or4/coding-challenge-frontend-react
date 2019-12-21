const { assert } = require('chai');
const { isString, isNumber } = require('lodash');

const { appStart, timeout } = require('../utils/app');
const { isStringOrNull, isMatchType } = require('../utils/string');

describe('Integration. Incidents Page', () => {
    describe('Response', () => {
        it('should match scheme', function() {
            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    return window.e2e.responses[0].incidents[0];
                })
                .then(result => {
                    const { address, description, id, media, occurredAt, title, type } = result.value;
                    const { imageUrl, imageUrlThumb } = media;

                    assert.isOk(isNumber(id), "Field type 'id' should be a number");
                    assert.isOk(isNumber(occurredAt), "Field type 'occurredAt' should be a number");
                    assert.isOk(isString(title), "Field type 'title' should be a string");
                    assert.isOk(isStringOrNull(description), "Field type 'description' should be a string or null");
                    assert.isOk(isString(address), "Field type 'address' should be a string");
                    // eslint-disable-next-line prettier/prettier
                    assert.isOk(isMatchType(type), "Field type 'type' should be one of 'Crash', 'Hazard', 'Theft', 'Unconfirmed', 'Infrastructure issue', 'Chop shop'" + ', value: ' + type);
                    assert.isOk(isStringOrNull(imageUrl), "Field type 'imageUrl' should be a string or null");
                    assert.isOk(isStringOrNull(imageUrlThumb), "Field type 'imageUrlThumb' should be a string or null");
                });
        });
    });

    describe('Incident title', () => {
        it('should exist', function() {
            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    const incident = document.body.querySelector('[data-test-id="incident"]');

                    return incident.querySelectorAll('[data-test-id="incident__title"]').length;
                })
                .then(result => {
                    assert.isOk(result.value === 1, 'Incident should have one title');
                });
        });
    });

    describe('Description incident', () => {
        it('should exist', function() {
            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    const incident = document.body.querySelector('[data-test-id="incident"]');

                    return incident.querySelectorAll('[data-test-id="incident__description"]').length;
                })
                .then(result => {
                    assert.isOk(result.value === 1 || result.value === 0, 'Incident should have description or not');
                });
        });
    });

    describe('Image incident', () => {
        it('should have a image or a preview', function() {
            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    const incident = document.body.querySelector('[data-test-id="incident"]');

                    return {
                        image: incident.querySelectorAll('[data-test-id="incident-image__image"]').length,
                        preview: incident.querySelectorAll('[data-test-id="incident-image__preview"]').length,
                    };
                })
                .then(result => {
                    assert.isOk(
                        result.value.image === 1 || result.value.preview === 1,
                        'Incident should have one image or one preview'
                    );
                });
        });
    });

    describe('Incident occurred at', () => {
        it('should exist', function() {
            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    const incident = document.body.querySelector('[data-test-id="incident"]');

                    return incident.querySelectorAll('[data-test-id="incident__date"]').length;
                })
                .then(result => {
                    assert.isOk(result.value === 1, 'Incident should have one occurred date');
                });
        });
    });

    describe('Incident address', () => {
        it('should match mocked value', function() {
            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    const incident = document.body.querySelector('[data-test-id="incident"]');

                    return incident.querySelectorAll('[data-test-id="incident__address"]').length;
                })
                .then(result => {
                    assert.isOk(result.value === 1, 'Incident should have one address');
                });
        });
    });

    describe('Loading state', () => {
        it('should render loading state', function() {
            return this.browser
                .url('/')
                .execute(appStart)
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

    describe('Incidents count', () => {
        it('should render 10 incidents per page', function() {
            return this.browser
                .url('/')
                .execute(appStart)
                .waitForVisible('[data-test-id="incidents-list"]', timeout)
                .execute(() => {
                    return document.body.querySelectorAll('[data-test-id="incident"]').length;
                })
                .then(result => {
                    assert.isOk(result.value === 10, 'List should have 10 incidents per page');
                });
        });
    });
});

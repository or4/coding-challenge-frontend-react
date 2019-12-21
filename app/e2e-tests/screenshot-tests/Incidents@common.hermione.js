const { timeout } = require('../utils/app');
const { mockIncidents, mockIncidentsWithError, mockEmptyIncidents } = require('../__mocks__/mockIncidents');

describe('Screenshot. Incidents', function() {
    it('match loading scrennshot', function() {
        return this.browser
            .url('/')
            .execute(mockIncidents)
            .waitForVisible('[data-test-id="loading"]', timeout)
            .assertView('loading', '[data-test-id="loading"]');
    });

    it('match incidents list scrennshot', function() {
        return this.browser
            .url('/')
            .execute(mockIncidents)
            .waitForVisible('[data-test-id="incidents-list"]', timeout)
            .pause(2000)
            .assertView('incidents-list', '[data-test-id="incidents-list"]');
    });

    it('match page scrennshot', function() {
        return this.browser
            .url('/')
            .execute(mockIncidents)
            .waitForVisible('[data-test-id="incidents-list"]', timeout)
            .pause(2000)
            .assertView('page', 'body');
    });

    describe('Error state', () => {
        it('match error state scrennshot', function() {
            return this.browser
                .url('/')
                .execute(mockIncidentsWithError)
                .waitForVisible('[data-test-id="error"]', timeout)
                .assertView('plain', '[data-test-id="error"]');
        });
    });

    describe('Empty state', () => {
        it('match empty state scrennshot', function() {
            return this.browser
                .url('/')
                .execute(mockEmptyIncidents)
                .waitForVisible('[data-test-id="incidents-list__empty"]', timeout)
                .assertView('plain', '[data-test-id="incidents-list__empty"]');
        });
    });
});

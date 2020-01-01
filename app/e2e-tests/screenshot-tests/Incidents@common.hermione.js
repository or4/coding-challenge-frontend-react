const { timeout } = require('../utils/app');
const { mockIncidents, mockIncidentsWithError, mockEmptyIncidents } = require('../__mocks__/mockIncidents');

describe('Screenshot. Incidents', function() {
    it('should match loading scrennshot', function() {
        return this.browser
            .url('/')
            .execute(mockIncidents)
            .waitForVisible('[data-test-id="loading"]', timeout)
            .assertView('loading', '[data-test-id="loading"]');
    });

    it('should match incidents list scrennshot', function() {
        return this.browser
            .url('/')
            .execute(mockIncidents)
            .waitForVisible('[data-test-id="incidents-list"]', timeout)
            .pause(2000)
            .assertView('incidents-list', '[data-test-id="incidents-list"]');
    });

    it('should match paging scrennshot', function() {
        return this.browser
            .url('/')
            .execute(mockIncidents)
            .waitForVisible('[data-test-id="pagination-next"]', timeout)
            .execute(() => {
                const secondPageButton = document.body.querySelector('[data-test-id="pagination-page-2"]');
                secondPageButton.click();
            })
            .then(() => {})
            .waitForVisible('[data-test-id="pagination-prev"]', timeout)
            .assertView('pagination', '[data-test-id="pagination"]');
    });

    it('should match page scrennshot', function() {
        return this.browser
            .url('/')
            .execute(mockIncidents)
            .waitForVisible('[data-test-id="incidents-list"]', timeout)
            .pause(2000)
            .assertView('page', 'body');
    });

    describe('Error state', () => {
        it('should match error state scrennshot', function() {
            return this.browser
                .url('/')
                .execute(mockIncidentsWithError)
                .waitForVisible('[data-test-id="error"]', timeout)
                .assertView('plain', '[data-test-id="error"]');
        });
    });

    describe('Empty state', () => {
        it('should match empty state scrennshot', function() {
            return this.browser
                .url('/')
                .execute(mockEmptyIncidents)
                .waitForVisible('[data-test-id="incidents-list__empty"]', timeout)
                .assertView('plain', '[data-test-id="incidents-list__empty"]');
        });
    });
});

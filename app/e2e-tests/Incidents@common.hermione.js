const { mockIncidents } = require('./helpers/mockIncidents');
const timeout = 5000;

describe('Incidents', function() {
    it('should render loading', function() {
        return this.browser
            .url('/')
            .execute(mockIncidents)
            .waitForVisible('[data-test-id="loading"]', timeout)
            .assertView('loading', '[data-test-id="loading"]');
    });

    it('should render header', function() {
        return this.browser
            .url('/')
            .execute(mockIncidents)
            .waitForVisible('[data-test-id="header"]', timeout)
            .assertView('header', '[data-test-id="header"]');
    });

    it('should render incidents list', function() {
        return this.browser
            .url('/')
            .execute(mockIncidents)
            .waitForVisible('[data-test-id="incidents-list"]', timeout)
            .assertView('incidents-list', '[data-test-id="incidents-list"]');
    });

    it('should render page', function() {
        return this.browser
            .url('/')
            .execute(mockIncidents)
            .waitForVisible('[data-test-id="incidents-list"]', timeout)
            .assertView('page', 'body');
    });
});

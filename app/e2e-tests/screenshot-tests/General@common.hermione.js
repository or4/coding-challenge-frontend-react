const { timeout } = require('../utils/app');
const { mockIncidents } = require('../__mocks__/mockIncidents');

describe('Screenshot. General', function() {
    it('should render header', function() {
        return this.browser
            .url('/')
            .execute(mockIncidents)
            .waitForVisible('[data-test-id="header"]', timeout)
            .assertView('header', '[data-test-id="header"]');
    });
});

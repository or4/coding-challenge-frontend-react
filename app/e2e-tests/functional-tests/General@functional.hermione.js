const { expect } = require('chai');

describe('Functional. General', function() {
    it('should load with the right title', async function() {
        const actualTitle = await this.browser.url('/').getTitle();

        expect(actualTitle).to.eql('Stolen Bike Index');
    });
});

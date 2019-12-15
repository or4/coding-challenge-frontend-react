const { expect } = require('chai');

describe('General', function() {
    it('should load with the right title', async function() {
        const test = this.browser.url('/');

        const actualTitle = await test.getTitle();

        expect(actualTitle).to.eql('Stolen Bike Index');
    });
});

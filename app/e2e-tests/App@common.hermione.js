const expect = require('chai').expect;

describe('App', function() {
    it('should load with the right title', async function() {
        const test = this.browser.url('/');

        const actualTitle = await test.getTitle();

        expect(actualTitle).to.eql('Stolen Bike Index');
    });
});

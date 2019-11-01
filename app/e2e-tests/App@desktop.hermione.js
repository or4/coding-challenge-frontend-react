describe('App desktop', function() {
    it('should render', function() {
        return this.browser.url('/').assertView('plain', '.app');
    });
});

describe('App phone', function() {
    it('should render', function() {
        return this.browser.url('/').assertView('plain', '.app');
    });
});

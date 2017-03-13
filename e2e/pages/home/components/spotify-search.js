class SpotifySearch {
    constructor(hostElement) {
        this._containerElement = hostElement.element(by.css('spotify-search'));
        this._inputElement = this._containerElement.element(by.model('$ctrl.searchText'));
        this._resultsContainerElement = this._containerElement.element(by.css('md-content.search-results-container'));
        this._topResultsTabContainerElement = this._resultsContainerElement.element(by.id('tab-content-1'));
        this._artistsResultsTabContainerElement = this._resultsContainerElement.element(by.id('tab-content-2'));
        this._albumsResultsTabContainerElement = this._resultsContainerElement.element(by.id('tab-content-3'));
        this._resultTopItemElements = this._resultsContainerElement.all(by.css(''));
    }

    getPlaceholderText() {
        return this._inputElement.getAttribute('placeholder');
    }

    async isEmpty() {
        const value = await this._inputElement.getAttribute('value');
        return value === '';
    }

    isVisible() {
        return this._containerElement.isPresent();
    }

    type(itemText) {
        this._inputElement.clear();
        this._inputElement.sendKeys(itemText);
        return browser.sleep(2000);
    }

    clear() {
        return this._inputElement.clear();
    }

    isResultsContainerVisible() {
        return this._resultsContainerElement.isPresent();
    }

    clickTopTab() {
        this._resultsContainerElement.element(by.css('md-tab-item[md-tab-id="1"]')).click();
        let EC = protractor.ExpectedConditions;
        return browser.wait(EC.visibilityOf(this._topResultsTabContainerElement), 2000);
    }

    async isTopTabActive() {
        const elementClass = await this._topResultsTabContainerElement.getAttribute('class');
        return elementClass.indexOf('md-active') !== -1;
    }

    getTopTabArtistsCount() {
        return this._topResultsTabContainerElement.all(by.css('div>md-list>artist')).count();
    }

    getTopTabAlbumsCount() {
        return this._topResultsTabContainerElement.all(by.css('div>md-list>album')).count();
    }

    clickArtistsTab() {
        this._resultsContainerElement.element(by.css('md-tab-item[md-tab-id="2"]')).click();
        let EC = protractor.ExpectedConditions;
        return browser.wait(EC.visibilityOf(this._artistsResultsTabContainerElement), 2000);
    }

    async isArtistsTabActive() {
        const elementClass = await this._artistsResultsTabContainerElement.getAttribute('class');
        return elementClass.indexOf('md-active') !== -1;
    }

    getArtistsTabArtistsCount() {
        return this._artistsResultsTabContainerElement.all(by.css('div>md-list>artist')).count();
    }

    clickAlbumsTab() {
        this._resultsContainerElement.element(by.css('md-tab-item[md-tab-id="3"]')).click();
        let EC = protractor.ExpectedConditions;
        return browser.wait(EC.visibilityOf(this._albumsResultsTabContainerElement), 2000);
    }

    async isAlbumsTabActive() {
        const elementClass = await this._albumsResultsTabContainerElement.getAttribute('class');
        return elementClass.indexOf('md-active') !== -1;
    }

    getAlbumsTabAlbumsCount() {
        return this._albumsResultsTabContainerElement.all(by.css('div>md-list>album')).count();
    }
}

export default SpotifySearch;
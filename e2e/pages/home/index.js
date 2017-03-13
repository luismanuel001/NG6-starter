import SpotifySearch from './components/spotify-search';

class HomePage {
    constructor() {
        this._titleElement = element(by.css('title'));

        this._containerElement = element(by.css('app'));
        this._navbarElement = this._containerElement.element(by.css('navbar h2'));

        this._spotifySearch = new SpotifySearch(this._containerElement);
    }

    get spotifySearch() {
        return this._spotifySearch;
    }

    load() {
        return browser.get('/');
    }

    getTitle() {
        return this._titleElement.getText();
    }

    getNavbar() {
        return this._navbarElement.getText();
    }
}

export default HomePage;
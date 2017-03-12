/**
 * Controller for the SpotifySearchComponent
 *
 * @class SpotifySearchController
 */
class SpotifySearchController {
    constructor($timeout, rx, SpotifySearch) {
        'ngInject';
        this.name = 'spotifySearch';
        this.$timeout = $timeout;
        this.rx = rx;
        this.SpotifySearch = SpotifySearch;
    }

    $onInit() {
        this.searchResults = [];
        this.isLoading = false;
        this.selectedTab = 0;
        this.resultSize = 20;
        this.initTypeaheadObservable();
    }

    $onDestroy() {
        this.typeaheadObservable.dispose();
    }

    /**
     * Initialize typeahead Observable
     *
     *
     * @memberOf SpotifySearchController
     */
    initTypeaheadObservable() {
        /**
         * Notice the use of Observables for a more efficient implementation of the typeahead input,
         * it features debouncing for delayed keystrokes, min length validation, distinct queries
         * and cancelable http requests
         */
        this.typeaheadObservable = this.rx.createObservableFunction(this, 'search')
            .debounce(400)
            .map(q => q.trim())
            .filter(q => q.length > 2)
            .distinctUntilChanged()
            .map(q => {
                this.isLoading = true;
                return this.SpotifySearch.query(q, { limit: this.resultSize, offset: 0 })
            })
            .switch()
            .subscribe(results => {
                this.$timeout(() => {
                    this.isLoading = false;
                    this.searchResults = {
                        albums: results.data.albums.items,
                        artists: results.data.artists.items
                    }
                });
            }, err => this.isLoading = false);
    }

    /**
     * Method to go to the specified tab
     *
     * @param {number} index
     *
     * @memberOf SpotifySearchController
     */
    goToTab(index) {
        this.selectedTab = index;
    }

    /**
     * Get More search results used for pagination
     *
     * @param {string} type - Search query type, can be 'artist' or 'album'
     *
     * @memberOf SpotifySearchController
     */
    getMore(type) {
        this.isLoading = true;
        let offset;
        if (type === 'artist') offset = this.searchResults.artists.length;
        else offset = this.searchResults.albums.length;
        this.SpotifySearch.query(this.searchText, { limit: this.resultSize, offset: offset, type: type })
            .subscribe(results => {
                this.$timeout(() => {
                    this.isLoading = false;
                    if (results.data.artists) this.searchResults.artists = this.searchResults.artists.concat(results.data.artists.items);
                    if (results.data.albums) this.searchResults.albums = this.searchResults.albums.concat(results.data.albums.items);
                });
            }, err => this.isLoading = false);
    }
}

export default SpotifySearchController;
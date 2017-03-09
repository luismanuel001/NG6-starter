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
        this.initTypeaheadObservable();
    }

    $onDestroy() {
        this.typeaheadObservable.dispose();
    }

    initTypeaheadObservable() {
        this.typeaheadObservable = this.rx.createObservableFunction(this, 'search')
            .debounce(400)
            .map(q => q.trim())
            .filter(q => q.length > 2)
            .distinctUntilChanged()
            .map(q => {
                this.isLoading = true;
                return this.SpotifySearch.query(q, 20, 0)
            })
            .switch()
            .subscribe(results => {
                this.$timeout(() => {
                    this.isLoading = false;
                    this.searchResults = {
                        top: results.data.artists.items.concat(results.data.albums.items),
                        albums: results.data.albums.items,
                        artist: results.data.artists.items
                    }
                });
            });
    }
}

export default SpotifySearchController;
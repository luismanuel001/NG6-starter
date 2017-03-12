/**
 * Controller for the Artist Component
 *
 * @class ArtistController
 */
class ArtistController {
    constructor($timeout, SpotifySearch) {
        'ngInject';

        this.name = 'artist';
        this.$timeout = $timeout;
        this.SpotifySearch = SpotifySearch;
    }

    $onInit() {

    }

    /**
     * Toggles the list of albums
     *
     *
     * @memberOf ArtistController
     */
    toggleAlbums() {
        if (this.showAlbums) {
            this.showAlbums = false;
        } else if (this.albums) {
            this.showAlbums = true;
        } else {
            this.showAlbums = true;
            this.getAlbums();
        }
    }

    /**
     * Gets the list of Albums from the SpotifyService
     *
     *
     * @memberOf ArtistController
     */
    getAlbums() {
        this.isLoading = true;
        this.SpotifySearch.getAlbums(this.item.id)
            .subscribe(results => {
                this.$timeout(() => {
                    this.isLoading = false;
                    this.albums = results.data.items;
                });
            }, err => this.isLoading = false);
    }
}

export default ArtistController;
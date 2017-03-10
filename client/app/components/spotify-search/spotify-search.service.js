class SpotifySearchService {
    constructor($http, $q, rx, spotifyApiUrl) {
        'ngInject'
        this.$http = $http;
        this.$q = $q;
        this.rx = rx;
        this.spotifyApiUrl = spotifyApiUrl;
    }

    query(q, options) {
        let params = {
            q: q,
            type: options.type || 'artist,album',
            limit: options.limit || 10,
            offset: options.offset || 0
        };
        return this.rx.Observable.fromPromise(this.$http.get(`${this.spotifyApiUrl}/search`, { params: params }));
    }

    getAlbums(id) {
        return this.rx.Observable.fromPromise(this.$http.get(`${this.spotifyApiUrl}/artists/${id}/albums`, { params: params }));
    }
}

export default SpotifySearchService;
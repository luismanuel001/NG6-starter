class SpotifySearchService {
    constructor($http, $q, rx, spotifyApiUrl) {
        'ngInject'
        this.$http = $http;
        this.$q = $q;
        this.rx = rx;
        this.spotifyApiUrl = spotifyApiUrl;
    }

    query(q, limit, offset) {
        limit = limit || 10;
        offset = offset || 0;
        let params = {
            q: q,
            type: 'artist,album',
            limit: limit,
            offset: offset
        };
        return this.rx.Observable.fromPromise(this.$http.get(`${this.spotifyApiUrl}/search`, { params: params }));
    }
}

export default SpotifySearchService;
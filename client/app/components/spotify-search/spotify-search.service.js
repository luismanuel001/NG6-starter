/**
 * Service to interface with the SpotifyWebApi
 *
 * @class SpotifySearchService
 */
class SpotifySearchService {
    constructor($timeout, $http, $q, $httpParamSerializer, rx, localStorageService, spotifyApiUrl) {
        'ngInject'
        this.$timeout = $timeout;
        this.$http = $http;
        this.$q = $q;
        this.$httpParamSerializer = $httpParamSerializer;
        this.rx = rx;
        this.localStorageService = localStorageService;
        this.spotifyApiUrl = spotifyApiUrl;
        this.cache = this.loadCache();
    }

    /**
     * Load cache from LocalStorage
     *
     * @returns Object - The cache object
     *
     * @memberOf SpotifySearchService
     */
    loadCache() {
        return this.localStorageService.get('appCache') || {};
    }

    /**
     * Save Cache into LocalStorage
     *
     *
     * @memberOf SpotifySearchService
     */
    saveCache() {
        this.localStorageService.set('appCache', this.cache);
    }

    /**
     * Gets specific cached object, or returns false if not currently in cache
     *
     * @param {string} key - The key of the cached object
     * @returns Object - cache object
     *
     * @memberOf SpotifySearchService
     */
    getFromCache(key) {
        return this.cache[key] || false;
    }

    /**
     * Adds a new object to the cache and saves it to LocalStorage
     *
     * @param {string} key
     * @param {object} value
     *
     * @memberOf SpotifySearchService
     */
    addToCache(key, value) {
        this.cache[key] = value;
        this.saveCache();
    }

    /**
     * Method that returns an Observable with the response of the input url from cache if already present,
     * or executes a new get request and saves it to cache if not present
     *
     * @param {string} url - Url string to execute http get request
     * @returns {Observable}
     *
     * @memberOf SpotifySearchService
     */
    getRequestWithCache(url) {
        /**
         * The $http requests are cached and persisted to LocalStorage. I could have used the built-in caching
         * mechanism of the angular's $http service, which can also be setup to use LocalStorage for persistency,
         * but I chose to interface with LocalStorage directly (with the help of the angular-local-storage module)
         * to to comply with the test requirements
         */
        if (this.getFromCache(url)) {
            return this.rx.Observable.create(observer => {
                observer.onNext(this.getFromCache(url));
                observer.onCompleted();
            })
        } else {
            return this.rx.Observable.create(observer => {
                this.$http.get(url).then(response => {
                    this.addToCache(url, response);
                    observer.onNext(response);
                    observer.onCompleted();
                }, err => {
                    observer.onError(err);
                });
            });
        }
    }

    /**
     * Method to perform a search on the SpotifyWebApi with the given params
     * /search?q=${q}
     *
     * @param {string} q - The search string to be queried
     * @param {object} options - Options to send to the SpotifyWebApi search endpoint
     * @returns {Observable} Response of the search
     *
     * @memberOf SpotifySearchService
     */
    query(q, options) {
        let params = {
            q: q,
            type: options.type || 'artist,album',
            limit: options.limit || 10,
            offset: options.offset || 0
        };
        let url = `${this.spotifyApiUrl}/search?${this.$httpParamSerializer(params)}`;
        return this.getRequestWithCache(url);
    }

    /**
     * Method to retrieve the albums of a given Artist from the SpotifyWebApi
     * /artists/${id}/albums
     * @param {string} id - Spotify id of the artist
     * @returns {Observable} Response with array of albums
     *
     * @memberOf SpotifySearchService
     */
    getAlbums(id) {
        let url = `${this.spotifyApiUrl}/artists/${id}/albums`;
        return this.getRequestWithCache(url);
    }
}

export default SpotifySearchService;
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './spotify-search.component';
import SpotifySearchService from './spotify-search.service';

export default angular
    .module('app.spotifySearch', [uiRouter])
    .component('spotifySearch', component)
    .constant('spotifyApiUrl', 'https://api.spotify.com/v1')
    .service('SpotifySearch', SpotifySearchService)
    .name;
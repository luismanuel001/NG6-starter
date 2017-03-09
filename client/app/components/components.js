import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import SpotifySearch from './spotify-search/spotify-search';

let componentModule = angular.module('app.components', [
    Home,
    About,
    SpotifySearch
])

.name;

export default componentModule;
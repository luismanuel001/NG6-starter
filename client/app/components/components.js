import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import SpotifySearch from './spotify-search/spotify-search';
import Artist from './spotify-search/artist/artist';
import Album from './spotify-search/album/album';

let componentModule = angular.module('app.components', [
    Home,
    About,
    SpotifySearch,
    Artist,
    Album
])

.name;

export default componentModule;
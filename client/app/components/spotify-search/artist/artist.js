import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './artist.component';

export default angular
    .module('app.artist', [uiRouter])
    .component('artist', component)
    .name;
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './album.component';

export default angular
    .module('app.album', [uiRouter])
    .component('album', component)
    .name;
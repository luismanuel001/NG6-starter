import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';
import ngMaterial from 'angular-material';
import rx from 'rx-angular';
import LocalStorageModule from 'angular-local-storage';

angular.module('app', [
        uiRouter,
        Common,
        Components,
        ngMaterial,
        'rx',
        LocalStorageModule
    ])
    .config(($locationProvider) => {
        'ngInject';
        // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
        // #how-to-configure-your-server-to-work-with-html5mode
        $locationProvider.html5Mode(true).hashPrefix('!');
    })

.component('app', AppComponent);
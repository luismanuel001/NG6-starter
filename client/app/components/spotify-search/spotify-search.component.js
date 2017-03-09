import template from './spotify-search.html';
import controller from './spotify-search.controller';

import './spotify-search.scss';

const component = {
    restrict: 'E',
    bindings: {
        searchText: '<'
    },
    template,
    controller
};

export default component;
import template from './artist.html';
import controller from './artist.controller';

import './artist.scss';

const component = {
    restrict: 'E',
    bindings: {
        item: '<'
    },
    template,
    controller
};

export default component;
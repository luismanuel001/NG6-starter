import template from './album.html';
import controller from './album.controller';

import './album.scss';

const component = {
    restrict: 'E',
    bindings: {
        item: '<'
    },
    template,
    controller
};

export default component;
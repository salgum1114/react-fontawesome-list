'use strict';

if (!module.hot || process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/react-fontawesome-list.min.js');
} else {
    module.exports = require('./dist/react-fontawesome-list.js');
}

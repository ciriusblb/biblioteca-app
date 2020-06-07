(function () {
    'use strict';

    angular.module('app.main', [
       //Independientes
        'app.core',
        'app.widgets',

        'app.CRUD',
        'app.historial',
        'app.layout'
    ]);
}());
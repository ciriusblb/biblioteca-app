(function() {
    'use strict';

    angular
        .module('app.CRUD')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                name: 'CRUD',
                config: {
                    url: '/',
                    templateUrl: 'app/CRUD/CRUD.html',
                    controller: 'CRUD',
                    controllerAs: 'vm',
                    title: 'CRUD',
                    settings: {
                        nav: 1,
                        content: '<i class="glyphicon glyphicon-home"></i> CRUD'
                    }
                }
            }
        ];
    }
}());

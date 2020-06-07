(function () {
    'use strict';
//de donde se va a mandar los datos al blocks
    angular.module('app.core', [
       //modulos de Angular
        'ngSanitize',

       //Componentes reutilizables Independientes
        'blocks.exception',
        'blocks.logger',
        'blocks.router',

       //Componentes Dependientes o de Negocio
        'app.data',
       //modulos terceros
        'ui.router'
    ]);
}());
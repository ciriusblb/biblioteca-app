(function () {
    'use strict';

    angular.module('blocks.exception')
        .provider('exceptionHandler', exceptionHandlerProvider)//rpovider, configuracion del modulo antes de que la APP inicie
        .config(config);//configurararion general  del module como app.config y ahi se define el provider

    function exceptionHandlerProvider(){//definicion del provider
        this.config = {//configuracion del mensaje de error
             appErrorPrefix: undefined//un prefijo del mensaje de error
        };

        this.configure = function (appErrorPrefix) {
            this.config.appErrorPrefix = appErrorPrefix;
        };

        this.$get = function () {//funcion get del servicio provider
            return {
                config: this.config
            };
        }
    }

    function config($provide){//otra funcion config diferente al de arriba
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    function extendExceptionHandler($delegate, exceptionHandler, logger){
        //exceptionHandler es el nombre del provider
        return function (exception, cause) {     
            var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';//recuperamos el prefijo mensaje de error
            var errorData = {exception: exception, cause: cause};
            exception.message = appErrorPrefix + exception.message;//configurmos el mensaje con el prefijo del mensaje
            $delegate(exception, cause);//es como guardar en el provider mediante el servicio $delegate de angular
            // throw {message: 'error cualquiera'}
            logger.error(exception.message, errorData);
        };
    }
}());
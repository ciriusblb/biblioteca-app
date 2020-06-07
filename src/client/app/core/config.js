(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);//configurar modulo antes de que se inicie la app,pedimos que inicie la funcion toastrConfig

    function toastrConfig(toastr){//configuramos los mensajes toastr
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[Biblioteca-App Error] ', //es el prefijo de mensajes de error que se enviara al excetion handler decorator
        appTitle: 'Angular Biblioteca-App',
        version: '1.0.0'//version del app
    };

    core.value('config', config);//objeto del modulo llamado 'config' definido por el objeto config de arriba

    core.config(configure);//configuramos el modulo antes de que inicie la App

    function configure($logProvider,
                          $urlRouterProvider,
                          $stateProvider,
                          routehelperConfigProvider,
                          exceptionHandlerProvider,
                          $httpProvider){
        //routehelperConfigProvider el nombre del provider de routerHelperConfig
        //exceptionHandlerProvider el nombre del provider de exceptio-handler-provider

        //activa o descativa el debugging
        // es el proceso de búsqueda y resolución de defectos o problemas dentro del programa que impide el correcto funcionamiento del software de la computadora o un sistema.
        if($logProvider.debugEnabled){
            $logProvider.debugEnabled(true);
        }

        routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;//routehelperConfigProvider.config.$urlRouterProvider del provider de routerhelper le paso el valor verdadero de $urlRouterProvider
        routehelperConfigProvider.config.$stateProvider = $stateProvider;//routehelperConfigProvider.config.$stateProvider del provider de routerhelper le paso el valor verdadero de $stateProvider
        routehelperConfigProvider.config.docTitle = "Biblioteca-App: ";//verdadero doctitle para el eltitulo de app


        var resolveAlways = {
            ready : function(dataService){
                return dataService.ready();
            }
        }
        routehelperConfigProvider.config.resolveAlways= resolveAlways;//los datos para routerhelperprovider


        exceptionHandlerProvider.configure(config.appErrorPrefix);//pasamod a la funcion configure de  exceptionHandlerProvider el prefijo demmensaje de error appErrorPrefix 

        $httpProvider.defaults.transformRequest = function(data) {
            if(undefined === data) return data;
            console.log(" data ",data);
            var formData = new FormData();
            angular.forEach(data, function(value, key) {
              if(value instanceof FileList) {
                if(value.length === 1)
                  formData.append(key, value[0]);
                else {
                  angular.foreach(value, function(file, index) {
                    formData.append(key + '_' + index, file);
                  });
                }
              } else {
                formData.append(key, value);
              }
            });
            return formData;
          };
          $httpProvider.defaults.headers.post['Content-Type'] = undefined;
          $httpProvider.defaults.headers.common['Content-Type'] = undefined;
          $httpProvider.defaults.headers.put['Content-Type'] = undefined;
    }
}());
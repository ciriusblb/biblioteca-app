
(function () {
    'use strict';

    angular.module('blocks.router')
        .provider('routehelperConfig', routehelperConfig)//configuraciones generales de rutas ya disponibles antes de iniciar la App
        .factory('routehelper', routehelper);//servicio para rutas

    routehelper.$inject = ['$rootScope','$state','logger','routehelperConfig'];
    //provider
    function routehelperConfig(){
        this.config = {
           $stateProvider : undefined,//stateProvider: configura los estasdos de la ruta como el templateurl, controlador, url, etc
           $urlRouterProvider: undefined,//$urlRouterProvider: coloca una ruta por default cuando la url no existe
           // resolveAlways: undefined,//resolveAlways
           docTitle : undefined//titulo para lavista
        };

        this.$get = function () {
          return{
              config: this.config
          }
        };
    }
    //servicio factory
    function routehelper($rootScope, $state, logger, routehelperConfig){
      //routehelperConfig no es la funcion sino el nombre del provider
       var routes = [];//array donde agregaremos todas las rutas confuiguradas

       var $urlRouterProvider = routehelperConfig.config.$urlRouterProvider;
       var $stateProvider = routehelperConfig.config.$stateProvider;

       var service = {
         configureRoutes: configureRoutes,
         getRoutes: getRoutes
       };

        init();

        return service;
        function getRoutes(){
          // $state.get() va a tener informacion de todos los estados configurados
            for (var i = 0; i < $state.get().length; i++) {
                var route = $state.get()[i];//
                var isRoute = !!route.title;//aseguramos si es una ruta, es un valor booleano, si la ruta tiene titulo es true sino es false
                if(isRoute){//si es true
                    routes.push(route);//al array de routes del inicio agregamos la ruta
                }
            }

            return routes;//retornamos el array
        }

        //configurar las rutas para los estados, para eso necesitamos todas las rutas configuradas en un array  'routes' de la funcion getRoutes
        function configureRoutes(routes){
            routes.forEach(function (route) {//para cada elemento de un array, es decir para cada ruta del array de rutas
                  // route.config.resolve =//al entrar una vista no solo se va a cargar los datos de esa vista sino tambien de las demas vista, asi nuestra app
                  // //estara preparada con los datos ya listos, en eso actual el resolveAlways que tiene los datos de las demas vistas
                  //   angular.extend(route.config.resolve || {},//obtengo los datos con de la ruta en especifico con resolve y si nohay pues un objeto vacio
                  //                       routehelperConfig.config.resolveAlways);//ademas obtengo los datos de las demas vistas

                    //resolve, para inicializar datos al elegir una ruta
                    //route.config   config es una propiedad de la ruta 
                $stateProvider.state(route.name, route.config);//una vez preparado todo lo anterior configuramos los estados para las rutas
                //esto es como hacer...

                //------todo esto------
                // $stateProvider
                // .state('BooksApp',{
                //   abstract:true,
                //   url: '/BooksApp',
                //   templateUrl:'/views/user/index.html',
                //   controller:'LoginCtrl as vm'
                // })
                //------todo esto------

            });
            $urlRouterProvider.otherwise("/");//por defecto la ruta de inicio
        }

        function init(){
            updateDocTitle();
        }

        function updateDocTitle(){//$rootScope es un obejto al cual se enlace un modelo disponible en el 
        // controlador y usado dentro de la vista, osea con rootscope tendremos datos preparados para cuando cambie la ruta
            $rootScope.$on('$stateChangeSuccess',//evento de cambio de estados de rutas
                function (event, toState, fromState) {
                  //toState la ruta a donde se va a naveggar
                   var title = routehelperConfig.config.docTitle + ' ' + (toState.title || '');
                    $rootScope.title = title; //databind hacia la etiqueta <title> de las vistas, osea envia datos con 'ng-bind' al aetiqueta
                });
        }
    };
}());
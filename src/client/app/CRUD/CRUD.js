(function() {
    'use strict';

    angular
        .module('app.CRUD')
        .controller('CRUD', CRUD);

    CRUD.$inject = ['dataservice', 'logger','$scope','$timeout'];

    function CRUD(dataservice, logger,$scope,$timeout) {

        /*jshint validthis: true */
        var vm = this;
        logger.info('CRUD activado');

        vm.formulario={
            titulo:'mi libro favorito',
            autor:'ciro alegria',
            descripcion:'este es el libro favorito de ciro alegria',
            editorial:'navarrete',
            imagen:'image',
            ejemplares:'15',
            area:'Tesis',
            carrera:'ADMINISTRACIÓN Y NEGOCIOS INTERNACIONALES'

        }

        $scope.newImage={};
        $scope.thumbnail = {
                dataUrl: ''
            };

        $scope.fileReaderSupported = window.FileReader != null;
        $scope.photoChanged = function(files){
            if (files != null) {
                var file = files[0];
                console.log('file ',file)
                if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
                    $timeout(function() {
                        var fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function(e) {
                            $timeout(function(){
                                $scope.thumbnail.dataUrl = e.target.result;  
                            });
                        }
                    });
                }
            }
        };
        vm.guardar=function(){
            dataservice.save(vm.formulario,function(data){
                console.log(data);
            })        
        }

        vm.showAgregar=false;
    
        dataservice.query(function(data){
             vm.book = data;
        })

        vm.agregar =function(){
            vm.showAgregar=!vm.showAgregar;
            vm.showAction1=1;
        }
        vm.view = function(){
            vm.showAction2=1;
            vm.showAction3=1;
        }
        vm.editar= function(){
            vm.showAction1=1;
            vm.showAction3=1;
        }

    
    }
}());

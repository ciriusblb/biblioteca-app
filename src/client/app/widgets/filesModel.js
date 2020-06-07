'use strict';
angular.module('app.widgets')
    .directive('filesModel', [function() { 
        return {
            controller: ['$parse', '$element', '$attrs', '$scope', function($parse, $element, $attrs, $scope){
                var exp = $parse($attrs.filesModel);
 
                $element.on('change', function(){
                    console.log("this.files ",this.files);
                    exp.assign($scope, this.files);
                    $scope.$apply();
                });
            }]
        }
    }]);
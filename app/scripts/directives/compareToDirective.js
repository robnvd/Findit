(function () {
    'use strict';

    angular
        .module('Findit.Core')
        .directive('compareTo', directive);

    directive.$inject = [];
    function directive() {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A',
            scope: {
                otherValue: '=compareTo'
            }
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue === scope.otherValue;
            };

            scope.$watch('otherValue', function() {
                ngModel.$validate();
            });
        }
    }
})();
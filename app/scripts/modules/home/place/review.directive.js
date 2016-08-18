(function () {
    'use strict';

    angular
        .module('Findit.Home')
        .directive('review', review);

    function review() {
        // Usage:
        // <review author="" createdOn="" reviewText="" rating=""></review>
        // Creates:
        //
        var directive = {
            bindToController: true,
            templateUrl: 'templates/home/review.template.html',
            controller: directiveController,
            controllerAs: 'vm',
            link: linkFunction,
            restrict: 'E',
            scope: {
                author: '=',
                createdOn: '=',
                reviewText: '=',
                rating: '='
            }
        };
        return directive;

        function linkFunction(scope, element, attrs) {
        }
    }
    directiveController.$inject = ['$scope'];
    function directiveController($scope) {

    }
})();
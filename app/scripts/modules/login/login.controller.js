(function () {
    'use strict';

    angular
        .module('Findit.Login')
        .controller('loginController', controller);

    controller.$inject = ['$scope'];
    function controller($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() { }
    }
})();
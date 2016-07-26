(function () {
    'use strict';

    angular
        .module('LicentaWeb.Controllers')
        .controller('loginController', controller);

    controller.$inject = ['$scope'];
    function controller($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() { }
    }
})();
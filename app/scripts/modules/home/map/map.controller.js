(function () {
    angular
        .module('Findit.Home')
        .controller('mapController', controller);

    controller.$inject = ['$scope'];
    function controller($scope) {
        var vm = this;
    }
})();
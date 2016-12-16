(function () {
    angular
        .module('Findit.Map')
        .controller('mapController', controller);

    controller.$inject = ['$scope'];
    function controller($scope) {
        var vm = this;
    }
})();
(function () {
    angular
        .module('Findit.Home')
        .controller('homeController', controller);

    controller.$inject = ['$scope'];
    function controller($scope) {
        var vm = this;
    }
})();
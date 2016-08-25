(function() {
'use strict';

    angular
        .module('Findit.Account')
        .controller('forgotController', forgotController);

    forgotController.$inject = ['$user'];
    function forgotController($user) {
        var vm = this;
        

        _init();

        ////////////////

        function _init() { }
    }
})();
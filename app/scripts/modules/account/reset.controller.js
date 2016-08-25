(function() {
'use strict';

    angular
        .module('Findit.Account')
        .controller('resetController', resetController);

    resetController.$inject = ['$user'];
    function resetController($user) {
        var vm = this;
        

        _init();

        ////////////////

        function _init() { }
    }
})();
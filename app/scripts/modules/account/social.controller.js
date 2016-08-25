(function() {
'use strict';

    angular
        .module('Findit.Account')
        .controller('socialController', socialController);

    socialController.$inject = ['$user'];
    function socialController($user) {
        var vm = this;
        

        _init();

        ////////////////

        function _init() { }
    }
})();
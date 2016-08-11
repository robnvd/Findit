(function () {
    angular
        .module('Findit.Nav')
        .controller('navController', controller);

    controller.$inject = ['$location', 'storage', 'logger', '$user', '$http'];
    function controller($location, storage, logger, $user, $http) {
        var vm = this;

        vm.userData = {};

        activate();

        ////////////////

        function activate() {
            setUserData();
            $http.get(`http://localhost:3000/api/Bookmarks/MyBookmarks?username=${vm.userData.username}`).then((result) => {
                console.log(result);
                // $http.get(`http://localhost:3000/api/Bookmarks?id=${result.data[0].id}`).then((result) => {
                //     console.log(result);
                // });
                // $http.post(`http://localhost:3000/api/Bookmarks/AddBookmark`, {
                //     id : null,
                //     placeId: "another-fake-place",
                //     bookmarkText: "Some random text"
                // }).then((result) => {
                //     console.log(result);
                // });
                // $http.post(`http://localhost:3000/api/Bookmarks/AddBookmark`, {
                //     id : result.data[0].id,
                //     placeId: "another-fake-place",
                //     bookmarkText: "Some random text"
                // }).then((result) => {
                //     console.log(result);
                // });
            }).catch((error) => { console.log(error); });
        }

        function setUserData() {
            if (!$user.currentUser) {
                $user.get().then((user) => {
                    vm.userData = user;
                }).catch((error) => {
                    logger.error('User data retrieval failed', error, 'Fail');
                });
            } else {
                vm.userData = $user.currentUser;
            }
        }
    }
})();
(function () {
    'use strict';

    angular
        .module('Findit.Reviews')
        .directive('starRating', starRating);

    function starRating() {
        return {
            restrict: 'E',
            template:
            '<ul class="star-rating" ng-class="{readonly: readonly}">' +
            '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
            '    <i class="fa fa-star"></i>' + // or &#9733
            '  </li>' +
            '</ul>',
            scope: {
                rating: '=',
                max: '=?', // optional (default is 5)
                onRatingSelect: '&?',
                readonly: '=?'
            },
            controller: ['$scope', function ($scope) {

                var max = $scope.max || 5;
                $scope.rating = $scope.rating || 5;
                $scope.stars = [];

                $scope.toggle = function (index) {
                    if ($scope.readonly && $scope.readonly == true) return;

                    $scope.rating = index + 1;

                    if ($scope.onRatingSelect) {
                        $scope.onRatingSelect({ rating: index + 1 });
                    }
                };

                $scope.$watch('rating', function (newValue, oldValue) {
                    if (newValue) updateStars();
                });

                function updateStars() {
                    $scope.stars = [];
                    for (var i = 0; i < max; i++) {
                        $scope.stars.push({
                            filled: i < Math.round($scope.rating)
                        });
                    }
                }
            }],
        };
    }
})();

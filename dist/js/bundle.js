'use strict';

angular.module('willWin', ['ui.router', 'ui.materialize', 'angular.vertilize', 'slickCarousel']).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider.state('home', {
        url: '/',
        templateUrl: "../views/home.html"
    }).state('about', {
        url: '/about',
        templateUrl: "../views/about.html",
        controller: 'aboutCtrl'
    }).state('contact', {
        url: '/contact',
        templateUrl: "../views/contact.html",
        controller: 'contactCtrl'
    }).state('services', {
        url: '/services',
        templateUrl: "../views/services.html",
        controller: 'serviceCtrl'
    }).state('facilities', {
        url: '/facilities',
        templateUrl: "../views/facilities.html",
        controller: "facilCtrl"
    });

    $urlRouterProvider.otherwise('/');
}).run(function ($rootScope, $state, $document, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});
'use strict';

angular.module('willWin').service('mainService', function () {});
'use strict';

angular.module('willWin').controller('aboutCtrl', function ($scope, $state, mainService) {});
'use strict';

angular.module('willWin').controller('contactCtrl', function ($scope, $state, mainService) {});
'use strict';

angular.module('willWin').controller('facilCtrl', function ($scope, $state, mainService) {
    $scope.slickConfig = {
        // centerMode: true,
        // centerPadding: '40px',
        // slidesToShow: 1,
        accessibility: true,
        enabled: true,
        arrows: true,
        dots: true,
        autoplay: false,
        draggable: true,
        cssEase: 'ease',
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true
            }
        }]
    };
});
'use strict';

angular.module('willWin').controller('homeCtrl', function ($scope, $state, mainService) {});
'use strict';

angular.module('willWin').controller('serviceCtrl', function ($scope, $state, mainService) {});
'use strict';

/*!
 * angular-vertilize 1.0.0
 * Christopher Collins
 * https://github.com/Sixthdim/angular-vertilize.git
 * License: MIT
 */
(function () {
  "use strict";

  var module = angular.module('angular.vertilize', []);

  // Vertilize Container
  module.directive('vertilizeContainer', [function () {
    return {
      restrict: 'EA',
      controller: ['$scope', '$window', function ($scope, $window) {
        // Alias this
        var _this = this;

        // Array of children heights
        _this.childrenHeights = [];

        // API: Allocate child, return index for tracking.
        _this.allocateMe = function () {
          _this.childrenHeights.push(0);
          return _this.childrenHeights.length - 1;
        };

        // API: Update a child's height
        _this.updateMyHeight = function (index, height) {
          _this.childrenHeights[index] = height;
        };

        // API: Get tallest height
        _this.getTallestHeight = function () {
          var height = 0;
          for (var i = 0; i < _this.childrenHeights.length; i = i + 1) {
            height = Math.max(height, _this.childrenHeights[i]);
          }
          return height;
        };

        // Add window resize to digest cycle
        angular.element($window).bind('resize', function () {
          return $scope.$apply();
        });
      }]
    };
  }]);

  // Vertilize Item
  module.directive('vertilize', [function () {
    return {
      restrict: 'EA',
      require: '^vertilizeContainer',
      link: function link(scope, element, attrs, parent) {
        // My index allocation
        var myIndex = parent.allocateMe();

        // Get my real height by cloning so my height is not affected.
        var getMyRealHeight = function getMyRealHeight() {
          var clone = element.clone().removeAttr('vertilize').css({
            height: '',
            width: element.width(),
            position: 'fixed',
            top: 0,
            left: 0,
            visibility: 'hidden'
          });
          element.after(clone);
          var realHeight = clone.height();
          clone['remove']();
          return realHeight;
        };

        // Watch my height
        scope.$watch(getMyRealHeight, function (myNewHeight) {
          if (myNewHeight) {
            parent.updateMyHeight(myIndex, myNewHeight);
          }
        });

        // Watch for tallest height change
        scope.$watch(parent.getTallestHeight, function (tallestHeight) {
          if (tallestHeight) {
            element.css('height', tallestHeight);
          }
        });
      }
    };
  }]);
})();
'use strict';

$(document).ready(function () {
    $('.button-collapse').sideNav({ closeOnClick: true });
});
//# sourceMappingURL=bundle.js.map

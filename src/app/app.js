angular.module( 'Cimba', [
  'templates-app',
  'templates-common',
  'Cimba.home',
  'Cimba.about',
  'ui.router',
  'ngProgress'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'MainCtrl', function AppCtrl ( $scope, $location, $timeout, ngProgress ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Cimba' ;
    }
  });

  $scope.profileImg = 'assets/generic_photo.png';

  $scope.login = function () {
    $scope.user = true;
  };

  $scope.logout = function () {
    $scope.user = false;
  };

  // Event listener for login (from child iframe)
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventListener = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

  // Listen to message from child window
  eventListener(messageEvent,function(e) {
    var u = e.data;
    if (e.data.slice(0,5) == 'User:') {
      $scope.authenticate(e.data.slice(5, e.data.length), true);
      // clear previous posts  
      $('#loginModal').modal('hide');
    }
    if (e.data.slice(0,7) == 'iframe=') {
      var size = e.data.slice(7, e.data.length).split(':');
      if (size.length > 0) {
        console.log(size);
        $scope.signupWidth = size[0];
        $scope.signupHeight = size[1];
        $scope.apply();
      }
    }
  },false);
})

;

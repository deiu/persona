angular.module( 'Cimba', [
  'templates-app',
  'templates-common',
  'Cimba.home',
  'Cimba.login',
  'Cimba.about',
  'ui.router',
  'ngProgress'
])

.config( function CimbaConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/login' );
})

.run( function run () {
})

.controller( 'MainCtrl', function MainCtrl ( $scope, $location, $timeout, ngProgress ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Cimba' ;
    }
  });

  $scope.profileImg = 'assets/generic_photo.png';

  $scope.login = function () {
    $location.path('/login');
  };

  $scope.logout = function () {
    $scope.userProfile = null;
    $location.path('/login');
  };

});

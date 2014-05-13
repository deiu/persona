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

})

;

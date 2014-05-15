/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'Cimba.home', [
  'ui.router'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, $sce ) {
 
  // login/signup widget source
  var providerURI = 'https://linkeddata.github.io/signup/index.html?ref=';
    
  // set the parameter in the src of iframe
  $scope.signupWidget = $sce.trustAsResourceUrl(providerURI+window.location.protocol+'//'+window.location.host);
  
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
        $scope.signupWidth = size[0];
        $scope.signupHeight = size[1];
      }
    }
  },false);
 })

;

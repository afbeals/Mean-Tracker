// Angular Routing
  Stracker.config(function($routeProvider, $locationProvider)
  {
    $routeProvider
      .when('/register', {templateUrl: 'partials/register_partial.html', controller: 'AccessController'})
      .when('/login', {templateUrl: 'partials/login_partial.html', controller: 'AccessController'})
      .when('/shows', {templateUrl: 'partials/show_grid_partial.html', controller: 'ShowController'})
      .when('/show/:name', {templateUrl: 'partials/show_partial.html', controller: 'IndShowController'})
      .when('/tracker/:user', {templateUrl: 'partials/tracker_partial.html', controller: 'TrackerController'})
      .when('/test', {templateUrl: 'partials/test_partial.html', controller: 'ShowController'})
      .otherwise({redirectTo: '/register'});
  });
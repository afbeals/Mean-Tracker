// Angular Factories
// Users Factory
  Stracker.factory('UsersFactory', function($http, $location) 
  {
    var factory = {};

    factory.registerUser = function(info)
    {
      $http.post('/user/register', info).success(function()
      {
        alert("Thank you for registering!");
      }).error(function()
      {
        alert("password or email confirmation did not match, please try again");
      })
    }

    factory.loginUser = function(info)
    {
      $http.post('/user/login', info).success(function(status)
      {
        $location.path("/tracker/agibson");
      }).error(function()
      {
        alert("Login was incorrect");
      })
    }

    factory.logOutUser = function()
    {
      $http.get('/user/logout').success(function()
      {
        alert('logged out!');
        $location.path('/login');
      })
    }

    factory.checkUserStatus = function(callback)
    {
      // $http.get('/user/checkStatus').success(function()
      // {
      //   callback();
      // }).error(function()
      // {
      //   alert("please log in to do that");
      //   $location.path('/login');
      // })
      callback();
    }

    factory.getUser = function(callback)
    {
      $http.get('/getUser').success(function(data)
      {
        callback(data);
      }).error(function()
      {
        alert('was not successful');
      })
    }

    return factory;
  });

// Shows Factory
  Stracker.factory('ShowsFactory', function($http, $location) 
  {
    var shows = [];
    var showId = "";
    var factory = {};

    factory.getAllShows = function(callback)
    {
      $http.get('/getAllShows').success(function(data)
      {
        shows = data;
        callback(shows);
      }).error(function()
      {
        $location.path("/login");
      })
    }

    factory.getSingleShow = function(info, callback)
    {
      
      $http.get('/getSingleShow/'+info).success(function(data)
      {

        callback(data);
      }).error(function()
      {
        console.log("getSingleShow Error occured after factory call");
      })
    }

    factory.goToShow = function(title)
    {
      var showId = title;
      var showtitle = "";
      $location.path('show/'+title);
    }

    factory.test = function()
    {
      $http.post('/test').success(function()
      {
        alert("success");
      }).error(function()
      {
        alert("nope");
      })
    }

    factory.addShow = function(title)
    {
      show = {title: title};
      $http.post('/addShow', show).success(function()
      {
        alert("successfully added!");
      }).error(function()
      {
        console.log("was not successful");
      })
    }

    return factory;
  });

// Networks Factory
  Stracker.factory('NetworksFactory', function($http) 
  {

  });
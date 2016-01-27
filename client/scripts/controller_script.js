// Angular Controller
// Navbar Controller
  Stracker.controller('NavbarController', function($scope, $location, UsersFactory) 
  {
    console.log("navbar up");

    $scope.goToShows = function()
    {
      UsersFactory.checkUserStatus(function()  
      {
        $location.path('/shows');
      })
    }

    $scope.goToTracker = function()
    {
      UsersFactory.checkUserStatus(function()  
      {
        $location.path('/tracker/agibson');
      })
    }

     $scope.logOutUser = function()
      {
        UsersFactory.logOutUser();
      }

    $scope.logInUser = function()
    {
      UsersFactory.checkUserStatus()  
      {}
    }


  });

// Login/Logout/Register Controller
  Stracker.controller('AccessController', function($scope, UsersFactory) 
  {
    
    $scope.registerUser = function()
    {
      UsersFactory.registerUser($scope.register_user);
      $scope.register_user = {};
    }

    $scope.loginUser = function()
    {
      UsersFactory.loginUser($scope.login_user);
      $scope.login_user = {};
    }

  });

// Individual Show Controller
  Stracker.controller('IndShowController', function($scope, $location, $routeParams, ShowsFactory, UsersFactory)
  {
    var showTitle = $routeParams.name;

    UsersFactory.checkUserStatus(function()  
    {
      $(document).ready(function()
      { 
        $('.tabs .tab-links a').on('click', function(e)  
        {
          var currentAttrValue = $(this).attr('href');
          $('.tabs ' + currentAttrValue).fadeIn(400).siblings().hide();
          $(this).parent('li').addClass('active').siblings().removeClass('active');
          e.preventDefault();
        });

        var show_episode = [];
        var show_season = [];
        var show_num = [];
        $('#tab1').ready(function()
        {
          var seasons = 4;
          for(var num = 1; num <= seasons; num++)
          {
            $.get("http://www.omdbapi.com/?t=" + showTitle + "&y=&plot=full&r=json&Season="+num, function(res) 
            {
              for(var obj in res.Episodes)
              {
                show_season.push(res.Season);
                show_episode.push(res.Episodes[obj].Title);
                show_num.push(res.Episodes[obj].Episode);
              }
            }, "json");
          }

          $.get("http://www.omdbapi.com/?t="+showTitle+"&y=&plot=full&r=json", function(res) 
          {
              
              $scope.show_genre = res.Genre; 
              $scope.show_plot = res.Plot;
              $scope.show_poster = res.Poster;
              $scope.show_runtime = res.Runtime;
              $scope.show_title = res.Title;
          }, "json");

        }); 
      

        setTimeout(function()
        {
          for(var i = 0; i < show_episode.length; i++)
          {
            $('#episodes_table').append("<tr><td>" + show_episode[i] + "</td><td>" + show_season[i] + "</td><td>"+show_num[i]+"</td></tr>" );
          }
          
        }, 2000);

        
        setTimeout(function(){
            
            $('#content_container').fadeIn(500);
        }, 3000);

      });

      ShowsFactory.getSingleShow(showTitle, function(show)
      {
        $scope.show = show;
      })

    })

    $scope.addShow = function(title)
    {
      ShowsFactory.addShow(title);
    }
    



  });

// Show Controller
  Stracker.controller('ShowController', function($scope, $location, $compile, ShowsFactory, UsersFactory) 
  {
    var shows = [];
    var show_titles= [];
    var show_array = [];
    var showId = "";
    

    // UsersFactory.checkUserStatus(function()  
    // {
      $(document).ready(function()
      { 
        setTimeout(function()
        {
          $.each(shows, function(key, value)
          {
            show_titles.push(value.title);
          })
        }, 500);

        setTimeout(function()
        {
          $.each(show_titles, function(key, value)
          {
            $.get("http://www.omdbapi.com/?t=" + value +  " &y=&plot=full&r=json", function(res) 
            {

              var title= res.Title.toString();
                $('#show_grid').append('<div class="show_grid_show_container col-lg-3 col-md-3 col-sm-3 col-xs-12"><img id="'+res.Title+'" class="show_grid_img" src="'+res.Poster +'" alt="'+ res.Title +'"></div>');
            }, "json");
          });

        }, 1000);

        $('#show_grid').on("click",".show_grid_show_container", function()
        {

          showId = $(this).children().attr('id');
          ShowsFactory.goToShow(showId);
          $scope.$apply();
        })

      });
    
      ShowsFactory.getAllShows(function(data)
      {
        $scope.shows = data;
        shows = data;
      })

      $scope.testDB = function()
      {
        ShowsFactory.test();
      }

    // })
  });

// Networks Controller
  Stracker.controller('NetworksController', function($scope) 
  {

});

// Tracker Controller
  Stracker.controller('TrackerController', function($scope, UsersFactory, ShowsFactory) 
  {

    UsersFactory.getUser(function(data)
    {
      $scope.user = data;
      console.log(data);
    })

    $scope.display_tracker_show = function(title)
    {
      $.get("http://www.omdbapi.com/?t="+title+"&y=&plot=full&r=json", function(res) 
          {
              $scope.show_poster = res.Poster;
              $('#tracker_show_img').attr({src: ""+res.Poster});
              $('#tracker_show_title').text(""+res.Title);
          }, "json");

      ShowsFactory.getSingleShow(title, function(show)
      {
        $scope.show = show;
        console.log(show);
      })     
    }

    $scope.goToShow = function(showTitle)
    {
      ShowsFactory.goToShow(showTitle)
      {

      }
    }
  });
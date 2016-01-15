var mongoose = require('mongoose');
var Show = mongoose.model('Show');
var Tracker = mongoose.model('Tracker');
var User = mongoose.model('User');
var Wiki = require('wikijs');

module.exports =
{

  getSingleShow:function(req,res)
  {
    Show.findOne({title: req.params.name}, function(err,show)
    {
      if(err)
      {
        console.log(err);
      }
      else
      {
        res.json(show);
      }
    })
  },

  getAllShows : function(req,res)
  {
    var wiki = new Wiki();
    var show_group = [];
    var getWikiInfo = function(showTitle)
    {
      return new Promise(function(resolve, reject)
      {
        return wiki.page(showTitle).then(function(page)
        {
          page.info().then(function(obj)
          { 
            show_group.push(obj);
            resolve(show_group);
          });
        });
        reject(showTitle);
      });
    }
    

    Show.find({}, function(err,show)
    {
      if(err)
      {
        console.log(err);
      }
      else
      {
        res.json(show);
      }
    })

  },

  addShow: function(req,res)
  {
    var wiki = new Wiki();
        
    wiki.page(req.body.title).then(function(page) 
    {
      page.info().then(function(info) // console. log info to get correct categories
      {
        var show = new Show({title: info.title, category: info.category, network: info.network});
        show.save(function(err)
        {
          if(err)
          {
            console.log(err);
          }
          else
          {
            console.log(info.title + " was added");
          }
        }) 
      });
    });



    
  },

  addToTracker: function(req,res)
  {
    
    User.findOne({username: req.session.username}, function(err, user)
    {
      if(err)
      {
        console.log(err);
      }
      else
      {
        if(!user._tracker)
        {
          var tracker = new Tracker({});
          tracker._user = user.id;
          user._tracker = tracker.id;
          tracker.save(function(err, tracker)
          {
            if(err)
            {
              console.log(err);
            }
            else
            {
              user.save(function(err)
              {
                if(err)
                {
                  console.log(err);
                }
                else
                {
                  Tracker.update({_id:tracker.id}, {$push:{show:{title:"2 Broke Girls"}}}, function(err)
                    {
                      if(err)
                      {
                        console.log(err);
                      }
                      else
                      {
                        console.log(req.session.username +" tracker info added");
                      }
                    });
                  
                }
              })
               
            }
          })
        }
        else
        {
          Tracker.update({_id: user._tracker}, {$push:{show:{title:"Bob's Burgers"}}}, function(err)
            {
              if(err)
              {
                console.log(err);
              }
              else
              {
                console.log(req.session.username +" tracker info updated");
              }
            });
          }
        }
    })
    
  }
}
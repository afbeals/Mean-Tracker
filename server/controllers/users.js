var mongoose = require('mongoose');
var Show = mongoose.model('Show');
var Tracker = mongoose.model('Tracker');
var User = mongoose.model('User');

module.exports =
{

  registerUser : function(req,res)
  {
    if(req.body.password === req.body.confirm_password && req.body.email === req.body.confirm_email)
    {
      var user = new User({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, username: req.body.username, password: req.body.password});
      user.save(function(err)
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
          res.redirect('/');
        }
      })
    }
    else
    {
      res.sendStatus(400);
    }
    
  },

  loginUser : function (req,res)
  {

   User.findOne({username: req.body.username, password: req.body.password}, function(err,user)
    {
      if(err)
      {
        console.log(err);
      }
      else if(!user)
      {
        console.log("failed login");
      }
      else
      {
        console.log("found user");
        req.session.username = user.username;
        req.session.first_name = user.first_name;
        console.log(req.session);
        res.end();
      }
    })
  },

  getUser : function(req,res)
  {
    User.findOne({username: req.session.username})
      .populate({
                  path: '_tracker',
                  model: 'Tracker',
                  populate: {
                              path: 'show',
                              model: "Show"
                            }
                })
      .exec(function(err, user)
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
          res.json(user);
          console.log("populated all");
        }
      })
  }

}
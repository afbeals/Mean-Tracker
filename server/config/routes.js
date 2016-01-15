var shows = require('../controllers/shows.js');
var users = require('../controllers/users.js');

module.exports = function(app)
{
  app.get('/getAllShows', function(req,res)
  {
      shows.getAllShows(req,res);
  })

  app.post('/user/register', function(req,res)
  {
    users.registerUser(req,res);
  })

  app.post('/user/login', function(req,res)
  {
    users.loginUser(req,res);
    res.status(200);
  })

  app.get('/user/logout', function(req,res)
  {
    req.session.destroy(function(err)
    {
      if(err)
      {
        console.log(err);
      }
      else
      {
        res.end();
      }
    })
  })

  app.get('/getSingleShow/:name', function(req,res)
  {
    shows.getSingleShow(req,res);
  })

  app.get('/user/checkStatus', function(req,res)
  {
    if(!req.session.username)
    {
      res.status(401).send();
      res.end();
    }
    else
    {
      res.status(200).send();
      res.end();
    }
    
  })

  app.get('/getUser', function(req,res)
  {
    users.getUser(req,res);
  })

  app.post('/test', function(req, res)
  {
    shows.addShow(req,res);
  })

}
const User = require('../models/user');

module.exports = (router) => {

  router.post('/register', (req, res) => {
    //req.body.email
    //req.body.username
    //req.body.password
    if(!req.body.email){
      res.json({succes: false, message: 'You must provide an email'});
    } else {
      res.send('Hello World');
    }
  });
  return router;
}

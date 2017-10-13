const User = require('../models/user');

module.exports = (router) => {

  router.post('/register', (req, res) => {
    //req.body.email
    //req.body.username
    //req.body.password
    if(!req.body.email) {
      res.json({ succes: false, message: 'You must provide an email'});
    } else {
      if(!req.body.username) {
        res.json({ succes: false, message: 'You must provide an name'});
      } else {
        if(!req.body.password) {
          res.json({ succes: false, message: 'You must provide an password'});
        } else {
          let user = new User({
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: req.body.password.toLowerCase()
          });
          user.save((err) => {
            if (err){
              res.json({ success: false, message: 'Could not save user. Error : ', err});
            }
            else{
              res.json({ success: true, message: 'User saved!'});
            }
          });
        }
      }
    }
  });
  return router;
}

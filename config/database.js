const crypto = require('crypto').randomBytes(256).toString('hex');
// cryptographic functionality ()

module.exports = {
  uri: 'mongodb://localhost:27017/mean-angular-2',  //Database URI and database name
  secret: crypto,   //Cryto-created secret
  db: 'mean-angular-2'  // Database name Do you know commit This is for you
}

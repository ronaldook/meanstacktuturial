const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


let emailLengthCheker = (email) => {
  if(!email){
    return false;
  } else {
    if(email.length < 5 || email.length > 30){
      return false;
    } else {
      return true;
    }
  }
}

let validEmailChecker = (email) => {
  if( !email){
    return false;
  } else {
    const regExp = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
    return regExp.test(email);
  }
}

let usernameLengthChecker = (username) => {
  if (!username){
    return false;
  } else {
    if (username.length < 3 || username.length > 15){
      return false;
    } else {
      return true;
    }
  }
}

let validUsername = (username) => {
  if (!username) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username);
  }
}

let passwordLengthChecker = (password) => {
  if (!password) {
    return false;
  } else {
    if (password.length < 8 || password.length > 35 ) {
      return false;
    } else {
      return true;
    }
  }
}

let validPassword = (password) => {
  if (!password) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(password);
  }
}

const passwordValidators = [
  {
    validator: passwordLengthChecker,
    message: 'Password must be at least 8 characters but n more than 35'
  },
  {
    validator: validPassword,
    message: 'Must must not have special characters or spaces'
  }
];

const usernameValidators =[
  {
    validator: usernameLengthChecker,
    message: 'Username must be at least 3 characters no more than 15'
  },
  {
    validator: validUsername,
    message: 'Username must not have special characters or spaces'
  }
];

const emailValidators = [
  {
    validator: emailLengthCheker,
    message: 'E-mail must be least 5 characters but no more than 30'
  },
  {
    validator: validEmailChecker,
    message: 'Must a valid email'
  }
];

const userSchema = new Schema({
  email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
  username: {type: String, required: true, unique: true, lowercase: true, validate: usernameValidators},
  password: {type: String, required: true, validate: passwordValidators}
});

userSchema.pre('save', function(next) {
  if(!this.isModified('password'))
    return next();

  bcrypt.hash(this.password, null, null, (err, hash) => {
    if(err) return next(err);
    this.password = hash;
    next();
  })
})

userSchema.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);

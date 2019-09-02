let express = require('express');

let router = express.Router();
let dateFormat = require('dateformat');
var path = require('path');
const uuid = require('uuid/v4');
import jwt from 'jsonwebtoken';

let user = null;  // should be []
var mentor = null;
var admin = null;

// Specific to user routes
router.use(function timeLog (req, res, next) {
  console.log('User Router accessed at: '
      , dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"));
  next();
});

router.post('/signup', function (req, res) {

      res.set("Content-type", "application/json");

      if(router.signUp(req)) {
            /*
            * The response structure, on success, follows instruction of JSON provided on page 13:
            * {
            *    "status": Integer: 201,
            *    "message": String: "User created successfully"
            *    "data": {
            *          "token": String,
            *          "message": "User created successfully"
            *    }
            * }
            */
            var signupResponse =  {};
            signupResponse.status = 201;
            signupResponse.message = "User created successfully";
            var data = {};
            /**
             * create a token
             */
            const payload = {
                  "email": req.body.email,
            }
            const token = jwt.sign(payload, 'LIO', {expiresIn: '1d'})

            data.token = token;           


            global.savedUser.token = data.token;
            data.message = "User created successfully";

            signupResponse.data = data;

            res.status(201).send(signupResponse);
      } else {
            // sign up failed:
            /*
            * The response structure, on failure, follows instruction of JSON provided on page 13:
            * {
            *    "status": Integer: 401,
            *    "message": String: "Failed to register new user"
            * }
            */
            var signupResponse =  {};
            signupResponse.status = 401;
            signupResponse.message = "Failed to register new user";
            res.status(401).send(signupResponse);
      }
});

router.signUp = function (req) {
      if( ( ! req) || ( ! req.body) ) {
            return false;
      } else {
            console.log('About to sign up a new user: <' + JSON.stringify(req.body) + '>');
            var isSignedUp = false;
      
            if(req.body.email) {
                  var profile = {};
                  profile.email = req.body.email;
                  profile.password = req.body.password;
            
                  if(profile.email.startsWith('admin')) {
                        // Since the Database is not available yet, the admin is saved in memory
                        admin = profile;
                        global.savedUser = admin;
                        global.savedUser.type = "admin";
                        isSignedUp = true;
                  } else {
                        // Since the Database is not available yet, the user is saved in memory
                        user = profile;
                        global.savedUser = user;
                        global.savedUser.type = "user";
                        isSignedUp = true;
                  }     
                  return isSignedUp; // sign up is successful. This will change once DB is available
            }
      }
}

router.post('/signin', function(req, res) {
    //set the header
    res.set("Content-type", "application/json");
    if(router.signIn(req)) {
          //
          var signinResponse =  {};
          signinResponse.status = 200;
          signinResponse.message = "User is successfully logged in";
          var data = {};


          //data.token = uuid();

          const payload = {
                "email": req.body.email,
          }
          const token = jwt.sign(payload, 'LIO', {expiresIn: '1d'})

          data.token = token; 

          global.savedUser.token = data.token;
          data.message = "User is successfully logged in";

          signinResponse.data = data;

         return res.status(200).send(signinResponse);
    } else {
          var signinResponse =  {};
          signinResponse.status = 401;
          signinResponse.message = "Failed to log in new user";
          return res.status(401).send(signinResponse);

    }

})

router.signIn = function(req) {
    //should return true/false

    //algorithm
    /*
          1. get the username/email and password
          2. filter user or admin depending on the user type base on the email
          3. compare this filtered user passsowrd and the password in the request 
          3.1. if password matcheds then return true 
          3.2. if password doesn't match return false 
    */
    if(req && req.body) {
          const authUser = req.body;
          /*
           * TODO: code below will be restored when database is in place
           */
     //      //filter user from user list (user)
     //      const userData = user.find(function(u) {
     //            return u.email === authUser.userNameEmail; // && u.password === authUser.password
     //      });
          if(global.savedUser && global.savedUser.email === authUser.email) {
                console.log("saved email <" + global.savedUser.email + ">");
                console.log("saved password <" + global.savedUser.password + ">");
                // compare 
                if(global.savedUser.password === authUser.password) {
                      return true;
                }
                return false;
          } else {
                return false;
          }
     
    }
    else {
          return false;
    }
}

module.exports = router;

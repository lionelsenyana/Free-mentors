// mentor routes/ endpoints
//user routes/ endpoints
// session routes/ endpoints

// Let's start with change user type route/ endpoint

const express = require('express');
const router = express.Router();
var dateFormat = require('dateformat');
var path = require('path');
const uuid = require('uuid/v4');



var user = null;  // should be []
var mentor = null;
var admin = null;

// Specific to user routes
router.use(function timeLog (req, res, next) {
    console.log('User Router accessed at: '
        , dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss"));
    next();
  });

router.patch('/:userId', function(req, res) {
      res.set("Content-type", "application/json");
      console.log('About to change user ' + '<' + req.params.userId + '>' + ' to mentor');

      /*
       * Request structure as indicated on page 14 of ADC pdf document
       * {
       *     "token" : String ,
       *     ...
       *  }
       */
      var userId = req.params.userId;
      console.log("user id <" + userId + ">");
      console.log("token id <" + req.get('token') + ">");
      console.log("saved email <" + global.savedUser.email + ">");

      if( ! global.savedUser) {
            var changeToMentorRespose =  {};
            changeToMentorRespose.status = 401;
            changeToMentorRespose.message = "User does not exist in the system";
            res.status(401).send(changeToMentorRespose);  
      }
     
      // fixing token 
      
      if(global.savedUser.email === userId && global.savedUser.token === req.get('token') ) {
            /*
             * Response as indicated on page 14 of ADC pdf document
             * {
             *     “status” : Integer: 200 ,
             *     “data” : {
             *          “message” : “User account changed to mentor” ,
             *          ...
             *      }
             * }
             */
            global.savedUser.type = "mentor";
            var changeToMentorRespose =  {};
            changeToMentorRespose.status = 201;
            var data = {};
            data.message = "User account changed to mentor";
      
            changeToMentorRespose.data = data;
      
            res.status(200).send(changeToMentorRespose);
      } else {
            var changeToMentorRespose =  {};
            changeToMentorRespose.status = 401;
            changeToMentorRespose.message = "Failed changing user to mentor. User is not authenticated";
            res.status(401).send(changeToMentorRespose);  
      }
});

// router.patch('/changeUserType', function (req, res) {

//       res.set("Content-type", "application/json");

//       if(changeUserType(req)) {
//             /*
//             * The response structure, on success, follows instruction of JSON provided on page 14:
//             * {
//             *    "status": Integer: 200,
//             *    "message": String: "User account changed to a mentor"
//             *    "data": {
//             *          "token": String,
//             *          "message": "User account changed to a mentor"
//             *    }
//             * }
//             */

//             var changeUserTypeResponse =  {};
//             changeUserTypeResponse.status = 200;
//             changeUserTypeResponse.message = "User account changed to mentor";
//             var data = {};
//             data.token = uuid();
//             data.message = "User account changed to mentor";

//             changeUserTypeResponse.data = data;

//             res.status(200).send(changeUserTypeResponse);
//       } else {
//             // change user type failed:
//             /*
//             * The response structure, on failure, follows instruction of JSON provided on page 10:
//             * {
//             *    "status": Integer: 401,
//             *    "message": String: "Failed to change user type"
//             * }
//             */
//             var changeUserTypeResponse =  {};
//             changeUserTypeResponse.status = 401;
//             changeUserTypeResponse.message = "Failed to change user type";
//             res.status(401).send(changeUserTypeResponse);
//       }
// });

// function changeUserType(req) {
//       console.log('About to change user to a mentor: <' + JSON.stringify(req.body) + '>');
//       var isChangedType = false;

//       var profile = {};
//       localStorage.removeItem("user");
//       localStorage.setItem("mentor");

      

//       if(profile.localstorage.setItem('mentor')) {
//             // Since the Database is not available yet, the mentor is saved in memory
//             localstorage = profile;
//             isChangedType = true;
//       }
//       else {
//             // Since the Database is not available yet, the mentor is saved in memory
//             localstorage = profile;
//             isChangedType = true;
//       }     
//       return isChangedType; // change user type is successful. This will change once DB is available
// }

router.patch('localstorage', function(req, res) {
    //handle change user type
});


// Next is admin gets a list of mentors

module.exports = router;

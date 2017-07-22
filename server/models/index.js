var db = require('../db');
var quer = require('mysql-query-promise');

module.exports = {
  messages: {
    get: function (req, res) {

      db.dbConnection.query('SELECT * FROM messages', function (error, results, fields) {
        //console.log(results);
        var messages = [];
        for (let message of results) {
          messages.push({
            text: message.message,
            username: 'Bob',
            roomname: 'lobby',
            objectId: 1337
          });
        }
        res.end(JSON.stringify({'results': messages}));
      });
    }, // a function which produces all the messages
    post: function (req, res) {
      //quer(qs) .then(function(results), function(err));
      var post = '';
      var queryResult;
      req.on('data', function(data) {
        post += data;
      });
      req.on('end', function(end) {
        //console.log(post);
        //{"username":"anon","text":"hello world","roomname":"lobby","objectId":1}
        var finalMessage = {};
        var theData = JSON.parse(post);
        var thisQuery = 'SELECT user_id FROM users WHERE user = "' + theData.username + '"';
        queryResult = quer(thisQuery)
          .then(function(result) {
            if (result.length > 0) {
              finalMessage.userid = result[0].user_id;
            } else {
              thisQuery = 'INSERT INTO users (user) VALUES ("' + theData.username + '"")';
              quer(thisQuery).then(function(result) {
                finalMessage.userid = result[0].user_id;
              });
            }
          }, function(err) {
            console.log('There\'s an error mate');
          })
          .then(function(result) {
            thisQuery = 'SELECT room_id FROM rooms WHERE room = "' + theData.roomname + '"';
            quer(thisQuery)
            .then(function(results) {
              if (results.length > 0) {
                finalMessage.roomid = result[0].room_id;
              } else {
                thisQuery = 'INSERT INTO rooms (room) VALUES ("' + theData.roomname + '"")';
                quer(thisQuery).then(function(result) {
                  finalMessage.roomid = result[0].room_id;
                });
              }
            })
            .then(function() {
              thisQuery = 'INSERT INTO messages (message, user_id, room_id) VALUES ("' + theData.text + '", ' + finalMessage.userid + ', ' + finalMessage.userid + ')';
            });
          });
      });
      //first query on user
        //then
          //if user exists,
            //we get its ID
          //else
            // we do a create to the db with username
            // we get that resulting id
        //then
          //if room exists,
            //we get its ID
          //else
            // we do a create to the db with roomname
            // we get that resulting id
        //then
          //we create a message using the ID and User data from above
          
          
      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};


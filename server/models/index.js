var db = require('../db');
var mysql = require('promise-mysql');

module.exports = {
  messages: {
    get: function (req, res) {
      var dbConnect = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'plantlife',
        database: 'chat'
      }).then(function(conn) {
        var results = conn.query('SELECT * FROM messages INNER JOIN users ON messages.user_id = users.user_id INNER JOIN rooms ON messages.room_id = rooms.room_id');
        conn.end();
        return results;
      })
      .then(function(results) {
        console.log(results);
        var messages = [];
        for (let message of results) {
          messages.push({
            text: message.message,
            username: message.user,
            roomname: message.room,
            objectId: message.message_id
          });
        }
        res.end(JSON.stringify({'results': messages}));
      });
    }, // a function which produces all the messages
    post: function (req, res) {
      var post = '';
      var queryResult;
      var finalMessage = {};
      var connection;
      var thisQuery = '';
      
      req.on('data', function(data) {
        post += data;
      });
      req.on('end', function(end) {
        var theData = JSON.parse(post); 
        //{"username":"anon","text":"hello world","roomname":"lobby","objectId":1}
      
        var dbConnect = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'plantlife',
          database: 'chat'
        })
        .then(function(conn) {
          connection = conn;
          thisQuery = 'SELECT user_id FROM users WHERE user = "' + theData.username + '"';
          queryResult = connection.query(thisQuery);
          return queryResult;
        })
        .then(function(result) {
          if (result.length > 0) {
            return result;
          } else {
            thisQuery = 'INSERT INTO users (user) VALUES ("' + theData.username + '")';
            return connection.query(thisQuery)
            .then(function(results) {
              return [{'user_id': results.insertId}];
            });
          }
        }).then(function(result) {
          return finalMessage.userid = result[0].user_id;
        })
        .then(function(result) {
          thisQuery = 'SELECT room_id FROM rooms WHERE room = "' + theData.roomname + '"';
          return connection.query(thisQuery);
        })
        .then(function(results) {
          if (results.length > 0) {
            return results;
          } else {
            thisQuery = 'INSERT INTO rooms (room) VALUES ("' + theData.roomname + '")';
            return connection.query(thisQuery)
            .then(function(results) {
              return [{'room_id': results.insertId}];
            });
          }
        })
        .then(function(result) {
          return finalMessage.roomid = result[0].room_id;
        })
        .then(function(results) {
          thisQuery = 'INSERT INTO messages (message, user_id, room_id) VALUES ("' + theData.text + '", ' + finalMessage.userid + ', ' + finalMessage.roomid + ')';
          connection.query(thisQuery);
          connection.end();
          res.statusCode = 200;
          res.end();
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
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};


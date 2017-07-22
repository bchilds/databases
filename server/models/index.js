var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {

      db.dbConnection.query('SELECT * FROM messages', function (error, results, fields) {
        console.log(results);
      });
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};


var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      //console.log('we got this far');
      models.messages.get(req, res);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req, res);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('WE ARE GETTING A USER!@#@$');

    },
    post: function (req, res) {
      console.log('WE ARE POSTING A USER!@#@$');
    }
  }
};


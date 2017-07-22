var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var dbConnect = mysql.createConnection({
  user: 'root',
  password: 'plantlife',
  database: 'chat'
});
dbConnect.connect();

exports.dbConnection = dbConnect;
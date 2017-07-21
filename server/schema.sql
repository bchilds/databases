CREATE DATABASE chat;

USE chat;


/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user TEXT(25)
);

CREATE TABLE rooms (
  room_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  room TEXT(25)
);

CREATE TABLE messages (
  message_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  message TEXT(25),
  created_date TIMESTAMP(6),
  user_id INTEGER(3),
  room_id INTEGER(2),
  FOREIGN KEY (user_id) REFERENCES users (user_id),
  FOREIGN KEY (room_id) REFERENCES rooms (room_id)
);
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


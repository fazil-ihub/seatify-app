var express = require("express");
var app = express();

// Defining all the routes
var users = require("./routes/users");

// Linking all the routes
app.use("/users", users);

module.exports = app;

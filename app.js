var Joi = require('joi');
var express = require('express');
var app = express();
var logger = require('./logger');
const todo_item = require('./routes/todo_item');

app.use( express.json() )
app.use(logger);



var users = [
    {_id: 1, name: "someone", password: "someone"}  
];

//app.use('/api/users', user_auth);


app.use('/api', todo_item )

const port = process.env.PORT || 3000;
server = app.listen(port, () =>  console.log(`Listening on Port ${port}`));

module.exports = server;
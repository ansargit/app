var Joi = require('joi');
var express = require('express');
var app = express();


app.use(express.json())


var todo_items = [ 
 {_id: 1, todo_item : "Clean the house"},
 {_id: 2, todo_item : "Pay Maintenance charges"},
 {_id: 3, todo_item : "Pay Security tips"},
 {_id: 4, todo_item : "Pay Masjid Chanda"}
];


// respond with "hello world" when a GET request is made to the homepage
app.get('/api/items', function(req, res) {
    res.send(todo_items);
})

app.get('/api/item/:id', function(req,res) {


    const schema = {
        id: Joi.number.required()
    };
    
    const result = Joi.validate(req.params.id, schema);
    
    if( result.error ) {
        res.status(400).send(result.error);
        return;
    }
    

    var todo_item = todo_items.find( item  => item._id === parseInt(req.params.id) );
    if( !todo_item ){
        res.status(404).send('Todo item with the given id is not found');
    }
    else
    {
        res.send(todo_item);
        console.log(todo_item)
    }
})

app.post('/api/items', (req,res) => {

const schema = {
    name: Joi.string().min(3).required()
};

const result = Joi.validate(req.body, schema);
console.log(result);
if( result.error ) {
     
    res.status(400).send("Please enter valid name for todo Item");
    return;
}

    const todo_item = {
        _id: todo_items.length + 1,
        todo_item : req.body.name
    };
    console.log(todo_item);
    
    todo_items.push(todo_item);
    res.status(201).send(todo_item);
})


app.put('/api/item/:id', (req,res) => {

    var todo_item = todo_items.find( item  => item._id === parseInt(req.params.id) );
    if( !todo_item ){
        res.status(404).send('Todo item with the given id is not found');
    }

    const schema = {
        name: Joi.string().min(3).required()
    };
    
    const result = Joi.validate(req.body, schema);
    
    if( result.error ) {
         
        res.status(400).send("Please enter valid name for todo Item");
        return;

    }
    todo_item['todo_item'] = req.body.name;
    res.status(201).send(todo_item);    
})


app.delete('/api/item/:id', function(req,res) {

    var todo_item = todo_items.find( item  => item._id === parseInt(req.params.id) );
    if( !todo_item ){
        res.status(404).send('Todo item with the given id is not found');
    }

    const index = todo_items.indexOf(todo_item);
    todo_items.splice(index,1);

    res.send(todo_item);



})


const port = process.env.PORT || 3000;
app.listen(port, () =>  console.log(`Listening on Port ${port}`));
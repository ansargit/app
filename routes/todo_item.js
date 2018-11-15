const express = require('express');
const router = express.Router();

var Joi = require('joi');


var todo_items = [ 
    {_id: 1, todo_item : "Clean the house"},
    {_id: 2, todo_item : "Pay Maintenance charges"},
    {_id: 3, todo_item : "Pay Security tips"},
    {_id: 4, todo_item : "Pay Fund"}
   ];
   


// respond with "hello world" when a GET request is made to the homepage
router.get('/items', function(req, res) {
    res.status(200).send(todo_items);
})

router.get('/item/:id', function(req,res) {

    const { error }  = validateId( req.params )

    if( error ) {
        res.status(400).send( error.details[0].message );
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

router.post('/items', (req,res) => {

const {error} = validateItem(req.body);


if( error ) {
     
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


router.put('/item/:id', (req,res) => {

    let { error }  = validateId( req.params )

    if( error ) {
        res.status(404).send("Id is required and should be number");
        return;
    }
    
    
    var todo_item = todo_items.find( item  => item._id === parseInt(req.params.id) );
    if( !todo_item ){
        res.status(404).send('Todo item with the given id is not found');
        return;
    }
/*
    const schema = {
        name: Joi.string().min(3).required()
    };
    
    const result = Joi.validate(req.body, schema);
*/  

   let  { error2 } = validateItem(req.body);

    if( error2 ) {
         
        res.status(400).send("Please enter valid name for todo Item");
        return;

    }
    todo_item['todo_item'] = req.body.name;
    res.status(201).send(todo_item);    
})


router.delete('/item/:id', function(req,res) {

    const { error }  = validateId( req.params )

    if( error ) {
        res.status(404).send("Id is required and should be number");
        return;
    }
   
    var todo_item = todo_items.find( item  => item._id === parseInt(req.params.id) );
    if( !todo_item ){
        res.status(404).send('Todo item with the given id is not found');
    }

    const index = todo_items.indexOf( todo_item );
    todo_items.splice(index,1);

    res.send(todo_item);
})


function validateItem( item ){

    const schema = {
        name: Joi.string().min(3).required()
    };
    
    return Joi.validate(item, schema);
}


function validateId( id ){

    const schema = {
        id: Joi.number().required()
    };
    
    return Joi.validate( id, schema );
}


module.exports = router;
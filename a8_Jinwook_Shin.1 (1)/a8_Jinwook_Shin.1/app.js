const express = require('express');
const app = express();
const connection = require('./db/connection');
const DogComment = require('./models/DogComment'); // has "DogCommentSchema"

app.use(express.static('public'));
app.use(express.json());

connection.once('open', ()=>{
    console.log('connected to db');
        const server = app.listen(8080, ()=>{
        console.log('listening on 8080');
    });
});

// gets an array of comments about a specific breed of dog
app.get('/comments/:dog', (req,res)=>{
    DogComment.find({'breed':req.params.dog})
    .then(results=>{
        res.send(results);
    })
    .catch(error=>res.send(error));
});

// create a new comment document and save it to the database. 
// each comment record has the breed of dog that the comment refers to and the comment text
app.post('/comments', (req,res)=>{
   let comment = new DogComment(req.body);
   comment.save()
   .then(result=>{
       res.send(comment);
   })
    .catch(error=>res.send(error));
});



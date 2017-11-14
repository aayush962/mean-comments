//gathering forces
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//local resources
const config = require('./config');
const Comment = require('./app/models/comment');

//initialize app
const app = express();
//connect to mongodb
mongoose.connect(config.DB);
mongoose.connection
  .once('open', () => console.log('Connected to RentomojoDB!'))
  .on('error', (error) => console.warn('Connection to RentomojoDB failed', error));

//static and body parser settings
app.use(express.static('app'));
app.use(express.static('node_modules'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

///// API Routes

//upvote or downvote a comment
app.post('/api/comments/:commentId/:action', (req, res) => {
  const commentId = req.params.commentId;
  Comment.findById(commentId)
    .then((comment) => {
      if(!comment){
        res.status(403).json({success: false, error: 'No such comment exists'});
      } else{
          if(req.params.action === 'upvote'){
            comment.upvotes += 1;
          } else if(req.params.action === 'downvote'){
            comment.downvotes += 1;
          } else {
            res.status(403).json({success: false, error: 'Please provide a valid action'})
          }
        comment.save()
          .then((comment) => {
            res.status(200).json({success: true, comment: comment});
          });
      }
    })
    .catch((error) => {
      res.status(500).json({success: false, error: 'Some error occured'});
    })
})

//post a comment
app.post('/api/comments', (req, res) => {
  const { text, commentor } = req.body;
  const comment = new Comment({text: text, commentor: commentor, upvotes: 0, downvotes: 0});
  comment.save()
    .then((comment) => {
      res.status(200).json({success: true, comment: comment})
    })
    .catch((error) => {
      res.status(500).json({success: false, error: 'Some error occured!'})
    })
})

//get list of comments
app.get('/api/comments', (req, res) => {
  Comment.find()
    .then((comments) => {
      res.status(200).json({success: true, comments: comments})
    })
    .catch((error) => {
      res.status(403).json({success: false, error: 'Error fetching comments!'})
    })
});

//get initial route to index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(config.PORT, () => {
  console.log('Rentomojo comments running on port ' + config.PORT)
})

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  commentor: String,
  text: String,
  upvotes: Number,
  downvotes: Number,
  popularity: Number,
  dateTime: Date
})

//define popularity of a comment based on upvotes and downvotes
CommentSchema.pre('save', function(next) {
  var comment = this;

  comment.popularity = (comment.upvotes/comment.downvotes);
  if(!comment.dateTime){
    comment.dateTime = new Date()
  }
  next();
});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment

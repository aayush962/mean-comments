const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  commentor: String,
  text: String,
  upvotes: Number,
  downvotes: Number,
  popularity: Number
})

CommentSchema.pre('save', function(next) {
  var comment = this;

  comment.popularity = comment.upvotes/comment.downvotes;
  next();
});


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment

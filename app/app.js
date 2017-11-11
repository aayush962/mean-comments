var app = angular.module('rentomojo', []);

app.config(function($locationProvider){
  $locationProvider.html5Mode(true);
});

app.controller('CommentCtrl', function CommentCtrl($scope, $http) {

  //fetch comments

  $scope.getComments = function(){
    $http({
      method: 'GET',
      url: '/comments',
      headers: {
         'Content-Type': 'application/json'
      }
    })
    .then(function(body){
      $scope.comments = body.data.comments;
    })
    .catch(function(error){
      $scope.errorMessage = "Unbale to fetch comments"
    });
  }

  $scope.getComments();


  $scope.submitComment = function(){
    $http({
      method: 'POST',
      url: '/comments',
      headers: {
         'Content-Type': 'application/json'
      },
      data: {commentor: $scope.commentor, text: $scope.commentText}
    })
    .then(function(data){
      console.log(data)
    })
    .catch(function(error){
      console.log(error)
    });
  }

  $scope.upvoteComment = function(commentId){
    console.log(commentId);
    $http({
      method: 'POST',
      url: '/comments/'+commentId+'/upvote',
      data: {commentor: $scope.commentor, text: $scope.commentText}
    })
    .then(function(data){
      console.log(data);
      $scope.getComments();
    })
    .catch(function(error){
      console.log(error)
    });
  }

  $scope.downvoteComment = function(commentId){
    $http({
      method: 'POST',
      url: '/comments/'+commentId+'/downvote',
      data: {commentor: $scope.commentor, text: $scope.commentText}
    })
    .then(function(data){
      console.log(data);
      $scope.getComments();
    })
    .catch(function(error){
      console.log(error)
    });
  }
});

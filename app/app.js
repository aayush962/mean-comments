var app = angular.module('rentomojo', []);

app.config(function($locationProvider){
  $locationProvider.html5Mode(true);
});

app.controller('CommentCtrl', function CommentCtrl($scope, $http) {

  $scope.formData = {};

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
    if($scope.formData.commentor && $scope.formData.text){
        $http({
          method: 'POST',
          url: '/comments',
          headers: {
             'Content-Type': 'application/json'
          },
          data: $scope.formData
        })
        .then(function(data){
          console.log(data)
          $scope.getComments();
        })
        .catch(function(error){
          console.log(error)
        });
        $scope.formData = {}
        $scope.errorMessage = ''
      } else{
        $scope.errorMessage = 'Please fill in all the details'
      }

    }

  $scope.commentAction = function(commentId,action){
    console.log(commentId);
    $http({
      method: 'POST',
      url: '/comments/'+commentId+'/'+action,
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

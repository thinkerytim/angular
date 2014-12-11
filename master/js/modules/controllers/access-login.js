/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

App.controller('LoginFormController', ['$scope', '$http', '$state', '$firebaseAuth', function($scope, $http, $state, $firebaseAuth) {

  // bind here all data from the form
  $scope.account = {};
  // place the message if something goes wrong
  $scope.authMsg = '';

  $scope.login = function() {
    var ref = new Firebase("https://incandescent-torch-6057.firebaseio.com/");
    var auth = $firebaseAuth(ref);

    $scope.authMsg = '';

    ref.authWithPassword({
      email    : $scope.account.email, 
      password : $scope.account.password
    }, function(error, authData) {
      if (error === null) {
        // user authenticated with Firebase
        console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
        $state.go('app.dashboard');
      } else {
        console.log("Error authenticating user:", error);
        $scope.authMsg = 'Invalid Email or Password';
        console.dir($scope.authMsg);
      }
    });

  };

}]);

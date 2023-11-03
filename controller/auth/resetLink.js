controllers.auth.resetLink = function($scope, $http, CONFIG){
    console.log("password reset link")

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    $scope.requestResetLink = function(){
        console.log($scope.email)

        $http.post(CONFIG.BASE_URL.API + '/password-email', {email: $scope.email}, config)
        .then(function(response) {
            // Success callback
            console.log(response.data);
        }, function(error) {
            // Error callback
            console.error(error);
        })
    }
} 
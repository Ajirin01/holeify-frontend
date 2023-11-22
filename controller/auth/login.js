const loginController = function($scope, $rootScope, $http, CONFIG, $sessionStorage){
    $rootScope.user = {}

    $scope.login = function(){
        $rootScope.loading = true
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value

        const data = {
            email,
            password
        }

        // console.log(data)

        var config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        $http.post(CONFIG.BASE_URL.API + '/user/login', data, config)
            .then(function(response) {
                // Success callback

                if(response.status == 200){
                    M.toast({html: "Login successful!"})
                    
                    $sessionStorage.user = response.data.user

                    // console.log(response)
                    $rootScope.loading = false
                    
                    window.location = "#!/dashboard"
                }

            }, function(error) {
                // Error callback
                if(error.status == 401){
                    M.toast({html: "Invalid login credentials, please check and login in again or register if you're new!"})
                    $rootScope.loading = false
                }
            });
    }
}
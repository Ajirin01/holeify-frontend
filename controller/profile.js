const profileController = function($scope, $rootScope, $http, CONFIG, $sessionStorage){
    $rootScope.user = $sessionStorage.user
    console.log($rootScope.user)

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    $rootScope.updateProfile = function(){
        var first_name = document.getElementById('first_name').value
        var last_name = document.getElementById('last_name').value
        var email = document.getElementById('email').value
        var phone = document.getElementById('phone').value
        var password = document.getElementById('password').value
        
        var name = first_name+ " "+ last_name

        var data = {
            name,
            email,
            phone
        }

        if(password !== ""){
            data.password = password
        }
        
        console.log(data)

        $http.post(CONFIG.BASE_URL.API + '/user/update', data, config)
            .then(function(response) {
                // Success callback
                // console.log(response.data)

                if(response.status == 200){
                    M.toast({html: "Profile update was successful!"})

                    if(password == ""){
                        delete $sessionStorage.user
                        $sessionStorage.user = response.data

                        $rootScope.user = $sessionStorage.user
                        window.location = "#!/profile"
                    }else{
                        delete $sessionStorage.user
                        window.location = "#!/login"
                    }

                    
                }

            }, function(error) {
                // Error callback
                if(error.status == 401){
                    M.toast({html: "Invalid login credentials, please check and login in again or register if you're new!"})
                }
            });
        }
  }
  
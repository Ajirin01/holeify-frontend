const registerController = function($scope, $http, $rootScope, $sessionStorage, CONFIG){
    console.log("Register controller")

    $rootScope.user = {}

    $scope.register = function(){
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        let first_name = document.getElementById("firstname").value
        let last_name = document.getElementById("lastname").value

        let full_name = last_name + " " + first_name 
        
        let error_msg = ""

        if(first_name === ""){
            error_msg += "First name is required"
        } if(last_name === ""){
            error_msg += "<br>Last name is required"
        } if(email === ""){
            error_msg += "<br>Email is required"
        } if(password === ""){
            error_msg += "<br>Password is required"
        } 

        if(error_msg === ""){

            const data = {
                email,
                password,
                name: full_name,
                role: "user"
            }

            // console.log(data)

            var config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            $http.post(CONFIG.BASE_URL.API + '/user/register', data, config)
                .then(function(response) {
                    // Success callback

                    if(response.status == 200){
                        M.toast({html: "Registration was successful!"})
                        
                        $sessionStorage.user = response.data.user

                        console.log(response)

                        // setTimeout(function(){
                        window.location = "#!/dashboard"
                        // }, 5000)

                        

                    }

                }, function(error) {
                    // Error callback
                    if(error.status == 401){
                        M.toast({html: "Invalid login credentials, please check and login in again or register if you're new!"})
                    }
                });
        }else{
            M.toast({html: error_msg})
        }
    }
}
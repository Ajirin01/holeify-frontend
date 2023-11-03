myApp.factory('authService', ['$http', '$sessionStorage', '$rootScope', '$state', 'CONFIG', function($http, $sessionStorage, $rootScope, $state, CONFIG) {
    var authService = {};
  
    authService.isAuthenticated = function() {
      // check if user is authenticated
      // console.log($sessionStorage.user)
      return $sessionStorage.user !== undefined;
    };

    authService.logout = function(){
        $http.post(CONFIG.BASE_URL.API + '/user/logout')
        .then(function(response) {
            // Success callback

            if(response.status == 200){
                M.toast({html: "Logout successful!"})

                delete $sessionStorage.user
                $rootScope.user = $sessionStorage.user
                $state.go("home")

            }

        }, function(error) {
            // Error callback
            if(error.status == 401){
                M.toast({html: "Invalid login credentials, please check and login in again or register if you're new!"})
            }
        });
    }

    authService.user = function(){
        return $sessionStorage.user
    }
  
    return authService;
  }]);



  
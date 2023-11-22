myApp.controller('appController', function($scope, $rootScope, $http, $sessionStorage, $state, $templateCache, PusherService, authService, CONFIG){
    // Initialize the transitioning flag
    console.log($sessionStorage.user !== undefined)
    $rootScope.transitioning = false;
    $rootScope.confirm_account_details = false
    $scope.accountData = {}

    $rootScope.auth = authService

    // Disable view caching to apply the transition animation every time a view is loaded
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (typeof(fromState) !== 'undefined') {
            $templateCache.remove(fromState.templateUrl);
        }

        if (toState.requiresAuthentication && !authService.isAuthenticated()) {
            // redirect user to login page if they are not authenticated
            event.preventDefault();
            $state.go('login');
        }
    });

    // Listen for state change events to trigger the transition animation
    $rootScope.$on('$stateChangeStart', function() {
        $rootScope.transitioning = true;
        $rootScope.loading = true
    });

    $rootScope.$on('$stateChangeSuccess', function() {
        $rootScope.transitioning = false;
        $rootScope.loading = false
    });


    $rootScope.user = $sessionStorage.user
    console.log($rootScope.user)

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    

    // add a function to refresh the page and clear the newTasks array
    $rootScope.refresh = function() {
        // clear the newTasks array
        $rootScope.newActiveTasks = [];
        
        // reload the current route to fetch all tasks from the server
        $state.go('home')
    };


    // // get the total balance and check if account details exist for user when the user is worker
    if(authService.isAuthenticated() ){
        $http.post(CONFIG.BASE_URL.API + '/check-account-detail-exist', {worker_id: authService.user().id}, config).
        then(response=> {
            let account_detail_exist = response.data
            console.log('Account detail exist?', account_detail_exist)
            if(account_detail_exist){
                // get banks from flutterwave
                $http.get('banks.json')
                .then(response => {
                    $scope.banks = response.data;
                    // console.log($scope.banks)
                    var instance = M.Modal.getInstance(document.getElementById('account-details-model'));
                    instance.open();
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error:', error);
                });
            }
        })
    }

    $scope.confirmAccountDetails = function(){
        $rootScope.confirm_account_details = true

        var instance = M.Modal.getInstance(document.getElementById('confirm-account-details-model'));
        instance.close();

        $rootScope.loading = true

        console.log($scope.accountData)

        $http.post(CONFIG.BASE_URL.API + '/save-account-detail', $scope.accountData, config).
        then(response=> {
            console.log("Account details saved")
            console.log(response)
            if(response.data.message === "success"){
                var instance = M.Modal.getInstance(document.getElementById('account-details-model'));
                instance.close();

                M.toast({html: "Account details successfully updated"})

                $rootScope.loading = false
            }
        })
    }
    
    $scope.resolveAccountDetails = function(){
        $rootScope.loading = true
        console.log($scope.account_number, $scope.bank_code, $scope.bank_name)
        let data = {
            account_number: $scope.account_number,
            bank_code: JSON.parse($scope.bank).code,
            bank_name: JSON.parse($scope.bank).name,
            id: authService.user().worker.id
        }

        console.log(data)

        $http.post(CONFIG.BASE_URL.API + '/resolve-account', data, config).
        then(response=> {
            console.log(JSON.parse(response.data).data)
            if(JSON.parse(response.data).status === "error"){
                console.log(response.data.error)
                $rootScope.loading = false
                M.toast({ html: "Can not verify your account details. Please check and try again!" })
            }else{
                console.log(JSON.parse(response.data).status)
                if(JSON.parse(response.data).status === "success"){
                    $rootScope.loading = false
                    $scope.account = JSON.parse(response.data).data
                    // M.toast({ html: "Deleted successfully" })
                    
                    var instance = M.Modal.getInstance(document.getElementById('confirm-account-details-model'));

                    instance.open();

                    $scope.accountData = data
                }
            }
        })

    }


  })

  
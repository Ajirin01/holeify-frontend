const dashboardController = function($scope, $http, CONFIG, authService){
    $scope.page_title = "dashboard"

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    console.log(authService.user().worker.id)

    // console.log(authService.user().role)
    if(authService.user().role === "admin"){
        $http.post(CONFIG.BASE_URL.API + '/query-withdrawals', {}, config).
        then(response=> {
            console.log(response.data)
            var total_earnings = 0
            
            response.data.forEach(withdrawal => {
                if(!withdrawal.paid){
                    total_earnings = total_earnings + Number(withdrawal.amount)
                }
            });

            $scope.total_earnings = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(total_earnings)
        })

        $http.post(CONFIG.BASE_URL.API + '/user/all', {}, config).
        then(response=> {
            console.log(response.data)
            $scope.users = response.data.length
        })

        $http.post(CONFIG.BASE_URL.API + '/queryTask', {status: "pending"}, config).
        then(response=> {
            console.log(response.data)
            $scope.tasks_awaiting_approval = response.data.length
        })
    }else{
        $http.post(CONFIG.BASE_URL.API + '/get-done-tasks', {worker_id: authService.user().worker.id}, config).
        then(response=> {
            $scope.completed_tasks_count = response.data.length
        })
    
        $http.post(CONFIG.BASE_URL.API + '/query-withdrawals', {worker_id: authService.user().worker.id}, config).
        then(response=> {
            var total_earnings = 0
            
            response.data.forEach(withdrawal => {
                if(!withdrawal.paid){
                    total_earnings = total_earnings + Number(withdrawal.amount)
                }
            });
    
            $scope.total_earnings = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(total_earnings)
        })

        $http.post(CONFIG.BASE_URL.API + '/get-submitted-tasks', {worker_id: authService.user().worker.id, status: "pending"}, config).
        then(response=> {
            $scope.worker_task_waiting_approval = response.data.length
        })
    }


}
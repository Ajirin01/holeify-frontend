const walletController = function($scope, $http, CONFIG, authService){
    $scope.balance = "Loading balance..."
    $scope.pending = ""

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    
    $http.post(CONFIG.BASE_URL.API + '/get-submitted-tasks/', {worker_id: authService.user().worker.id}, config).
    then(response=> {
        let submitted_tasks = response.data
        console.log(submitted_tasks)

        var pending = 0

        submitted_tasks.forEach(task => {
            if(task.status === "pending"){
                pending = pending + Number(task.reward)
            }
        });

        
        var pending = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(pending);

        $scope.pending = pending

    })

    $http.post(CONFIG.BASE_URL.API + '/get-done-tasks', {worker_id: authService.user().worker.id, paid: false}, config).
    then(response=> {
        let done_tasks = response.data
        console.log(done_tasks)

        var balance = 0
        
        done_tasks.forEach(task => {
            if(!task.paid){
                balance = balance + Number(task.earning)
            }
        });

        var balance = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(balance);

        $scope.balance = balance

    })

}
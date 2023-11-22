const homeController = function($scope, $filter, $http, authService, $rootScope, CONFIG, PusherService){
    $scope.pageSize = 10;
    $scope.changeHandler = function (newPage) { };

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    $http.post(CONFIG.BASE_URL.API + '/queryTask', { query: "total_need > total_done", status: "approved" }, config)
    .then(function(response) {
        // Success callback
        console.log(response.data);
        $rootScope.activeTasks = response.data
    }, function(error) {
        // Error callback
        console.error(error);
    })

    $rootScope.newActiveTasks = [];

    // subscribe to the 'tasks' channel and listen for 'task-added' events
    PusherService.subscribe('tasks', 'task-added', function(data) {
        console.log(data)
        
        data.forEach(task => {
            // add the new task to the $rootScope.newActiveTasks array
            $rootScope.newActiveTasks.push(task);
            // add the new task to the $rootScope
            if (!$rootScope.activeTasks.some(existingTask => existingTask.id === task.id)) {
                $rootScope.activeTasks.push(task);
            }
            console.log(task)
        });
        // trigger a digest cycle to update the view
        $scope.$apply();
    });

    if(authService.isAuthenticated()){
        $http.post(CONFIG.BASE_URL.API + '/get-submitted-tasks', {worker_id: authService.user().worker.id}, config).
        then(response=> {
            let submitted_tasks = response.data
            // console.log(submitted_tasks)
    
            var pending = 0
    
            submitted_tasks.forEach(task => {
                if(task.status === "pending"){
                    pending = pending + Number(task.reward)
                }
            });
    
            
            var pending = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(pending);
    
            $scope.pending = pending
    
        })
    
        $http.post(CONFIG.BASE_URL.API + '/get-done-tasks', {worker_id: authService.user().worker.id,  paid: false}, config).
        then(response=> {
            let done_tasks = response.data
            // console.log(done_tasks)
    
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
}

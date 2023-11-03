const tasksController = function ($scope, $http, $rootScope, $filter, CONFIG, authService){
    $scope.page_title = "Tasks"
    $scope.name = ""

    $scope.pageSize = 5;
    
    $scope.changeHandler = function (newPage) { };

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    $scope.deleteTask = function(id){
        console.log(id)
        $http.delete(CONFIG.BASE_URL.API + '/tasks/' + id, {}, config).
        then(response=> {
            console.log(response)
            $scope.myTasks  = $scope.myTasks.filter(task => task.id !== id)
            M.toast({ html: "Deleted successfully" });
        })
    }
    
    $http.post(CONFIG.BASE_URL.API + '/queryTask', {requester_id: authService.user().requester.id}, config)
    .then(function(response) {
        // Success callback
        console.log("Requester tasks", response.data);
        $scope.myTasks = response.data
    }, function(error) {
        // Error callback
        console.error(error);
    })


}
controllers.taskType.index = function($scope, $http, $filter, CONFIG){
    $scope.page_title = "Categories"

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    
    $http.get(CONFIG.BASE_URL.API + '/task-types', {}, config)
    .then(function(response) {
        // Success callback
        console.log(response.data);
        $scope.taskTypes = response.data
    }, function(error) {
        // Error callback
        console.error(error);
    })

    $scope.pageSize = 5;
    
    $scope.changeHandler = function (newPage) { };

    $scope.deleteCategory = function(id){
        $http.delete(CONFIG.BASE_URL.API + '/task-types/'+id, {}, config)
        .then(function(response) {
            // Success callback
            console.log(response.data);
            $scope.taskTypes  = $scope.taskTypes.filter(taskType => taskType.id !== id)
            M.toast({html: 'Task Type '+id+' deleted!'})
        }, function(error) {
            // Error callback
            console.error(error);
        })
        
    }
}
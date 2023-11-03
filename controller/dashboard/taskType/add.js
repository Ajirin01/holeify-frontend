controllers.taskType.add = function($scope, $http, $timeout, CONFIG){
    $http.get(CONFIG.BASE_URL.API + '/categories')
    .then(function(response) {
        // Success callback
        console.log(response.data);
        $scope.categories = response.data
        $timeout(function () {
            $('select').formSelect()
        });
    }, function(error) {
        // Error callback
        console.error(error);
    })

    
    $scope.addTaskType = function(){
        var errors = []

        if($scope.title === undefined){
            errors.push("Task title can not be empty")
        }if($scope.category === undefined){
            errors.push("Task category can not be empty")
        }


        if(errors.length > 0){
            errors.forEach(error => {
                M.toast({html: error})
            });
        }else{
            console.log($scope.title, $scope.category)

            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            let data = {
                title: $scope.title,
                category_id: $scope.category.id
            }

            console.log(data)
        
            $http.post(CONFIG.BASE_URL.API + '/task-types', data, config)
            .then(function(response) {
                // Success callback
                console.log(response.data);
                // $scope.categories.push(response.data)
                M.toast({html: "Task type successfully created!"})
            }, function(error) {
                // Error callback
                console.error(error);
            })
        }
    }
}
controllers.taskType.edit = function($scope, $http, CONFIG, $stateParams, $timeout, $state){
    const task_type_id = $stateParams.task_type_id

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

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

    $http.get(CONFIG.BASE_URL.API + '/task-types/'+task_type_id, {}, config)
    .then(function(response) {
        // Success callback
        console.log(response.data);
        $scope.task_type = response.data
    }, function(error) {
        // Error callback
        console.error(error);
    })

    $scope.updateTaskType = function(){
        var errors = []

        let data = {}

        if(document.getElementById('title').value === ''){
            errors.push("Task title can not be empty")
        }else{
            data.title = document.getElementById('title').value
        }

        if(document.getElementById('category').value === ''){
            data.category_id = $scope.task_type.category_id
        }else{
            data.category_id = JSON.parse(document.getElementById('category').value).id
        }


        if(errors.length > 0){
            errors.forEach(error => {
                M.toast({html: error})
            });
        }else{
            // console.log($scope.title, $scope.description, $scope.taskType_id, $scope.maxReward)

            console.log(data)
        
            $http.put(CONFIG.BASE_URL.API + '/task-types/'+task_type_id, data, config)
            .then(function(response) {
                // Success callback
                console.log(response.data);
                $scope.task_type = response.data
                M.toast({html: "TaskType successfully updated!"})
                window.location = '#!task-types'
            }, function(error) {
                // Error callback
                console.error(error);
            })
        }
    }
}
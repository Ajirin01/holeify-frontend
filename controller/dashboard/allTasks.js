const allTasksController = function ($scope, $http, $rootScope, $filter, CONFIG, authService){
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
            $scope.allTasks  = $scope.allTasks.filter(task => task.id !== id)
            M.toast({ html: "Deleted successfully" });
        })
    }
    
    $http.post(CONFIG.BASE_URL.API + '/queryTask', {}, config)
    .then(function(response) {
        // Success callback
        console.log("Requester tasks", response.data);
        $scope.allTasks = response.data
    }, function(error) {
        // Error callback
        console.error(error);
    })

    $scope.toggleCheckAll = function(){
        var checkboxes = document.getElementsByClassName('checkbox');

        if($scope.selectAllTasks){
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
            }
        }else{
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
        }    
    }

    $scope.updateStatus = function(status){
        event.preventDefault()
        var checkboxes = document.getElementsByClassName('checkbox');
        var task_ids = []

        for (var i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].checked){
                task_ids.push(Number(checkboxes[i].value))
            }
        }

        let data = {
            status: status,
            IDs: task_ids,
            requester_id: authService.user().id
        }

        $http.post(CONFIG.BASE_URL.API + '/update-tasks-status', data, config)
        .then(function(response) {
            // Success callback
            console.log(response.data);
            $scope.allTasks  = response.data
            M.toast({html: 'Tasks successfully updated!'})
        }, function(error) {
            // Error callback
            console.error(error);
        })   

        // console.log(task_ids)
    }

    $scope.openModal = function(id, title, url){
        $scope.task_title = title
        $scope.photo_proof = url
        $scope.task_id = id
        console.log(id, title, url)
    }


}
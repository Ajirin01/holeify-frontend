controllers.submittedTask.index = function($scope, $http, $filter, CONFIG, authService){
    $scope.page_title = "Categories"

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    $http.post(CONFIG.BASE_URL.API + '/get-submitted-tasks', {requester_id: authService.user().requester.id}, config)
    .then(function(response) {
        // Success callback
        console.log(response.data);
        $scope.submittedTasks = response.data
    }, function(error) {
        // Error callback
        console.error(error);
    })

    $scope.pageSize = 5;
    
    $scope.changeHandler = function (newPage) { };

    $scope.deleteSubmittedTask = function(id){
        $http.delete(CONFIG.BASE_URL.API + '/submitted-tasks/'+id, {}, config)
        .then(function(response) {
            // Success callback
            console.log(response.data);
            $scope.submittedTasks  = $scope.submittedTasks.filter(submittedTask => submittedTask.id !== id)
            M.toast({html: 'SubmittedTask '+id+' deleted!'})
        }, function(error) {
            // Error callback
            console.error(error);
        })
        
    }

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
        var submitted_task_ids = []

        for (var i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].checked){
                submitted_task_ids.push(Number(checkboxes[i].value))
            }
        }

        let data = {
            status: status,
            IDs: submitted_task_ids,
            requester_id: authService.user().id
        }

        $http.post(CONFIG.BASE_URL.API + '/update-submitted-tasks-status', data, config)
        .then(function(response) {
            // Success callback
            console.log(response.data);
            $scope.submittedTasks  = response.data
            M.toast({html: 'Submitted Tasks successfully updated!'})
        }, function(error) {
            // Error callback
            console.error(error);
        })   

        // console.log(submitted_task_ids)
    }

    $scope.openModal = function(id, title, url){
        $scope.task_title = title
        $scope.photo_proof = url
        $scope.task_id = id
        console.log(id, title, url)
    }
}
const taskViewController = function ($scope, $stateParams, $rootScope, $http, authService, CONFIG){
    $scope.page_title = "Tasks"
    console.log($stateParams.task_id)
    // console.log(authService.user())
    
    $scope.shouldShowProofArea = false

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };


    $scope.showProofArea = function(){
        $scope.shouldShowProofArea = true
    }

    $scope.openFile = function(){
        console.log("clicked")
        $('#proof').trigger('click')
    }

    $scope.submitProof = function() {
       var proof = document.getElementById("imagePreview").src

       let task = getTask($rootScope.tasks, $stateParams.task_id)

       console.log(task)

       let data = {
        task_id: $stateParams.task_id,
        prove_photo: proof,
        worker_id: authService.user().worker.id,
        requester_id: task.requester_id,
        reward: task.reward,
        status: "pending"
       }

       console.log(data)

       $http.post(CONFIG.BASE_URL.API + '/submitted-tasks', data, config)
        .then(function(response) {
            // Success callback
            console.log(response.data);
            // $scope.submittedTasks  = response.data
            M.toast({html: "Task submitted and awaiting Requester's approval!"})
        }, function(error) {
            // Error callback
            console.error(error);
        })   

    }

    if($rootScope.tasks == undefined){
        $scope.$watch('tasks', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                // console.log('The value of myHiddenInput has changed:', newValue);
                $scope.task = getTask($rootScope.tasks, $stateParams.task_id)
            }
        });
    }else{
        $scope.task = getTask($rootScope.tasks, $stateParams.task_id)
    }

    
}


function getProof() {
    // console.log("Get proof")
    const proof = document.getElementById('proof');
    const imagePreview = document.getElementById('imagePreview');

    const file = proof.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', function() {
        const imageDataBase64 = reader.result.split(',')[1]; // Extract the Base64 data from the result
        imagePreview.src = "data:image/jpeg;base64," + imageDataBase64; // Change 'jpeg' to the actual image type
        document.getElementById('uploadButton').innerText = "Upload Another";
        document.getElementById('submit').style.display = "block";
        // console.log(imageDataBase64);
    }, false);

    if (file) {
        reader.readAsDataURL(file); // Read the file as data URL
    }
}


function getTask(tasks, task_id){
    const TasksOBJ = new ArrayQuery(tasks)
    return TasksOBJ.selectWhere({id: task_id})[0]  
}


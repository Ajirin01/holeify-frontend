const taskViewController = function ($scope, $stateParams, $rootScope, $http, authService, CONFIG){
    $rootScope.page_title = "Manage Tasks"
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
        $rootScope.loading = true
       var proof = document.getElementById("imagePreview").src

       let task = getTask($rootScope.activeTasks, $stateParams.task_id)

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
        
                $rootScope.pending = pending
                $rootScope.loading = false

                window.location = "#!/"
            })
        }, function(error) {
            // Error callback
            console.error(error);
        })   

    }

    if($rootScope.activeTasks == undefined){
        $scope.$watch('tasks', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                // console.log('The value of myHiddenInput has changed:', newValue);
                
                $http.post(CONFIG.BASE_URL.API + '/get-submitted-tasks', {worker_id: authService.user().worker.id, task_id: $stateParams.task_id}, config).
                then(response=> {
                    $scope.task = getTask($rootScope.activeTasks, $stateParams.task_id)

                    let submitted_tasks = response.data
                    $scope.userHasDoneTask = true ? submitted_tasks.length > 0 : false
                    // console.log(submitted_tasks.length)
                })
            }
        });
    }else{
        

        $http.post(CONFIG.BASE_URL.API + '/get-submitted-tasks', {worker_id: authService.user().worker.id, task_id: $stateParams.task_id}, config).
        then(response=> {
            $scope.task = getTask($rootScope.activeTasks, $stateParams.task_id)


            let submitted_tasks = response.data
            $scope.userHasDoneTask = true ? submitted_tasks.length > 0 : false
            console.log(submitted_tasks.length)
        })
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


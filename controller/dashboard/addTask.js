const addTaskController = function($scope, $timeout, $http, CONFIG, authService, $sessionStorage){
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

    $scope.getTitles = function(){
        // console.log($scope.category)
        $timeout(function () {
            $('select').formSelect()
        });
    }

    $scope.submitAddTask = function(){
        let link = $('#task_link').val()
        let category = JSON.parse($('#category').val())
        let title = $('#title').val()
        
        let reward = $('#reward').val()
        let total_need = $('#total_needed').val()
        let description = $('#description').val()
        
        if(title.includes("category_id")){
            title = JSON.parse(title)
        }

        var data = {
            category: category,
            title,
            description,
            reward: Number(reward),
            total_need: Number(total_need),
            link,
            status: "approved",
            total_done: 0,
            requester_id: authService.user().requester.id
        }

        $sessionStorage.task_object = data

        document.getElementById('go-to-summary').click()
        
    }
}

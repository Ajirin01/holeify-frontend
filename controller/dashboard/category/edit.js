controllers.category.edit = function($scope, $http, CONFIG, $stateParams, $state){
    const category_id = $stateParams.category_id

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    $http.get(CONFIG.BASE_URL.API + '/categories/'+category_id, {}, config)
    .then(function(response) {
        // Success callback
        console.log(response.data);
        $scope.category = response.data
    }, function(error) {
        // Error callback
        console.error(error);
    })

    $scope.updateCategory = function(){
        var errors = []

        if(document.getElementById('name').value === undefined){
            errors.push("Category name can not be empty")
        }if(document.getElementById('minReward').value === undefined){
            errors.push("Category minimum reward can not be empty")
        }if(document.getElementById('maxReward').value === undefined){
            errors.push("Category maximum reward can not be empty")
        }if(document.getElementById('description').value === undefined){
            document.getElementById('description').value = "No description supplied by editor"
        }


        if(errors.length > 0){
            errors.forEach(error => {
                M.toast({html: error})
            });
        }else{
            // console.log($scope.name, $scope.description, $scope.minReward, $scope.maxReward)

            let data = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                reward_range: JSON.stringify([Number(document.getElementById('minReward').value), Number(document.getElementById('maxReward').value)])
            }

            console.log(data)
        
            $http.put(CONFIG.BASE_URL.API + '/categories/'+category_id, data, config)
            .then(function(response) {
                // Success callback
                console.log(response.data);
                $scope.category = response.data
                M.toast({html: "Category successfully updated!"})
                $state.go('categories')
            }, function(error) {
                // Error callback
                console.error(error);
            })
        }
    }
}
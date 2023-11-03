controllers.category.add = function($scope, $http, CONFIG){
    $scope.addCategory = function(){
        var errors = []

        if($scope.name === undefined){
            errors.push("Category name can not be empty")
        }if($scope.minReward === undefined){
            errors.push("Category minimum reward can not be empty")
        }if($scope.maxReward === undefined){
            errors.push("Category maximum reward can not be empty")
        }if($scope.description === undefined){
            $scope.description = "No description supplied by editor"
        }


        if(errors.length > 0){
            errors.forEach(error => {
                M.toast({html: error})
            });
        }else{
            console.log($scope.name, $scope.description, $scope.minReward, $scope.maxReward)

            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            let data = {
                name: $scope.name,
                description: $scope.description,
                reward_range: JSON.stringify([$scope.minReward, $scope.maxReward])
            }
        
            $http.post(CONFIG.BASE_URL.API + '/categories', data, config)
            .then(function(response) {
                // Success callback
                console.log(response.data);
                // $scope.categories.push(response.data)
                M.toast({html: "Category successfully created!"})
            }, function(error) {
                // Error callback
                console.error(error);
            })
        }
    }
}
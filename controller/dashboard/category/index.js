controllers.category.index = function($scope, $http, $filter, CONFIG){
    $scope.page_title = "Categories"

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    $http.get(CONFIG.BASE_URL.API + '/categories', {}, config)
    .then(function(response) {
        // Success callback
        console.log(response.data);
        $scope.categories = response.data
    }, function(error) {
        // Error callback
        console.error(error);
    })

    $scope.pageSize = 5;
    
    $scope.changeHandler = function (newPage) { };

    $scope.deleteCategory = function(id){
        $http.delete(CONFIG.BASE_URL.API + '/categories/'+id, {}, config)
        .then(function(response) {
            // Success callback
            console.log(response.data);
            $scope.categories  = $scope.categories.filter(category => category.id !== id)
            M.toast({html: 'Category '+id+' deleted!'})
        }, function(error) {
            // Error callback
            console.error(error);
        })
        
    }
}
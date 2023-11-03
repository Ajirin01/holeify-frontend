myApp.config(function($stateProvider) {
    var categoriesState= {
        name: 'categories',
        url: '/categories',
        controller: controllers.category.index,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/category/index.html'
    }

    var addCategoryState= {
        name: 'add-category',
        url: '/add-category',
        controller: controllers.category.add,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/category/add.html'
    }

    var editCategoryState = {
        name: 'edit-category',
        url: '/edit-category/:category_id',
        controller: controllers.category.edit,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/category/edit.html'
    }

    $stateProvider.state(categoriesState);
    $stateProvider.state(editCategoryState);
    $stateProvider.state(addCategoryState);
});
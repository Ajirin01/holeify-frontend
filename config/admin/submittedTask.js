myApp.config(function($stateProvider) {
    var submittedTasksState= {
        name: 'submittedTasks',
        url: '/submittedTasks',
        controller: controllers.submittedTask.index,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/submittedTask/index.html'
    }

    // var addCategoryState= {
    //     name: 'add-submittedTask',
    //     url: '/add-submittedTask',
    //     controller: controllers.submittedTask.add,
    //     requiresAuthentication: true,
    //     templateUrl: 'view/dashboard/submittedTask/add.html'
    // }

    // var editCategoryState = {
    //     name: 'edit-submittedTask',
    //     url: '/edit-submittedTask/:submittedTask_id',
    //     controller: controllers.submittedTask.edit,
    //     requiresAuthentication: true,
    //     templateUrl: 'view/dashboard/submittedTask/edit.html'
    // }

    $stateProvider.state(submittedTasksState);
    // $stateProvider.state(editCategoryState);
    // $stateProvider.state(addCategoryState);
});
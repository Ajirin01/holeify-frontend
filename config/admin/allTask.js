myApp.config(function($stateProvider) {
    var allTasksState= {
        name: 'allTasks',
        url: '/allTasks',
        controller: allTasksController,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/allTasks.html'
    }

    // var addallTaskstate= {
    //     name: 'add-task',
    //     url: '/add-task',
    //     controller: addTaskController,
    //     requiresAuthentication: true,
    //     templateUrl: 'view/dashboard/add-task.html'
    // }

    // var completedallTasksState = {
    //     name: 'completed-allTasks',
    //     url: '/completed-allTasks',
    //     controller: completedallTasksController,
    //     requiresAuthentication: true,
    //     templateUrl: '../partials/dashboard/completed-allTasks.html'
    // }

    $stateProvider.state(allTasksState);
    // $stateProvider.state(completedallTasksState);
    // $stateProvider.state(addallTaskstate);
});
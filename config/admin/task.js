myApp.config(function($stateProvider) {
    var tasksState= {
        name: 'tasks',
        url: '/tasks',
        controller: tasksController,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/tasks.html'
    }

    var addTaskState= {
        name: 'add-task',
        url: '/add-task',
        controller: addTaskController,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/add-task.html'
    }

    var completedTasksState = {
        name: 'completed-tasks',
        url: '/completed-tasks',
        controller: completedTasksController,
        requiresAuthentication: true,
        templateUrl: '../partials/dashboard/completed-tasks.html'
    }

    $stateProvider.state(tasksState);
    $stateProvider.state(completedTasksState);
    $stateProvider.state(addTaskState);
});
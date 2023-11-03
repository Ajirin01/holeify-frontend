myApp.config(function($stateProvider) {
    var taskTypesState= {
        name: 'task-types',
        url: '/task-types',
        controller: controllers.taskType.index,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/taskType/index.html'
    }

    var addTaskTypeState= {
        name: 'add-taskType',
        url: '/add-taskType',
        controller: controllers.taskType.add,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/taskType/add.html'
    }

    var editTaskTypeState = {
        name: 'edit-taskType',
        url: '/edit-taskType/:task_type_id',
        controller: controllers.taskType.edit,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/taskType/edit.html'
    }

    $stateProvider.state(taskTypesState);
    $stateProvider.state(editTaskTypeState);
    $stateProvider.state(addTaskTypeState);
});
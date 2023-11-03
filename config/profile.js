myApp.config(function($stateProvider) {
    var profileState= {
        name: 'profile',
        url: '/profile',
        controller: profileController,
        templateUrl: 'view/profile.html'
    }

    // var profileState = {
    //     name: 'task-details',
    //     url: '/task-details/:task_id',
    //     controller: taskViewController,
    //     templateUrl: 'view/view-task.html'
    // }

    $stateProvider.state(profileState);
    // $stateProvider.state(TaskViewState);

    // $urlRouterProvider.otherwise('/');
});
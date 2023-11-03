myApp.config(function($stateProvider, $urlRouterProvider) {
    var homeState= {
        name: 'home',
        url: '/',
        controller: homeController,
        templateUrl: 'view/home.html'
    }

    var TaskViewState = {
        name: 'task-details',
        url: '/task-details/:task_id',
        controller: taskViewController,
        templateUrl: 'view/view-task.html'
    }

    $stateProvider.state(homeState);
    $stateProvider.state(TaskViewState);

    $urlRouterProvider.otherwise('/');
});
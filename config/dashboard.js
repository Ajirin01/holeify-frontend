myApp.config(function($stateProvider) {

    var dashboardState= {
        name: 'dashboard',
        url: '/dashboard',
        controller: dashboardController,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/dashboard.html'
    }

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

    var billingState= {
        name: 'billing',
        url: '/billing',
        controller: billingController,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/billing-summary.html'
    }

    var completedTasksState = {
        name: 'completed-tasks',
        url: '/completed-tasks',
        controller: completedTasksController,
        requiresAuthentication: true,
        templateUrl: '../partials/dashboard/completed-tasks.html'
    }

    var walletState = {
        name: 'wallet',
        url: '/wallet',
        controller: walletController,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/wallet.html'
    }

    $stateProvider.state(tasksState);
    $stateProvider.state(completedTasksState);
    $stateProvider.state(dashboardState);
    $stateProvider.state(addTaskState);
    $stateProvider.state(billingState);
    $stateProvider.state(walletState);
});
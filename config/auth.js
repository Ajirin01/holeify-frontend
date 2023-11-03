myApp.config(function($stateProvider, $urlRouterProvider) {
    var homeState= {
        name: 'login',
        url: '/login',
        controller: loginController,
        templateUrl: 'view/login.html'
    }

    var registerState = {
        name: 'register',
        url: '/register',
        controller: registerController,
        templateUrl: 'view/register.html'
    }

    var sendPasswordResetLinkState = {
        name: 'reset-link',
        url: '/reset-link',
        controller: controllers.auth.resetLink,
        templateUrl: 'view/password-send-email.html'
    }

    var resetPasswordState = {
        name: 'reset-password',
        url: '/reset-password/:token',
        controller: controllers.auth.reset,
        templateUrl: 'view/reset-password.html'
    }

    $stateProvider.state(homeState);
    $stateProvider.state(registerState);
    $stateProvider.state(sendPasswordResetLinkState);
    $stateProvider.state(resetPasswordState);

});
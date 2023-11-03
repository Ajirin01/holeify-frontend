myApp.config(function($stateProvider) {
    var payableAccountsState= {
        name: 'payableAccounts',
        url: '/payableAccounts',
        controller: controllers.payableAccounts.index,
        requiresAuthentication: true,
        templateUrl: 'view/dashboard/payable-accounts.html'
    }

    $stateProvider.state(payableAccountsState);
});
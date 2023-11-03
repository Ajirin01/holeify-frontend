controllers.payableAccounts.index = function($scope, $http, $filter, CONFIG, authService){
    $scope.page_title = "Payable Accounts"

    var config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    $http.post(CONFIG.BASE_URL.API + '/get-withdrawal-details', {requester_id: authService.user().requester.id}, config)
    .then(function(response) {
        // Success callback
        console.log(response.data);
        $scope.payableAccounts = response.data
    }, function(error) {
        // Error callback
        console.error(error);
    })

    $scope.pageSize = 5;
    
    $scope.changeHandler = function (newPage) { };

    $scope.deletepayableAccount = function(id){
        $http.delete(CONFIG.BASE_URL.API + '/submitted-tasks/'+id, {}, config)
        .then(function(response) {
            // Success callback
            console.log(response.data);
            $scope.payableAccounts  = $scope.payableAccounts.filter(payableAccount => payableAccount.id !== id)
            M.toast({html: 'payableAccount '+id+' deleted!'})
        }, function(error) {
            // Error callback
            console.error(error);
        })
        
    }

    $scope.toggleCheckAll = function(){
        var checkboxes = document.getElementsByClassName('checkbox');

        if($scope.selectAllTasks){
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
            }
        }else{
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
        }    
    }

    $scope.updateStatus = function(status){
        event.preventDefault()
        var checkboxes = document.getElementsByClassName('checkbox');
        var submitted_task_worker_ids_pairs = []

        for (var i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].checked){
                // submitted_withdrawal_ids.push(Number(checkboxes[i].value))
                submitted_task_worker_ids_pairs.push(Number(checkboxes[i].value))
            }
        }

        let data = {
            status: status,
            IDs: submitted_task_worker_ids_pairs
        }

        console.log(data)

        $http.post(CONFIG.BASE_URL.API + '/update-withdrawal-status', data, config)
        .then(function(response) {
            // Success callback
            console.log(response.data);
            $scope.payableAccounts  = response.data
            M.toast({html: 'Withdrawal status updated!'})
        }, function(error) {
            // Error callback
            console.error(error);
        })   

        // console.log(submitted_withdrawal_ids)
    }

    $scope.processPayout = function(){
        event.preventDefault()
        var checkboxes = document.getElementsByClassName('checkbox');
        var submitted_task_worker_ids_pairs = []

        for (var i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].checked){
                // submitted_withdrawal_ids.push(Number(checkboxes[i].value))
                submitted_task_worker_ids_pairs.push(Number(checkboxes[i].value))
            }
        }

        let data = {
            IDs: submitted_task_worker_ids_pairs
        }

        console.log(data)

        $http.post(CONFIG.BASE_URL.API + '/withdrawal', data, config)
        .then(function(response) {
            // Success callback
            console.log(response.data);
            // $scope.payableAccounts  = response.data
            M.toast({html: 'Withdrawals are being processed'})
        }, function(error) {
            // Error callback
            console.error(error);
        })   

        // console.log(submitted_withdrawal_ids)
    }

    $scope.updatePayouts = function(){
        event.preventDefault()
        var data = {}
        $http.post(CONFIG.BASE_URL.API + '/create-withdrawal-details', data, config)
        .then(function(response) {
            // Success callback
            console.log(response.data);
            $scope.payableAccounts  = response.data
            M.toast({html: 'Payouts list successfully updated!'})
        }, function(error) {
            // Error callback
            console.error(error);
        })   

        // console.log(submitted_withdrawal_ids)
    }

    $scope.openModal = function(id, title, url){
        $scope.task_title = title
        $scope.photo_proof = url
        $scope.withdrawal_id = id
        console.log(id, title, url)
    }
}
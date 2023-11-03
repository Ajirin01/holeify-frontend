const billingController = function($scope, $rootScope, $sessionStorage, $http, CONFIG, authService){
  $scope.task_title = $sessionStorage.task_object.title;
  $scope.task_category = $sessionStorage.task_object.category;
  $scope.task_category_id = $sessionStorage.task_object.category.id;
  $scope.task_reward = $sessionStorage.task_object.reward;
  $scope.task_link = $sessionStorage.task_object.link;
  $scope.task_total_need = $sessionStorage.task_object.total_need;
  $scope.task_description = $sessionStorage.task_object.description;
  $scope.task_total_done = $sessionStorage.task_object.total_done;
  $scope.task_requester_id = $sessionStorage.task_object.requester_id;

  var task_status;
  
  if($scope.task_category == "Custom Task"){
      task_status = "pending";
  } else {
      task_status = "approved";
  }

  let subtotal = $scope.task_total_need * $scope.task_reward;
  let charges = (50/100) * subtotal;

  $scope.total_payable = charges + subtotal;
  
  var config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  $scope.checkout = function(){
      $scope.disabled = {'disabled': true};
      $rootScope.loading = true
      // live
      // let flutterwave_api_key = 'FLWPUBK-172987fe4c7daf2818c05f8cc1492b78-X';
      // test 
      let flutterwave_api_key = 'FLWPUBK_TEST-fac2c00f396fddbc07310db113fd17c2-X'

      var payload = {
          tx_ref: 'task_payment-' + Math.floor(Math.random() * 10000000000),
          public_key: flutterwave_api_key,
          amount: $scope.total_payable,
          // amount: 10,
          currency: 'NGN',
          // redirect_url: 'http://ajirinibi.com.ng',
          payment_options: 'card, mobilemoney, ussd',
          customer: {
            email: authService.user().email,
            phone_number: authService.user().phone,
            name: authService.user().name,
          },
          callback: function (response) {
              console.log(response);
              var tx_ref = response.transaction_id;

              fetch('http://localhost:8000/verify-payment', {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                      'Content-Type': 'application/json',
                      'X-Requested-With': 'XMLHttpRequest',
                  },
                  body: JSON.stringify({ tx_ref: tx_ref })
              })
              .then(function (response) {
                  if (response.ok) {
                      return response.json();
                  }else{
                    console.log(response.text())
                  }
              })
              .then(function (data) {
                  console.log(data);
                  if (data.message === "success") {
                      let payload = {
                          category_id: $scope.task_category_id,
                          description: $scope.task_description,
                          link: $scope.task_link,
                          requester_id: $scope.task_requester_id,
                          reward: $scope.task_reward,
                          status: task_status,
                          title: $scope.task_title.title,
                          total_need: $scope.task_total_need,
                          total_done: $scope.task_total_done
                      };

                      $http.post(CONFIG.BASE_URL.API + '/tasks', payload, config)
                      .then(response=> {
                          console.log(response);
                          M.toast({ html: "Payment was successful" });
                          document.getElementById('pay-button').classList.remove('disabled');
                          window.location = "#!/tasks"
                          console.log("payment was successful");
                          $rootScope.loading = false
                          window.location.reload()
                      });
                  } else {
                      M.toast({ html: "Payment could not be verified" });
                      document.getElementById('pay-button').disabled = "false";
                  }
              })
              .catch(function (error) {
                  console.error(error);
                  document.getElementById('pay-button').disabled = "false";
              });
          },
          onclose: function () {
              M.toast({html: "Transaction was not completed, window closed."});
          }
      };

      FlutterwaveCheckout(payload);
  };
};


// const billingController = function($scope, $rootScope, $sessionStorage, $http, CONFIG, authService){
//   $scope.task_title = $sessionStorage.task_object.title;
//   $scope.task_category = $sessionStorage.task_object.category;
//   $scope.task_category_id = $sessionStorage.task_object.category.id;
//   $scope.task_reward = $sessionStorage.task_object.reward;
//   $scope.task_link = $sessionStorage.task_object.link;
//   $scope.task_total_need = $sessionStorage.task_object.total_need;
//   $scope.task_description = $sessionStorage.task_object.description;
//   $scope.task_total_done = $sessionStorage.task_object.total_done;
//   $scope.task_requester_id = $sessionStorage.task_object.requester_id;

//   var task_status;
  
//   if($scope.task_category == "Custom Task"){
//       task_status = "pending";
//   } else {
//       task_status = "approved";
//   }

//   let subtotal = $scope.task_total_need * $scope.task_reward;
//   let charges = (50/100) * subtotal;

//   $scope.total_payable = charges + subtotal;
  
//   var config = {
//       headers: {
//           'Content-Type': 'application/json'
//       }
//   };

//   $scope.checkout = function(){
//       $scope.disabled = {'disabled': true};
//       $rootScope.loading = true
//       // live
//       // let flutterwave_api_key = 'FLWPUBK-172987fe4c7daf2818c05f8cc1492b78-X';
//       // test 
//       let flutterwave_api_key = 'FLWPUBK_TEST-fac2c00f396fddbc07310db113fd17c2-X'

//       var payload = {
//           tx_ref: 'task_payment-' + Math.floor(Math.random() * 10000000000),
//           public_key: flutterwave_api_key,
//           amount: $scope.total_payable,
//           // amount: 10,
//           currency: 'NGN',
//           // redirect_url: 'http://ajirinibi.com.ng',
//           payment_options: 'card, mobilemoney, ussd',
//           customer: {
//             email: authService.user().email,
//             phone_number: authService.user().phone,
//             name: authService.user().name,
//           },
//           callback: function (response) {
//               console.log(response);
//               var tx_ref = response.transaction_id;

//               if (response.status === "successful") {
//                   let payload = {
//                       category_id: $scope.task_category_id,
//                       description: $scope.task_description,
//                       link: $scope.task_link,
//                       requester_id: $scope.task_requester_id,
//                       reward: $scope.task_reward,
//                       status: task_status,
//                       title: $scope.task_title.title,
//                       total_need: $scope.task_total_need,
//                       total_done: $scope.task_total_done
//                   };

//                   $http.post(CONFIG.BASE_URL.API + '/tasks', payload, config)
//                   .then(response=> {
//                       console.log(response);
//                       M.toast({ html: "Payment was successful" });
//                       document.getElementById('pay-button').classList.remove('disabled');
//                       window.location = "#!/tasks"
//                       console.log("payment was successful");
//                       $rootScope.loading = false
//                       close()
//                   });
//               } else {
//                   M.toast({ html: "Payment could not be verified" });
//                   document.getElementById('pay-button').disabled = "false";
//               }
//           },
//           onclose: function () {
//               M.toast({html: "Transaction was not completed, window closed."});
//           }
//       };

//       FlutterwaveCheckout(payload);
//   };
// };
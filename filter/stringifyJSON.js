myApp.filter('stringifyJSON', function() {
    return function(input) {
      if(input != null){
        return JSON.stringify(input);
      }
      
    }
  });
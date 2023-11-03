myApp.filter('parseJSON', function() {
    return function(input) {
      if(input != null && input != "custom"){
        return JSON.parse(input);
      }else if(input == "custom"){
        return [100, 200]
      }
      
    }
  });
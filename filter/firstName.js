myApp.filter('firstName', function(){
    return function(name){
        if(name !== undefined){
            let user_name = name.split(" ")
            return user_name[0]
        }else{
            return null
        }
        
    }
})
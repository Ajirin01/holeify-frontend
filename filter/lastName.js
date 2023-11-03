myApp.filter('lastName', function(){
    return function(name){
        if(name !== undefined){
            let user_name = name.split(" ")
            return user_name[1]
        }else{
            return null
        }
        
    }
})


myApp.filter('formatDate', function() {
    return function(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
})
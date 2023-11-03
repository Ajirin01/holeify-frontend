angular.module('myApp').service('PusherService', function() {
    var pusher = new Pusher('9593379d00b9bace2de7', {
        cluster: 'mt1',
        encrypted: true
    });
    
    this.subscribe = function(channelName, eventName, callback) {
        var channel = pusher.subscribe(channelName);
        channel.bind(eventName, callback);
    }
});

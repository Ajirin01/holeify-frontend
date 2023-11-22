myApp.filter('activeTasks', function() {
    return function(tasks) {
        if (tasks === undefined) {
            return [];
        }

        // Your filtering logic here
        let newTasks = tasks.filter(function(task) {
            return task.total_need < task.total_done && task.status === 1;
        });

        return newTasks;
    };
});

$(document).ready(onReady);

function onReady(){
    console.log('jq')
    listenForClicks();
};

// put click handlers here
function listenForClicks(){
$(document).on('click', '#addTaskButton', submit);
}

// grab input vals and create object to feed to addTask
function submit(){
    console.log('submit button clicked')
}

// Create a task
    // grab input vals
    // create a new object
    // send that object to the db
    //call render

// Render tasks
    // GET tasks from db
    // loop through the array and append to #taskList
        // generate complete and delete buttons
        // include task.id in data for access by buttons

// Mark complete
    // on click (slide?) complete button,
        // send request to server to update "task[id].complete" to TRUE

// DELETE task
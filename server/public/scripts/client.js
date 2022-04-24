$(document).ready(onReady);

function onReady() {
  console.log("jq");
  listenForClicks();
  refreshTasks();
}

// put click handlers here
function listenForClicks() {
  $(document).on("click", "#addTaskButton", submit);
  $(document).on("click", ".deleteButton", deleteTask);
  $(document).on("click", ".completeButton", completeTask);
}

// grab input vals and create object to feed to addTask
function submit() {
  console.log("submit button clicked");
  let newTask = {
    task: $("#taskInput").val(),
    dueDate: $("#dueInput").val(),
    importance: $("#importanceInput").val(),
    description: $("#descriptionInput").val(),
    complete: false
  };
  $('input').val(''),
  console.log("Created task:", newTask);
  addTask(newTask);
}

// Create a task
// send that object to the db
//call render?
function addTask(taskToAdd) {
  $.ajax({
    type: "POST",
    url: "/tasks",
    data: taskToAdd,
  })
    .then(function (response) {
      console.log("Response from server.", response);
      refreshTasks();
    })
    .catch(function (error) {
      console.log("Error in POST", error);
      alert("Unable to add task at this time. Please try again later.");
    });
}

// Refresh tasks - GET tasks from db
function refreshTasks() {
  $.ajax({
    type: "GET",
    url: "/tasks",
  })
    .then(function (response) {
      console.log(response);
      renderTasks(response);
    })
    .catch(function (error) {
      console.log("error in GET", error);
    });
}

// loop through the array and append to #taskList
// generate complete and delete buttons
// include task.id in data for access by buttons
function renderTasks(tasks) {
  $("#taskList").empty();
  for (let task of tasks) {
    if ((task.complete === true)) {
      $("#taskList").append(`
    
    <tr class="complete level${task.importance}" data-id=${task.id} data-complete=${task.complete}>
      <td>${task.task}</td>
      <td>${task.dueDate}</td>
      <td>${task.description}</td>
      <td><button class="btn deleteButton btn-warning">Delete</button></td>
    </tr>
   
  `);
    } else if ((task.complete === false)) {
      $("#taskList").append(`
    
  <tr class="incomplete level${task.importance}" data-id=${task.id} data-complete=${task.complete}>
    <td>${task.task}</td>
    <td>${task.dueDate}</td>
    <td>${task.description}</td>
    <td><button class="btn deleteButton btn-danger">Delete</button></td>
    <td><button class="btn completeButton btn-success">Complete</button></td>
  </tr>
 
`);
    }
  }
}

// DELETE task
function deleteTask() {
  let taskIdToDelete = $(this).closest("tr").data("id");
  $.ajax({
    method: "DELETE",
    url: `/tasks/${taskIdToDelete}`,
  })
    .then(function (response) {
      refreshTasks();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Mark complete

function completeTask() {
  let taskIdToUpdate = $(this).closest("tr").data("id");
  let completeStatus = $(this).data('complete');
  $.ajax({
    method: "PUT",
    url: `/tasks/${taskIdToUpdate}`,
    data: {newComplete: !completeStatus}
  })
    .then(function (response) {
      console.log(response);
      refreshTasks();
    })
    .catch(function (error) {
      console.log(error);
    });
}
//decalre an empty tasks array for future use
tasks = [];

//load any tasks that may have been saved in localStorage
var loadTasks = function(){

    //parse the data stored from localStorage with value named "tasks"
    tasks = JSON.parse(localStorage.getItem("tasks"))
    //if there are no tasks saved in localStorage, reset the tasks object to be blank
    if(!tasks) {
        tasks={};
    };
    //assuming there are values stored, run this function, passing through our saved tasks
    printSavedTasks(tasks)
}

var printSavedTasks = function(){
    //loop through "each" value in the array, and append each p element with their respective saved tasks
    $.each(tasks, function(list,arr){
        var taskP = $("<p>").addClass("taskItem").text(arr)

        //select the current index, based on ID naming, and replace with the contents passed through taskP
        $("#taskItem-" + list).replaceWith(taskP);
    })
}




//get the present date to display on the main page on load
var today = (moment().format("MMMM D, YYYY"))
$("#currentDate").text(today);

//allow editing of a task if you click inside the time block
$(".taskContainer").on("click", "p", function(){
    console.log(this);
    //create variable to store open and trim the current text in the P element
    var text = $(this).text().trim();
    //convert the P element to a textarea element
    var textInput = $("<textarea>").addClass("form-control").val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

//return the edited item back to the time block box as a P element
$(".taskContainer").on("blur", "textarea", function() {
    //trim the text in the textarea element
    var text = $(this).val().trim();
    //convert the text box content into a P element, give its value as whats captured in the text area
    var textInput = $("<p>").addClass("taskItem").text(text);
    $(this).replaceWith(textInput);
});

//saving the tasks to the array, and then saving them to local storage
$(".saveBtn").on("click", function(){
    //set the current index to the taskItem p element content that SAVE was clicked on
    var index = $(".saveBtn").index(this);
    tasks[index] = $(this).parent().find(".taskItem").text();
    //console and make sure its grabbing the right element and content
    console.log(tasks[index]);
    //save the item to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

var taskAudit = function() {
    //get the current time
    var currentTime = moment().format("HH")
    //make sure the time is correct for testing
    console.log(currentTime);
    //loop through each of the task ID's from 9 to 17 (9 am to 5PM in 24 hour format), check if within same hour. if past, grey, if future, green, if present, red
    for (var i=9; i < 18; i++) {
        var taskTime = $("#task-" + i)
        if(currentTime>i) {
            $(taskTime).addClass("past");
        } else if (curentTime === i) {
            $(taskTime).addClass("present");
        } else {
            $(taskTime).addClass("future");
        }
    }

}

loadTasks();
taskAudit();
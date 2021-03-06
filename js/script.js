//GLOBAL VARIABLES----------------------------------------------------------------------------------------------------------------------
//takes the time from moment as well as formatting it into Weekday, Month Day format
var date = moment().format("dddd, MMMM Do");
 //array consisting of time and corresponding text, 24 long each position corresponding to hour
var textArray = Array(24).fill("");
textArray[11] = "midday";
console.log(textArray);



//FUNCTIONS-------------------------------------------------------------------------------------------------------------------------------------

/*create a row with 3 sections
remember bootstrap rows have a maximum of 12 columns, which is why the following add up to 12
the first (leftmost) contains the hours
the second (center) contains the text the user inputs and has an id of hour-[corresponding number] so it may be colored later
    although they default to future during initialization
    note we assign the future class to all here, this will be remedied in function colorSchedule
the third (right) contains the save button from <span class="material-icons-round">note_add</span>
<div class="col-sm-1 saveBtn hour"> <i class="material-icons">note_add</i></div>
<i class="bi bi-save-fill"></i> bootstrap
also note we use p in order to make selectable fill in text later, w-100 h-100 fills p 100% to it's parent dive
*/
function createSchedule() {
    //create 24 hour time blocks
    //2 for loops, 1st handling am, 2nd handling pm; both will have id in 24 hour format
    //ie id="hour-18 for 6pm


    //insert 1st hour manually to avoid having to check every loop
    $(".container").append(
        `<div class="row">
        <div class="col-sm-2 hour">12AM</div>
        <div class="col-md-9 textArea future" id="hour-0"> <p class="w-100 h-100">${textArray[0]}</p> </div>
        <div class="col-sm-1 saveBtn text-center" id="btn-0"> <i class="bi bi-save-fill"></i> </div>
        </div>`
    );
    //loop handling AM creation
    for(let i = 1; i < 11; i++) {
        $(".container").append(
        `<div class="row">
        <div class="col-sm-2 hour">${i}AM</div>
        <div class="col-md-9 textArea future" id="hour-${i}"> <p class="w-100 h-100">${textArray[i]}</p> </div>
        <div class="col-sm-1 saveBtn text-center" id="btn-${i}"> <i class="bi bi-save-fill"></i> </div>
        </div>`
      );
    }

    //same thing, just for PM creation
    $(".container").append(
        `<div class="row">
        <div class="col-sm-2 hour">12PM</div>
        <div class="col-md-9 textArea future" id="hour-12"> <p class="w-100 h-100">${textArray[11]}</p> </div>
        <div class="col-sm-1 saveBtn text-center" id="btn-12"> <i class="bi bi-save-fill"></i> </div>
        </div>`
    );
    //loop handling AM creation, add 12 to id="hour-${i}"
    for(let i = 1; i < 12; i++) {
        $(".container").append(
        `<div class="row">
        <div class="col-sm-2 hour">${i}PM</div>
        <div class="col-md-9 textArea future" id="hour-${i+12}"> <p class="w-100 h-100">${textArray[i+12]}</p> </div>
        <div class="col-sm-1 saveBtn text-center" id="btn-${i+12}"> <i class="bi bi-save-fill"></i> </div>
        </div>`
      );
    }

}

//retroactively color the center section in accordance to the time for present and past
function colorSchedule() {
    var currHours = parseInt(moment().format("HH"));
    console.log(currHours);
    //var insertCurrHours = "#hour" + "-" + currHours;
    //colors the present hour
    $("#hour-" + currHours).removeClass("future").addClass("present");

    //colors the past hours by going backwards starting at the hour before the present and stopping at hour 0
    for(let i = currHours-1; currHours >= 0; currHours--) {
        $("#hour-" + currHours).removeClass("future").addClass("past");
    }
}




$(document).ready(function() {
    console.log("BEGIN!");
    //puts date from moment.js into jumbotron
    $("#currentDay").text(date);

    createSchedule();
    colorSchedule();

    $(".container").on("click", "p", function() {
        console.log(this);
        let text = $(this)
        .text()
        .trim();
        var textInput = $("<textarea>")
        .addClass("form-control")
        .val(text);
        $(this).replaceWith(textInput);
        textInput.trigger("focus");
    });

    $(".container").on("blur", "textarea", function() {
        console.log(this);
        let text = $(this).val();
        let redoP = $("<p>")
        .addClass("w-100 h-100")
        .text(text);
        $(this).replaceWith(redoP);
    });

    


    //need to save based on button id
    //doesn't work if you actually click the icon, only work when clicking outside of the saved icon
    $(".saveBtn").on("click", (e) => {
        console.dir(e);
        let btnX = e.target.id; 
        console.log("pressed button " + btnX);
    });


});
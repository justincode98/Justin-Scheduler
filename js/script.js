$(document).ready(function() {
    console.log("BEGIN!");
    //$(".container").append("<p class='row past time-block hour'> test </p>");
    //$(".container").append("<p class='row past time-block hour'> test2 </p>");
    
    //takes the time from moment as well as formatting it into Weekday, Month Day format
    //remember to compare hours on the left section with moment().format("hA"), for now do
    //color all previous entries in another for loop in reverse startign from match?
    var date = moment().format("dddd, MMMM Do");
    $("#currentDay").text(date);
    

    //create 24 hour time blocks
    //can check if i > 12; then subtract by 12 for pm
    for(let i = 0; i < 24; i++) {
        
        /*create a row with 3 sections
        remember bootstrap rows have a maximum of 12 columns, which is why the following add up to 12
        the first (leftmost) contains the hours
        the second (center) contains the text the user inputs and has an id of hour-[corresponding number] so it may be colored later
         although they default to future during initialization
        the third (right) contains the save button from <span class="material-icons-round">note_add</span>
        <div class="col-sm-1 saveBtn hour"> <i class="material-icons">note_add</i></div>
        <i class="bi bi-save-fill"></i> bootstrap
        */
        $(".container").append(
        `<div class="row">
        <div class="col-sm-2 hour">${i}</div>
        <div class="col-md-9 textArea future" id="hour-${i}">field</div>
        <div class="col-sm-1 saveBtn"> <i class="bi bi-save-fill"></i> </div>
        </div>`
      );
    }




    //retroactively color the second section in accordancc to the time
    var currHours = parseInt(moment().format("hh"));
    //var insertCurrHours = "#hour" + "-" + currHours;
    console.log(currHours);
    //colors the present hour
    $("#hour-" + currHours).removeClass("future").addClass("present");

    //colors the past hours by going backwards starting at the hour before the present and stopping at hour 0
    for(let i = currHours-1; currHours >= 0; currHours--) {
        $("#hour-" + currHours).removeClass("future").addClass("past");
    }

});
//i want
//local storage
//moment to keep track of time and turn rows green red or grey
//bootstrap to finish the rest of hte layut
//class of time blocks is container
$(document).ready(function() {
    console.log("BEGIN!");
    //$(".container").append("<p class='row past time-block hour'> test </p>");
    //$(".container").append("<p class='row past time-block hour'> test2 </p>");
    
    //takes the time from moment as well as formatting it into Weekday, Month Day format
    var date = moment().format("dddd, MMMM Do");
    $("#currentDay").text(date);
    

    //create 24 hour time blocks
    //can check if i > 12; then subtract by 12 for pm
    for(let i = 0; i < 24; i++) {
        $(".container").append(
        `<div class='row'>
        <div class='col-sm-2 hour past'>hour</div>
        <div class='col-md-9 textArea future'>field</div>
        <div class='col-sm-1 saveBtn hour'>button</div>
        </div>`
      );
    }

});
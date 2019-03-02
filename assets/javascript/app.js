// timer
var counter = 10;
var timer = setInterval(function(){
counter--;

console.log('Counter: ' + counter);
$("#time").html(counter);

// time runs out
if(counter===0){
clearInterval(timer);
}

}, 1000);


// ----------- functions --------

$(document).ready(function(){

    // question 1
    $('#btnGetValue').click(function() {
        var selValue = $('input[name=rbnNumber1]:checked').val(); 
        $('p').html('<br/>Selected Radio Button Value is : <b>' + selValue + '</b>');
    });

    // question 2
    $('#btnGetValue').click(function() {
        var selValue = $('input[name=rbnNumber2]:checked').val(); 
        $('p').html('<br/>Selected Radio Button Value is : <b>' + selValue + '</b>');
    });

    // question 3
    $('#btnGetValue').click(function() {
        var selValue = $('input[name=rbnNumber3]:checked').val(); 
        $('p').html('<br/>Selected Radio Button Value is : <b>' + selValue + '</b>');
    });

    // question 4
    $('#btnGetValue').click(function() {
        var selValue = $('input[name=rbnNumber4]:checked').val(); 
        $('p').html('<br/>Selected Radio Button Value is : <b>' + selValue + '</b>');
    });

    // question 5
    $('#btnGetValue').click(function() {
        var selValue = $('input[name=rbnNumber5]:checked').val(); 
        $('p').html('<br/>Selected Radio Button Value is : <b>' + selValue + '</b>');
    });

});
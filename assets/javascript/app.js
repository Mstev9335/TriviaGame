$(document).ready(function () {
    //questions
    var questions = [
        {
            question: "what is 2 + 2?", 
            choice: ["2", "3", "4"],
            answer: 2
         },
         {
            question: "what color is the sky?", 
            choice: ["blue", "orange", "yellow"],
            answer: 0
         }, 
         {
             question: "what color is grass?", 
            choice: ["blue", "green", "red"],
            answer: 1
        },
        {
            question: "what does a cow say?", 
           choice: ["honk", "baa", "moo"],
           answer: 3
       }
       ];

    // stats
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;

    

    // index used to choose question
    var index;

    var userChoice;

    // number of questions in game
    var numQuestions = questions.length;

    // timer
    var myTimer = setInterval(timer, 1000);
    var count = 5;
    function timer() {
        count--;
        // console.log(count);
        $('#time-remaining').text(count);

        // clears timer if it gets to 0
        if(count===0){
            clearInterval(myTimer);

            // clear out previous choices
           
            $("#answers").empty();
            displayQuestions();
        }
      }






    //   display questions
    function displayQuestions(){
        index = questions[Math.floor(Math.random()*questions.length)];
        console.log(index.question);

        // display question
        $('#questions').html(index.question);

        // display choices
        for(var i = 0; i < index.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerChoice");
            userChoice.html(index.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answers").append(userChoice);
        }


        $('.answerChoice').on('click', function(){
            userGuess = parseInt($(this).attr("data-guessvalue"));

            // compare userGuess to the correct answer
            if(userGuess===index.answer){
                console.log("correct");
                correct++;
            }
            else{
                console.log("wrong");
                incorrect++;
            }
        })  
 }
    displayQuestions();

    function displayResult(){
            if((correct + incorrect + unanswered) ===numQuestions){
                $("#questions").empty();
                $("#questions").html("<h3>Time's Up - Results: </h3>");
                $("#answers").append("<h4> Correct: " + correctCount + "</h4>" );
                $("#answers").append("<h4> Incorrect: " + wrongCount + "</h4>" );
                $("#answers").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
                $("#reset").show();
                correct = 0;
                incorrect = 0;
                unanswered = 0;
            }
    }


    //   choose next question 

    



    });
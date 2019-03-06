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
    var count = 5;
    var intervalId;
    var timeRun = false;

    // index used to choose question
    var index;

    var userChoice;

    // number of questions in game
    var numQuestions = questions.length;

    $("#start").on("click", function () {
        $("#start").hide();
        runTimer();
    })

    
     //timer start
     function runTimer(){
        if (!timeRun) {
        intervalId = setInterval(decrement, 1000); 
        timeRun = true;
        }
    }
   
    // timer stop
    function stopTimer(){
        timeRun = false;
        clearInterval(intervalId);
    }

    // timer countdown
    function decrement() {
        $("#time-remaining").html(count);
        count --;
    
        //stop timer if reach 0
        if (count === 0) {
            stopTimer();
            unanswered++;
           
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
                stopTimer();
                $("#answers").html("<p>Correct!</p>");
            }
            else{
                console.log("wrong");
                incorrect++;
                stopTimer();
                $("#answers").html("<p>Incorrect!</p>" +"the correct answer is: "+ index.choice[index.answer] );
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
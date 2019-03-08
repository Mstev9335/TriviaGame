$(document).ready(function () {


    //questions
    var questions = [
        {
            question: "what is 3 + 3?",
            choice: ["2", "3", "6"],
            answer: 2
        },
        {
            question: "what is 15 + 2?",
            choice: ["2", "3", "17", "4"],
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
            answer: 2
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

    var usedQuestions = [];
   

    var userChoice;

    // number of questions in game
    var numQuestions = questions.length;

    // start the game on button click
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestions();
        runTimer();
     
    })


    //timer start
    function runTimer() {
        if (!timeRun) {
            intervalId = setInterval(decrement, 1000);
            timeRun = true;
        }
    }

    // timer stop
    function stopTimer() {
        timeRun = false;
        clearInterval(intervalId);
    }

    // timer countdown
    function decrement() {

        $("#time-remaining").html("Time Remaining: " + count);
        count--;

        //stop timer if reach 0
        if (count === 0) {
            stopTimer();
            unanswered++;
            $("#answers").html("<p>Time is up</p>");
            nextQuestion();
            displayQuestions();

        }
    }




    //   display questions
    function displayQuestions() {
        index = questions[Math.floor(Math.random() * questions.length)];
        console.log(index.question);

        // ------------------
        stopTimer();
        count = 5;
        runTimer();
        // ------------------

        // display question
        $('#questions').html(index.question);
        // display choices
        for (var i = 0; i < index.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerChoice");
            userChoice.html(index.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessValue", i);
            $("#answers").append(userChoice);


        }


        $('.answerChoice').on('click', function () {
            userGuess = parseInt($(this).attr("data-guessValue"));

            // compare userGuess to the correct answer
            if (userGuess === index.answer) {
                console.log("correct");
                correct++;
                stopTimer();
                $("#answers").html("<p>Correct!</p>");
                nextQuestion();
                displayQuestions();
            }
            else {
                console.log("wrong");
                incorrect++;
                stopTimer();
                $("#answers").html("<p>Incorrect!</p>" + "the correct answer is: " + index.choice[index.answer]);
                nextQuestion();

                displayQuestions();

            }
        })
    }
    // displayQuestions();

    // choose next question
    function nextQuestion() {

        // eliminate question that was already used
        questions.splice(index, 1);



        // display results
        if ((correct + incorrect + unanswered) === numQuestions) {
            $("#questions").empty();
            $("#questions").html("<h3>Time's Up - Results: </h3>");
            $("#answers").append("<h4> Correct: " + correct + "</h4>");
            $("#answers").append("<h4> Incorrect: " + incorrect + "</h4>");
            $("#answers").append("<h4> Unanswered: " + unanswered + "</h4>");
            $("#reset").show();
            correct = 0;
            incorrect = 0;
            unanswered = 0;
        }

    }




});
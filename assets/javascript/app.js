
$(document).ready(function () {
   

// variables
var panel = $('#questions');
var count = 5;
var timeRun = false;
var correct=0;
var incorrect=0;

var intervalId;
var currentQuestion=0;

// buttons
$(document).on('click', '#reset-game', function(e) {
    reset();
  });
  
  $(document).on('click', '.answer-button', function(e) {
    clicked(e);
  });
  
  $(document).on('click', '#start', function(e) {
      $('#start').hide();
    $('#time-remaining').prepend('<h2>Time Remaining: <span id="counter-number">5</span> Seconds</h2>');
    displayQuestion();
  });
  

//   questions
var questions = [{
    question: "What color is the sky?",
    choice: ["green", "blue", "yellow", "red"],
    correctAnswer: "blue"
  }, {
    question: "How many days are in the month of February?",
    choice: ["thirty", "thirty-one", "twenty-nine", "twenty-eight"],
    correctAnswer: "twenty-eight"
  }, {
    question: "What is the largest planet in our solar system?",
    choice: ["pluot", "saturn", "jupiter", "earth"],
    correctAnswer: "jupiter"
  }, {
    question: 'What is the tallest land mammal"?',
    choice: ["giraffe", "elephant", "gorilla", "bear"],
    correctAnswer: "giraffe"
  }, {
    question: 'What country does King Arthur hail from?',
    choice: ["France", "England", "Spain", "Rome"],
    correctAnswer: "England"
  }, {
    question: 'What does air primarily consist of?',
     choice: ["Helium", "Oxygen", "Nitrogen", "Hydrogen"],
    correctAnswer: "Nitrogen"
 
  }];


  //timer start
  function runTimer() {
    if (!timeRun) {
        intervalId = setInterval(countdown, 1000);
        timeRun = true;
    }
}

// timer stop
function stopTimer() {
    timeRun = false;
    clearInterval(intervalId);
   
}

// timer countdown
function countdown() {
    count--;
    $("#counter-number").html(count);
  
    //stop timer if reach 0
    if (count === 0) {
        timeUp();
    }
}

// displays the questions
function displayQuestion(){
    runTimer();
    $("#questions").html('<h2>' + questions[currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[currentQuestion].choice.length; i++){
    panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[currentQuestion].choice[i] +
     '">' + questions[currentQuestion].choice[i]+ '</button>');
      }
}

// increments through the all the questions
function nextQuestion(){
     count=5;
     $('#counter-number').html(count);
    currentQuestion++;
    runTimer();
    displayQuestion();

}

// if the timer reaches 0 on a question
function timeUp(){
    stopTimer();
    $('#counter-number').html(count);
    panel.html('<h3>Time is up</h3>');
    panel.append('<h4>The Correct Answer was: ' + questions[currentQuestion].correctAnswer + '</h4>');
    
    if (currentQuestion === questions.length - 1){
      setTimeout(results,  3000);
    } else {
      setTimeout(nextQuestion, 3000);
    }
  }

//   if the user chose the correct answer
function answeredCorrectly(){
   stopTimer();
    correct++;
    panel.html('<h2>Correct!</h2>');
    
    if (currentQuestion === questions.length - 1){
      setTimeout(results, 3000);
    } else {
      setTimeout(nextQuestion, 3000);
    }
  }

//   if the user chose an incorrect answer
  function answeredIncorrectly() {
    stopTimer();
    incorrect++;
    panel.html('<h3>incorrect</h3>');
    panel.append('<h4>The Correct Answer was: ' + questions[currentQuestion].correctAnswer + '</h4>');
    
    if (currentQuestion === questions.length - 1){
      setTimeout(results, 3000);
    } else {
      setTimeout(nextQuestion, 3000);
    }
}

// checks the user's choice against the correct answer
function clicked(e) {
    stopTimer();

    if ($(e.target).data("name") === questions[currentQuestion].correctAnswer){
      answeredCorrectly();
    } else {
      answeredIncorrectly();
    }
  }

//   displays the results
  function results() {
    stopTimer();
    $('#counter-number').html(count);
    panel.html('<h2>Results:</h2>');
    
    panel.append('<h3>Correct Answers: ' + correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (incorrect + correct)) + '</h3>');
    panel.append('<br><button id="reset-game">Play again?</button>');
  }

//   resets the game
  function reset(){
    currentQuestion = 0;
    counter = 5;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    displayQuestion();
  }

});

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
    question: "Released on April 5, 1974, what was Stephen King’s first published novel?",
    choice: ["Salem's Lot", "Carrie", "Christine", "The Shining"],
    correctAnswer: "Carrie"

  }, {
    question: "Oliver Twist was the second novel published by which English author?",
    choice: ["Charles Dickens", "William Shakespeare", "Oscar Wilde", "Edgar Allen Poe"],
    correctAnswer: "Charles Dickens"
  }, {
    question: "In what city would you find the Wizard of Oz?",
    choice: ["Neverland", "Brooklyn", "Oz", "The Emerald City"],
    correctAnswer: "The Emerald City"
  }, {
    question: 'Who wrote the American realist novel “The Grapes of Wrath”?',
    choice: ["Mark Twain", "Harper Lee", "John Steinbeck", "F. Scott Fitzgerald"],
    correctAnswer: "John Steinbeck"
  }, {
    question: 'The Hound of the Baskervilles is a crime novel featuring which fictional detective?',
    choice: ["Sherlock Holmes", "James Bond", "Nancy Drew", "Batman"],
    correctAnswer: "Sherlock Holmes"
  }, {
    question: 'The famous American writer Samuel Langhorne Clemens is better known by what pen name?',
     choice: ["Stephen King", "Nathaniel Hawthorne", "Mark Twain", "Ray Bradbury"],
    correctAnswer: "Mark Twain"
  },
  {
    question: 'Which book holds the record of being the most stolen book from public libraries?',
     choice: ["A Tale of Two Cities", "Romeo and Juliet", "To Kill A Mockingbird", "Guinness Book of World Records"],
    correctAnswer: "Guinness Book of World Records"
  },
  {
    question: '“Call me Ishmael” is the opening line from what novel?',
     choice: ["The Lord of the Rings", "Don Quixote", "Moby Dick", "Alice’s Adventures in Wonderland"],
    correctAnswer: "Moby Dick"

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
    panel.html('<h3>Time is Up</h3>');
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
    panel.html('<h5>Correct</h5>');
    
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
    panel.html('<h3>Incorrect</h3>');
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
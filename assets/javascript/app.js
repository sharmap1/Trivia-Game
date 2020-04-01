// questions array
var quizQuestions = [
  {
    question: "How tall is the average Minion?",
    choices: ["105 cm", "99 cm", "10 cm", "50 cm"],
    correctAnswer: "105 cm"
  },
  {
    question: "There's only a few hairstyles the minions have. How many is it?",
    choices: ["20", "10", "5", "2"],
    correctAnswer: "5"
  },
  {
    question: "What happens when you crack and shake a minion?",
    choices: [
      "they glow in dark",
      "they turn evil",
      "they turn pink",
      "they grow hairstyles"
    ],
    correctAnswer: "they glow in dark"
  },
  {
    question: "Minions speak their own language – but what’s it called?",
    choices: ["Minnish", "Minionionionish", "Minion-ese", "Minican"],
    correctAnswer: "Minion-ese"
  },
  {
    question: "Which types of fruit are Minions obsessed with?",
    choices: ["Blueberries", "Banana and apples", "Mangos", "Watermelon"],
    correctAnswer: "Banana and apples"
  },
  {
    question: "Which Boyz II Men song do the Minions sing in Despicable Me 2?",
    choices: [
      "It's Not Easy Being Yellow",
      "Shape of Gru",
      "I Swear(All 4 One)",
      "Someone Like Gru"
    ],
    correctAnswer: "I Swear(All 4 One)"
  },
  {
    question: "What colours are Bob’s eyes?",
    choices: ["Green and brown", "Custard yellow", "Lava red", "Neon green"],
    correctAnswer: "Green and brown"
  },
  {
    question: "All Minions are loyal to Gru. But what's his first name?",
    choices: ["Vladmir", "Boris", "Felonius", "Keith"],
    correctAnswer: "Felonius"
  },
  {
    question: "What colour are the evil Minions?",
    choices: ["purple", "red", "grey", "green"],
    correctAnswer: "purple"
  },
  {
    question: "How many fingers does a Minion have on each hand?",
    choices: ["3", "5", "4", "2"],
    correctAnswer: "3"
  }
];

// Initial Values
//  Set our number counter to 30.
var counter = 30;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer = 0;

const funImages = [
  "./assets/images/yes-1.gif",
  "./assets/images/yes-2.gif",
  "./assets/images/yes-3.gif",
  "./assets/images/yes-4.gif",
  "./assets/images/yes-5.gif",
  "./assets/images/yes-6.gif",
  "./assets/images/yes-7.gif",
  "./assets/images/yes-9.gif",
  "./assets/images/yes-10.gif",
  "./assets/images/dog.gif"
];
const sadImages = [
  "./assets/images/no-1.gif",
  "./assets/images/no-2.gif",
  "./assets/images/no-3.gif",
  "./assets/images/no-4.gif",
  "./assets/images/no-5.gif",
  "./assets/images/no-6.gif",
  "./assets/images/no-7.gif",
  "./assets/images/will.gif",
  "./assets/images/no-9.gif",
  "./assets/images/no-10.gif"
];
function nextQuestion() {
  const questionOver = quizQuestions.length - 1 === currentQuestion;
  if (questionOver) {
    displayResult();
  } else {
    currentQuestion++;
    loadQuestion();
  }
}
function timeUp() {
  clearInterval(timer); // its gonna stop the interval that is set and stops at 0
  lost++;
  preloadImage("lost");
  setTimeout(nextQuestion, 3 * 1000);
  // nextQuestion();
}
function decrement() {
  //  Decrease number by one.
  counter--;
  $("#time").html("Time Remaining: " + counter); // displays the decreasing order of time remaining

  if (counter === 0) {
    timeUp();
  }
}
//Display question and answers in the browser
function loadQuestion() {
  counter = 30;
  timer = setInterval(decrement, 1000); // 1 second = 1000 milisec
  //Hide start button
  //display Q/A
  const question = quizQuestions[currentQuestion].question;
  const choices = quizQuestions[currentQuestion].choices;
  //display timer
  $("#time").html("Time Remaining: " + counter);
  //display questions ${}can be used to display
  $("#game").html(`
        <h4>${question}</h4>   
        ${loadChoices(choices)}
    `);
}
// load choices
function loadChoices(choices) {
  var result = "";
  for (var i = 0; i < choices.length; i++) {
    result += `<div class="row"><div class="col-sm-12">
        <p class="choice" data-answer="${choices[i]}">${choices[i]}</p></div></div>`; //creating choice and attribute data-answer which holds each ans choices
  }
  return result;
}

// on click event for the answers which is in the choices class created in the DOM
$(document).on("click", ".choice", function() {
  clearInterval(timer);
  const selectedAnswer = $(this).attr("data-answer"); // always attached to element
  const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
  if (correctAnswer === selectedAnswer) {
    score++; // user wins
    console.log("winner");
    // call a function for pop up
    preloadImage("win");
    setTimeout(nextQuestion, 4 * 1000);
    // nextQuestion();
  } else {
    lost++;
    console.log("loser");
    preloadImage("lost");
    setTimeout(nextQuestion, 4 * 1000);
    // nextQuestion();
  }
});

function displayResult() {
  const result = `
    <h2>You get: ${score} question(s) right</h2>
    <h2>You missed: ${lost} question(s)</h2>
    <h2>Total questions: ${quizQuestions.length}</h2>
    <button id="reset" class="btn btn-primary" >Restart</button>
   <div><br><img src= "./assets/images/giphy-4.gif" alt="responsive" id="gifimg"></div>
   <audio autoplay loop><source src="./assets/images/song.mp3"</audio>
   
`;
  $("#game").html(result);
}

$(document).on("click", "#reset", function() {
  // console.log('like');
  counter = 5;
  currentQuestion = 0;
  score = 0;
  lost = 0;
  timer = 0;
  loadQuestion();
});

function randomImage(images) {
  const random = Math.floor(Math.random() * images.length);
  const randomImage = images[random];
  return randomImage;
}

//to display at the bottom of the page the no of Q remaining:
function loadRemainingQuestions() {
  const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
  const totalQuestion = quizQuestions.length;

  return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}

// display message after every right or wrong answer:
function preloadImage(status) {
  const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
  if (status === "win") {
    $("#game").html(`
            <h2 class="preload-image">Congratulations, You did it!</h2>
            <h3 class="preload-image">The correct answer: <b>${correctAnswer}</b></h3>
            <img class="animation" src="${randomImage(funImages)}"/>
        `);
  } else {
    $("#game").html(`
        <h2 class="preload-image">The correct answer: <b>${correctAnswer}</b></h2>
        <h3 class="preload-image">You lost!</h3>
        <img class= "animation" src="${randomImage(sadImages)}"/>
    `);
  }
}
// starts the game on click to start button
$("#start").click(function() {
  $("#start").remove();
  $("#time").html(counter);
  loadQuestion();
});

//       //  Once number hits zero...
//       if (counter === 0) {

//         //  ...run the stop function.
//         stop();

//         //  Alert the user that time is up.
//         alert("Time Up!");
//         $("#Done").html("<h4>" + "All Done! " + "</h4>");
//       }
//   }
// function logic() {

//     if(result == questions[i].correctAnswer){
//         correctAns++;
//     }else if(result ==!questions[i].correctAnswer){
//         incorrectAns++;
//     }else(result === null) {
//         unansweredAns++;
//     }
// };

//     //  Variable that will hold our interval ID when we execute
//     //  the "run" function
//     var intervalId;
//     //  When the resume button gets clicked, execute the run function.

//    var start = function() {
//        $("#start").on("click", function() {

//    }
//     //  The run function sets an interval
//     //  that runs the decrement function once a second.
//     //  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.

//     //  The decrement function.

//     //  The stop function
//     function stop() {

//       //  Clears our intervalId
//       //  We just pass the name of the interval
//       //  to the clearInterval function.
//       clearInterval(intervalId);
//     }

//     //  Execute the run function.
//     start();

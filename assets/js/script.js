// Global Variables
var sessionScore = 0;

var questionsAnswered = [];
var questionAnswerIndex = 0;

var text = "te"; // DELETE BEFORE MERGING TO MAIN - added to avoid exceptions for now

var mainEl = document.getElementsByTagName("main")[0];

// Question Array - Lots of scrolling
var questions = [
    {
        question: text,
        options: [],
    },
    {
        question: text,
        options: [],
    },
    {
        question: text,
        options: [],
    },
    {
        question: text,
        options: [],
    },
    {
        question: text,
        options: [],
    },
    {
        question: text,
        options: [],
    },
    {
        question: text,
        options: [],
    },
    {
        question: text,
        options: [],
    },
    {
        question: text,
        options: [],
    },
];

// Functions
function questionGenerator() { // UNTESTED
    // Question draw
    questionNumber = Math.round(Math.random() * (questions.length - 1));

    // Create and append question
    var questionEl = document.createElement("h1");
    questionEl.className = "question";
    mainEl.appendChild(questionEl);

    //Create and append answer options
    var i = 1;
    while (i < 5) {
        var optionEl = document.createElement("button");
        optionEl.className = "btn question-option";
        optionEl.textContent = i + ". " + questions[questionNumber].options[i];
        i++;
    }
}

function mainReset() { // Seeks and destroys main's children (too much?)
    var targetChildren = mainEl.childNodes;
    loops = targetChildren.length;
    
    for (var i = 0; i < loops; i++) {
        targetChildren[0].parentNode.removeChild(targetChildren[0]);
    }
}

function btnClickHandler(event) {
    var clickedEl = event.target;

    if (clickedEl.matches("[value='start'")) {
        mainReset();
        questionGenerator();
    }
}

// Event Listeners
mainEl.addEventListener("click", btnClickHandler);
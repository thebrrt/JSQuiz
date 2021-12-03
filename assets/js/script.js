// Global Variables
var sessionScore = 0;

var questionsAnswered = [];
var questionAnswerIndex = 0;

var text = "te"; // DELETE BEFORE MERGING TO MAIN - added to avoid exceptions for now

var mainEl = document.getElementsByTagName("main")[0];

// Question Array - Lots of scrolling
var questions = [
    {
        question: "Which options below trigger listeners?",
        options: ["Events", "Mouse Clicks", "Keystrokes", "All of the Above"],
        answerIndex: 3
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<script>", "<scripting>", "<javascript>"],
        answerIndex: 1
    },
    {
        question: "What is the correct JavaScript syntax to change the content of the HTML element: <br/> <p id='demo'> This is a demonstration.</p>",
        options: ["document.getElementById('demo').innerHTML = 'Hello World!';", "document.getElement('p').innerHTML = 'Hello World!';", "#demo.innerHTML = 'Hello World!';", "document.getElementByName('p').innerHTML = 'Hello World!';"],
        answerIndex: 0
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        options: ["Both the <head> and <body>", "<head>", "<body>", "<html>"],
        answerIndex: 0
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xyz.js'?",
        options: ["<script name='xyz.js'>", "<script href='xyz.js'>", "<script src='xyz.js'"],
        answerIndex: 2
    },
    {
        question: "The external JS file must have the <script> tag.",
        options: ["True", "False"],
        answerIndex: 1
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: ["msgBox('Hello World')", "alertBox('Hello World')", "msg('Hello World');", "alert('Hello World');"],
        answerIndex: 3
    },
    {
        question: "How do you create a function in JS?",
        options: ["function:myFunction()", "function = myFunction()", "function myFunction()"],
        answerIndex: 2
    },
    {
        question: "How do you call a function named 'myFunction'?",
        options: ["call function myFunction()", "call myFunction()", "myFunction()"],
        answerIndex: 2
    },
    {
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        options: ["if (i != 5)", "if (i <> 5)", "if i <> 5 then", "if i =! 5 then"],
        answerIndex: 0
    },
    {
        question: "How to write an IF statement in JavaScript?",
        options: ["if (i == 5)", "if i = 5", "if i == 5 then", "if i = 5 then"],
        answerIndex: 0
    },
    {
        question: "How does a WHILE loop start?",
        options: ["while (i <= 10; i++)", "while i = 1 to 10", "while (i <= 10)"],
        answerIndex: 2
    },
    {
        question: "How does a FOR loop start?",
        options: ["for i = 1 to 5", "for (i <= 5; i++", "for (i = 0; i <= 5)", "for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)"],
        answerIndex: 3
    },
    {
        question: "How can you add a comment in a JavaScript?",
        options: ["'This is a comment", "<!-- This is a comment -->", "// This is a comment"],
        answerIndex: 2
    },
    {
        question: "How to insert a comment that has more than one line?",
        options: ["//This comment has <br/> than one line", "/* This comment has <br/> more than one line*/", "/* This comment has <br> more than one line"],
        answerIndex: 2
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: ["var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", "var colors = ['red', 'green', 'blue']", "var colors = (1:'red', 2:'green', 3:'blue')"],
        answerIndex: 1
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        options: ["round(7.25)", "Math.round(7.25)", "Math.rnd(7.25)", "rnd(7.25)"],
        answerIndex: 1
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        options: ["ceil(x, y)", "top(x, y)", "Math.ceil(x, y)", "Math.max(x, y)"],
        answerIndex: 3
    },
    {
        question: "What is the correct JavaScript syntax for opening a new window called 'w2'?",
        options: ["w2 = window.open('http://www.w3schools.com');", "w2 = window.new('http://www.w3schools.com');"],
        answerIndex: 1
    },
    {
        question: "JavaScript is the same as Java.",
        options: ["True", "False"],
        answerIndex: 1
    },
    {
        question: "How can you detect the client's browser name?",
        options: ["navigator.appName", "browser.name", "client.navName"],
        answerIndex: 0
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["onchange", "onclick", "onmouseover", "onmouseclick"],
        answerIndex: 1
    },
    {
        question: "How do you declare a JavaScript variable?",
        options: ["variable carName;", "var carName;", "v carName;"],
        answerIndex: 1
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        options: ["=", "x", "*", "-"],
        answerIndex: 0
    },
    {
        question: "What will the following code return: Boolean(10 > 9)",
        options: ["True", "False", "NaN"],
        answerIndex: 0
    },
    {
        question: "Is JavaScript case-sensitive?",
        options: ["No", "Yes"],
        answerIndex: 1
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
    while (i < questions[questionNumber].options.length) {
        var optionEl = document.createElement("button");
        optionEl.className = "btn question-option";
        optionEl.textContent = i + ". " + questions[questionNumber].options[i];
        if (questions[questionNumber].options[i].answerIndex = i) {
            optionEl.setAttribute("value", "correct");
        }

        mainEl.appendChild(optionEl);
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
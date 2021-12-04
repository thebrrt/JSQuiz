// Global Variables
var sessionScore = 0;

var questionsAnswered = [];
var pos = null;

var mainEl = document.getElementsByTagName("main")[0];
var scoreView = document.getElementsByTagName("p")[0];
var footerEl = null;
var clockEl = document.getElementById("timer");
var clock = null;
var clockTime = null;

highScores = [];

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
function clockTick() {
    if (clockTime <= 0) {
        clearInterval(clock);
        endGame();
    } else {
        clockTime--;
    }

    clockEl.innerHTML = "Time: " + clockTime.toString();
}

function initializeClock() {
    clockTime = 30;
    clockEl.innerHTML = "Time: " + clockTime;
    clock = setInterval(clockTick, 1000);
}

function saveScore(newInitials) {
    loadScores();
    var newHigh = packageScore(newInitials, sessionScore);

    if (highScores) {
        highScores.push(newHigh);
        highScores.sort(function(a, b){return a.score - b.score;});
    } else {
        newHighScores = [newHigh];
        highScores = [newHigh];
    }

    console.log("high scores object:", highScores);
    localStorage.setItem("high scores", JSON.stringify(highScores));
}

function loadScores() {
    try {
        highScores = JSON.parse(localStorage.getItem("high scores"));
    } catch (error) {
        console.log(error);
    }
}

function clearScores() {
    highScores = [];
    location.reload();
}

function showScores(event) {
    if (event) {
        clearInterval(clock);
    }
    loadScores();
    mainReset();

    var scoreH1El = document.createElement("h1");
    scoreH1El.className = "congrats";
    scoreH1El.innerHTML = "High scores";
    mainEl.appendChild(scoreH1El);

    var divEl = document.createElement("div");
    divEl.className = "button-container";

    
    if (highScores) {
        var scoreContainer = document.createElement("div");
        scoreContainer.class = "congrats ";
        scoreContainer.id = "score-container";
        mainEl.appendChild(scoreContainer);

        var ranking = 1;
        for (var i = 0; i < highScores.length; i++) {
            var scorePairEl = document.createElement("p");
            if (ranking % 2) {
                scorePairEl.className = "congrats score-odd";
                scorePairEl.innerHTML = ranking + " " + highScores[i].initials + " - " + highScores[i].score;
                ranking++;
                scoreContainer.appendChild(scorePairEl);
            } else {
                scorePairEl.className = "congrats score-even";
                scorePairEl.innerHTML = ranking + " " + highScores[i].initials + " - " + highScores[i].score;
                ranking++;
                scoreContainer.appendChild(scorePairEl);
            }
        }

        var backEl = document.createElement("button");
        backEl.className = "btn";
        backEl.innerHTML = "Go back";
        backEl.id = "back";
        backEl.setAttribute("value", "back");
        divEl.appendChild(backEl);

        var clearEl = document.createElement("button");
        clearEl.className = "btn score-button";
        clearEl.innerHTML = "Clear high scores";
        clearEl.setAttribute("value", "clear");
        divEl.appendChild(clearEl);
    } else {
        var backEl = document.createElement("button");
        backEl.className = "btn score-button";
        backEl.innerHTML = "Go back";
        backEl.setAttribute("value", "back");
        divEl.appendChild(backEl);
    }

    mainEl.appendChild(divEl);
}

function endGame() {
    if (clockTime > 0) {
        clearInterval(clock);
    }
    mainReset();

    var endHEl = document.createElement("h1");
    endHEl.className = "congrats";
    endHEl.innerHTML = "All done!";
    mainEl.appendChild(endHEl);

    var scoreEl = document.createElement("p");
    scoreEl.className = "congrats";
    scoreEl.innerHTML = "Your final score is " + sessionScore + ".";
    mainEl.appendChild(scoreEl);

    var formEl = document.createElement("form");
    formEl.id = "initials-container";
    mainEl.appendChild(formEl);

    var labelEl = document.createElement("label");
    labelEl.setAttribute("id", "user-label");
    labelEl.setAttribute("for", "user");
    labelEl.innerHTML = "Enter initials:";
    formEl.appendChild(labelEl);

    var inputEl = document.createElement("input");
    inputEl.setAttribute("id", "user-input");
    inputEl.setAttribute("name", "initials");
    formEl.appendChild(inputEl);

    var submitEl = document.createElement("button");
    submitEl.setAttribute("value", "submitInitials");
    submitEl.id = "submit";
    submitEl.className = "btn";
    submitEl.innerHTML = "Submit";
    formEl.appendChild(submitEl);
}

function questionGenerator(accuracy) {
    if (!questions.length) {
        endGame();
    } else {
        // Question draw and send to "used" list
        var questionIndex = Math.random() * questions.length;
        console.log(questionIndex);
        questionIndex = Math.floor(questionIndex);
        console.log(questionIndex);
        var drawnQuestion = questions[questionIndex];
        pos = questions.indexOf(drawnQuestion);

        questions.splice(pos, 1);
        questionsAnswered.push(drawnQuestion);

        // Create and append question to main element
        var questionEl = document.createElement("h1");
        questionEl.className = "question"; // No styles defined for this class in styles.css, but wanted to future-proof things
        questionEl.textContent = drawnQuestion.question;
        mainEl.appendChild(questionEl);

        // Create answer container and append answer options
        var divEl = document.createElement("div");
        divEl.className = "answer-container";
        mainEl.appendChild(divEl);

        var optionIndex = 0;
        var i = 1;
        while (optionIndex < drawnQuestion.options.length) {
            var optionEl = document.createElement("button");
            optionEl.className = "btn question-option";
            optionEl.textContent = i + ". " + drawnQuestion.options[optionIndex];
            if (drawnQuestion.answerIndex === optionIndex) {
                optionEl.setAttribute("value", "correct");
            } else {
                optionEl.setAttribute("value", "wrong");
            }

            divEl.appendChild(optionEl);
            optionIndex++;
            i++;
        }

        // Generate & Append Correct/Wrong Footer
        if (!accuracy) {
            var footerH2 = document.createElement("h2");
            footerH2.className = "accuracy-footer";
            footerEl = footerH2;
        }

        if (accuracy === "correct") {
            footerEl.innerText = "Correct!";
            mainEl.appendChild(footerEl);
        } else if (accuracy === "wrong") {
            footerEl.innerText = "Wrong!";
            mainEl.appendChild(footerEl);
        }
    }
}

function mainReset() { // Seeks and destroys main's children (too much?)
    var targetChildren = mainEl.childNodes;
    loops = targetChildren.length;
    
    for (var i = 0; i < loops; i++) {
        targetChildren[0].parentNode.removeChild(targetChildren[0]);
    }
}

function packageScore(initials, score) {
    var package = {
        initials: initials,
        score: score
    };

    console.log("Score Packaged as", package);
    return package;
}

function btnClickHandler(event) {
    event.preventDefault();
    var clickedEl = event.target;

    if (clickedEl.matches("[value='start']")) {
        sessionScore = 0;
        mainReset();
        questionGenerator();
        initializeClock();
    } else if(clickedEl.matches("[value='submitInitials']")) {
        var userInitials = document.getElementById("user-input");
        if (userInitials.value) {
            userInitials = userInitials.value;
            saveScore(userInitials);
            showScores();
        } else {
            userInitials.setAttribute("placeholder", "Please enter your initials");
        }
    } else if (clickedEl.matches("[value='back']")) {
        location.reload();
    } else if (clickedEl.matches("[value='clear']")) {
        localStorage.removeItem("high scores");
        location.reload();
    } else if (clickedEl.matches("[value='correct']")) {
        sessionScore++;
        mainReset();
        questionGenerator("correct");
    } else if (clickedEl.matches("[value='wrong']")) {
        mainReset();
        questionGenerator("wrong");
    }
}

// Event Listeners
mainEl.addEventListener("click", btnClickHandler);
scoreView.addEventListener("click", showScores);
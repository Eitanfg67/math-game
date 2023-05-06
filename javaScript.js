var n1;
var n2;
var opSelector;
var ansOpt;
var answer;
var qNo = document.getElementById("Qno");
var score = document.getElementById("score");
var question = document.getElementById("question");
var buttons = document.getElementsByTagName("button");
var start = document.getElementById("start-btn");
var fScore = document.getElementById("final-score");
var startBox = document.getElementById("start-game");
var gameBox = document.getElementById("in-game");
var endBox = document.getElementById("end-game");
var progress = document.getElementById("progress");
var message = document.getElementById("message");
var operator = ['+', '-', '*', '/'];
var t;

function restart() {
    score.innerHTML = "0";
    qNo.innerHTML = "0";
    nextQuestion();

    gameBox.style.display = "block"
    startBox.style.display = "none";
    endBox.style.display = "none";
    timer.style.display = "block";
}

function whenFinished() {
    console.log("Finished.")
    gameBox.style.display = "none"
    startBox.style.display = "none";
    endBox.style.display = "flex";
    lastmessage();
}

function nextQuestion() {

    progress.style.width = "100%";
    timed();
    fScore.innerHTML = score.innerHTML;
    if (qNo.innerText == "10") {
        whenFinished();
    }
    
    const a = Math.floor(Math.random() * 10) + 1; // a between 1 and 10
    const b = Math.floor(Math.random() * 20) + 1; // b between 1 and 20
    const c = a * Math.floor(Math.random() * 10) + b; // c between b and 10a+b
    
    const equationElement = document.getElementById("equation");
    equationElement.innerHTML = `${a}x + ${b} = ${c}`;
    
    const xEqualsElement = document.getElementById("x-equals");
    xEqualsElement.innerHTML = "x = ?";
    
    const questionContainer = document.getElementById("question-container");
    questionContainer.appendChild(equationElement);
    questionContainer.appendChild(xEqualsElement);

    console.log(equation);
    const x = (c - b) / a;
    Ranswer = `${x}`;
    console.log(Ranswer);
    



    getOptions();
    getQNo();

}

function getOptions() {
    let options = [];
  
    for (let i = 0; i < 3; i++) {
    let option = 0;
    if (Ranswer > 100) {
        option = Ranswer + Math.floor(Math.random() * Ranswer * 0.4);
    } else if (Ranswer > 30 && Ranswer < 100) {
        option = Ranswer + Math.floor(Math.random() * Ranswer * 0.6);
    } else {
        option = Math.floor(Math.random() * 100);
    }
  
    if (Ranswer < 0) {
        option = "-" + option;
    }
  
      options.push(option);
    }
  
    options.push(Ranswer);
  
    options.sort(() => Math.random() - 0.5);
  
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = options[i];
    }
    
    ansOpt = options.indexOf(Ranswer);
}
  


function getQNo() {
    qNo.innerHTML = parseInt(qNo.innerHTML) + 1;
}

function getScore() {
    score.innerHTML = parseInt(score.innerHTML) + parseInt(progress.style.width) + 10;
}

function doWhenCorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "green";
    getScore();
}

function doWhenIncorrect(i) {
    buttons[i].style.color = "#fff";
    buttons[i].style.backgroundColor = "#fb3640";
}

function outro(i) {
    setTimeout(() => {
        nextQuestion();
        buttons[i].style.color = "#000";
        buttons[i].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
    }, 500);
}

function lastmessage() {
    clearInterval(t);
    if (fScore.innerText >= 800) {
        var emoji = "&#128525";
        message.innerHTML = "וואו!!! בלתי יאומן" + emoji;
    } else if (fScore.innerText >= 500) {
        var emoji = "&#128531";
        message.innerHTML = "כל כך קרוב" + emoji;
    } else if (fScore.innerText >= 100) {
        var emoji = "&#128549";
        message.innerHTML = "מקווים שבפעם הבאה יהיה יותר מוצלח" + emoji;
    } else {
        var emoji = "&#128577";
        message.innerHTML = "מזל רע" + emoji;
    }
}

function timed() {
    t = setInterval(() => {
        progress.style.width = (parseInt(progress.style.width) - 1) + "%";
        console.log("called");
        if (parseInt(progress.style.width) == 0) {
            clearInterval(t);
            nextQuestion();
        }
    }, 100)
}

buttons[0].addEventListener('click', () => {
    if (buttons[0].innerText == Ranswer) {
        doWhenCorrect(0);
    } else {
        doWhenIncorrect(0);
    }
    clearInterval(t);
    outro(0);
});
buttons[1].addEventListener('click', () => {
    if (buttons[1].innerText == Ranswer) {
        doWhenCorrect(1);
    } else {
        doWhenIncorrect(1);
    }
    clearInterval(t);
    outro(1);
});
buttons[2].addEventListener('click', () => {
    if (buttons[2].innerText == Ranswer) {
        doWhenCorrect(2);
    } else {
        doWhenIncorrect(2);;
    }
    clearInterval(t);
    outro(2);
});
buttons[3].addEventListener('click', () => {
    if (buttons[3].innerText == Ranswer) {
        doWhenCorrect(3);
    } else {
        doWhenIncorrect(3);
    }
    clearInterval(t);
    outro(3);
});

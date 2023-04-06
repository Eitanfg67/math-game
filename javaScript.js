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
    n1 = Math.floor(Math.random() * 100);
    n2 = Math.floor(Math.random() * 100);
    opSelector = operator[Math.floor(Math.random() * 4)];

    if (opSelector == "/") {
        for (var i = 0; i < 200; i++) {
            if (n1 % n2 == 0 && n1 != 0 && n2 != 0 && n2 != 1 && n1 != n2) {
                break;
            }
            n1 = Math.floor(Math.random() * 100);
            n2 = Math.floor(Math.random() * 100);
        }
    }

    if (opSelector == "*") {
        for (var i = 0; i < 100; i++) {
            if (n1 * n2 <= 1000) {
                break;
            }
            n1 = Math.floor(Math.random() * 50);
            n2 = Math.floor(Math.random() * 50);
        }
    }
    question.innerHTML = n1 + opSelector + n2;
    answer = eval(question.innerHTML);
    question.innerHTML = question.innerHTML + " = ?";

    getOptions();
    getQNo();

}

function getOptions() {

    for (var i = 0; i < 4; i++ && i != ansOpt) {
        if (answer > 100) {
            buttons[i].innerHTML = answer + Math.floor(Math.random() * answer * 0.4);
        } else if (answer > 30 && answer < 100) {
            buttons[i].innerHTML = answer + Math.floor(Math.random() * answer * 0.6);
        } else {
            buttons[i].innerHTML = Math.floor(Math.random() * 100);
        }

        if (answer < 0) {
            buttons[i].innerHTML = "-" + buttons[i].innerHTML;
        }
    }
    ansOpt = Math.floor(Math.random() * 4);
    buttons[ansOpt].innerHTML = answer;
}

function getQNo() {
    qNo.innerHTML = parseInt(qNo.innerHTML) + 1;
}

function getScore() {
    score.innerHTML = parseInt(score.innerHTML) + parseInt(progress.style.width);
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
    if (buttons[0].innerText == answer) {
        doWhenCorrect(0);
    } else {
        doWhenIncorrect(0);
    }
    clearInterval(t);
    outro(0);
});
buttons[1].addEventListener('click', () => {
    if (buttons[1].innerText == answer) {
        doWhenCorrect(1);
    } else {
        doWhenIncorrect(1);
    }
    clearInterval(t);
    outro(1);
});
buttons[2].addEventListener('click', () => {
    if (buttons[2].innerText == answer) {
        doWhenCorrect(2);
    } else {
        doWhenIncorrect(2);;
    }
    clearInterval(t);
    outro(2);
});
buttons[3].addEventListener('click', () => {
    if (buttons[3].innerText == answer) {
        doWhenCorrect(3);
    } else {
        doWhenIncorrect(3);
    }
    clearInterval(t);
    outro(3);
});
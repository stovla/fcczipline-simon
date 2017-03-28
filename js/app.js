// one issue to be solved is when you start clicking on start like crazy
// it will not work anymore, you have to reset the page
const colors = ["red", "blue", "yellow", "green"];
const sounds = {
    "red": new Audio("sound/simonSound1.mp3"),
    "blue": new Audio("sound/simonSound2.mp3"),
    "green": new Audio("sound/simonSound3.mp3"),
    "yellow": new Audio("sound/simonSound4.mp3")
}
const winSound = new Audio("sound/tada.mp3");
const failSound = new Audio("sound/slap.mp3");
const onButton = document.querySelector("#onOff");
const button = document.querySelectorAll('.btn');
const startButton = document.querySelector("#start");
const strictButton = document.querySelector("#strict");
var speed;
var game;
var playerCount;
var sequence = [];
var playerTurn;
var interval;
isStrict = false;

// game speed
function gameSpeed() {
    let speedCount = sequence.length;
    if (speedCount < 5) {
        return 1000;
    } else if (speedCount < 9) {
        return 850;
    } else if (speedCount < 13) {
        return 650;
    } else if (speedCount < 21) {
        return 500;
    }
}

// init the values
function init() {
    sequence = [];
    playerCount = 0;
    playerTurn = false;
    interval = null;
    isStrict = false;
}

// starting and ending a game with on and off button
onButton.addEventListener("click", function() {
    this.innerText = "Turn ON";
    startButton.style.color = "#fff";
    if (game) {
        disableAllButtons();
        init();
    } else {
        this.innerText = "Turn OFF";
        startButton.removeAttribute("disabled", true);
        strictButton.removeAttribute("disabled", true);
    }
    game = !game;
    displayCounter();
});

// starting a sequence
startButton.addEventListener("click", function() {
    if (game) {
        this.style.color = "#00ff00";
    }
    fromScratch();
}); ///********set background for the buttons

// function starting from scratch
function fromScratch() {
    init();
    start();
}
// starting and restarting the sequence from 1
function start() {
    if (game) {
        clearInterval(interval);
        cpuSequence();
    }
}
// turn on and off strict mode 
strictButton.addEventListener("click", function() {
    isStrict = !isStrict;
    if (isStrict) {
        this.style.color = "#F00"; ///********set background for the buttons
    } else {
        this.style.color = "#FFF";
    }
});

// disabling and enabling buttons
function disableAllButtons() {
    strictButton.setAttribute("disabled", true);
    startButton.setAttribute("disabled", true);
    disableButtons();
}

function enableButtons() {
    for (var i = 0; i < 4; i++) {
        button[i].removeAttribute("disabled", true);
    }
}

function disableButtons() {
    for (var i = 0; i < 4; i++) {
        button[i].setAttribute("disabled", true);
    }
}
disableAllButtons();

// updating player sequence when I hit the button
for (var i = 0; i < 4; i++) {
    button[i].addEventListener("click", function(e) {
        if (playerTurn) {
            let color = this.getAttribute("data-color");
            playerSequence(color);
        }
    });
}

// player sequence update
function playerSequence(color) {
    if (playerTurn) {
        playerCount++;
        if (!compare(playerCount - 1, color)) {
            wrongButton();
            if (!isStrict) {
                return cpuButtonLight();
            } else {
                return fromScratch();
            }
        }
        lightButton(color);
        if (playerCount === sequence.length) {
            if (playerCount < 20) {
                playerTurn = false;
                return cpuSequence();
            } else {
                winSound.play();
                return fromScratch();
            }
        }
    }
}
// computer sequence starting
function cpuSequence() {
    var randomColor = colors[Math.floor(Math.random() * 4)];
    sequence.push(randomColor);
    cpuButtonLight();
}
// light the sequence
function cpuButtonLight() {
    disableButtons();
    var index = 0;
    setTimeout(function() {
        interval = setInterval(function() {
            displayCounter();
            clearButton();
            if (index !== sequence.length) {
                lightButton(sequence[index]);
                index++;
            } else {
                for (var k = 0; k < 4; k++) {
                    button[k].removeAttribute("disabled", true);
                }
                clearButton();
                enableButtons();
                playerCount = 0;
                playerTurn = true;
                clearInterval(interval);
            }
        }, gameSpeed());
    }, 1000);
}

// playing a sound and lighting the button
function lightButton(color) {
    for (var i in sounds) {
        sounds[i].pause();
        sounds[i].currentTime = 0;
    }
    sounds[color].play();
    var playButton = document.querySelector("." + color);
    if (!playerTurn) {
        playButton.id = color;
    }
}
// comparing sequences
function compare(count, color) {
    if (sequence[count] === color) {
        return true;
    }
    return false;
}

// clear button lighting
function clearButton() {
    for (var i = 0; i < 4; i++) {
        button[i].id = "";
    }
}

// wrong button press
function wrongButton() {
    playerTurn = false;
    failSound.play();
}
// counter display
function displayCounter() {
    let ct = document.getElementById("counter");
    let num = String(sequence.length);
    if (game) {
        if (num > 9) {
            ct.innerText = num;
        } else {
            ct.innerText = "0" + num;
        }
    } else {
        ct.innerText = "--";
    }
}
// display winner
function winner() {
    winSound.play();
}
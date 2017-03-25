const colors = ["red", "blue", "yellow", "green"];
const speed = { "0": 1000, "1": 700, "2": 500 };
var cpuCount = 0;
var playerCount = 0;
var sequence = [];
var interval;
var playerTurn = false;
var sound1 = new Audio("sound/simonSound1.mp3");
var sound2 = new Audio("sound/simonSound2.mp3");
var sound3 = new Audio("sound/simonSound3.mp3");
var sound4 = new Audio("sound/simonSound4.mp3");
var button = document.querySelectorAll('.btn');
var start = document.querySelector(".start");

start.addEventListener("click", cpuSequence);
// updating player sequence when I hit the button
for (var i = 0; i < 4; i++) {
    button[i].addEventListener("mousedown", function(e) {
        let color = this.id;
        playerSequence(color);
    });
}
// player sequence update
function playerSequence(color) {
    if (playerTurn) {
        playerCount++;
        // if (plSeq.length <= sequence.length) {
        plSeq.push(color);
        lightButton(color);
        if (!compare(playerCount - 1, color)) {
            wrongButton();
        } else if (playerCount === sequence.length) {
            playerTurn = false;
            cpuSequence();
        }
    }
}
// computer sequence starting
function cpuSequence() {
    if (!playerTurn) {
        cpuCount = 0;
        var randomColor = colors[Math.floor(Math.random() * 4)];
        sequence.push(randomColor);
        console.log(sequence.length);
        interval = setInterval(function() {
            cpuCount++;
            if (cpuCount === sequence.length) {
                playerCount = 0;
                clearInterval(interval);
                playerTurn = true;
            }
            lightButton(sequence[cpuCount - 1]);
        }, 1000);
    }
}

// playing a sound and lighting the button
function lightButton(color) {
    var playButton = document.getElementById(color);
    if (color === "green") {
        sound1.play();
    } else if (color === "blue") {
        sound2.play();
    } else if (color === "yellow") {
        sound3.play();
    } else if (color === "red") {
        sound4.play();
    }
    playButton.classList.add("light");
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
        button[i].classList.remove("light");
    }
}

// wrong button press
function wrongButton() {
    plSeq = [];
    playerTurn = false;
    alert("wrong button");
    // cpuSequence();
}
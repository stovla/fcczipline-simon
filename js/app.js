const colors = ["red", "blue", "yellow", "green"];
const speed = { "0": 1000, "1": 700, "2": 500 };
var plSeq = [];
var sequence = [];
var playerTurn = true;
var sound1 = new Audio("sound/simonSound1.mp3");
var sound2 = new Audio("sound/simonSound2.mp3");
var sound3 = new Audio("sound/simonSound3.mp3");
var sound4 = new Audio("sound/simonSound4.mp3");
var button = document.querySelectorAll('.btn');
// updating player sequence when I hit the button
for (var i = 0; i < 4; i++) {
    button[i].addEventListener("click", function(e) {
        let color = this.id;
        console.log(color);
        playerSequence(color);
    });
}

function playerSequence(color) {
    if (playerTurn) {
        if (plSeq.length <= sequence.length) {
            plSeq.push(color);
            console.log(plSeq);
            lightButton(color);
        }
    }
}
// choosing a random color when the computer plays
function randomColor() {
    return colors[Math.floor(Math.random() * 4)];
}

function cpuSequence(count) {
    sequence = [];
    for (var i = 0; i < count; i++) {
        let color = randomColor();
        sequence.push(color);
        lightButton(color);
    }
    if (count === sequence.length) {
        playerTurn = true;
        clearInterval();
    }
}

function startSequence() {
    // var count = 0;
    // var sequenceInterval = setInterval(function() {
    // lightButton(count);
    count++;
    if (count === sequence.length) {
        clearInterval(sequenceInterval);
    }
    // }, 1500);
}
// playing a sound and lighting the button
function lightButton(color) {
    switch (color) {
        case "green":
            sound1.play();
            document.getElementById(color).style.opacity = "1";
            break;
        case "green":
            sound1.play();
            document.getElementById(color).style.opacity = "1";
            break;
        case "green":
            sound1.play();
            document.getElementById(color).style.opacity = "1";
            break;
        case "green":
            sound1.play();
            document.getElementById(color).style.opacity = "1";
            break;
    }
    // clear the button opacity
    setTimeout(function() {

    }, speed);
}

for (var btn = 0; btn < 4; btn++) {
    var button = document.ge
}


// for (var i = 0; i < sequence.length; i++) {
//     document.getElementById(sequence[i]).style.opacity = "1";
//     setTimeout(function() {
//         document.getElementById(sequence[i]).style.opacity = "0.6";
//     });
// }
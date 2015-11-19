// if this is roma go away!
var gametime = 100; // constant
var timeF; // this is here so I can stop the timer
var running = false;
var already = [];
var answers = ["Brazil", "Colombia", "Argentina", "Peru", "Venezuela", "Chile", "Ecuador", "Bolivia", "Paraguay", "Uruguay", "Guyana", "Suriname", "French Guiana", "Falkland Islands"];
var scoreNumber = 0;

function disable() {
    document.getElementById("restartButton").disabled = true;
    document.getElementById("quitButton").disabled = true;
    document.getElementById("inputBox").disabled = true;
    document.getElementById("playButton").disabled = false;
}
function enable() {
    document.getElementById("restartButton").disabled = false;
    document.getElementById("quitButton").disabled = false;
    document.getElementById("inputBox").disabled = false;
    document.getElementById("playButton").disabled = true;

}

function validate(input) {
    var answered = false;
    var input = input.value.toLowerCase();
    
    //checks if you already used this answer
    for (var i = 0; i < already.length; i++) {
            if((already[i] + "").toLowerCase() === input) {
                answered = true;
            }
        }
    
    //checks if you're answer is right
    if(answered == false)
        for(var i = 0; i < answers.length; i++) {
            if((answers[i] + "").toLowerCase() === input) {
                already.push(answers[i]);
                already.sort();
                correct();
            }
        }
    else{
        alert("Already answered");
        document.getElementById("inputBox").value="";
    }
}

function correct(){
    scoreNumber = scoreNumber + 1; 
    document.getElementById("score").innerHTML = scoreNumber;
    var s = already.toString();
    document.getElementById("correct").innerHTML = s;
    document.getElementById("inputBox").value="";

    //checks if you have won
    if(already.length == answers.length){
        alert("You Won! Congratulations!");
        quitGame();
    } 
}

function quitGame(){
    var timer = document.getElementById("timer");
    timer.innerHTML = gametime;
    clearInterval(timeF);
    scoreNumber = 0; // clears the score var
    document.getElementById("score").innerHTML = scoreNumber; // clears the score on screen
    already = [] // clears the correct countries list
    document.getElementById("correct").innerHTML = ""; // clears the correct countries list on screen
    running = false;    
    disable();
}

function playGame(){
    document.getElementById("timer").innerHTML=gametime;
    enable();
    if(running == false)
        startTimer();
    running = true;
}

function restartGame(){
    quitGame();
    //starts the game again
    playGame();
}
    
function startTimer(){
    timeF = setInterval(function(){
        //grab the timer, decrease its value, update
        var timer = document.getElementById("timer");
        var time =  parseInt(timer.innerHTML);
        timer.innerHTML = time-1;
        if(time < 0){ 
            clearInterval(timeF);
            time = 0;
            timer.innerHTML = time;
            quitGame();
            alert("You Lost!");
        }
    },1000);
}


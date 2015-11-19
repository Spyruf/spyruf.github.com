// if this is roma go away!
var gametime = 30; // constant
var scoreNumber = 0; // what the players score is
var timeF; // this is here so I can stop the timer
var running = false;
var already = []; // stores the answers
var questions = ["Michael Jordan", "Lebron James", "Kobe Bryant", "Dwyane Wade", "Wilt Chamberlain"];
var answers = ["23", "23", "24", "3", "13"];
var qTotal =  questions.length;
var qRight = 0;
var index;

//these enable/disable the buttons when needed
function disable() {
    document.getElementById("restartButton").disabled = true;
    document.getElementById("quitButton").disabled = true;
    document.getElementById("inputBox").disabled = true;
    document.getElementById("passButton").disabled = true;
    document.getElementById("inputBox").disabled = true;
    document.getElementById("playButton").disabled = false;
}
function enable() {
    document.getElementById("restartButton").disabled = false;
    document.getElementById("quitButton").disabled = false;
    document.getElementById("inputBox").disabled = false;
    document.getElementById("passButton").disabled = false;
    document.getElementById("inputBox").disabled = false;
    document.getElementById("playButton").disabled = true;
} 

//functions
function newQ() {

    
    index = Math.floor((Math.random() * questions.length));
    
    while(already[index] != null){ // makes sure q hasn't been already asked and isn't the same as the question before
        index = Math.floor((Math.random() * questions.length));  
    }
    document.getElementById("question").innerHTML=(questions[index] + ""); 
    

}

function validate(input){    

    var input = input.value.toLowerCase();

    if((answers[index] + "").toLowerCase() === input) {
                already[index] = input;
                correct();
            }
}

function correct(){
    scoreNumber = scoreNumber + 1; 
    qRight = qRight + 1;
    document.getElementById("score").innerHTML = scoreNumber;
    document.getElementById("correct").innerHTML = (qTotal - qRight); 
    document.getElementById("inputBox").value="";

    
    //checks if you have won
    //just checking length won't work, must check length and make sure all values exist 
    var nullExists = false; 
    for(x = 0; x < already.length; x++){
        if(already[x] == null)
            nullExists = true;
    } // loop to check and make sure all values exist
    
    if(already.length == answers.length && nullExists == false){
        alert("You Won! Congratulations!");
        quitGame();
    } // checks if you've won the game
    else newQ();
    
    
}

//game functions
function quitGame(){
    var timer = document.getElementById("timer");
    qRight = 0;
    timer.innerHTML = gametime;
    clearInterval(timeF);
    scoreNumber = 0; // clears the score var
    document.getElementById("score").innerHTML = scoreNumber; // clears the score on screen
    already = [] // clears the correct answers list
    document.getElementById("correct").innerHTML = ""; // clears the questions left label
    document.getElementById("question").innerHTML = ""; // clears the question
    running = false;    
    disable();
}

function playGame(){
    document.getElementById("timer").innerHTML=gametime;
    enable();
    if(running == false)
        startTimer();
    running = true;
    newQ();
    document.getElementById("correct").innerHTML = qTotal;
}

function restartGame(){
    quitGame();
    //starts the game again
    playGame();
}

//timer function
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


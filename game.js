let level = 0;
var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = new Array();
var userClickPattern = new Array();
var started = false;

$(document).keypress(function(){
    if (!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function nextSequence(){
    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColor[randomNumber];
    gamePattern.push(randomColor);
    console.log(gamePattern);
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickPattern.length - 1);
})

// step 5
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currenColor){
    $("#" + currenColor).addClass("pressed");
    setTimeout(function(){
        $(".btn").removeClass("pressed");
    }, 100);
}

//step 8
function checkAnswer(currentLevel){
    if (userClickPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("success");
        if (userClickPattern.length === gamePattern.length)
            setTimeout(function(){
                nextSequence();
            }, 1000);
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
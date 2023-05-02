let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];


let gameStarted = false;
// lets the game star on touch screen devices.
if ("ontouchstart" in document.documentElement) {
    $(document).on('touchstart', function(event) {
        if (!gameStarted) {
            nextSequence();
            gameStarted = true;
        };
    });
} else {
    //lets the game start when any key on the keyboard is pressed. It only works with the first sequence of the game
    $(document).on('keydown', function(event) {
        if (!gameStarted) {
            nextSequence();
            gameStarted = true;
        }
    });
}


// lights up any of the four colors and stores them inside the gamePattern array
let level = 0;
function nextSequence() {
    let randomNumber = Math.floor(Math.random()*4); 
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100);
    $("#"+randomChosenColour).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $('#level-title').text('Level '+level);
    
}

// listens for the click event. then stores the button the user pressed inside the userClickedPattern array
$(".btn").click(function(event) {
    let userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern);
});

// plays each buttons sound, works for the game pattern and the user interaction
let names = [userChosenColour, randomChosenColour];
function playSound (names) {
    switch(names) {
        case "green":
            let audio1 = new Audio("sounds/green.mp3");
            audio1.play();
            break;
        case "red":
            let audio2 = new Audio("sounds/red.mp3");
            audio2.play();
            break;
        case "yellow":
            let audio3 = new Audio("sounds/yellow.mp3");
            audio3.play();
            break;
        case "blue":
            let audio4 = new Audio("sounds/blue.mp3");
            audio4.play();
            break;
        default: console.log(names); 
    }
}

// animates the button that gets clicked by the user
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100)
}

// checks wether the gamePattern and the userClickedPattern match, if so the game continues when calling nextSequence()
function checkAnswer(currentLevel) {
    if (currentLevel[currentLevel.length - 1] === gamePattern[gamePattern.length - 1]) {
        console.log('success');
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
                }, 1000);
            userClickedPattern = [];
        }   
    }
    if (currentLevel[currentLevel.length - 1] !== gamePattern[currentLevel.length - 1]) {
        console.log('wrong');
    
        let audio5 = new Audio("sounds/wrong.mp3");
        audio5.play();
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text('Game Over, Press any key to Restart');
        startOver();
    }
    
}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    gameStarted = false;
    userClickedPattern = [];
}


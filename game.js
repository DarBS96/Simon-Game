'use strict'

var buttonColours = ['red', 'blue', 'green', 'yellow']
var gamePattern = []
var userClickedPattern = []
var gGameIsOn = false
var gLevel = 0



// START THE GAME
// BECAUSE CHROME DOESN'T ALLOW TO AUTOPLAY WITH NO ACT OF THE USER =>
// ONLY WHEN PRESS ON A IN KEYBOARD THE GAME WILL START

document.addEventListener('keydown', function () {
    if (!gGameIsOn) {
        nextSequence()
        $('h1').text('LEVEL 0')
        gGameIsOn = true
    }
})

function nextSequence() {

    userClickedPattern = []

    // INCREASE THE LEVEL BY 1 EVERY TIME nextSequence() IS CALLED

    gLevel++

    //CREATE RANDOM COLOUR

    var randomNum = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNum]
    gamePattern.push(randomChosenColour)

    console.log(gamePattern)

    // ANIMATE A FLASH TO THE SELECTED BUTTON WITH JQUERY

    $('#' + randomChosenColour).fadeOut(100).fadeIn(100)

    playSound(randomChosenColour)

    // UPDATE THE H1 WITH THE VALUE OF LEVEL

    $('h1').text('LEVEL ' + gLevel)
}

// CHECK WHICH BUTTON IS PRESSED WITH JQUERY

$('.btn').click(function () {
    var userChosenColour = $(this).attr('id')
    userClickedPattern.push(userChosenColour)

    console.log(userClickedPattern)

    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length - 1)
})

// PLAY SOUND TO THE SELECTED BUTTON WITH JS

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3')
    audio.play()
}

// ADD ANIMATION (BOX-SHADOW) TO USER WHEN CLICKS BY JQUERY

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed')

    setTimeout(function () {
        $('#' + currentColour).removeClass('pressed')
    }, 100)
}

// CHECK ANSWER AND LEVEL

function checkAnswer(currentLevel) {
    // CORRECT ANSWER

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success')
        console.log(currentLevel)

        if (gamePattern.length === userClickedPattern.length) {
            console.log (`${gamePattern.length} , ${userClickedPattern.length} `)
            setTimeout(nextSequence, 1000)
        }
    } else {

        // WRONG ANSWER

        playSound('wrong')

        $('body').addClass('game-over')
        setTimeout(function () {
            $('body').removeClass('game-over')
        }, 200)

        $('h1').text('Game Over, Press Any Key to Restart')

        startOver()
    }
}

function startOver() {
    gLevel = 0
    gamePattern = []
    gGameIsOn = false
}




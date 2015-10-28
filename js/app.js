// Canvas
var ctx = document.getElementById('canvas').getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Sound effects
var titleSound = new Audio('audio/title.mp3');
var gatherSound = new Audio('audio/gather.wav');
var gameoverSound = new Audio('audio/gameover.mp3');
var titleSoundSwitch = true;
var gameoverSoundSwitch = true;

//===============================================

// Background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
  bgReady = true;
};
bgImage.src = 'img/background.jpg';

// Player image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function() {
  playerReady = true;
};
playerImage.src = 'img/ufo.png';

// Alien image
var alienReady = false;
var alienImage = new Image();
alienImage.onload = function() {
  alienReady = true;
};
alienImage.src = 'img/alien.png';

// Title screen
var titleReady = false;
var titleImage = new Image();
titleImage.onload = function() {
  titleReady = true;
};
titleImage.src = "img/title.png";

// Gameover and replay screen
var gameoverReady = false;
var gameoverImage = new Image();
gameoverReady.onload = function() {
  gameoverReady = true;
  gameoverLoad = false;
};
gameoverImage.src = "img/gameover.png";

//===============================================

// Player
var player = {
  speed: 350,
};

// Score
var score = {};
var scoreAmp = 0;

//===============================================

// Event listeners
var keysDown = {};     // Keydown = true | Keyup = false
var keysDown2 = {};     // Keydown = true

addEventListener('keydown', function(e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', function(e) {
  delete keysDown[e.keyCode];
}, false);

addEventListener('keydown', function(e) {
  keysDown2[e.keyCode] = true;
});

// To disable space bar and arrow keys for scrolling
window.addEventListener("keydown", function(e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

//===============================================

// Reset when player scores
var playerReset = true;

var reset = function() {
  if (playerReset === true) {     // If playReset is true then set player
    player.x = 50;
    player.y = 200;
    player.w = 70;
    player.h = 49;
    playerReset = false;
  };

  if (playerReset === false) {    // If playerReset is false then reset player to current x and y positions
    player.x = player.x;
    player.y = player.y
    player.w = 70;
    player.h = 49;
  };

  // Random score objects
  score.w = 45;
  score.h = 45;

  score.x = 45 + (Math.random() * (canvas.width - score.w));
  score.y = 45 + (Math.random() * (canvas.height - score.h));

  console.log("Score: " + scoreAmp);

};

//===============================================

// Update sprites
var update = function(modifier) {
  if (37 in keysDown) {     // User holding left
    player.x -= player.speed * modifier;
  };

  if (40 in keysDown) {     // User holding down
    player.y += player.speed * modifier;
  };

  if (38 in keysDown) {     // User holding up
    player.y -= player.speed * modifier;
  };

  if (39 in keysDown) {     // User holding right
    player.x += player.speed * modifier;
  };

  //===============================================

  // If player is touching object
  if (
    player.x <= (score.x + (score.w / 2) + 10)
    && score.x <= (player.x + (player.w / 2) + 20)
    && player.y <= (score.y + (score.w / 2) + 10)
    && score.y <= (player.y + (player.w / 2) + 5)
    ) {
      gatherSound.play();     // Sound effect
      scoreAmp += 100;
      reset();
  };

  // Player canvas boundaries
  if (player.x >= canvas.width - (playerImage.width / 6) + 5) {
      player.x = canvas.width - (playerImage.width / 6) + 5;
  };
  if (player.x <= - 5) {
      player.x = - 5;
  };
  if (player.y >= canvas.height - playerImage.height + 5) {
      player.y = canvas.height - playerImage.height + 5;
  };
  if (player.y <= - 4) {
      player.y = - 4;
  };

//===============================================

  // Score canvas boundaries
  if (score.x >= canvas.width - alienImage.width -20) {
      score.x = canvas.width - alienImage.width -20;
  };
  if (score.x <= 20) {
      score.x = 20;
  };
  if (score.y >= canvas.height - alienImage.height -20) {
      score.y = canvas.height - alienImage.height -20;
  };
  if (score.y <= 10) {
      score.y = 10;
  };
};

//===============================================

// Timer
var seconds = 30;     // Countdown from 30 seconds
var secondsStart = false;     // If secondsStart is true then start countdown
var secondsBool = true;     // If secondsBool is false then draw game over screen

var interval = setInterval(function() {
  if (secondsStart === true) {
    --seconds;
  };
  if (seconds < 0) {
    secondsBool = false;
    clearInterval(interval);
  };
}, 1000);

//===============================================

// Animation timer
var secondsAnim = 0;
var secondsAnimEnd = 60;
var ufoAnim1 = true;
var ufoAnim2 = false;
var ufoAnim3 = false;
var ufoAnim4 = false;
var ufoAnim5 = false;
var ufoAnim6 = false;

var intervalAnim = setInterval(function() {
  ++secondsAnim;

  if (secondsAnim === 1) {
    ufoAnim6 = false;
    ufoAnim1 = true;
  };

  if (secondsAnim === 10) {
    ufoAnim1 = false;
    ufoAnim2 = true;
  };

  if (secondsAnim === 20) {
    ufoAnim2 = false;
    ufoAnim3 = true;
  };

  if (secondsAnim === 30) {
    ufoAnim3 = false;
    ufoAnim4 = true;  
  };

  if (secondsAnim === 40) {
    ufoAnim4 = false;
    ufoAnim5 = true;
  };

  if (secondsAnim === 50) {
    ufoAnim5 = false;
    ufoAnim6 = true;
  };

  if (secondsAnim === 60) {
    secondsAnim = 0;
  }
});

//===============================================

// High score boolean
var scoreUpdated = false;

//===============================================

// Draw background and sprites
var render = function() {
  if (titleReady) {
    ctx.drawImage(titleImage, 0, 0);
  };

  if (32 in keysDown2) {     // If space is pressed
    ctx.drawImage(bgImage, 0, 0);
    ctx.drawImage(alienImage, score.x, score.y);

 //===============================================   

    // Ufo Animation
    if (ufoAnim1 === true) {
      ctx.drawImage(playerImage, 0, 0, 70, 49, player.x, player.y, 70, 49);
    };

    if (ufoAnim2 === true) {
      ctx.drawImage(playerImage, 70, 0, 70, 49, player.x, player.y, 70, 49);
    };

    if (ufoAnim3 === true) {
      ctx.drawImage(playerImage, 140, 0, 70, 49, player.x, player.y, 70, 49);
    };

    if (ufoAnim4 === true) {
      ctx.drawImage(playerImage, 210, 0, 70, 49, player.x, player.y, 70, 49);
    };

    if (ufoAnim5 === true) {
      ctx.drawImage(playerImage, 280, 0, 70, 49, player.x, player.y, 70, 49);
    };

    if (ufoAnim6 === true) {
      ctx.drawImage(playerImage, 350, 0, 70, 49, player.x, player.y, 70, 49);
    };

//===============================================

    if (titleSoundSwitch === true) {
      titleSound.play();     // Sound effect
    };
    titleSoundSwitch = false;

    // Score
    ctx.fillStyle = "white";
    ctx.font = "18px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + scoreAmp, 10, 425);

    // Start timer
    secondsStart = true;

    ctx.fillStyle = "white";
    ctx.font = "18px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Time: " +  seconds, 10, 20);
  };

//===============================================  
  
  // If secondsBool is false then draw game over screen
  if (secondsBool === false) {
    ctx.drawImage(gameoverImage, 0, 0);

    if (gameoverSoundSwitch === true) {
      gameoverSound.play();     // Sound effect
    };
    gameoverSoundSwitch = false;

    gameoverLoad = true;     // Boolean to load game over screen

    if (13 in keysDown2 && gameoverLoad === true) {     // if enter is pressed and gameoverLoad is true then reload game
     location.reload();
    };

    // Score
    ctx.fillStyle = "white";
    ctx.font = "18px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Gathered: " + scoreAmp, 10, 425);

//===============================================

    // Stop the render function timer
    if (scoreUpdated === false) {     // Only add once
      scoreUpdated = true;
      document.getElementById('scores').innerHTML = '';
      addScore(scoreAmp);
      printScore();
    };
  };
};

//===============================================

// Local storage for score (jquery)
var scoreList = [35, 31, 27, 25, 20];

var addScore = function(scoreAmp) {
  scoreList.push(scoreAmp);
  saveScoreListToBrowser();
};

$(window).load(function() {
  ScoreInputFromBrowser();
});

var ScoreInputFromBrowser = function() {
  var getScore = localStorage.getItem('jsonScore');
  if (getScore != null) {
    scoreList = JSON.parse(getScore);
  };
};

var saveScoreListToBrowser = function() {
  var jsonObject = JSON.stringify(scoreList);
  localStorage.setItem('jsonScore',jsonObject);
};

var printScore = function() {
  scoreList.sort(function(a,b) { return b - a; });

  for (var i = 0; i < 5; i++) {     // Appends top 5 high scores
    $('#scores').append('<p>' + (i + 1) + ') '+ scoreList[i] + '</p>');
  };
};

//=============================================================

// Main app function
var main = function() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  // Request cross-brower support
  requestAnimationFrame(main);
};

//===============================================

// Cross browser support (animation or redrawing on canvas)
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//===============================================

// Run the app
var then = Date.now();
reset();
main();

// Print top 5 high score to html
ScoreInputFromBrowser();
printScore();

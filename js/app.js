// Canvas
var ctx = document.getElementById('canvas').getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Sound effects
var titleSound = new Audio('audio/title.mp3');
var gatherSound = new Audio('audio/gather.wav');
var gameoverSound = new Audio('audio/gameover.mp3');

// Screen switches
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

// Alien1 image
var alien1Ready = false;
var alien1Image = new Image();
alien1Image.onload = function() {
  alien1Ready = true;
};
alien1Image.src = 'img/alien1.png';

// Alien2 image
var alien2Ready = false;
var alien2Image = new Image();
alien2Image.onload = function() {
  alien2Ready = true;
};
alien2Image.src = 'img/alien2.png';

// Alien3 image
var alien3Ready = false;
var alien3Image = new Image();
alien3Image.onload = function() {
  alien3Ready = true;
};
alien3Image.src = 'img/alien3.png';

// Alien4 image
var alien4Ready = false;
var alien4Image = new Image();
alien4Image.onload = function() {
  alien4Ready = true;
};
alien4Image.src = 'img/alien4.png';

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

// Aliens
var alien1 = {};
var alien2 = {};
var alien3 = {};
var alien4 = {};
var alien2Switch = true;
var alien3Switch = true;
var alien4Switch = 1;

// Score
var score = 0;

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
var playerSet = false;
var alienSet = false;
var alien1Reset = false;
var alien1Count = 0;
var alien2Reset = false;
var alien2Count = 0;
var alien3Reset = false;
var alien3Count = 0;
var alien4Reset = false;
var alien4Count = 0;

var reset = function() {
  if (playerSet === false) {     // If playerSet is false then set player
    player.w = 70;
    player.h = 49;
    player.x = 50;
    player.y = 200;

    playerSet = true;
  };

  if (alienSet === false) {     // If alienSet is false then set aliens
    // Alien1
    alien1.w = 45;
    alien1.h = 45;
    alien1.x = 45 + (Math.random() * (canvas.width - alien1.w));
    alien1.y = 45 + (Math.random() * (canvas.height - alien1.h));

    // Alien2
    alien2.w = 45;
    alien2.h = 45;
    alien2.x = 45 + (Math.random() * (canvas.width - alien2.w));
    alien2.y = 45 + (Math.random() * (canvas.height - alien2.h));

    // Alien3
    alien3.w = 45;
    alien3.h = 45;
    alien3.x = 45 + (Math.random() * (canvas.width - alien3.w));
    alien3.y = 45 + (Math.random() * (canvas.height - alien3.h));

    // Alien4
    alien4.w = 45;
    alien4.h = 45;
    alien4.x = 45 + (Math.random() * (canvas.width - alien4.w));
    alien4.y = 45 + (Math.random() * (canvas.height - alien4.h));

    alienSet = true;
  };

  if (alienSet === true) {     // If alienSet is true and if alienReset is true then reset aliens
    if (alien1Reset === true) {
      alien1.w = 45;
      alien1.h = 45;
      alien1.x = 45 + (Math.random() * (canvas.width - alien1.w));
      alien1.y = 45 + (Math.random() * (canvas.height - alien1.h));

      alien1Reset = false;
    };

    if (alien2Reset === true) {
      alien2.w = 45;
      alien2.h = 45;
      alien2.x = 45 + (Math.random() * (canvas.width - alien2.w));
      alien2.y = 45 + (Math.random() * (canvas.height - alien2.h));

      alien2Reset = false;
    };

    if (alien3Reset === true) {
      alien3.w = 45;
      alien3.h = 45;
      alien3.x = 45 + (Math.random() * (canvas.width - alien3.w));
      alien3.y = 45 + (Math.random() * (canvas.height - alien3.h));

      alien3Reset = false;
    };

    if (alien4Reset === true) {
      alien4.w = 45;
      alien4.h = 45;
      alien4.x = 45 + (Math.random() * (canvas.width - alien4.w));
      alien4.y = 45 + (Math.random() * (canvas.height - alien4.h));

      alien4Reset = false;
    };
  };
  console.log('Score: ' + score);
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

  // Alien2 movement
  if (alien2Switch === true) {
    alien2.y += 2;
    if (alien2.y > 440) {
      alien2Switch = false;
    };
  };
    
  if (alien2Switch === false) {
    alien2.y -= 2;
    if (alien2.y < 15) {
      alien2Switch = true;
    };
  };

  // Alien3 movement
  if (alien3Switch === true) {
    alien3.x += 10;
    if (alien3.x > 725) {
      alien3Switch = false;
    };
  };
    
  if (alien3Switch === false) {
    alien3.x -= 10;
    if (alien3.x < 15) {
      alien3Switch = true;
    };
  };

  // Alien4 movement
  if (alien4Switch === 1) {
    alien4.x -= 15;
    if (alien4.x < 15) {
      alien4Switch = 2;
    };
  };
    
  if (alien4Switch === 2) {
    alien4.y += 15;
    if (alien4.y > 440) {
      alien4Switch = 3;
    };
  };

  if (alien4Switch === 3) {
    alien4.x += 15;
    if (alien4.x > 725) {
      alien4Switch = 4;
    };
  };

  if (alien4Switch === 4) {
    alien4.y -= 15;
    if (alien4.y < 15) {
      alien4Switch = 1;
    };
  };

  //===============================================

  // If player is touching alien1
  if (
    player.x <= (alien1.x + (alien1.w / 2) + 10)
    && alien1.x <= (player.x + (player.w / 2) + 20)
    && player.y <= (alien1.y + (alien1.w / 2) + 10)
    && alien1.y <= (player.y + (player.w / 2) + 5)
    ) {
      gatherSound.play();     // Sound effect
      score += 100;
      alien1Count += 1;
      alien1Reset = true;
      reset();
  };

  // If player is touching alien2
  if (
    player.x <= (alien2.x + (alien2.w / 2) + 10)
    && alien2.x <= (player.x + (player.w / 2) + 20)
    && player.y <= (alien2.y + (alien2.w / 2) + 10)
    && alien2.y <= (player.y + (player.w / 2) + 5)
    ) {
      gatherSound.play();     // Sound effect
      score += 200;
      alien2Count +=1;
      alien2Reset = true;
      reset();
  };

  // If player is touching alien3
  if (
    player.x <= (alien3.x + (alien3.w / 2) + 10)
    && alien3.x <= (player.x + (player.w / 2) + 20)
    && player.y <= (alien3.y + (alien3.w / 2) + 10)
    && alien3.y <= (player.y + (player.w / 2) + 5)
    ) {
      gatherSound.play();     // Sound effect
      score += 300;
      alien3Count += 1;
      alien3Reset = true;
      reset();
  };

  // If player is touching alien4
  if (
    player.x <= (alien4.x + (alien4.w / 2) + 10)
    && alien4.x <= (player.x + (player.w / 2) + 20)
    && player.y <= (alien4.y + (alien4.w / 2) + 10)
    && alien4.y <= (player.y + (player.w / 2) + 5)
    ) {
      gatherSound.play();     // Sound effect
      score += 400;
      alien4Count += 1;
      alien4Reset = true;
      reset();
  };

//===============================================

  // Player canvas boundaries
  if (player.x >= canvas.width - (playerImage.width / 6) + 5) {
      player.x = canvas.width - (playerImage.width / 6) + 5;
  };

  if (player.x <= - 5) {
      player.x = - 5;
  };

  if (player.y >= canvas.height - playerImage.height - 95) {
      player.y = canvas.height - playerImage.height - 95;
  };

  if (player.y <= - 4) {
      player.y = - 4;
  };

//===============================================

  // Alien1 canvas boundaries
  if (alien1.x >= canvas.width - alien1Image.width + 5) {
      alien1.x = canvas.width - alien1Image.width + 5;
  };

  if (alien1.x <= 5) {
      alien1.x = 5;
  };

  if (alien1.y >= canvas.height - alien1Image.height - 105) {
      alien1.y = canvas.height - alien1Image.height - 105;
  };

  if (alien1.y <= 5) {
      alien1.y = 5;
  };

  // Alien2 canvas boundaries
  if (alien2.x >= canvas.width - alien2Image.width + 5) {
      alien2.x = canvas.width - alien2Image.width + 5;
  };

  if (alien2.x <= 5) {
      alien2.x = 5;
  };

  if (alien2.y >= canvas.height - alien2Image.height - 105) {
      alien2.y = canvas.height - alien2Image.height - 105;
  };

  if (alien2.y <= 5) {
      alien2.y = 5;
  };

  // Alien3 canvas boundaries
  if (alien3.x >= canvas.width - alien3Image.width + 5) {
      alien3.x = canvas.width - alien3Image.width + 5;
  };

  if (alien3.x <= 5) {
      alien3.x = 5;
  };

  if (alien3.y >= canvas.height - alien3Image.height - 105) {
      alien3.y = canvas.height - alien3Image.height - 105;
  };

  if (alien3.y <= 5) {
      alien3.y = 5;
  };

  // Alien4 canvas boundaries
  if (alien4.x >= canvas.width - alien4Image.width + 5) {
      alien4.x = canvas.width - alien4Image.width + 5;
  };

  if (alien4.x <= 5) {
      alien4.x = 5;
  };

  if (alien4.y >= canvas.height - alien4Image.height - 105) {
      alien4.y = canvas.height - alien4Image.height - 105;
  };

  if (alien4.y <= 5) {
      alien4.y = 5;
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
    ctx.drawImage(alien1Image, alien1.x, alien1.y);
    ctx.drawImage(alien2Image, alien2.x, alien2.y);
    ctx.drawImage(alien3Image, alien3.x, alien3.y);
    ctx.drawImage(alien4Image, alien4.x, alien4.y);

 //===============================================   

    // player Animation
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
    
    // Title screen clear
    if (titleSoundSwitch === true) {
      titleSound.play();     // Sound effect
    };
    titleSoundSwitch = false;

    // Score
    ctx.fillStyle = 'white';
    ctx.font = '18px Helvetica';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Score: ' + score, 10, 425);

    // Start timer
    secondsStart = true;

    // Time
    ctx.fillStyle = 'white';
    ctx.font = '18px Helvetica';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Time: ' +  seconds, 10, 20);
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
    ctx.fillStyle = 'white';
    ctx.font = '18px Helvetica';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Score: ' + score, 10, 425);

//===============================================

    // Stop the render function timer
    if (scoreUpdated === false) {     // Only add once
      scoreUpdated = true;
      document.getElementById('scores').innerHTML = '';
      addScore(score);
      printScore();
    };
  };
};

//===============================================

// Local storage for alien1 (jquery)
var scoreList = [35, 31, 27, 25, 20];

var addScore = function(score) {
  scoreList.push(score);
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

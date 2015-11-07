// Canvas
var ctx = document.getElementById('canvas').getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Sound effects
var titleSound = new Audio('audio/title.mp3');
var rescueSound = new Audio('audio/rescue.mp3');
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
bgImage.src = 'img/background.png';

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

// Title2 image
var title2Ready = false;
var title2Image = new Image();
title2Image.onload = function() {
  title2Ready = true;
};
title2Image.src = "img/type-ufo.png";

// Gameover and replay screen
var gameoverReady = false;
var gameoverImage = new Image();
gameoverReady.onload = function() {
  gameoverReady = true;
  gameoverLoad = false;
};
gameoverImage.src = "img/gameover.png";

//===============================================

// Local storage for high scores
var scoreList = [[12000, 'Error'], [11000, 'Ness'], [10500, 'Cloud'], [10000, 'Ranma'], 
                [9500, 'Pulpi'], [9000, 'Ichigo'], [8500, 'Doomguy'], [8000, 'Simon Belmont'], 
                [7500, 'Bill Rizer'], [7000, 'DDave']];

//===============================================

// Player score and name
var scoreAndName = [0];

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
window.addEventListener('keydown', function(e) {
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
    player.x = 350;
    player.y = 250;

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
  console.log('Score: ' + scoreAndName[0] + ' | ' + 'Alien Type 1: ' + alien1Count
              + ' | ' + 'Alien Type 2: ' + alien2Count + ' | '
              + 'Alien Type 3: ' + alien3Count + ' | '
              + 'Alien Type 4: ' + alien4Count);
};

//===============================================

// Update sprites
var update = function(modifier) {

  if (32 in keysDown2 && secondsBool === true) {     // If space is pressed
  
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
      alien4.x -= 12;
      if (alien4.x < 15) {
        alien4Switch = 2;
      };
    };
      
    if (alien4Switch === 2) {
      alien4.y += 12;
      if (alien4.y > 440) {
        alien4Switch = 3;
      };
    };

    if (alien4Switch === 3) {
      alien4.x += 12;
      if (alien4.x > 725) {
        alien4Switch = 4;
      };
    };

    if (alien4Switch === 4) {
      alien4.y -= 12;
      if (alien4.y < 15) {
        alien4Switch = 1;
      };
    };

  //===============================================

    // If player is touching alien1
    if (
      player.x <= (alien1.x + (alien1.w / 2) + 20)
      && alien1.x <= (player.x + (player.w / 2) + 5)
      && player.y <= (alien1.y + (alien1.w / 2) + 10)
      && alien1.y <= (player.y + (player.w / 2) + 5)
      ) {
        rescueSound.play();     // Sound effect
        scoreAndName[0] += 100;
        alien1Count += 1;
        alien1Reset = true;
        reset();
    };

    // If player is touching alien2
    if (
      player.x <= (alien2.x + (alien2.w / 2) + 20)
      && alien2.x <= (player.x + (player.w / 2) + 5)
      && player.y <= (alien2.y + (alien2.w / 2) + 10)
      && alien2.y <= (player.y + (player.w / 2) + 5)
      ) {
        rescueSound.play();     // Sound effect
        scoreAndName[0] += 200;
        alien2Count +=1;
        alien2Reset = true;
        reset();
    };

    // If player is touching alien3
    if (
      player.x <= (alien3.x + (alien3.w / 2) + 10)
      && alien3.x <= (player.x + (player.w / 2) + 20)
      && player.y <= (alien3.y + (alien3.w / 2) + 5)
      && alien3.y <= (player.y + (player.w / 2) - 5)
      ) {
        rescueSound.play();     // Sound effect
        scoreAndName[0] += 300;
        alien3Count += 1;
        alien3Reset = true;
        reset();
    };

    // If player is touching alien4
    if (
      player.x <= (alien4.x + (alien4.w / 2) + 5)
      && alien4.x <= (player.x + (player.w / 2) + 5)
      && player.y <= (alien4.y + (alien4.w / 2) + 5)
      && alien4.y <= (player.y + (player.w / 2) + 5)
      ) {
        rescueSound.play();     // Sound effect
        scoreAndName[0] += 400;
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
    if (alien2.x >= canvas.width - (alien2Image.width / 3) + 5) {
        alien2.x = canvas.width - (alien2Image.width / 3) + 5;
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
    if (alien3.x >= canvas.width - (alien3Image.width / 5) + 5) {
        alien3.x = canvas.width - (alien3Image.width / 5) + 5;
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
    if (alien4.x >= canvas.width - (alien4Image.width / 4) + 5) {
        alien4.x = canvas.width - (alien4Image.width / 4) + 5;
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
  if (seconds === 0) {
    secondsBool = false;
    clearInterval(interval);
  };
}, 1000);

//===============================================

// Animation timer
var secondsAnim = 0;
var secondsAnimEnd = 60;

var title2Anim1 = true;
var title2Anim2 = false;
var title2Anim3 = false;
var title2Anim4 = false;

var alien1Anim1 = true;
var alien1Anim2 = false;
var alien1Anim3 = false;
var alien1Anim4 = false;

var alien2Anim1 = true;
var alien2Anim2 = false;
var alien2Anim3 = false;

var alien3Anim1 = true;
var alien3Anim2 = false;
var alien3Anim3 = false;
var alien3Anim4 = false;
var alien3Anim5 = false;

var alien4Anim1 = true;
var alien4Anim2 = false;
var alien4Anim3 = false;
var alien4Anim4 = false;

var ufoAnim1 = true;
var ufoAnim2 = false;
var ufoAnim3 = false;
var ufoAnim4 = false;
var ufoAnim5 = false;
var ufoAnim6 = false;

var intervalAnim = setInterval(function() {
  ++secondsAnim;

  if (secondsAnim === 1) {
    title2Anim4 = false;
    title2Anim1 = true;

    alien1Anim4 = false;
    alien1Anim1 = true;

    alien2Anim3 = false;
    alien2Anim1 = true;

    alien3Anim5 = false;
    alien3Anim1 = true;

    alien4Anim4 = false;
    alien4Anim1 = true;

    ufoAnim6 = false;
    ufoAnim1 = true;
  };

  if (secondsAnim === 10) {
    ufoAnim1 = false;
    ufoAnim2 = true;

    alien4Anim1 = false;
    alien4Anim2 = true;

    alien3Anim1 = false;
    alien3Anim2 = true;
  };

  if (secondsAnim === 20) {
    title2Anim1 = false;
    title2Anim2 = true;

    alien1Anim1 = false;
    alien1Anim2 = true;

    alien2Anim1 = false;
    alien2Anim2 = true;

    alien3Anim2 = false;
    alien3Anim3 = true;

    alien4Anim2 = false;
    alien4Anim3 = true;

    ufoAnim2 = false;
    ufoAnim3 = true;
  };

  if (secondsAnim === 30) {
    alien1Anim2 = false;
    alien1Anim3 = true;

    alien3Anim3 = false;
    alien3Anim4 = true;

    alien4Anim3 = false;
    alien4Anim4 = true;

    ufoAnim3 = false;
    ufoAnim4 = true;  
  };

  if (secondsAnim === 40) {
    title2Anim2 = false;
    title2Anim3 = true;

    alien2Anim2 = false;
    alien2Anim3 = true;

    alien3Anim4 = false;
    alien3Anim5 = true;

    ufoAnim4 = false;
    ufoAnim5 = true;
  };

  if (secondsAnim === 50) {
    title2Anim3 = false;
    title2Anim4 = true;

    ufoAnim5 = false;
    ufoAnim6 = true;

    alien1Anim3 = false;
    alien1Anim4 = true;
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

  // title2 animation
  if (title2Anim1 === true) {
      ctx.drawImage(title2Image, 0, 0, 342, 57, 220, 100, 342, 57);
  };

  if (title2Anim2 === true) {
      ctx.drawImage(title2Image, 342, 0, 342, 57, 220, 100, 342, 57);
  };

  if (title2Anim3 === true) {
      ctx.drawImage(title2Image, 684, 0, 342, 57, 220, 100, 342, 57);
  };

  if (title2Anim4 === true) {
      ctx.drawImage(title2Image, 1368, 0, 342, 57, 220, 100, 342, 57);
  };

//=============================================== 

  if (32 in keysDown2) {     // If space is pressed
    ctx.drawImage(bgImage, 0, 0);

    // alien1 animation
    if (alien1Anim1 === true) {
      ctx.drawImage(alien1Image, 0, 0, 70, 49, alien1.x, alien1.y, 70, 49);
    };

    if (alien1Anim2 === true) {
      ctx.drawImage(alien1Image, 70, 0, 70, 49, alien1.x, alien1.y, 70, 49);
    };

    if (alien1Anim3 === true) {
      ctx.drawImage(alien1Image, 140, 0, 70, 49, alien1.x, alien1.y, 70, 49);
    };

    if (alien1Anim4 === true) {
      ctx.drawImage(alien1Image, 210, 0, 70, 49, alien1.x, alien1.y, 70, 49);
    };

    // alien2 animation
    if (alien2Anim1 === true) {
      ctx.drawImage(alien2Image, 0, 0, 70, 49, alien2.x, alien2.y, 70, 49);
    };

    if (alien2Anim2 === true) {
      ctx.drawImage(alien2Image, 70, 0, 70, 49, alien2.x, alien2.y, 70, 49);
    };

    if (alien2Anim3 === true) {
      ctx.drawImage(alien2Image, 140, 0, 70, 49, alien2.x, alien2.y, 70, 49);
    };

    // alien3 animation
    if (alien3Anim1 === true) {
      ctx.drawImage(alien3Image, 0, 0, 70, 49, alien3.x, alien3.y, 70, 49);
    };

    if (alien3Anim2 === true) {
      ctx.drawImage(alien3Image, 70, 0, 70, 49, alien3.x, alien3.y, 70, 49);
    };

    if (alien3Anim3 === true) {
      ctx.drawImage(alien3Image, 140, 0, 70, 49, alien3.x, alien3.y, 70, 49);
    };

    if (alien3Anim4 === true) {
      ctx.drawImage(alien3Image, 210, 0, 70, 49, alien3.x, alien3.y, 70, 49);
    };

    if (alien3Anim5 === true) {
      ctx.drawImage(alien3Image, 280, 0, 70, 49, alien3.x, alien3.y, 70, 49);
    };

    // alien4 animation
    if (alien4Anim1 === true) {
      ctx.drawImage(alien4Image, 0, 0, 70, 49, alien4.x, alien4.y, 70, 49);
    };

    if (alien4Anim2 === true) {
      ctx.drawImage(alien4Image, 70, 0, 70, 49, alien4.x, alien4.y, 70, 49);
    };

    if (alien4Anim3 === true) {
      ctx.drawImage(alien4Image, 140, 0, 70, 49, alien4.x, alien4.y, 70, 49);
    };

    if (alien4Anim4 === true) {
      ctx.drawImage(alien4Image, 210, 0, 70, 49, alien4.x, alien4.y, 70, 49);
    };

    // player animation
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
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillText('SCORE: ' + scoreAndName[0], 480, 555);

    // Start timer
    secondsStart = true;

    // Time
    ctx.fillStyle = 'white';
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillText('TIME: ' +  seconds, 160, 555);
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

    // Font
    ctx.fillStyle = 'white';
    ctx.font = "16px 'Press Start 2P'";

    // Aliens rescued
    ctx.fillText(' = ' + ' ' + alien1Count, 385, 85);
    ctx.fillText(' = ' + ' ' + alien2Count, 385, 165);
    ctx.fillText(' = ' + ' ' + alien3Count, 385, 235);
    ctx.fillText(' = ' + ' ' + alien4Count, 385, 295);
    ctx.fillText('TIME: ' +  seconds, 160, 555);
    ctx.fillText('SCORE: ' + scoreAndName[0], 480, 555);

//===============================================
    
    if (scoreUpdated === false) {
      scoreUpdated = true;
      compareScore();
    };
  };
};

//===============================================

// Compare player score with locally stored high scores
var compareScore = function() {
  for (var i = 0; i < scoreList.length; i += 1) {
    if (scoreAndName[0] > scoreList[i][0]) {

      // var scoreForm = document.createElement('FORM');
      // scoreForm.setAttribute('id', 'playerinput');
      // document.body.appendChild(scoreForm);

      // var scoreInput = document.createElement('INPUT');
      // scoreInput.setAttribute('type', 'text');
      // scoreInput.setAttribute('maxlength', 18);
      // document.getElementById('playerinput').appendChild(scoreInput);

      if (i = scoreList.length) { //     If i = 10 then clear, add, and print new high score to HTML
        document.getElementById('scores').innerHTML = '';
        addScore(scoreAndName);
        printScore();
      };
    };
  };
};

var scoreForm = document.createElement('FORM');
      scoreForm.setAttribute('id', 'playerinput');
      document.body.appendChild(scoreForm);

      var scoreInput = document.createElement('INPUT');
      scoreInput.setAttribute('type', 'text');
      scoreInput.setAttribute('maxlength', 18);
      scoreInput.setAttribute('style', 'text-transform: uppercase');
      document.getElementById('playerinput').appendChild(scoreInput);



// Adds player score to scoreList
var addScore = function(playerData) {
  scoreList.push(playerData);
  saveScoreListToBrowser();
};

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
  scoreList.sort(function(a, b) {return b - a; });

  for (var i = 0; i < 10; i += 1) {     // Appends top 10 high scores
    $('#scores').append('<p>' + (i + 1) + ' | '+ scoreList[i][0] + ' | ' + scoreList[i][1] + '</p>');
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

var w = window;

// Cross browser support (animation or redrawing on canvas)
requestAnimationFrame = w.requestAnimationFrame ||
                  w.webkitRequestAnimationFrame || 
                      w.msRequestAnimationFrame || 
                      w.mozRequestAnimationFrame;

//===============================================

// Run the app
var then = Date.now();
reset();
main();

// Prints top 10 high scores to html on load
ScoreInputFromBrowser();
printScore();

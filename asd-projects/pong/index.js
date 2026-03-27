/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  var started = false;
  var activeKey;
  var aiRightOn = false;
  var aiLeftOn = false;
  var timesEPressed = 1;
  var timesQPressed = 1;
  var paddleHitSound = new sound("pongSound.wav");
  var BackgroundSound = new sound("BackgroundSound.wav");
  // Constant Variabless
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_HEIGHT = $("#board").height();
  const BOARD_WIDTH = $("#board").width();
  const KEY = {
    W: 87,
    UP: 38,
    S: 83,
    DOWN: 40,
    E: 69,
    Q: 81,
  };

  // Game Item Objects
  var paddle1 = {
    X: 0,
    Y: 500,
    speedY: 0,
    id: "#paddle1",
    height: 300,
  };
  var paddle2 = {
    X: 0,
    Y: 500,
    speedY: 0,
    id: "#paddle2",
    height: 300,
  };
  var ball = {
    X: 0,
    Y: 0,
    speedX: 0,
    speedY: 0,
    id: "#ball",
  };
  var score1 = 0;
  var score2 = 0;

  $("#score1").text(score1);
  $("#score2").text(score2);
 

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleEvent); // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

  function newFrame() {
    // Update ball position once per frame
    moveBallIfStarted();

    // Update paddles and draw
    update(paddle1);
    update(paddle2);

    // Apply AI if enabled
    aiActivate();

    // Handle collisions and scoring
    if (ball.Y <= 0 || ball.Y >= BOARD_HEIGHT + 88) {
      ball.speedY *= -1;
    }
    ballPaddleCollision(paddle1);
    ballPaddleCollision(paddle2);
    ballHasHitWall();

    // Draw ball
    $("#ball").css("top", ball.Y + "px");
    $("#ball").css("left", ball.X + "px");

    // Check for end game condition
    if (theEnd()) {
      endGame();
    }
  }

  /* 
  Called in response to events.
  */
  function handleEvent(event) {
    handleKeyDown(event);
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Apply AI if enabled
  function aiActivate() {
    if (aiRightOn) {
      aiRight();
    }
    if (aiLeftOn) {
      aiLeft();
    }
  }

  // Update ball position once per frame if the game has started, if not keep it hidden
  function moveBallIfStarted() {
    if (started) {
      ball.X += ball.speedX;
      ball.Y += ball.speedY;
      $("#ball").show();
    } else {
      $("#ball").hide();
    }
  }
  function aiRight() {
    //AI for paddle2
    if (paddle2.Y + paddle2.height / 2 < ball.Y) {
      paddle2.speedY = 6;
    } else if (paddle2.Y + paddle2.height / 2 > ball.Y) {
      paddle2.speedY = -6;
    } else {
      paddle2.speedY = 0;
    }
  }

  function aiLeft() {
    //AI for paddle1
    if (paddle1.Y + paddle1.height / 2 < ball.Y) {
      paddle1.speedY = 6;
    } else if (paddle1.Y + paddle1.height / 2 > ball.Y) {
      paddle1.speedY = -6;
    } else {
      paddle1.speedY = 0;
    }
  }

  // register which key is pressed and starts the game if a direction key is pressed
  function handleKeyDown(event) {
    // the handleKeyDown function register which key is pressed
    activeKey = event.which;

    // Handle AI toggle key E
    if (event.which === KEY.E) {
      timesEPressed++;
    }
    if (timesEPressed % 2 === 0) {
      aiRightOn = true;
    } else {
      aiRightOn = false;
    }

    // Handle AI toggle key Q
    if (event.which === KEY.Q) {
      timesQPressed++;
    }
    if (timesQPressed % 2 === 0) {
      aiLeftOn = true;
    } else {
      aiLeftOn = false;
    }

    // If a valid direction key is pressed, start the game
    if (
      event.which === KEY.UP ||
      event.which === KEY.DOWN ||
      event.which === KEY.W ||
      event.which === KEY.S
    ) {
      if (!started) {
        started = true; // the game starts when the first key is pressed
        startBall();
         //background music
  BackgroundSound.sound.volume = 0.5;
  BackgroundSound.sound.loop = true;
  BackgroundSound.play();
  paddleHitSound.sound.volume = 0.5;
      }
      if (event.which === KEY.UP) {
        paddle2.speedY = -10;
      } else if (event.which === KEY.DOWN) {
        paddle2.speedY = 10;
      } else if (event.which === KEY.W) {
        paddle1.speedY = -10;
      } else if (event.which === KEY.S) {
        paddle1.speedY = 10;
      }
      // When the key is released, stop the paddle's movement
      $(document).on("keyup", function (event) {
        if (event.which === KEY.W || event.which === KEY.S) {
          paddle1.speedY = 0;
        }
        if (event.which === KEY.UP || event.which === KEY.DOWN) {
          paddle2.speedY = 0;
        }
      });
    }
  }
  // Start the ball moving in a random direction with a random speed
  function startBall() {
    ball.X = BOARD_WIDTH / 2;
    ball.Y = BOARD_HEIGHT / 2;
    ball.speedX = (Math.random() * 3 + 3) * (Math.random() > 0.5 ? -2 : 1);
    ball.speedY = (Math.random() * 3 + 3) * (Math.random() > 0.5 ? -2 : 1);
  }
  // Reset the ball to the center of the board and start it moving in a random direction
  function resetBall() {
    ball.X = BOARD_WIDTH / 2;
    ball.Y = BOARD_HEIGHT / 2;
    startBall();
  }
  // Check if the paddle has collided with the top or bottom wall
  function hasCollidedWithWall(paddle) {
    if (paddle.Y < 0 || paddle.Y > BOARD_HEIGHT - 180) {
      return true;
    }
    return false;
  }
  // If the paddle has collided with the wall, stop its movement and keep it within bounds
  function padWallCollition(paddle) {
    paddle.speedY = 0;
    // Keep paddle within bounds
    if (paddle.Y < 0) {
      paddle.Y = 0;
    }
    if (paddle.Y > BOARD_HEIGHT - 180) {
      paddle.Y = BOARD_HEIGHT - 180;
    }
  }
  // Check if the ball has hit the left or right wall and update scores accordingly
  function ballHasHitWall() {
    if (ball.X < 0) {
      score2++;
      resetBall();

      paddleHitSound.play();
    } else if (ball.X > BOARD_WIDTH) {
      score1++;
      resetBall();
      paddleHitSound.play();
    }
    // Update score display
    $("#score1").text(score1);
    $("#score2").text(score2);
  }
  // Check if the ball has collided with a paddle and reverse its direction if it has and increase its speed
  function ballPaddleCollision(paddle) {
    if (
      paddle === paddle1 &&
      ball.X < 50 &&
      ball.Y > paddle.Y &&
      ball.Y < paddle.Y + 300
    ) {
      ball.speedX *= -1.2;
      paddleHitSound.play();
    }
    if (
      paddle === paddle2 &&
      ball.X > BOARD_WIDTH - 85 &&
      ball.Y > paddle.Y &&
      ball.Y < paddle.Y + 300
    ) {
      ball.speedX *= -1.2;
      paddleHitSound.play();
    }
    if (ball.speedX > 29) {
      ball.speedX = 29;
    }
  }
  // Check if either player has reached a score of 10, which ends the game
  function theEnd() {
    if (score1 === 10 || score2 === 10) {
      return true;
    }
    return false;
  }
  // Update the position of the paddle and check for wall collisions
  function update(paddle) {
    // Move paddle
    paddle.Y += paddle.speedY;

    // Check paddle wall collisions
    if (hasCollidedWithWall(paddle)) {
      padWallCollition(paddle);
    }
    // Draw paddle
    $(paddle.id).css("top", paddle.Y + "px");
  }
  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
      this.sound.play();
    };
    this.stop = function () {
      this.sound.pause();
    };
  }
  // Display end game message and reset the game after a short delay
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();

    // show end game message
    if (score1 === 10) {
      $("#endGameMessage").text("Player 1 wins!");
    } else if (score2 === 10) {
      $("#endGameMessage").text("Player 2 wins!");
    }
    // hide the ball
    $("#ball").hide();
    // reset scores and paddles
    setTimeout(function () {
      runProgram();
      $("#endGameMessage").text("");
    }, 3000);
  }
}

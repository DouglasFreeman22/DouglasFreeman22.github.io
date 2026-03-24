/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  var started = false;
  var activeKey;
  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_HEIGHT = $("#board").height();
  const BOARD_WIDTH = $("#board").width();
  const KEY = {
    W: 87,
    UP: 38,
    S: 83,
    DOWN: 40,
  };

  // Game Item Objects
  var paddle1 = {
    X: 0,
    Y: 500,
    speedY: 0,
    id: "#paddle1",
  };
  var paddle2 = {
    X: 0,
    Y: 500,
    speedY: 0,
    id: "#paddle2",
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
  $("#score1").text("Score " + score1);
  $("#score2").text("Score " + score2);

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
    if (started) {
      ball.X += ball.speedX;
      ball.Y += ball.speedY;
    }

    // Update paddles and draw
    update(paddle1);
    update(paddle2);

    // Handle collisions and scoring
    if (ball.Y <= 0 || ball.Y >= BOARD_HEIGHT - 30) {
      ball.speedY *= -1;
    }
    ballPaddleCollision(paddle1);
    ballPaddleCollision(paddle2);
    ballHasHitWall();

    // Draw ball
    $("#ball").css("top", ball.Y + "px");
    $("#ball").css("left", ball.X + "px");

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

  function handleKeyDown(event) {
    // the handleKeyDown function register which key is pressed
    activeKey = event.which;
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
      }
      if (event.which === KEY.UP) {
        paddle2.speedY = -5;
      } else if (event.which === KEY.DOWN) {
        paddle2.speedY = 5;
      } else if (event.which === KEY.W) {
        paddle1.speedY = -5;
      } else if (event.which === KEY.S) {
        paddle1.speedY = 5;
      }
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

  function startBall() {
    ball.X = BOARD_WIDTH / 2;
    ball.Y = BOARD_HEIGHT / 2;
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }
  function resetBall() {
    ball.X = BOARD_WIDTH / 2;
    ball.Y = BOARD_HEIGHT / 2;
    startBall();
  }

  function hasCollidedWithWall(paddle) {
    if (paddle.Y < 0 || paddle.Y > BOARD_HEIGHT - 300) {
      return true;
    }
    return false;
  }
  function padWallCollition(paddle) {
    paddle.speedY = 0;
    // Keep paddle within bounds
    if (paddle.Y < 0) {
      paddle.Y = 0;
    }
    if (paddle.Y > BOARD_HEIGHT - 300) {
      paddle.Y = BOARD_HEIGHT - 300;
    }
  }

  function ballHasHitWall() {
    if (ball.X < 0) {
      score2++;
      resetBall();
    } else if (ball.X > BOARD_WIDTH) {
      score1++;
      resetBall();
    }
    $("#score1").text("Score " + score1);
    $("#score2").text("Score " + score2);
  }

  function ballPaddleCollision(paddle) {
    if (
      paddle === paddle1 &&
      ball.X < 40 &&
      ball.Y > paddle.Y &&
      ball.Y < paddle.Y + 300
    ) {
      ball.speedX *= -1;
    }
    if (
      paddle === paddle2 &&
      ball.X > BOARD_WIDTH - 65 &&
      ball.Y > paddle.Y &&
      ball.Y < paddle.Y + 300
    ) {
      ball.speedX *= -1;
    }
  }

  function theEnd() {
    if (score1 === 10 || score2 === 10) {
      return true;
    }
    return false;
  }

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

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}

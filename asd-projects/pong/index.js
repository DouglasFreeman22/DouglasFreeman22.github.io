/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  var started = false;
  var activeKey;
  var aiOn = false;
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
    R: 82,
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
    if (started) {
      ball.X += ball.speedX;
      ball.Y += ball.speedY;
      $("#ball").show();
    } else {
      $("#ball").hide();
    }

    // Update paddles and draw
    update(paddle1);
    update(paddle2);

    // Apply AI if enabled
    if (aiOn) {
      ai();
    }

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

  function ai() {
    //AI for paddle2
    if (paddle2.Y + paddle2.height / 2 < ball.Y) {
      paddle2.speedY = 10;
    } else if (paddle2.Y + paddle2.height / 2 > ball.Y) {
      paddle2.speedY = -10;
    } else {
      paddle2.speedY = 0;
    }
  }

  // register which key is pressed and starts the game if a direction key is pressed
  function handleKeyDown(event) {
    // the handleKeyDown function register which key is pressed
    activeKey = event.which;

    // Handle AI toggle key
    if (event.which === KEY.R) {
      aiOn = true;
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
    if (paddle.Y < 0 || paddle.Y > BOARD_HEIGHT - 300) {
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
    if (paddle.Y > BOARD_HEIGHT - 300) {
      paddle.Y = BOARD_HEIGHT - 300;
    }
  }
  // Check if the ball has hit the left or right wall and update scores accordingly
  function ballHasHitWall() {
    if (ball.X < 0) {
      score2++;
      resetBall();
    } else if (ball.X > BOARD_WIDTH) {
      score1++;
      resetBall();
    }
    // Update score display
    $("#score1").text(score1);
    $("#score2").text(score2);
  }
  // Check if the ball has collided with a paddle and reverse its direction if it has
  function ballPaddleCollision(paddle) {
    if (
      paddle === paddle1 &&
      ball.X < 40 &&
      ball.Y > paddle.Y &&
      ball.Y < paddle.Y + 300
    ) {
      ball.speedX *= -1.2;
    }
    if (
      paddle === paddle2 &&
      ball.X > BOARD_WIDTH - 65 &&
      ball.Y > paddle.Y &&
      ball.Y < paddle.Y + 300
    ) {
      ball.speedX *= -1.2;
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

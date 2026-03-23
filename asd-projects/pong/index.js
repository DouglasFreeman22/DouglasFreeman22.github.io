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
  const KEY = {
    W: 87,
    UP: 38,
    S: 83,
    DOWN: 40,
  };

  // Game Item Objects
  var paddle1 = {
    padX: 0,
    padY: 0,
    padSpeedY: 0,
  };
  var paddle2 = {
    padX: 0,
    padY: 0,
    padSpeedY: 0,
  };
  var ball = {
    ballX: 0,
    ballY: 0,
    ballSpeedX: 0,
    ballSpeedY: 0,
  };

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
    update();
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
      started = true; // the game starts when the first key is pressed

      if (event.which === KEY.UP) {
        paddle2.padSpeedY = -5;
      } else if (event.which === KEY.DOWN) {
        paddle2.padSpeedY = 5;
      } else if (event.which === KEY.W) {
        paddle1.padSpeedY = -5;
      } else if (event.which === KEY.S) {
        paddle1.padSpeedY = 5;
      }
    }
  }

  function moveBall() {}

  function hasCollidedWithWall() {
    return false;
  }

  function hasHitWall() {
    return false;
  }

  function wallCollition() {}

  function update(paddle) {
    paddle1.padY += paddle1.padSpeedY;
    $("#paddle1").css("top", paddle1.padY + "px");
    paddle2.padY += paddle2.padSpeedY;
    $("#paddle2").css("top", paddle2.padY + "px");

    if (started) {
      moveBall();
    }

    if (hasCollidedWithWall()) {
      endGame();
    }

    if (hasHitWall()) {
      wallCollition();
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}

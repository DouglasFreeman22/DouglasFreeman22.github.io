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
    id: "#paddle1"
  };
  var paddle2 = {
    X: 0,
    Y: 500,
    speedY: 0,
    id: "#paddle2"
  };
  var ball = {
    X: 0,
    Y: 0,
    speedX: 0,
    speedY: 0,
    id: "#ball"
  };
  var score1 = {
    id: "#score1"
  };
  var score2 = {
    id: "#score2"
  };
  var score1 = 0
 $("#score1").text("Score " + score1);
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
    update(paddle1);
    update(paddle2);
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
        paddle2.speedY = -5;
      } else if (event.which === KEY.DOWN) {
        paddle2.speedY = 5;
      } else if (event.which === KEY.W) {
        paddle1.speedY = -5;
      } else if (event.which === KEY.S) {
        paddle1.speedY = 5;
      }
    }
  }

  function moveBall() {
    if(started){
      ball.speedX = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
      ball.speedY = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    }
  }

  function hasCollidedWithWall(paddle) {
    if(paddle.Y < BOARD_HEIGHT || paddle.Y > BOARD_HEIGHT){
    return true;
  }
  return false;
  }
  function padWallCollition(paddle){
    paddle.speedY = 0;
  }

  function ballHasHitWall() {
   if(ball.X < 5){
    score2 += 1
  } else if(ball.X > 2000){
    score1 += 1
  } else{
    return false
  }

  }

  function ballPaddleCollition(paddle) {
    if(ball.X && ball.Y === paddle){
      ball.speedX 
    }
  }

  function handleBallPaddleCollition(){

  }
  function theEnd(){
    if(score1 === 10 || score2 === 10){
      return true;
    }
    return false;
  }

  function update(paddle) {
    paddle.Y += paddle.speedY;
    ball.Y += ball.speedY;
    $(paddle.id).css("top", paddle.Y + "px");
    $("#ball").css("top", ball.Y + "px");
    moveBall();

    if (started) {
      moveBall();
    }

    if (hasCollidedWithWall(paddle)) {
      padWallCollition(paddle);
    }
    if(ballPaddleCollition){
      handleBallPaddleCollition();
    }
    ballHasHitWall();

    if(theEnd){
      endGame();
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}

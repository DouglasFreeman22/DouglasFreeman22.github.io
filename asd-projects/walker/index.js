/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const KEY = {
  ENTER: 13,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  W: 87,
  A: 65,
  S: 83,
  D: 68
};
var walker = {
  x: 0,
  y: 0,
  speedX: 0,
  speedY: 0,
} 
var walker2 = {
  x: 300,
  y: 300,
  speedX: 0,
  speedY: 0,
}
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

  /* 
  This section is where you set up event listeners for user input.
  For example, if you wanted to handle a click event on the document, you would replace 'eventType' with 'click', and if you wanted to execute a function named 'handleClick', you would replace 'handleEvent' with 'handleClick'.

  Note: You can have multiple event listeners for different types of events.
  */
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                            

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();
  }
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
  function handleKeyDown(event) {
    console.log(event.which);
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
      walker.speedY = 0;
      console.log("left pressed");
  } else if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
      walker.speedY = 0;
      console.log("right pressed");
  } else if (event.which === KEY.UP) {
      walker.speedY = -5;
      walker.speedX = 0;
      console.log("up pressed");
  } else if (event.which === KEY.DOWN) {
      walker.speedY = 5;
      walker.speedX = 0;
      console.log("down pressed");
  } else if (event.which === KEY.A) {
      walker2.speedX = -6;
      walker2.speedY = 0;
      console.log("A pressed");
  } else if (event.which === KEY.D) {
      walker2.speedX = 6;
      walker2.speedY = 0;
      console.log("D pressed");
  } else if (event.which === KEY.W) {
      walker2.speedY = -6;
      walker2.speedX = 0;
      console.log("W pressed");
  } else if (event.which === KEY.S) {
      walker2.speedY = 6;
      walker2.speedX = 0;
      console.log("S pressed");
  }
  function handleKeyUp(event){
   if(event.which === KEY.LEFT || event.which === KEY.RIGHT){
    walker.speedX = 0;
   } else if(event.which === KEY.UP || event.which === KEY.DOWN){
    walker.speedY = 0;
   if(event.which === KEY.A || event.which === KEY.D){
    walker2.speedX = 0;
   } else if(event.which === KEY.W || event.which === KEY.S){
    walker2.speedY = 0;
   }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function wallCollision(){
    if (walker.x <= -1 || walker.x + $("#walker").width() >= $("#board").width()){
      walker.x -= walker.speedX;
    } else if (walker.y <= -1 || walker.y + $("#walker").height() >= $("#board").height()){
      walker.y -= walker.speedY;
    }
    if (walker2.x <= -1 || walker2.x + $("#walker2").width() >= $("#board").width()){
      walker2.x -= walker2.speedX;
    } else if (walker2.y <= -1 || walker2.y + $("#walker2").height() >= $("#board").height()){
      walker2.y -= walker2.speedY;
    }
  }

  function repositionGameItem(){
  walker.x = walker.x + walker.speedX;
  walker.y = walker.y + walker.speedY;
  walker2.x = walker2.x + walker2.speedX;
  walker2.y = walker2.y + walker2.speedY;
  }
  function redrawGameItem(){
    $("#walker").css("left", walker.x + "px");
    $("#walker").css("top", walker.y + "px");
    $("#walker2").css("left", walker2.x + "px");
    $("#walker2").css("top", walker2.y + "px");
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

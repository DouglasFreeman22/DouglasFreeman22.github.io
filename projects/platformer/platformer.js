$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the drawGrid() function call below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can help you determine specific x any y values throughout the game
     * Comment the function call out to remove the grid
     */

    // drawGrid();

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)

    createPlatform(800, 600, 20, 30);
    createPlatform(1000, 400, 20, 30);
    createPlatform(110, 210, 40, 20);
    createPlatform(350, 220, 40, 20);
    createPlatform(750, 240, 40, 20);
    createPlatform(920, 100, 61, 20);
    createPlatform(63, 88, 50, 20);
    createPlatform(110, 89, 3, 130);
    createPlatform(1100,200,50,20);
    createPlatform(1250,400,50,20);
    createPlatform(1200,640,50,20);
    


    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)

    createCollectable("sucker", 700, 400, 10, 0.5);
    createCollectable("cherry", 940, 60, 10, 0.5);
    createCollectable("sandwhich", 115, 80, 10, 0.5);
    createCollectable("burger", 1275, 80, 10, 0.5);
    createCollectable("pancakes", 10, 400, 10, 0.5);
    
    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)

    createCannon("left", 600, 1000);
    createCannon("right", 500, 1000);
    createCannon("top", 600, 1000);
    createCannon("bottom", 600, 1000);
    createCannon("top", 1100, 100);
    createCannon("left", 300, 1100);
    createCannon("top", 300, 1000);
    createCannon("right", 250, 2200);
    createCannon("top", 1000, 3500);

    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});

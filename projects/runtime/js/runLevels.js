var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE

    function createObstacles(x, y, hitSize, damage){
    var hitZoneSize = hitSize; //define the size of the hit zone and assign it to a variable
    var damageFromObstacles = damage; //defines the amount of damage the Obstacles causes and assigns it to a variable
    var ObstaclesHitZone = game.createObstacle(hitZoneSize, damageFromObstacles); //creates the Obstacle hit zone using the size and damage as perameters and assigns it a variable
    ObstaclesHitZone.x = x; //sets the x coordinate of the Obstacles
    ObstaclesHitZone.y = y; //sets the y coordinate of the Obstacles
    game.addGameItem(ObstaclesHitZone); //adds the Obstacles hit zone to the game
    var ObstaclesImage = draw.bitmap("img/sawblade.png"); //draw the image bitmap and store it to a variable
    ObstaclesHitZone.addChild(ObstaclesImage); //attach an image to the Obstacles hitzone
    ObstaclesImage.x = -25; // position the image on the hitzone's x value by moving it left by 25 pixles
    ObstaclesImage.y = -25; // position the image on the hitzone's y value by moving it up by 25 pixles
    ObstaclesHitZone.rotationalVelocity = 10;
    }

    createObstacles(400, groundY - 50, 25, 20);
    createObstacles(800, groundY - 30, 35, 50);
    createObstacles(1000, groundY - 100, 50, 100);

  function createreward (x,y, velocity, health){

    var reward = game.createGameItem("reward", 25); //creates reward and adds it to the game
    var redSquare = draw.rect(50, 50, "red"); //creates a red square and stores it in a variable
    redSquare.x = -25; //offsets the red squares image from the hitzone by -25 pixls
    redSquare.y = -25; //offsets the red squares image from the hitzone by -25 pixls
    reward.addChild(redSquare); //adds the red square as a child to our reward variable
    reward.x = x; //x position of reward
    reward.y = y; //y position of reward
    game.addGameItem(reward); //adds reward to game
    reward.velocityX -= velocity; //controlling how fast the reward moves on the x axis
    reward.rotationalVelocity = 10; //sets the rotational velocity of the reward
    reward.onPlayerCollision = function () {
      game.changeIntegrity(health) //subtracts 10 health from halleBot's HUD
    };
    enemy.onProjectileCollision = function (){
      game.increaseScore(100); //increases your score when halle shoots the enemy
      enemy.fadeOut(); //enemy fades out when halle shoots enemy
      //enemy.shrink()
      //enemy.flyTo(x,y)
    }
  }
  
  createEnemy(400, groundY - 50, 3, -10);
  createEnemy(800, groundY - 50, 2, -30);
  createEnemy(1200, groundY - 50, 7, -50);

  function createReward (x,y, velocity, health){

    var reward = game.createGameItem("reward", 25); //creates reward and adds it to the game
    var redSquare = draw.rect(50, 50, "blue"); //creates a red square and stores it in a variable
    redSquare.x = -25; //offsets the red squares image from the hitzone by -25 pixls
    redSquare.y = -25; //offsets the red squares image from the hitzone by -25 pixls
    reward.addChild(redSquare); //adds the red square as a child to our reward variable
    reward.x = x; //x position of reward
    reward.y = y; //y position of reward
    game.addGameItem(reward); //adds reward to game
    reward.velocityX -= velocity; //controlling how fast the reward moves on the x axis
    reward.rotationalVelocity = 10; //sets the rotational velocity of the reward
    reward.onPlayerCollision = function () {
      game.changeIntegrity(health) //subtracts 10 health from halleBot's HUD
      game.increaseScore(1000);
      reward.shrink();
    };
  }

  createReward (500,groundY - 100, 3, 40)


    function startLevel() {
      // TODO 13 goes below here



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}

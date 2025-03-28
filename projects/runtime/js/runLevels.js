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

    function createObstacles(x, y, hitSize, damage, image, rotation){
    var hitZoneSize = hitSize; //define the size of the hit zone and assign it to a variable
    var damageFromObstacles = damage; //defines the amount of damage the Obstacles causes and assigns it to a variable
    var ObstaclesHitZone = game.createObstacle(hitZoneSize, damageFromObstacles); //creates the Obstacle hit zone using the size and damage as perameters and assigns it a variable
    ObstaclesHitZone.x = x; //sets the x coordinate of the Obstacles
    ObstaclesHitZone.y = y; //sets the y coordinate of the Obstacles
    game.addGameItem(ObstaclesHitZone); //adds the Obstacles hit zone to the game
    var ObstaclesImage = draw.bitmap(image); //draw the image bitmap and store it to a variable
    ObstaclesHitZone.addChild(ObstaclesImage); //attach an image to the Obstacles hitzone
    ObstaclesImage.x = -25; // position the image on the hitzone's x value by moving it left by 25 pixles
    ObstaclesImage.y = -25; // position the image on the hitzone's y value by moving it up by 25 pixles
    ObstaclesHitZone.rotationalVelocity = rotation;
    }

    //createObstacles(400, groundY - 50, 25, 20);
    //createObstacles(800, groundY - 30, 35, 50);
    //createObstacles(1000, groundY - 100, 50, 100);

  function createEnemy (x,y, velocity, health){

    var enemy = game.createGameItem("enemy", 25); //creates enemy and adds it to the game
    var redSquare = draw.rect(50, 50, "red"); //creates a red square and stores it in a variable
    redSquare.x = -25; //offsets the red squares image from the hitzone by -25 pixls
    redSquare.y = -25; //offsets the red squares image from the hitzone by -25 pixls
    enemy.addChild(redSquare); //adds the red square as a child to our enemy variable
    enemy.x = x; //x position of enemy
    enemy.y = y; //y position of enemy
    game.addGameItem(enemy); //adds enemy to game
    enemy.velocityX -= velocity; //controlling how fast the enemy moves on the x axis
    enemy.rotationalVelocity = 10; //sets the rotational velocity of the enemy
    enemy.onPlayerCollision = function () {
      game.changeIntegrity(health) //subtracts 10 health from halleBot's HUD
    };
    enemy.onProjectileCollision = function (){
      game.increaseScore(100); //increases your score when halle shoots the enemy
      enemy.fadeOut(); //enemy fades out when halle shoots enemy
      //enemy.shrink()
      //enemy.flyTo(x,y)
    }
  }
  
  //createEnemy(400, groundY - 50, 3, -10);
  //createEnemy(800, groundY - 50, 2, -30);
  //createEnemy(1200, groundY - 50, 7, -50);

  function createReward (x,y, velocity, health){

    var reward = game.createGameItem("reward", 25); //creates reward and adds it to the game
    var blueSquare = draw.rect(50, 50, "blue"); //creates a blue square and stores it in a variable
    blueSquare.x = -25; //offsets the blue squares image from the hitzone by -25 pixls
    blueSquare.y = -25; //offsets the blue squares image from the hitzone by -25 pixls
    reward.addChild(blueSquare); //adds the blue square as a child to our reward variable
    reward.x = x; //x position of reward
    reward.y = y; //y position of reward
    game.addGameItem(reward); //adds reward to game
    reward.velocityX -= velocity; //controlling how fast the reward moves on the x axis
    reward.rotationalVelocity = 10; //sets the rotational velocity of the reward
    reward.onPlayerCollision = function () {
      game.increaseScore(1000);
      reward.shrink();
    };
  }

  //createReward (500, groundY - 100, 3, 40)

  function createLevel (x, y, velocity){

    var level = game.createGameItem("level", 25); //creates level and adds it to the game
    var yellowSquare = draw.rect(50, 50, "yellow"); //creates a yellow square and stores it in a variable
    yellowSquare.x = -25; //offsets the yellow squares image from the hitzone by -25 pixls
    yellowSquare.y = -25; //offsets the yellow squares image from the hitzone by -25 pixls
    level.addChild(yellowSquare); //adds the yellow square as a child to our level variable
    level.x = x; //x position of level
    level.y = y; //y position of level
    game.addGameItem(level); //adds level to game
    level.velocityX -= velocity; //controlling how fast the reward moves on the x axis
    level.rotationalVelocity = 10; //sets the rotational velocity of the reward
    level.onPlayerCollision = function () {
      game.increaseScore(1000);
      level.shrink();
      startLevel();
    };
  }

  //createLevel (1500, groundY - 100, 3)

    function startLevel() {
      // TODO 13 goes below here

      var level = levelData[currentLevel]; //fetches the currentLevel from the levelData array and stores it in var level
      levelObjects = level.gameItems //retrive the array of gameItems and stores it in levelObjects

      for(var i = 0; i < levelObjects.length; i++){
        var element = levelObjects[i];
        if(element.type === "sawblade"){ //checks the type key: value of the gameItems objects to determine which objects to manifest
          createObstacles(element.x, element.y, element.hitSize, element.damage, element.image, element.rotation); //if the condition is true it will call the relevant function
        }

        if(element.type === "enemy"){ //checks the type key: value of the gameItems objects to determine which objects to manifest
          createEnemy(element.x, element.y, element.velocity, element.health); //if the condition is true it will call the relevant function
        }
        if(element.type === "reward"){ //checks the type key: value of the gameItems objects to determine which objects to manifest
          createReward(element.x, element.y, element.velocity, element.health); //if the condition is true it will call the relevant function
        }
        if(element.type === "level"){ //checks the type key: value of the gameItems objects to determine which objects to manifest
          createLevel(element.x, element.y, element.velocity); //if the condition is true it will call the relevant function
        }
      }



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

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

    function createObstacles(x, y, hitSize, damage, image, rotation, offSetX, offSetY){
    var hitZoneSize = hitSize; //define the size of the hit zone and assign it to a variable
    var damageFromObstacles = damage; //defines the amount of damage the Obstacles causes and assigns it to a variable
    var ObstaclesHitZone = game.createObstacle(hitZoneSize, damageFromObstacles); //creates the Obstacle hit zone using the size and damage as perameters and assigns it a variable
    ObstaclesHitZone.x = x; //sets the x coordinate of the Obstacles
    ObstaclesHitZone.y = y; //sets the y coordinate of the Obstacles
    game.addGameItem(ObstaclesHitZone); //adds the Obstacles hit zone to the game
    var ObstaclesImage = draw.bitmap(image); //draw the image bitmap and store it to a variable
    ObstaclesHitZone.addChild(ObstaclesImage); //attach an image to the Obstacles hitzone
    ObstaclesImage.x = offSetX; // position the image on the hitzone's x value by moving it left by 25 pixles
    ObstaclesImage.y = offSetY; // position the image on the hitzone's y value by moving it up by 25 pixles
    ObstaclesHitZone.rotationalVelocity = rotation;
    }

    //createObstacles(400, groundY - 50, 25, 20);
    //createObstacles(800, groundY - 30, 35, 50);
    //createObstacles(1000, groundY - 100, 50, 100);

  function createEnemy (x,y, hitSize, velocity, health, image, scaleX, scaleY, offSetX, offSetY){
    var enemy = game.createGameItem("enemy", hitSize); //creates enemy and adds it to the game
    var redSquare = draw.bitmap(image); //creates a red square and stores it in a variable
    redSquare.x = offSetX; //offsets the red squares image from the hitzone by -25 pixls
    redSquare.y = offSetY; //offsets the red squares image from the hitzone by -25 pixls
    enemy.addChild(redSquare); //adds the red square as a child to our enemy variable
    enemy.x = x; //x position of enemy
    enemy.y = y; //y position of enemy
    redSquare.scaleX = scaleX;
    redSquare.scaleY = scaleY;
    game.addGameItem(enemy); //adds enemy to game
    enemy.velocityX -= velocity; //controlling how fast the enemy moves on the x axis
    enemy.rotationalVelocity = 0; //sets the rotational velocity of the enemy
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

  function createReward (x,y, hitSize, velocity, health, image, scaleX, scaleY, offSetX, offSetY){

    var reward = game.createGameItem("reward", hitSize); //creates reward and adds it to the game
    var blueSquare = draw.rect(image); //creates a blue square and stores it in a variable
    blueSquare.x = offSetX; //offsets the blue squares image from the hitzone by -25 pixls
    blueSquare.y = offSetY; //offsets the blue squares image from the hitzone by -25 pixls
    reward.addChild(blueSquare); //adds the blue square as a child to our reward variable
    reward.x = x; //x position of reward
    reward.y = y; //y position of reward
    reward.scaleX = scaleX;
    reward.scaleY = scaleY;
    game.addGameItem(reward); //adds reward to game
    reward.velocityX -= velocity; //controlling how fast the reward moves on the x axis
    reward.rotationalVelocity = 1; //sets the rotational velocity of the reward
    game.changeIntegrity(health);
    reward.onPlayerCollision = function () {
      game.increaseScore(1000);
      reward.shrink();
    };
  }
  function createChest (x,y, hitSize, velocity, health, scaleX, scaleY, offSetX, offSetY){
    var reward = game.createGameItem("reward", hitSize); //creates reward and adds it to the game
    var chest = draw.bitmap("img/chest1.png"); //creates a blue square and stores it in a variable
    chest.x = offSetX; //offsets the blue squares image from the hitzone by -25 pixls
    chest.y = offSetY; //offsets the blue squares image from the hitzone by -25 pixls
    reward.addChild(chest); //adds the blue square as a child to our reward variable
    reward.x = x; //x position of reward
    reward.y = y; //y position of reward
    chest.scaleX = scaleX;
    chest.scaleY = scaleY;
    game.addGameItem(reward); //adds reward to game
    reward.velocityX -= velocity; //controlling how fast the reward moves on the x axis
    game.changeIntegrity(health);
    chest.onPlayerCollision = function (){
      game.increaseScore(100);
      chest.shrink(); 
    }
  };

  //createReward (500, groundY - 100, 3, 40)

  function createLevel (x, y, velocity, image, scaleX, scaleY, offSetX, offSetY){

    var level = game.createGameItem("level", 25); //creates level and adds it to the game
    var yellowSquare = draw.rect(image); //creates a yellow square and stores it in a variable
    yellowSquare.x = offSetX; //offsets the yellow squares image from the hitzone by -25 pixls
    yellowSquare.y = offSetY; //offsets the yellow squares image from the hitzone by -25 pixls
    level.addChild(yellowSquare); //adds the yellow square as a child to our level variable
    level.x = x; //x position of level
    level.y = y; //y position of level
    level.scaleX = scaleX;
    level.scaleY = scaleY;
    game.addGameItem(level); //adds level to game
    level.velocityX -= velocity; //controlling how fast the reward moves on the x axis
    level.rotationalVelocity = 5; //sets the rotational velocity of the reward
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
          createObstacles(element.x, element.y, element.hitSize, element.damage, element.image, element.rotation, element.offSetX, element.offSetY); //if the condition is true it will call the relevant function
        }
        if(element.type === "spikes"){ //checks the type key: value of the gameItems objects to determine which objects to manifest
          createObstacles(element.x, element.y, element.hitSize, element.damage, element.image, element.rotation, element.offSetX, element.offSetY); //if the condition is true it will call the relevant function
        }

        if(element.type === "enemy"){ //checks the type key: value of the gameItems objects to determine which objects to manifest
          createEnemy(element.x, element.y, element.hitSize, element.velocity, element.health, element.image, element.scaleX, element.scaleY, element.offSetX, element.offSetY); //if the condition is true it will call the relevant function
        }
        if(element.type === "knight"){ //checks the type key: value of the gameItems objects to determine which objects to manifest
          createEnemy(element.x, element.y, element.hitSize, element.velocity, element.health, element.image, element.scaleX, element.scaleY, element.offSetX, element.offSetY); //if the condition is true it will call the relevant function
        }
        if(element.type === "reward"){ //checks the type key: value of the gameItems objects to determine which objects to manifest
          createReward(element.x, element.y, element.hitSize, element.velocity, element.health, element.image, element.scaleX, element.scaleY, element.offSetX, element.offSetY); //if the condition is true it will call the relevant function
        }
        if(element.type === "chest"){ //checks the type key: value of the gameItems objects to determine which objects to manifest
          createChest(element.x, element.y, element.hitSize, element.velocity, element.health, element.scaleX, element.scaleY, element.offSetX, element.offSetY); //if the condition is true it will call the relevant function
        }
        if(element.type === "level"){ //checks the type key: value of the gameItems objects to determine which objects to manifest
          createLevel(element.x, element.y, element.velocity, element.image, element.scaleX, element.scaleY, element.offSetX, element.offSetY); //if the condition is true it will call the relevant function
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

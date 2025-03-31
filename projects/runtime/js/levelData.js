var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "spikes", x: 400, y: groundY - 150, hitSize: 20, damage: 20, image:"img/spikes.png", rotation: 0, offSetX: 20, offSetY:-100},
          { type: "sawblade", x: 700, y: groundY + 10, hitSize: 35, damage: 50, image: "img/sawblade.png", rotation: 10},
          { type: "sawblade", x: 1000, y: groundY - 110, hitSize: 30, damage: 100, image: "img/sawblade.png", rotation: 10},

          { type: "enemy", x: 400, y: groundY - 50, velocity: 3, health: -10},
          { type: "enemy", x: 800, y: groundY - 50, velocity: 2, health: -30},
          { type: "enemy", x: 1200, y: groundY - 50, velocity: 7, health: -50},

          { type: "reward", x: 500, y: groundY - 100, velocity: 3, health: 40},
          
          { type: "level", x: 2000, y: groundY - 101, velocity: 3},
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY },
          { type: "sawblade", x: 600, y: groundY },
          { type: "sawblade", x: 900, y: groundY },
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}

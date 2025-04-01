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
          { type: "spikes", x: 400, y: groundY - 15, hitSize: 20, damage: 20, image:"img/spikes.png", rotation: 0, offSetX: -105, offSetY: -125},

          { type: "knight", x: 800, y: groundY - 15, velocity: 3, health: -10, image: "img/knight.png", scaleX: 0.201, scaleY: 0.201},

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

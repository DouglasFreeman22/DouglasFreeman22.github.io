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
          { type: "spikes", x: 400, y: groundY - 10, hitSize: 20, damage: 20, image:"img/spikes.png", rotation: 0, offSetX: -105, offSetY: -125},
          { type: "spikes", x: 700, y: groundY - 10, hitSize: 20, damage: 20, image:"img/spikes.png", rotation: 0, offSetX: -105, offSetY: -125},
          { type: "spikes", x: 1000, y: groundY - 10, hitSize: 20, damage: 20, image:"img/spikes.png", rotation: 0, offSetX: -105, offSetY: -125},
          { type: "spikes", x: 1400, y: groundY - 10, hitSize: 20, damage: 20, image:"img/spikes.png", rotation: 0, offSetX: -105, offSetY: -125},
         
         
          { type: "knight", x: 2000, y: groundY - 85, hitSize: 50, velocity: 4, health: -20, image: "img/knight.png", scaleX: 0.2, scaleY: 0.2, offSetX: -105, offSetY: -90},
          { type: "knight", x: 2400, y: groundY - 85, hitSize: 50, velocity: 4, health: -20, image: "img/knight.png", scaleX: 0.2, scaleY: 0.2, offSetX: -105, offSetY: -90},
          { type: "knight", x: 3000, y: groundY - 85, hitSize: 50, velocity: 4, health: -20, image: "img/knight.png", scaleX: 0.2, scaleY: 0.2, offSetX: -105, offSetY: -90},

          { type: "mage", x: 1100, y: groundY - 65, hitSize: 30, velocity: 2, health: -30, image: "img/mage.png", scaleX: 1.2, scaleY: 1.2, offSetX: -70, offSetY: -75},
          { type: "mage", x: 2100, y: groundY - 65, hitSize: 30, velocity: 2, health: -30, image: "img/mage.png", scaleX: 1.2, scaleY: 1.2, offSetX: -70, offSetY: -75},

          { type: "mageShot", x: 1100, y: groundY - 125, hitSize: 30, velocity: 5.5, health: -30, image: "img/mageShot.png", scaleX: 0.1, scaleY: 0.1, offSetX: -50, offSetY: -45, rotation: -7},
          { type: "mageShot", x: 2100, y: groundY - 125, hitSize: 30, velocity: 5.5, health: -30, image: "img/mageShot.png", scaleX: 0.1, scaleY: 0.1, offSetX: -50, offSetY: -45, rotation: -7},
         
          //{ type: "reward", x: 500, y: groundY - 100, hitSize: 50, velocity: 3, health: 40, image: "img/spikes.png", scaleX: 1, scaleY: 1, offSetX: -10, offSetY: -10},

          { type: "chest", x: 2000, y: groundY - 15, hitSize: 50, velocity: 3, health: 40, scaleX: 0.3, scaleY: 0.3, offSetX: -53, offSetY: -90},
      
          { type: "level", x: 3620, y: groundY - 60, hitSize: 50, velocity: -4, scaleX: 1, scaleY: 1, offSetX: -68, offSetY: -90},
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "spikes", x: 350, y: groundY - 10, hitSize: 20, damage: 20, image:"img/spikes.png", rotation: 0, offSetX: -105, offSetY: -125},
          { type: "spikes", x: 560, y: groundY - 10, hitSize: 20, damage: 20, image:"img/spikes.png", rotation: 0, offSetX: -105, offSetY: -125},
          { type: "spikes", x: 780, y: groundY - 10, hitSize: 20, damage: 20, image:"img/spikes.png", rotation: 0, offSetX: -105, offSetY: -125},
          { type: "spikes", x: 1770, y: groundY - 10, hitSize: 20, damage: 20, image:"img/spikes.png", rotation: 0, offSetX: -105, offSetY: -125},
          { type: "spikes", x: 1810, y: groundY - 10, hitSize: 20, damage: 20, image:"img/spikes.png", rotation: 0, offSetX: -105, offSetY: -125},

          { type: "knight", x: 2000, y: groundY - 85, hitSize: 50, velocity: 5, health: -20, image: "img/knight.png", scaleX: 0.2, scaleY: 0.2, offSetX: -105, offSetY: -90},
          { type: "knight", x: 500, y: groundY - 85, hitSize: 50, velocity: 5, health: -20, image: "img/knight.png", scaleX: 0.2, scaleY: 0.2, offSetX: -105, offSetY: -90},
          { type: "knight", x: 2500, y: groundY - 85, hitSize: 50, velocity: 5, health: -20, image: "img/knight.png", scaleX: 0.2, scaleY: 0.2, offSetX: -105, offSetY: -90},

          { type: "mage", x: 2150, y: groundY - 65, hitSize: 30, velocity: 3, health: -30, image: "img/mage.png", scaleX: 1.2, scaleY: 1.2, offSetX: -70, offSetY: -75},
          { type: "mage", x: 2350, y: groundY - 65, hitSize: 30, velocity: 3, health: -30, image: "img/mage.png", scaleX: 1.2, scaleY: 1.2, offSetX: -70, offSetY: -75},
          { type: "mage", x: 2400, y: groundY - 65, hitSize: 30, velocity: 3, health: -30, image: "img/mage.png", scaleX: 1.2, scaleY: 1.2, offSetX: -70, offSetY: -75},
          { type: "mage", x: 2450, y: groundY - 65, hitSize: 30, velocity: 3, health: -30, image: "img/mage.png", scaleX: 1.2, scaleY: 1.2, offSetX: -70, offSetY: -75},
        
          { type: "mageShot", x: 2150, y: groundY - 125, hitSize: 30, velocity: 5.5, health: -30, image: "img/mageShot.png", scaleX: 0.1, scaleY: 0.1, offSetX: -50, offSetY: -45, rotation: -7},
          { type: "mageShot", x: 2350, y: groundY - 125, hitSize: 30, velocity: 5.5, health: -30, image: "img/mageShot.png", scaleX: 0.1, scaleY: 0.1, offSetX: -50, offSetY: -45, rotation: -7},
          { type: "mageShot", x: 2400, y: groundY - 125, hitSize: 30, velocity: 5.5, health: -30, image: "img/mageShot.png", scaleX: 0.1, scaleY: 0.1, offSetX: -50, offSetY: -45, rotation: -7},
          { type: "mageShot", x: 2450, y: groundY - 125, hitSize: 30, velocity: 5.5, health: -30, image: "img/mageShot.png", scaleX: 0.1, scaleY: 0.1, offSetX: -50, offSetY: -45, rotation: -7},
          { type: "mageShot", x: 2950, y: groundY - 125, hitSize: 30, velocity: 5.5, health: -30, image: "img/mageShot.png", scaleX: 0.1, scaleY: 0.1, offSetX: -50, offSetY: -45, rotation: -7},
          { type: "mageShot", x: 3000, y: groundY - 125, hitSize: 30, velocity: 5.5, health: -30, image: "img/mageShot.png", scaleX: 0.1, scaleY: 0.1, offSetX: -50, offSetY: -45, rotation: -7},
          { type: "mageShot", x: 3050, y: groundY - 125, hitSize: 30, velocity: 5.5, health: -30, image: "img/mageShot.png", scaleX: 0.1, scaleY: 0.1, offSetX: -50, offSetY: -45, rotation: -7},

          { type: "dragon", x: 2350, y: groundY - 145, hitSize: 60, velocity: 5, health: -30, image: "img/dragon.png", scaleX: 0.2, scaleY: 0.2, offSetX: -85, offSetY: -90},
          { type: "dragon", x: 3350, y: groundY - 145, hitSize: 60, velocity: 5, health: -30, image: "img/dragon.png", scaleX: 0.2, scaleY: 0.2, offSetX: -85, offSetY: -90},
          { type: "dragon", x: 3550, y: groundY - 145, hitSize: 60, velocity: 5, health: -30, image: "img/dragon.png", scaleX: 0.2, scaleY: 0.2, offSetX: -85, offSetY: -90},
       
          { type: "chest", x: 2000, y: groundY - 15, hitSize: 50, velocity: 3, health: 40, scaleX: 0.3, scaleY: 0.3, offSetX: -53, offSetY: -90},
       
          { type: "level", x: 3500, y: groundY - 60, hitSize: 50, velocity: -4, scaleX: 1, scaleY: 1, offSetX: -68, offSetY: -90},
        ],
      },
      {
        name: "Robot Rob",
        number: 3,
        speed: -3,
        gameItems: [
          { type: "boss", x: 1950, y: groundY - 45, hitSize: 25, velocity: 4, damage: -30, image: "img/kingMaskOn.png", scaleX: 4, scaleY: 4, offSetX: -140, offSetY: -280, hp: 80},
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

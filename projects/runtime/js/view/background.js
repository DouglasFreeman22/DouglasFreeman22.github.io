var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree;
        var buildings = [];

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth, groundY,'black'); // draws a rectangle and stores it in the background fill
            background.addChild(backgroundFill); 
            
            // TODO 2: - Add a moon and starfield
            for (var i = 0; i < 100; i++){
                var circle = draw.circle(10, "white", "LightGray", 2); //creates a cirle with a specified radius, border color, fill color
                circle.x = canvasWidth * Math.random(); //gives it a random x position within canvas width
                circle.y = groundY * Math.random(); //gives it a random y position within groundY range
                background.addChild(circle); //adds t5he star to the background container
            }
            
            var moon = draw.bitmap("img/moon.png"); // creates a bitmap object using the moon image
            moon.x = canvas.width - 1300; // sets the moon's x position
            moon.y = groundY - 500; //sets the moon's y poistion
            moon.scaleX = 1.0; // scales the moon's width
            moon.scaleY = 1.0; //scales the moon's height
            background.addChild(moon); // add the moon to the background
            
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            for (var i = 0; i < 5; i++) {
                var buildingColors = ["pink", "blue", "yellow", "orange", "purple"]
                var buildingHeight = 300 * Math.random(); // assign 300 to the buildingHeight variable
                var building = draw.rect(75, buildingHeight, buildingColors[i], "black", 1); // draw rect with 75 width, buildingHeight is the height, light gray as the fill color, black as the outline, 1 as the outline width
                building.x = 200 * i; // multiply 200 by currant i value and store it as the x pos for the building
                building.y = groundY - buildingHeight; // takes the groundY, subtracts the building
                background.addChild(building); // add our building to the background container
                buildings.push(building); // add the building to the buildings array for futher manipulation
              }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png"); // creates a bitmap for a tree image and stores it in the variable tree
            tree.x = canvasWidth; // places the tree off screen to the right
            tree.y = groundY - 207; // places the tree on the ground, adjusted for tree height
            background.addChild(tree); // add the tree to the background container
            
        } // end of render function - DO NOT DELETE
        
        // Perform background animation

        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x -= 3; //moves the tree to the left by subtracting 3 from its current x poistion

            if (tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            // TODO 4: Part 2 - Parallax

            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i];
                building.x -= 2
                if (building.x < -100){
                    building.x = canvasWidth
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}

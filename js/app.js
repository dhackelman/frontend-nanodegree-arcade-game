// Enemies our player must avoid
var Enemy = function(initialX, initialY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = initialX;
    this.y = initialY;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Add Collision Detection
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        // Initial enemy x-axis position
        this.x = -60;
        }
    var bugXLeftRange = this.x - 50;
    var bugXRightRange = this.x + 50;
    var bugYTopRange = this.y - 50;
    var bugYBottomRange = this.y + 50;

    if (player.x > bugXLeftRange && player.x < bugXRightRange && player.y > bugYTopRange && player.y < bugYBottomRange) {
        player.playerLoseReset();
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Give Player a starting location.
var playerInitialX = 200;
var playerInitialY = 440;


var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = playerInitialX;
    this.y = playerInitialY;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Update now includes walls/limits
    if (this.x<30) {
        this.x =30;
    }
    else if (this.x>400){
        this.x =400;
    }
    else if (this.y < 20 ){
        this.y =20;
    }
    else if (this.y >410){
        this.y =410;
    }
    // Player reset to starting position
    else if( this.y < 30 && this.x <= 505){
        this.playerWinReset();
    }
};

Player.prototype.playerWinReset = function() {
    this.x = playerInitialX;
    this.y = playerInitialY;
    console.log("You Win!");
};

Player.prototype.playerLoseReset = function() {
    this.x = playerInitialX;
    this.y = playerInitialY;
    console.log("bug collision");
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Create handleInput() method.

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
        this.x = this.x-100;
        console.log("L");
        break;
        case 'right':
        this.x = this.x+100;
        console.log("R");
        break;
        case 'up':
        this.y = this.y-90;
        console.log("U");
        break;
        case 'down':
        this.y =this.y+90;
        console.log("D");
        break;
    }
  
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [];
for (var i = 0; i < 3; i++) {
    var tempSpeed = Math.floor(Math.random() * 5 + 1) * 55;
    allEnemies.push(new Enemy(-60, 60 + 85 * i, tempSpeed));
}

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

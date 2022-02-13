const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const numOfSq = 10;
const size = 500 / numOfSq;

const playerAvatar = new Image();
playerAvatar.src = '/images/character-down.png';
const treasureIcon = new Image();
treasureIcon.src = '/images/treasure.png';

const randomBetweenIntegers = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

class Character {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
  moveUp() {
    return (this.row = this.row - 1); // apperantly return is not necessary
  }
  moveRight() {
    return (this.col = this.col + 1);
  }
  moveDown() {
    return (this.row = this.row + 1);
  }
  moveLeft() {
    return (this.col = this.col - 1);
  }
}

class Treasure {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
  setRandomPosition() {
    let row = randomBetweenIntegers(0, 10) * size;
    let col = randomBetweenIntegers(0, 10) * size;
  }
}

const player = new Character(0, 0);
const treasure = new Treasure(50, 50);

// Iteration 1
function drawGrid() {
  for (let i = 0; i < numOfSq; i++) {
    for (let j = 0; j < numOfSq; j++) {
      context.rect(j * size, i * size, size, size);
    }
  }
  context.strokeStyle = 'black';
  context.lineWidth = 3;
  context.stroke();
}
/*
const move = () => {
  context.fillRect(xChar, yChar, size, size);
  context.fillStyle = 'blue';
  context.fillRect(xTarget, yTarget, size, size);
  context.fillStyle = 'purple';
};
*/

const clean = () => {
  context.clearRect(0, 0, 500, 500);
};

/*
TEST 
const player = new Character(0, 0); // (0,0) = Initial position

player.moveDown(); // Increase by 1 the value of player.row
player.moveDown(); // Increase by 1 the value of player.row
player.moveRight(); // Increase by 1 the value of player.col

console.log(player.col, player.row); // => 1,2
*/

const drawPlayer = () => {
  playerAvatar.onload = () => {
    context.drawImage(
      playerAvatar,
      player.row * size,
      player.col * size,
      size,
      size
    );
  };
  // if you use the last line setTimeOut then delete the above and leave just below. onLoad does the same thing
  //context.drawImage(playerAvatar, row, col, size, size);
};

const drawTreasure = () => {
  treasureIcon.onload = () => {
    context.drawImage(treasureIcon, treasure.row, treasure.col, size, size);
  };
};

document.addEventListener('keydown', (event) => {
  // Stop the default behavior (moving the screen to the left/up/right/down)

  // React based on the key pressed
  switch (event.code) {
    case 'ArrowLeft':
      console.log('left');
      player.moveLeft();
      break;
    case 'ArrowUp':
      console.log('up');
      player.moveUp();
      break;
    case 'ArrowRight':
      console.log('right');
      player.moveRight();
      break;
    case 'ArrowDown':
      console.log('down');
      player.moveDown();
      break;
  }
  drawEverything();
});

function drawEverything() {
  drawGrid(); // can't take arguments
  drawPlayer(50, 200);
  drawTreasure(0, 0);
}

drawEverything();

//You can paste this at the end of your js file to get all images loaded without calling the event for each image:
// When the page load, the first drawEveryThing will be executed after 1000ms to ensure images get loaded.
// setTimeout(() => drawEverything(), 1000);

/*

// Check for keys
document.onkeydown = (e) => {
  playerMovement(e.key);
  drawEverything();
};
Alberto Cárdenas to Everyone (19:25)
function playerMovement(key) {
  switch (key) {
    case 'a':
      player2.moveLeft();
      break;
    case 'ArrowLeft':
      player.moveLeft();
      break;
    case 'd':
      player2.moveRight();
      break;
    case 'ArrowRight':
      player.moveRight();
      break;
    case 's':
      player2.moveDown();
      break;
    case 'ArrowDown':
      player.moveDown();
      break;
    case 'w':
      player2.moveUp();
      break;
    case 'ArrowUp':
      player.moveUp();
      break;
  }

  */

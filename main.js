const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const numOfSq = 10;
const size = 500 / numOfSq;

const randomBetweenIntegers = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

class Character {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
  moveUp() {
    this.col--; // apperantly return is not necessary
  }
  moveRight() {
    this.row++;
  }
  moveDown() {
    this.col++;
  }
  moveLeft() {
    this.row--;
  }
}

class Treasure {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
  setRandomPosition() {
    this.row = randomBetweenIntegers(0, 9);
    this.col = randomBetweenIntegers(0, 9);

    console.log(this.row, this.col);
  }
}

const player = new Character(0, 0);
const treasure = new Treasure(0, 0);

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

const drawPlayer = () => {
  const playerAvatar = new Image();
  playerAvatar.src = '/images/character-down.png';
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
  const treasureIcon = new Image();
  treasureIcon.src = '/images/treasure.png';
  treasureIcon.onload = () => {
    context.drawImage(
      treasureIcon,
      treasure.row * size,
      treasure.col * size,
      size,
      size
    );
  };
};

window.addEventListener('keydown', (event) => {
  event.preventDefault();
  // Stop the default behavior (moving the screen to the left/up/right/down)

  // React based on the key pressed
  switch (event.key) {
    case 'ArrowLeft':
      console.log('left');
      player.moveLeft();
      drawEverything();
      console.log(player.col, player.row);
      break;
    case 'ArrowUp':
      console.log('up');
      player.moveUp();
      drawEverything();
      break;
    case 'ArrowRight':
      console.log('right');
      player.moveRight();
      drawEverything();
      break;
    case 'ArrowDown':
      console.log('down');
      player.moveDown();
      drawEverything();
      break;
  }
});

function drawEverything() {
  context.clearRect(0, 0, 500, 500);
  drawGrid(); // can't take arguments
  drawPlayer();
  drawTreasure();
}

treasure.setRandomPosition();
drawEverything();

//You can paste this at the end of your js file to get all images loaded without calling the event for each image:
// When the page load, the first drawEveryThing will be executed after 1000ms to ensure images get loaded.
// setTimeout(() => drawEverything(), 1000);

//Check for keys
//document.onkeydown = (e) => {
//   playerMovement(e.key);
//   drawEverything();
// };

/*
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

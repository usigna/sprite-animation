let playerState = 'run';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
  playerState = e.target.value;
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// ustawienie szerokości i wysokosci dla płótna - ważne z powodu prawidłowego skalowania
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
// wgranie obrazu
const playerImage = new Image();
playerImage.src = 'img/shadow_dog.png';
// ustawienie szerokości dla sprite (szerokość pliku dzielona przez liczbę kolumn)
const spriteWidth = 575;
// ustawienie wysokości dla sprite (wysokość pliku dzielona przez liczbę rzędów)
const spriteHeight = 523;
let gameFrame = 0;
const staggerFrames = 5; // im wyższa liczba, tym animacja będzie wolniejsza (5 wygląda dobrze dla większości animacji)
const spriteAnimations = [];
const animationStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 4,
  }
];

animationStates.forEach((state, index) => {
  let frames = {
   loc: [], 
  }
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({x: positionX, y: positionY});
  }
  spriteAnimations[state.name] = frames;
});

function animate() {
  // wyczyszczenie całego płótna
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  // wycięcie fragmentu obrazu (jaki fragment wyciąć: image, x, y, width, height, gdzie zamieścić wycięty fragment: x, y, width, height)
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

  gameFrame++;
  // requestAnimationFrame służy do przekazania funkcji - tutaj sprawi, że animacja będzie ciągła
  requestAnimationFrame(animate);
}

animate();
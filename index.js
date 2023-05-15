
//states
const unitLength = 20;
let boxColor = [214,132,233];
const strokeColor = (0);
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;
let fr;
let LoneValue=2;
let OverValue=3;
let ReproValue=3;
let isRainbow = false;
let isGrad = false;



//framerate slider
const value = document.querySelector("#value")
const input = document.querySelector("#pi_input")
value.textContent = input.value
input.addEventListener("input", (event) => {
  value.textContent = event.target.value;
  fr = Math.floor(event.target.value);
    frameRate(fr);
})




function setup() {
  //  frameRate(fr);
  /* Set the canvas to be under the element #canvas*/
  const canvas = createCanvas(windowWidth, windowHeight - 100);
  canvas.parent(document.querySelector("#canvas"));

  /*Calculate the number of columns and rows */
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  // Now both currentBoard and nextBoard are array of array of undefined values.
  init(); // Set the initial values of the currentBoard and nextBoard
}

/**
 * Initialize/reset the board state
 */
function init() {
  isRainbow=false;
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = 0;
      nextBoard[i][j] = 0;
      // let someVariables = <condictions> : <when_true> : <when_false>;
      currentBoard[i][j] = random() > 0.8 ? 1 : 0; // one line if
      nextBoard[i][j] = 0;
    } 
  }

}


//rainbow color

 document.querySelector("#rainbow").addEventListener("click", () => {
  isRainbow=!isRainbow;
 })

  document.querySelector("#grad").addEventListener("click", () => {
    isGrad = !isGrad;
  });

function draw() {
      generate();

     if (isGrad) {

        let rfrom = Math.random() * 270;
        let rto = Math.random() * 70;

        let gfrom = Math.random() * 169;
        let gto = Math.random() * 236;

colors = [
  [rfrom,gfrom,254],
  [rto,gto,90]
]
    
       let count = 0;
       for (let i = 0; i < columns; i++) {
         for (let j = 0; j < rows; j++) {
           if (currentBoard[i][j] == 1) {
            fill(colors[count % 2]);
           }else{
            fill(25);
           }
           rect(i * unitLength, j * unitLength, unitLength, unitLength);
           count++;
         }
       }
     }
     //rainbow
     else if  (isRainbow) {
      isGrad=false;
       const colors = [
         "red",
         "orange",
         "yellow",
         "green",
         "blue",
         "indigo",
         "violet",
       ];
       let count = 0;
       for (let i = 0; i < columns; i++) {
         for (let j = 0; j < rows; j++) {
           if (currentBoard[i][j] == 1) {
            fill(colors[count % 7]);
           }else{
            fill(25);
           }
           rect(i * unitLength, j * unitLength, unitLength, unitLength);
           count++;
         }
       }
     } else {
       for (let i = 0; i < columns; i++) {
         for (let j = 0; j < rows; j++) {
           if (currentBoard[i][j] == 1) {
             fill(boxColor);
           } else {
             fill(25);
           }
           stroke(strokeColor);
           rect(i * unitLength, j * unitLength, unitLength, unitLength);
         }
       }
     }
}




function generate() {
  //Loop over every single box on the board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Count all living members in the Moore neighborhood(8 boxes surrounding)
      let neighbors = 0;
      for (let i of [-1, 0, 1]) {
        for (let j of [-1, 0, 1]) {
          if (i == 0 && j == 0) {
            // the cell itself is not its own neighbor
            continue;
          }
          // The modulo operator is crucial for wrapping on the edge
          neighbors +=
            currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
        }
      }

  
      // Rules of Life
      if (currentBoard[x][y] == 1 && neighbors < LoneValue) {
        // Die of Loneliness
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 1 && neighbors > OverValue) {
        // Die of Loneliness) {
        // Die of Overpopulation
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 0 && neighbors == ReproValue) {
        // Die of Loneliness) {
        // New life due to Reproduction
        nextBoard[x][y] = 1;
      } else {
        // Stasis
        nextBoard[x][y] = currentBoard[x][y];
      }
    }
  }

  // Swap the nextBoard to be the current Board
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

/**
 * When mouse is dragged
 */
function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  currentBoard[x][y] = 1;
  fill(boxColor[0], boxColor[1], boxColor[2]);
  stroke(strokeColor);
  rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
 * When mouse is pressed
 */
function mousePressed() {
 if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }

  noLoop();
  mouseDragged();
}


/**
 * When mouse is released
 */
function mouseReleased() {
//  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
//     return;
//   }
//   const x = Math.floor(mouseX / unitLength);
//   const y = Math.floor(mouseY / unitLength);
//   currentBoard[x][y] = 1;
//   fill(boxColor);
//   stroke(strokeColor);
//   rect(x * unitLength, y * unitLength, unitLength, unitLength);
loop();
}


document.querySelector("#reset-game").addEventListener("click", (e) => {
  boxColor = [214, 132, 233];
    init();
    isRainbow = false;
    isGrad = false;
    LoneValue = 2;
});

document.querySelector("#stop").addEventListener("click", (e) => {
  noLoop();
});


document.querySelector("#colormode").addEventListener("click", (e) => {
  boxColor = [random(255), random(50), random(200)]
  console.log(boxColor);
});

//LoneValue
  let valueN = document.querySelector("#valueNeighbour");
  let inputN = document.querySelector("#neighbour-input");
   inputN.addEventListener("input", (event) => {
     valueN.textContent = event.target.value;
     let n = parseInt(valueN.textContent);
     LoneValue = n;
      init();
   });

//Overpopulation

  let valueO = document.querySelector("#valueOverpopulate");
  let inputO = document.querySelector("#overpopulate-input");
  inputO.addEventListener("input", (event) => {
    valueO.textContent = event.target.value;
    let o = parseInt(valueO.textContent);
    OverValue = o;
    init()
  });

  //Reproduce

  let valueR = document.querySelector("#valueReproduce");
  let inputR = document.querySelector("#reproduce-input");
  inputR.addEventListener("input", (event) => {
    valueR.textContent = event.target.value;
    let r = parseInt(valuer.textContent);
    OverValue = r;
     init();
  });


//window resize 
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

windowResized();

//space key
document.body.onkeyup = function (e) {
  if (e.code == "Space" || e.keyCode == 32) {
console.log("spacebar")
  }
};


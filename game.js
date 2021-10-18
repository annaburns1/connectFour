//adapted from https://jayhawk-nation.web.app/examples/TicTacToe


canvas = document.querySelector("#myCanvas");
context = canvas.getContext("2d");

let model = {
    board: "......./......./......./......./......./......./",
    next: "B",
  }


document.addEventListener("DOMContentLoaded", () => {
    //console.log("got here");
    console.log(context);
    build();
})


//blue circles
function blueCircle(x, y) {
    context.beginPath();
    context.arc(x, y, 17, 0, 2*Math.PI);
    context.strokeStyle = "#000080";
    context.lineWidth = 35;
    context.stroke();
}


//yellow circles
function yellowCircle(x, y) {
    context.beginPath();
    context.arc(x, y, 17, 0, 2*Math.PI);
    context.strokeStyle = "#FDA50F";
    context.lineWidth = 35;
    context.stroke();
}


//set it up
function build() {
  context.clearRect(0,0,canvas.width,canvas.height)
    //the background
    //divisible by 120
    context.fillStyle = "#B22222";
    context.fillRect(0,0,840,720);

    //context.rect(950,950, 50,50)
   // context.fillStyle("yellow");
    //context.fill();

    //the lines
    //adapted from https://www.html5canvastutorials.com/tutorials/html5-canvas-lines/
    for(let i = 0;i < 5;i++) {
        context.beginPath();
        context.moveTo(0, 120 + i * 120);
        context.lineTo(840, 120 + i * 120);
        context.strokeStyle = '#FFFFFF';
        context.lineWidth = 6;
        context.stroke();
    }
    for(let i = 0; i<6; i++) {
        context.beginPath();
        context.moveTo(120 + i * 120, 0);
        context.lineTo(120 + i * 120, 720);
        context.strokeStyle = '#FFFFFF';
        context.lineWidth = 7;
        context.stroke();
    }

    //the words
    context.font = "40pt Georgia"
    context.fillStyle = "#000080"
    context.fillText("Let's play", 1040, 300)
    context.font = "40pt Georgia"
    context.fillStyle = "#000080"
    context.fillText("Connect Four!", 975, 350)
    context.font = "26pt Georgia"
    context.fillStyle = "#000080"
    context.fillText("by Anna Burns", 1037, 400)

    context.font = "26pt Georgia"
    context.fillStyle = "#FDA50F"
    context.fillText("Start Over", 1070, 500)

    context.beginPath();
    context.moveTo(1050,460);
    context.lineTo(1050,520);
    context.strokeStyle = '#FDA50F';
    context.lineWidth = 7;
    context.stroke();

    context.beginPath();
    context.moveTo(1240,460);
    context.lineTo(1240,520);
    context.strokeStyle = '#FDA50F';
    context.lineWidth = 7;
    context.stroke();

    context.beginPath();
    context.moveTo(1047,460);
    context.lineTo(1243,460);
    context.strokeStyle = '#FDA50F';
    context.lineWidth = 7;
    context.stroke();

    context.beginPath();
    context.moveTo(1047,520);
    context.lineTo(1243,520);
    context.strokeStyle = '#FDA50F';
    context.lineWidth = 7;
    context.stroke();

    context.font = "26pt Georgia"
    context.fillStyle = "#000080"
    context.fillText("Next Turn: ", 200, 760)

    //context.fillText(JSON.stringify(model), 100, 760)

    for(let i=0; i<=6; i++) {
        for(let j=0; j<=5; j++){
            let me = model.board.charAt(i+j*8);
            if(me == "B") {
                blueCircle(57+i*120,57.5+j*120)
                //context.fillText(me, 57+i*120, 57.5+j*120);
                context.fillText(JSON.stringify(model.next), 380, 760)
            }
            else if(me == "Y") {
                yellowCircle(57+i*120,57.5+j*120)
                context.fillText(JSON.stringify(model.next), 380, 760)
            }
            else {
              //nothing?
              //return
            }
        }
    }

    //buildRect();
    
  
    tick();
}


//makes it clean 
function tick() {
  window.requestAnimationFrame(build);
}


//rounding function!
function roundMe(x) {return Math.ceil(x/120)-1}



//what happens when you click?
document.addEventListener("click", e => {
  const [i,j] = [e.x,e.y].map(roundMe);
  if (i==9 || i==10) {
    window.location.reload();
    return
  }
  else if (i < 0 || i > 6) return;
  else if (j < 0 || j > 5) return;
  const ix = i + j * 8;
  console.log(i,j,ix)

for (let q=6; q>=0; q--) {
  if(model.board.charAt(ix+(8*q))== ".") {
    model.board =
    model.board.slice(0,ix+(8*q)) +
    model.next +
    model.board.slice(ix+(8*q)+1,48)

    if (model.next == 'B') {
      model.next = 'Y'
    } else if (model.next == 'Y') {
      model.next = 'B'
    }

    //ix = ix+(8*q);

    for(let r=0; r<47; r++) {
      checkWin(r);
    }

    return;
  }
  else {
    //window.alert("Cat's Game!");
  }
}



})

function checkWin(n){
  //check vertical B

  if(model.board.charAt(n) == "B" && model.board.charAt(n+8) == "B" && model.board.charAt(n+16) == "B" && model.board.charAt(n+24) == "B") {
    window.alert("Blue wins! Press Start Over button to start a new game.");
    //window.location.reload();
    return
  }
  else if(model.board.charAt(n) == "Y" && model.board.charAt(n+8) == "Y" && model.board.charAt(n+16) == "Y" && model.board.charAt(n+24) == "Y") {
    window.alert("Yellow wins! Press Start Over button to start a new game.");
    //window.location.reload();
    return
  }
  else if(model.board.charAt(n) == "B" && model.board.charAt(n+1) == "B" && model.board.charAt(n+2) == "B" && model.board.charAt(n+3) == "B") {
    window.alert("Blue wins! Press Start Over button to start a new game.");
    //window.location.reload();
    return
  }
  else if(model.board.charAt(n) == "Y" && model.board.charAt(n+1) == "Y" && model.board.charAt(n+2) == "Y" && model.board.charAt(n+3) == "Y") {
    window.alert("Yellow wins! Press Start Over button to start a new game.");
    //window.location.reload();
    return
  }
  else if(model.board.charAt(n) == "B" && model.board.charAt(n-7) == "B" && model.board.charAt(n-14) == "B" && model.board.charAt(n-21) == "B") {
    window.alert("Blue wins! Press Start Over button to start a new game.");
    //window.location.reload();
    return
  }
  else if(model.board.charAt(n) == "Y" && model.board.charAt(n-7) == "Y" && model.board.charAt(n-14) == "Y" && model.board.charAt(n-21) == "Y") {
    window.alert("Yellow wins! Press Start Over button to start a new game.");
    //window.location.reload();
    return
  }
  else if(model.board.charAt(n) == "B" && model.board.charAt(n+9) == "B" && model.board.charAt(n+18) == "B" && model.board.charAt(n+27) == "B") {
    window.alert("Blue wins! Press Start Over button to start a new game.");
    //window.location.reload();
    return
  }
  else if(model.board.charAt(n) == "Y" && model.board.charAt(n+9) == "Y" && model.board.charAt(n+18) == "Y" && model.board.charAt(n+27) == "Y") {
    window.alert("Yellow wins! Press Start Over button to start a new game.");
    //window.location.reload();
    return
  }
  else {
    //window.alert("Cat's game!");
  }
  
  //if(n)
}





/*
let canvas;
let context;
let t = 0;
let i = 0;
let model = {
  board: ".../.../...",
  next: "X",
}


function tick() {
  window.requestAnimationFrame(splat);
}

function splat(n) {
  let d = n - t;
  t = n;
  context.clearRect(0,0,canvas.width,canvas.height)


  // Taken from https://www.html5canvastutorials.com/tutorials/html5-canvas-lines/
  for(let i = 0;i < 2;i++) {
    context.beginPath();
    context.moveTo(20, 120 + i * 120);
    context.lineTo(320, 120 + i * 120);
    context.strokeStyle = '#ff0000';
    context.lineWidth = 5;
    context.stroke();
    context.beginPath();
    context.moveTo(120 + i * 120, 20);
    context.lineTo(120 + i * 120, 320);
    context.strokeStyle = '#ff0000';
    context.lineWidth = 5;
    context.stroke();
  }
  context.font = "28pt Calibri"
  context.fillStyle = "blue";  

  for(let i = 0; i <= 2; i++) {
    for(let j = 0; j <= 2; j++) {
      let me = model.board.charAt(i + j * 4);
      if (me != '.') {
	context.fillText(me, 50 + i * 120, 50 + j * 120);
      }
    }
  }
  context.font = "20pt Calibri"
  context.fillStyle = "green";

  context.fillText(JSON.stringify(model), 10, 350);
  
  tick();
}

document.addEventListener("DOMContentLoaded", () => { 
  canvas = document.querySelector("#myCanvas");
  console.log("Got here");
  context = canvas.getContext("2d");
  console.log(context);
  splat();
})

function roundMe(x){ return Math.ceil((x-20)/120)-1 }

document.addEventListener("click", e => {
  const [i,j] = [e.x,e.y].map(roundMe);
  if (i < 0 || i > 2) return;
  if (j < 0 || j > 2) return;

  const ix = i + j * 4;
  if (model.board.charAt(ix) != '.') {
    return;
  }
//  console.log(i,j,ix)
  model.board =
    model.board.slice(0,ix) +
    model.next +
    model.board.slice(ix+1,15)

  if (model.next == 'X') {
    model.next = 'O'
  } else if (model.next == 'O') {
    model.next = 'X'
  }
  
  
  
})
*/
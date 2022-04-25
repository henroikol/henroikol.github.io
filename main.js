const c = document.getElementById("mainCanvas")
const ctx = c.getContext('2d');

const runStop = document.getElementById("runStop")
const restartB = document.getElementById("restartButton")
const rangB = document.getElementById("randomgen")
var running = false

const cellSize = 30
const rows = 50
const columns = 50
const gamelooprate = 50
//-----------changing the size of the canvas---------------
c.width = rows * cellSize
c.height = columns * cellSize

//------------cells----------------
var cells = [];


for (let x = 0; x < rows; x++) {
  cells[x] = [];
  for (let y = 0; y < columns; y++) {
    cells[x][y] = 0;
  }
}



//------------cells2----------------


var cells2 = [];

for (let x = 0; x < rows; x++) {
  cells2[x] = [];
  for (let y = 0; y < columns; y++) {
    cells2[x][y] = 0;
  }
}

//------------functions----------------


function rectangle(x,y,w,h,color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function RoundMouseV(v){
    let v2 = Math.round(v/cellSize) * cellSize
    return v2
}


function isAlive(x,y){
    if (cells[x]== undefined || cells[x][y] == undefined){
        return 0
    }
    else if (cells[x][y]==1) {
        return 1
    } else if (cells[x][y]==0) {
        return 0
    }
}

function setCell(x,y,value) {
    cells2[x][y] = value
}


function cellLogic(number,state){
    //---survive---
    if (state == 1){

    
    if (number<2) {
        return 0
    }
    if (number == 2 || number == 3 ){
        return 1
    }
    if (number > 3 ){
        return 0
    }
    //---reproduce--
    } 
    else if (state==0) {
        
        if (number==3){
        return 1
        } else {
            return 0
        }
    }
    else {
        return 0
    }
    
}

function cell_S_R(x,y){
    let state = isAlive(x,y)
    let c1 = isAlive(x-1,y+1)
    let c2 = isAlive(x,y+1)
    let c3 = isAlive(x+1,y+1)
    let c4 = isAlive(x+1,y)
    let c5 = isAlive(x+1,y-1)
    let c6 = isAlive(x,y-1)
    let c7 = isAlive(x-1,y-1)
    let c8 = isAlive(x-1,y)
    
    let total = c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8
    if (total > 6) {
        
    }
    

    let whathappen = cellLogic(total,state)
    return whathappen
}

function drawCells(){
    for (let x = 0; x < rows; x++){

        for (let y = 0; y < columns; y++){
         let state = isAlive(x,y)


         if (state==1){
             rectangle(x*cellSize,y*cellSize,cellSize,cellSize,"black")
         }


        else {
            rectangle(x*cellSize,y*cellSize,cellSize,cellSize,"white")
         }



        }
     }
 
}

function UpdateCell(x,y){
    
    if (cells[x] != undefined && cells[x][y] != undefined){
        let whathappen2 = cell_S_R(x,y)
        
        setCell(x,y,whathappen2)
    }
    

}


function updateAllCells(){
    for (let x = 0; x < rows; x++){
       for (let y = 0; y < columns; y++){
        UpdateCell(x,y)
        
       }
    }

}


function setCtoC2(){
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
        cells[x][y] = cells2[x][y]
        }
        
        
    }

}

setInterval(gameloop, gamelooprate);


function gameloop(){
    
    if (running==true){
       
       updateAllCells()
       drawCells()
       setCtoC2()
        

    }
    
}
runStop.onclick = function(){
    
    if (running == false){
        running = true
    } else {
        running = false
    }
    console.log("running is: ", running)
    drawCells()
};

restartB.onclick = function(){

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
          cells[x][y] = 0;
        }
      }

    drawCells()

}

//random function
function randomm(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }



rangB.onclick = function(){
    console.log("rando")
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
          cells2[x][y] = randomm(0,1)
        }
      }

    setCtoC2()
    drawCells()

}

c.addEventListener("mousemove",function(m){
    let x = m.x;
    let y = m.y;
    
    let Y = RoundMouseV(y)
    let X = RoundMouseV(x)
    
    drawCells()
    rectangle(X+cellSize/4,Y+cellSize/4,cellSize/2,cellSize/2,"red")
})

c.addEventListener("mousedown",function(m){
    let x = m.x;
    let y = m.y;
    
    let Y = RoundMouseV(y)
    let X = RoundMouseV(x)
    console.log(X,Y)
    console.log(cell_S_R(X/cellSize,Y/cellSize))
    let stateofmc = isAlive(X/cellSize,Y/cellSize)

    if (stateofmc==1){
        cells[X/cellSize][Y/cellSize] = 0
    }
     else if (stateofmc ==0){
        cells[X/cellSize][Y/cellSize] = 1
    }
    
    drawCells()
    rectangle(X+cellSize/4,Y+cellSize/4,cellSize/2,cellSize/2,"yellow")
    
 })
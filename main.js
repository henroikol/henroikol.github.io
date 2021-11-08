const c = document.getElementById("mainCanvas");
const ctx = c.getContext('2d');

var playeri = [250,250,0,-10]

let obArray = [[0,0,500,100],[400,200,100,500],[200,200,30,500]]; //1 is X 2 is Y 4,5 is size, example: [x,y,w,h]

class object {
    constructor (canvas,ctx,obi){
        this.canvas = canvas
        this.ctx = ctx
        this.obArray = obi
    }
    toCanvasY(y){
        let ny = this.canvas.height - y
        return ny
    }
    toNormalY (y){
        let ny = this.canvas.height - y
        return ny
    }

    isInside(x,y,w,h){
        let obA = this.obArray;
        let isn = false;
         obA.forEach(function(v){
            //console.log(v[0],v[1],v[2],v[3])
            if (x < v[0] + v[2] &&
                x + w > v[0] &&
                y < h + v[3] &&
                h + y > v[1]) {
                 // collision detected!
                 console.log("collision")
                 isn = true
            } else {
                //console.log("no collision")

             }
            
         });
         return isn
         
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    rectangle(x,y,w,h,c){
       let ctx = this.ctx
       let Y = this.toCanvasY(y)
       ctx.fillStyle = c;
       ctx.fillRect(x,Y,w,h); 
    }
    circle(x,y,s){
        let nY = this.toCanvasY(y)
        let ctx = this.ctx
        
        ctx.beginPath();
        ctx.arc(x, nY, s, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke()
    }
    drawArrayObi(){
        let obA = this.obArray
        
        obA.forEach(function(v){
            
            functions.rectangle(v[0],v[1],v[2],-v[3],"green")
        })};
    playerUpdate(){
       
       
       
       if (playeri[2]>0){
        playeri[2] = playeri[2] - 2
        playeri[0] = playeri[0] - 2
       } else if (playeri[2] < -1) {
           playeri[2] = playeri[2] + 2
           playeri[0] = playeri[0] + 2
       }
        
       if (playeri[3]>0){
        playeri[3] = playeri[3] - 2
        playeri[1] = playeri[1] - 2
       } else if (playeri[3] < -1) {
        playeri[3] = playeri[3] + 2
        playeri[1] = playeri[1] + 2
       } 
       let isn = functions.isInside(playeri[0],playeri[1],9,9)
       if (isn ==true){
        return false
       }
       return true
    }




    
}

var functions = new object(c,ctx,obArray)

function playermove(v){
    console.log(v.keyCode)
    
    switch (v.keyCode) {
        case 37: //left
            if (playeri[2]<25){
                playeri[2] = playeri[2]+10;
            
            }
            break;
        case 65: //left 2
        if (playeri[2]<25){
                playeri[2] = playeri[2]+10;
            
        }
        break;
        case 38: //up
        if (playeri[3]>-25){
            playeri[3] = playeri[3]-10;
        }
            break;
        case 87: //up 2
        if (playeri[3]>-25){
            playeri[3] = playeri[3]-10;
        }
                break;
    

        case 39: //right
        if (playeri[2]>-25){
            playeri[2] = playeri[2]-10;
            }
            break;
        case 68: //right 2
        if (playeri[2]>-25){
            playeri[2] = playeri[2]-10;
            }
            break;
        case 40: //down,
            if (playeri[3]<25){
              playeri[3] = playeri[3]+10;  
            }
            
            break;
        case 83: //down 2
        if (playeri[3]<25){
            playeri[3] = playeri[3]+10;  
        }
            
        break;
    }
    
}


function onMouseMove(m){
        
        let X = m.clientX
        let y = m.clientY
        //console.log(X,y)
        
        let Y = functions.toCanvasY(y)
        let isN = functions.isInside(X,Y,30,30)
        //console.log(isN)
        if (isN == false){
         
        //functions.circle(X,Y,10)
        
        functions.drawArrayObi();
        functions.rectangle(X,Y,30,30,"red")
        }
        else{
        

        }
        
    }
document.addEventListener("keydown",playermove)
c.addEventListener("mousemove",onMouseMove)




function gameloop(){
    functions.clear()
    
    let ish = functions.playerUpdate()
    if (ish == false){
        playeri = [c.width/2,c.height/2,0,0]
    }
    functions.drawArrayObi();
    
    functions.rectangle(c.width/2-10,c.height/2 + 20,30,30,"purple")

    console.log(playeri)
    functions.rectangle(playeri[0],playeri[1],10,10,"red")
    
}
setInterval(gameloop,25);


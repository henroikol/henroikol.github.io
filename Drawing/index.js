var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var x1;
var y1;
var yoffset = 150;

c.addEventListener("mousemove",function(m){
   if (m.shiftKey == true) {
    let color = document.getElementById("pColor").value;
    let size = document.getElementById("pSize").value;
    let x = m.x;
    let y = m.y -yoffset;
    ctx.fillStyle = color;
    ctx.fillRect(x,y,size,size);
   }
})
function canvasReset (){
    
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,document.getElementById("myCanvas").width,document.getElementById("myCanvas").height);
}
function onClickk() {
    
    var txti = document.getElementById("txt").value;
    alert("input:",txti);
    
};


function onClickk2() {
       var num = Math.random(1) * 5;
 

    document.getElementById("numbers").textContent = num;
    console.log("Number is",num)
    
};

function onChangee() {
    var txt2 = document.getElementById("txt").value;
    console.log(txt2)

};

document.getElementById("myButton").onclick = onClickk;
document.getElementById("txt").onchange = onChangee;
document.getElementById("Button2").onclick = onClickk2;
document.getElementById("resetButton").onclick = canvasReset;
/*var myObject = {
    sus : true,
    additself : function(n){
       return n+n
    }

}
console.log(myObject.additself(3));

var abc = ["a","b","c","d"]
abc.forEach(function(v,i){
    console.log("value is",v,"index is",i)
})

var myNumber = 4;
switch(myNumber){

    case (1): 
    console.log("myNumber is 1");
    break;
     
     case (2): 
     console.log("myNumber is 2");
     break;
     case (3): 
     console.log("myNumber is 3");
     break;
     case (4): 
     console.log("myNumber is 4");
     break;
}

for (let i = 10; i>0; i-=1){
    console.log(i);
}
*/

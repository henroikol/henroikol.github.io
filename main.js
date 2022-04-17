
const words = [
 "ma olen burger otse macdonalsist",
 "helenile meeldib eko",
 "twa arbusa on my busa",
 "källo on emo",
 "robot roobert on lahe",
 "mulle maitsevad kollased maasikad",
 "juss peeretas persepolis sokratise ees",
 "su ema sittus persepolis ja mängis amongus",
 "roki is the rock",
 "ingrid on källo version kaks",
 "helenile meeldivad pallid",
 "henrile meeldib pähkleid süüa",
 "gaide on igav õpetaja",
 "esimestel olümpia mängudel jooksid mehed alasti staadionil",
 "joanna on sussy ja ta räägib sussitest asjadest",
 "ly-sandral on muumi hull ja talle meeldib soome stuff",
 "meie klass on väga sussy xd"

]

const pic = document.getElementById("hangmanpic")
const charInput = document.getElementById("Character")
const enterButton = document.getElementById("enterButton")
const foundwordUi = document.getElementById("foundword");





var currentWord = "";
var foundWord = "";
var mistakes = 0;



String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

for(var i=0; i<currentWord.length;i++) {
    foundWord = foundWord.replaceAt(i,".")   
}




function chooseWord(){
    currentWord = words[Math.floor(Math.random() * words.length)];
}



function isCharInWord(c){
 return currentWord.includes(c);

}

function ChangePic(){
    let bef = "hangman pics/";
    let aft =" mistake.png";
    let imgsrc = bef + mistakes.toString() + aft;
    console.log(imgsrc)
    pic.src = imgsrc;
}


function updateScreenWord(str){
    let s2 = str.replaceAll('.', '_');
    let s3 = s2.split('').join(" ");
    foundwordUi.innerHTML = s3
}


function findAllChar(c){
    var char = [];

    for(var i=0; i<currentWord.length;i++) {

        if (currentWord[i] === c) {

            char.push(i);
        }
        
    }
    return char;
}


chooseWord()
console.log(currentWord)




function Main(c){
    if (foundWord.length == 0){
    for(var i=0; i<currentWord.length;i++) {
            foundWord = foundWord.replaceAt(i,".")   }
    }



    updateScreenWord(foundWord)

    console.log(foundWord+"."+currentWord,"mistakes: ", mistakes," fw lenghth: ",foundWord.length)



    if (currentWord === foundWord){
        chooseWord()
        foundWord = ""
        mistakes = 0
        
    }

    if (isCharInWord(c) != true){ mistakes++; ChangePic(); return;}
    if (mistakes > 6){ mistakes = 0; ChangePic(); foundWord = ""; chooseWord(); return}
    
    
    let fac = findAllChar(c)
    console.log(fac)

    

    for(var i=0; i<fac.length;i++) {
        
        foundWord = foundWord.replaceAt(fac[i],c)   
    }
    updateScreenWord(foundWord)
}



enterButton.onclick  = function(){
    let ic = charInput.value;
    charInput.value = ""
    console.log(ic);
    Main(ic)

    

}
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 69) {
        let ic = charInput.value;
        charInput.value = ""
        console.log(ic);
        Main(ic)
     
    }
});

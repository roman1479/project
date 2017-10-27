var stage = document.getElementById('stage');
var square;
var i;

//for(i=0; i<10; i++){
//	square = document.createElement('div');
//  square.setAttribute('class','blue'); 
//  stage.appendChild(square);
//}
//var brEl = document.createElement('br');
//stage.appendChild(brEl);
//
//for(i=0; i<10; i++){
//	square = document.createElement('div');
//  square.setAttribute('class','black');
//  stage.appendChild(square);
//}

var mass = [];
for(i=0;i<10;i++){
    mass[i] = [];
    for(j=0;j<10;j++){
        mass[i][j] = 0;
    }
}


function otrisovka(){
stage.innerHTML = "";
    for(i=0;i<10;i++){
        for(j=0;j<10;j++){
            square = document.createElement('div');
            if(mass[i][j] === 0){
                 square.setAttribute('class','blue');
            }    
            else{
                 square.setAttribute('class','black');
            }
            stage.appendChild(square);
        }
        brEl = document.createElement('br');
        stage.appendChild(square);
    }
}
otrisovka();
window.onkeypress = function (e){
    mass[Math.floor(Math.random()*10)][Math.floor(Math.random()*10)] = 1;
    otrisovka();
    console.log(e);   
}

    var Square = function() {
        this.x = 0;
        this.y = 0;
        };

            37: "left",
            38: "up",
            39: "right",
            40: "down"
        };
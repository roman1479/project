var stage = document.getElementById('stage');
var square;
var i;
var points = 0; 

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


var apples = [];
for(i=0;i<20;i++){
    apples[i] = [];
    for(j=0;j<20;j++){
        apples[i][j] = 0;
    }
}
function createApple(){
    var randx = Math.floor(Math.random()*20);
    var randy = Math.floor(Math.random()*20);
    if(mass[randy][randx] === 0){
        apples[randy][randx] = 1;
        otrisovka();
    }
    else{
        createApple();
    }
}
function placeApples(){
    for(i=0;i<20;i++){
        for(j=0;j<20;j++){
            if(apples[i] && apples[i][j]){
                mass[i][j] = 3;
            }
        }
    }
}

var matrix = [
 [],
 [0,1,1],
 [],
 [1,0,1,1,1,1,1,1,1,1],
 [],

];
function lab(){
    for(i=0;i<20;i++){
        for(j=0;j<20;j++){
            if(matrix[i] && matrix[i][j]){
                mass[i][j] = 2;
            }
        }
    }
}
var mass = [];
function clearMass(){
	for(i=0;i<20;i++){
	    mass[i] = [];
	    for(j=0;j<20;j++){
	        mass[i][j] = 0;
	    }
	}
}
clearMass();
lab();
createApple();
placeApples();
showPoints();

function otrisovka(){
stage.innerHTML = "";
    for(i=0;i<20;i++){
        for(j=0;j<20;j++){
            square = document.createElement('div');
            if(mass[i][j] === 0){
                 square.setAttribute('class','blue');
            }    
            else if(mass[i][j] === 1){
                 square.setAttribute('class','black');
            }
            else if(mass[i][j] === 2){
                square.setAttribute('class','red');
            }
            else if(mass[i][j] === 3){
                square.setAttribute('class','green');
            }
            stage.appendChild(square);
        }
        brEl = document.createElement('br');
        stage.appendChild(square);
    }
}
otrisovka();
window.onkeydown= function (e){
	if(e.keyCode === 38){
		blackSquare.moveUp();
	}
	else if(e.keyCode === 37){
		blackSquare.moveLeft();
	}
	else if(e.keyCode === 40){
		blackSquare.moveDown();
	}
	else if(e.keyCode === 39){
		blackSquare.moveRight();
	 }
	clearMass();
    lab();
    placeApples();
    mass[blackSquare.y][blackSquare.x] = blackSquare.colorId;
    otrisovka();
    console.log(e);   
}

function showPoints(){
    var pointsDiv = document.getElementById('points');
    pointsDiv.innerHTML = points;
}
var Square = function(colorId) {
	var me = this;
    var destId = 0;
	this.colorId = colorId; //id цвет который получили из аргумента
    this.x = 0;
 	this.y = 0;
    this.glasses = function(y, x){
        apples[y][x] = 0;
        points++;
        showPoints();
        createApple();
    }
    this.moveRight = function () { //ФУНКЦИЯ ДВИЖЕНИЯ  ПРАВО
        if(mass[me.y][me.x+1]){
            destId = mass[me.y][me.x+1];
            if(destId === 3){
                me.glasses(me.y, me.x+1);
            }
        }

        else{
            destId = 0;
        }

    	if(me.x<19 && destId !== 2){
    		me.x++;
    	}
    }
    this.moveLeft = function () { //ФУНКЦИЯ ДВИЖЕНИЯ  ПРАВО
        if(mass[me.y][me.x-1]){
            destId = mass[me.y][me.x-1];
            if(destId === 3){
                me.glasses(me.y, me.x-1);
            }
        }

        else{
            destId = 0;
        }
    	if(me.x>0 && destId !== 2){
    		me.x--;
    	}	
    }
    this.moveUp = function () { //ФУНКЦИЯ ДВИЖЕНИЯ верх
        if(mass[me.y-1][me.x]){
            destId = mass[me.y-1][me.x];
            if(destId === 3){
                me.glasses(me.y-1, me.x);
            }
        }
        else{
            destId = 0;
        }
    	if(me.y>0 && destId !== 2){
    		me.y--;
    	}
    }
    this.moveDown = function () { //ФУНКЦИЯ ДВИЖЕНИЯ  ПРАВО
        if(mass[me.y+1][me.x]){
            destId = mass[me.y+1][me.x];
            if(destId === 3){
                me.glasses(me.y+1, me.x);
            }
        }
        else{
            destId = 0;
        }
    	if(me.y<19 && destId !== 2){
    		me.y++;
    	}
    }
};
var blackSquare = new Square(1);
    
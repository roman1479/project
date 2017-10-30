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
function clearMass(){
	for(i=0;i<10;i++){
	    mass[i] = [];
	    for(j=0;j<10;j++){
	        mass[i][j] = 0;
	    }
	}
}
clearMass();

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
    mass[blackSquare.y][blackSquare.x] = blackSquare.colorId;
    otrisovka();
    console.log(e);   
}

var Square = function(colorId) {
	var me = this;
	this.colorId = colorId; //id цвет который получили из аргумента
    this.x = 0;
 	this.y = 0;
    this.moveRight = function () { //ФУНКЦИЯ ДВИЖЕНИЯ НА ПРАВО
    	if(me.x<9){
    		me.x++;
    	}
    }
    this.moveLeft = function () { //ФУНКЦИЯ ДВИЖЕНИЯ НА ПРАВО
    	if(me.x>0){
    		me.x--;
    	}	
    }
    this.moveUp = function () { //ФУНКЦИЯ ДВИЖЕНИЯ НА ПРАВО
    	if(me.y>0){
    		me.y--;
    	}
    }
    this.moveDown = function () { //ФУНКЦИЯ ДВИЖЕНИЯ НА ПРАВО
    	if(me.y<9){
    		me.y++;
    	}
    }
};
var blackSquare = new Square(1);
    
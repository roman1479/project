var stage = document.getElementById('stage');
var square;
var i;
var points = 0; 
  

var apples = [];
for(i=0;i<20;i++){
    apples[i] = [];
    for(j=0;j<20;j++){
        apples[i][j] = 0;
    }
}
//рисование яблочка в рандомном месте
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
//наложение массива apples на mass
function placeApples(){
    for(i=0;i<20;i++){
        for(j=0;j<20;j++){
            if(apples[i] && apples[i][j]){
                mass[i][j] = 3;
            }
        }
    }
}
//сама отрисовка лабиринта
var matrix = [
 [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 [1,0,1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,1,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
 [0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0],
 [0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
 [0,1,0,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
 [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

];
//присвоение функции лаб значения 2, т.е. лабиринту
function lab(){
    for(i=0;i<20;i++){
        for(j=0;j<20;j++){
            if(matrix[i] && matrix[i][j]){
                mass[i][j] = 2;
            }
        }
    }
}
//очищаем полотно обнулением массива
var mass = [];
function clearMass(){
	for(i=0;i<20;i++){
	    mass[i] = [];
	    for(j=0;j<20;j++){
	        mass[i][j] = 0;
	    }
	}
}
clearMass();//сначала очищаем
lab();//потом лабиринт
createApple();
placeApples();
showPoints();
//отрисовка самого поля 20*20
function otrisovka(){
stage.innerHTML = "";
    for(i=0;i<20;i++){
        for(j=0;j<20;j++){
            square = document.createElement('div');//создаем элемент с указанием див и придаем класс square
            if(mass[i][j] === 0){ // все нулевые значения окрашиваются в голубой
                 square.setAttribute('class','blue');
            }    
            else if(mass[i][j] === 1){// все нулевые значения окрашиваются в голубой сам игрок
                 square.setAttribute('class','black');
            }
            else if(mass[i][j] === 2){// все 2 значения окрашиваются в красный это лабиринт
                square.setAttribute('class','red');
            }
            else if(mass[i][j] === 3){// все 3 значения окрашиваются в зеленый это двигающися в рандомном месте
                square.setAttribute('class','green');
            }
            stage.appendChild(square);//добавить эемент послденим
        }
        brEl = document.createElement('br');//добавление отступов
        stage.appendChild(square);
    }
}
otrisovka();//нарисовали поле
window.onkeydown= function (e){//событие клавиатуры
	if(e.keyCode === 38){//если нажата клаиша вверх
		blackSquare.moveUp();//
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
    mass[blackSquare.y][blackSquare.x] = blackSquare.colorId;//
    otrisovka();
    console.log(e);   
}

function showPoints(){//показывающая баллы
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
        apples[y][x] = 0;//обнулить предыдущие яблоко
        points++;//добавить очки
        showPoints();//отображение очков
        createApple();//создать новое яблоко
    }
    this.moveRight = function () { //ФУНКЦИЯ ДВИЖЕНИЯ  ПРАВО и что бы наш игрок не заходил в лабиримнт
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
    this.moveLeft = function () { //ФУНКЦИЯ ДВИЖЕНИЯ  лево
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
    this.moveDown = function () { //ФУНКЦИЯ ДВИЖЕНИЯ  вниз
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
//
var stage = document.getElementById("stage");

function coins(x, y) {
	var money = document.createElement("div");
	money.className="coin";
	money.style.top= y+"px";
	money.style.left= x+"px";
	stage.appendChild(money);
}
function randomNumber(a, b){//а ширина всей сцены а b ширина монетки
	return Math.floor(Math.random()*(a-b));
}

coins(randomNumber(500, 50), randomNumber(500, 50));
coins(randomNumber(500, 50), randomNumber(500, 50));
coins(randomNumber(500, 50), randomNumber(500, 50));


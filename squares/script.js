const ROWS_COUNT = 10;
const COLS_COUNT = 20;

const CELL_EMPTY = 0;
const CELL_PIG	 = 1;
const CELL_MONEY = 2;

var Stage = function(jqEl) {
	this.jqEl = jqEl;
	this.rows = {};
	for(var i = 1; i <= ROWS_COUNT; i++) {
		var row = {}
		for(var j = 1; j <= COLS_COUNT; j++) {
			row['_' + j] = CELL_EMPTY;
		}
		this.rows['_' + i] = row;
	}
	this.setCell = function(rowNumber, colNumber, value) {
		this.rows['_' + rowNumber]['_' + colNumber] = value;
	}
	this.getCell = function(rowNumber, colNumber) {
		return this.rows['_' + rowNumber]['_' + colNumber];
	}

	this.render = function() {
		this.jqEl.html('');
		for(var i = 1; i <= ROWS_COUNT; i++) {
			for(var j = 1; j <= COLS_COUNT; j++) {
				var div = $('<div></div>');
				switch(this.rows['_' + i]['_' + j]) {
					case CELL_PIG:
						div.addClass('pig');
						break;
					case CELL_MONEY:
						div.addClass('coin');
						break;
					default:
						break;
				}
				this.jqEl.append(div);
			}
		}
	}
}

var Pig = function(stage) {
	this.stage = stage;
	this.rowNumber = 1;
	this.colNumber = 1;
	this.id = CELL_PIG;

	this.moveRight = function() {
		if (this.colNumber !== COLS_COUNT) {
			this.clearLastPlace();
			this.colNumber++;
		}
	}
	this.moveLeft = function() {
		if (this.colNumber !== 1) {
			this.clearLastPlace();
			this.colNumber--;
		}
	}
	this.moveTop = function() {
		if (this.rowNumber !== 1) {
			this.clearLastPlace();
			this.rowNumber--;
		}
	}
	this.moveBottom = function() {
		if (this.rowNumber !== ROWS_COUNT) {
			this.clearLastPlace();
			this.rowNumber++;
		}
	}
	this.clearLastPlace = function() {
		stage.setCell(this.rowNumber, this.colNumber, CELL_EMPTY);
	}
	this.checkCoin = function() {
		var result = false;
		if (stage.getCell(this.rowNumber, this.colNumber) === CELL_MONEY) {
			result = true;
		}
		this.place();
		return result;
	}
	this.place = function() {
		this.stage.setCell(this.rowNumber, this.colNumber, this.id);
	}

	this.place();
}

var Coin = function(stage) {
	this.stage = stage;
	this.rowNumber;
	this.colNumber;
	this.id = CELL_MONEY;

	this.randomPlace = function() {
		this.rowNumber = Math.floor(Math.random() * ROWS_COUNT) + 1;
		this.colNumber = Math.floor(Math.random() * COLS_COUNT) + 1;
		if(stage.getCell(this.rowNumber, this.colNumber) == CELL_EMPTY) {
			stage.setCell(this.rowNumber, this.colNumber, CELL_MONEY);
		} else {
			this.randomPlace();
		}
	}
}

$(document).ready(function() {
	var stage = new Stage($('#stage'));
	var pig = new Pig(stage);
	var coin = new Coin(stage);
	coin.randomPlace();
	stage.render();

	$(document).keydown(function(e) {
		switch(e.which) {
			case 39:
				pig.moveRight();
				break;
			case 37:
				pig.moveLeft();
				break;
			case 40:
				pig.moveBottom();
				break;
			case 38:
				pig.moveTop();
				break;
			default:
				break;
		}
		if(pig.checkCoin()) {
			coin.randomPlace();
		}
		stage.render();
	});
});
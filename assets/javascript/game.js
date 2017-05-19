class Fighter {
	constructor(class,team){
		//class argument has four options:
		//0 for sword
		//1 for axe
		//2 for lance
		//3 for mage
		//Team argument has two options:
		//0 for player team (left)
		//1 for enemy team (right)
		this.health = 60;
		this.hitPoints = 60;
		this.attackPower = 10;
		if (team === 1){
			this.growth = 0;
		} else {
			this.growth = 5;
		}
		//also, grab HTML elements and images
			
	};
	//methods
	fight(){

	};
	levelUp(){

	};

}

class Plant {
	constructor(row,col) {
		this.stage = 0;
		this.condition = 0;
		this.row = row;
		this.col = col;
		this.elem = document.getElementById("row"+this.row).children[this.col];

		//this will be overridden by the other classes
		this.type = "plant";
	};

	grow() {
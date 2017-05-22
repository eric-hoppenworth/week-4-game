var myGame;
var 

$(document).ready(function(){
	//constructor for the fighter class.
	class Fighter {
		constructor(myClass,team){
			//class argument has four options:
			this.myClass = myClass;
			this.attackCount = 0;
			//0 for sword
			//1 for axe
			//2 for lance
			//3 for mage
			//Team argument has two options:
			this.team = team;
			//0 for player team (left)
			//1 for enemy team (right)
			if( myClass === 0 ){
				//sword
				//mid HP
				//low Att
				//high Growth
				this.hitPoints = 100;
				this.health = this.hitPoints;
				this.attackPower = 10;
				this.growth = 10;
				this.className = "sword";
			} else if( myClass === 1 ){
				//axe
				//mid HP
				//mid Att
				//mid Growth
				this.hitPoints = 120;
				this.health = this.hitPoints;
				this.attackPower = 20;
				this.growth = 5;
				this.className = "axe";
			} else if( myClass === 2 ){
				//lance
				//high HP
				//mid Att
				//mid Growth
				this.hitPoints = 130;
				this.health = this.hitPoints;
				this.attackPower = 20;
				this.growth = 10;
				this.className = "lance";
			} else if( myClass === 3 ){
				//mage
				//low HP
				//high Att
				//low Growth
				this.hitPoints = 80;
				this.health = this.hitPoints;
				this.attackPower = 40;
				this.growth = 5;
				this.className = "mage";
			}

			if (team === 1){
				this.growth = 0;
			}
			//also, grab HTML elements and images
			if (team === 0){
				//grab HTML elements
				//picture,HP,Att,Growth
				this.myStatsHtml = [$("#leftPic"),$("#leftHP"),$("#leftAtt"),$("#leftGrowth")];
				this.imgSrc = "assets/images/" + this.className + "L.png";
			} else if(team === 1){
				//grab HTML elements
				//picture,HP,Att,Growth
				this.myStatsHtml = [$("#rightPic"),$("#rightHP"),$("#rightAtt"),$("#rightGrowth")];
				this.imgSrc = "assets/images/" + this.className + "R.png";
			}
			
		};

		//methods
		fight(){

		};
		levelUp(){

		};

	};

	function Game() {
		//create four object, one of each class.
		//they will all start as team = 0
		this.fighters = [];
		for (i =0;i < 4; i ++){
			this.fighters[i] = new Fighter(i,0);
		}

		$(".thumbnail").on("click",function(event){
			//this click function will allow the user to see the stats of each character.
			//you will NOT actually pick a character here, that is located in the 'select' button

			//pull specific object

			var myUnit = new Fighter(parseInt($(this).attr("data-class"),10),parseInt($(this).attr("data-team"),10));
			//change HTML
			myUnit.myStatsHtml[0].attr("src",myUnit.imgSrc);
			myUnit.myStatsHtml[1].text(myUnit.health + " / " + myUnit.hitPoints);
			myUnit.myStatsHtml[2].text(myUnit.attackPower + " + " + myUnit.growth);
			myUnit.myStatsHtml[3].text(myUnit.growth);

		});
	};

	myGame = new Game();
})
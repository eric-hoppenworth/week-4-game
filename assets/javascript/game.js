var myGame;
var healths = [100,120,130,80];
var atts = [10,20,20,40];
var growths = [15,5,10,5];
var firstClick = false;

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
			//set arena position HTML element
			this.position = $("#arena"+this.team)

			this.hitPoints = healths[this.myClass];
			this.health = this.hitPoints;
			this.attackPower = atts[this.myClass];
			this.growth = growths[this.myClass];
			if( myClass === 0 ){	
				//sword
				//mid HP
				//low Att
				//high Growth
				this.className = "sword";
			} else if( myClass === 1 ){
				//axe
				//mid HP
				//mid Att
				//mid Growth
				this.className = "axe";
			} else if( myClass === 2 ){
				//lance
				//high HP
				//mid Att
				//mid Growth
				this.className = "lance";
			} else if( myClass === 3 ){
				//mage
				//low HP
				//high Att
				//low Growth
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
		this.unit = 0;
		this.myFighter = 0;
		//grab HTML elements for things in the game
		//buttons
		this.selectButton = $("#leftSelect");
		this.fightButton = $("#rightSelect");
		//other buttons(maybe not using this)
		//this.toggleUser = $("#btnUser")
		//this.toggleEnemy = $("#btnEnemy")

		//panels
		this.pnlUser = $("#pnlUser");
		this.pnlEnemy = $("#pnlEnemy");
		//this.pnlEnemy.hide();
		//fighting areas
		this.arena = $("#arena");

		//depricated
		//create four object, one of each class.
		//they will all start as team = 1
		// this.fighters = [];
		// for (i =0;i < 4; i ++){
		// 	this.fighters[i] = new Fighter(i,1);
		// }

		$(".thumbnail").on("click",function(event){
			//this click function will allow the user to see the stats of each character.
			//you will NOT actually pick a character here, that is located in the 'select' button

			//pull specific object
			myGame.unit = parseInt($(this).attr("data-class"),10);

			var myUnit = new Fighter(parseInt($(this).attr("data-class"),10),parseInt($(this).attr("data-team"),10));
			//change HTML
			var value = myUnit.attackCount * myUnit.growth

			myUnit.myStatsHtml[0].attr("src",myUnit.imgSrc);
			myUnit.myStatsHtml[1].text(myUnit.health + " / " + myUnit.hitPoints);
			myUnit.myStatsHtml[2].text(myUnit.attackPower + " + " + value);
			myUnit.myStatsHtml[3].text(myUnit.growth);

			//show select button, only if a unit is not already selected
			if (firstClick === false ){
				myGame.selectButton.show();
			}
			firstClick = true;
		});

		this.selectButton.on("click",function(){
			//set actual character and hide all select buttons
			myGame.myFighter = new Fighter(myGame.unit,0)
			//hide select button
			$(this).hide();
			//show enemy panel
			myGame.pnlEnemy.show();
			//hide all thumbnails on player panel
			myGame.pnlUser.find(".thumbnailHolder").hide();

		});
	};

	myGame = new Game();
})
var myGame;
var healths = [100,120,130,80];
var atts = [10,20,20,40];
var growths = [15,5,10,5];
var firstClick = false;
var animationComplete = false;

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

			if (team === 1){
				this.growth = 0;
			}
			//also, grab HTML elements and images
			//grab HTML elements
				//picture,HP,Att,Growth, health bar
			this.myStatsHtml = [$("#Pic"+this.team),$("#HP"+this.team),$("#Att"+this.team),$("#Growth"+this.team),$("#healthBar"+this.team)];
			if (team === 0){
				
				//this.myStatsHtml = [$("#leftPic"),$("#leftHP"),$("#leftAtt"),$("#leftGrowth"),$("#healthBar0")];
				this.imgSrc = "assets/images/" + this.myClass + "L.png";
			} else if(team === 1){
				//grab HTML elements
				//picture,HP,Att,Growth
				//this.myStatsHtml = [$("#rightPic"),$("#rightHP"),$("#rightAtt"),$("#rightGrowth"),$("#healthBar1")];
				this.imgSrc = "assets/images/" + this.myClass + "R.png";
			}
			
		};

		//methods
		fight(enemy){
			//because using 'this' inside the animate call back will grab the image element
			var me = this
			//animate the active unit
			this.position.animate({'left' : '-=20px'},200);
			this.position.animate({'left' : '+=40px'},200);
			this.position.animate({'left' : '-=20px'},200).promise().done(function(){
				//this will wait for the animation to finish
				enemy.health -= me.attackPower + (me.growth*me.attackCount);
				me.attackCount += 1;
				me.showStats();
				if (enemy.health <= 0 ){
					enemy.health = 0;
					enemy.showStats();
					enemy.die();
				} else {
					enemy.showStats();
					enemy.fight(me);
				}
			});
			
		};

		die(){

		};
		showStats(){
			//change HTML
			var value = this.attackCount * this.growth

			this.myStatsHtml[0].attr("src",this.imgSrc);
			this.myStatsHtml[1].text(this.health + " / " + this.hitPoints);
			this.myStatsHtml[2].text(this.attackPower + " + " + value);
			this.myStatsHtml[3].text(this.growth);
			this.myStatsHtml[4].css("width",this.health/this.hitPoints*100 + "%")
			//should also update health bars
		};
	};

	function Game() {
		this.unit = 0;
		this.myFighter = 0;
		//grab HTML elements for things in the game
		//buttons
		this.selectButton = $("#Select0");
		this.fightButton = $("#Select1");
		//other buttons(maybe not using this)
		//this.toggleUser = $("#btnUser")
		//this.toggleEnemy = $("#btnEnemy")

		//panels
		this.pnlUser = $("#pnl0");
		this.pnlEnemy = $("#pnl1");
		
		//fighting areas
		this.arena = $("#arena");
		this.attackButton = $('#attackButton');

		$(".thumbnail").on("click",function(event){
			//this click function will allow the user to see the stats of each character.
			//you will NOT actually pick a character here, that is located in the 'select' button

			//pull specific object
			myGame.unit = parseInt($(this).attr("data-class"),10);

			//print stats to HTML

			var myUnit = new Fighter(parseInt($(this).attr("data-class"),10),parseInt($(this).attr("data-team"),10));
			myUnit.showStats();
			

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
			//move character to arena
			$("#arena0").attr("src",myGame.myFighter.imgSrc)
			//hide corresponding thumbnail on enemy side
			var holder = myGame.pnlEnemy.find(".thumbnailHolder");
			holder.children().each(function(){
					//double equals because one is expected to be a string
				if($(this).attr("data-class") == myGame.myFighter.myClass ){
					$(this).hide();
				}
			});

		});

		this.fightButton.on("click",function(){
			//bring the enemy onto the board, and hide the button
			myGame.myEnemy = new Fighter(myGame.unit,1);
			$("#arena1").attr("src",myGame.myEnemy.imgSrc)
			//hide corresponding thumbnail
			var holder = myGame.pnlEnemy.find(".thumbnailHolder");
			holder.children().each(function(){
					//double equals because one is expected to be a string
				if($(this).attr("data-class") == myGame.myEnemy.myClass ){
					$(this).hide();
				}
			});
			//hide fight button
			myGame.fightButton.hide();
			//show Health bars
			$("#healthBars").show();
			
			//show attackButton
			myGame.attackButton.show();
			//hide panels
			//myGame.pnlEnemy.hide();
			//cmyGame.pnlUser.hide();
			//enemy is not dead
			myGame.isDead = false;
		});

		this.attackButton.on("click",function(){
			//hide button
			myGame.attackButton.hide();
			//player attacks
			myGame.myFighter.fight(myGame.myEnemy);

		});
	};

	myGame = new Game();
})
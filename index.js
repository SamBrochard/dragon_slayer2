"use strict";
/***********************************************************************/
/*****************************fonction combat****************************/
function fight(){
	while(game.playerHp > 0 && game.dragonHp > 0){
		console.log("round: "+game.round);
		var random =  Math.random();
		if (random < .5) {
			game.playerAtt = getRand(game.playerAttMin,game.playerAttMax);
			/*document.write("<img src='img/zseph.gif'><br>");*/
			console.log("Le joueur attaque le dragon avec un puissance de "+game.playerAtt+"PV");
			game.dragonHp = game.dragonHp - protect(game.playerAtt) ;
		}
		else{
			game.dragonAtt = getRand(game.dragonAttMin,game.dragonAttMax);
		/*	document.write("<img src='img/dragon3.gif'><br>");*/
			console.log("Le dragon attaque le joueur avec une puissance de "+game.dragonAtt+"PV");
			game.playerHp = game.playerHp - protect(game.dragonAtt);
		}
		game.round ++;
		console.log("Les points de vie du dragons sont à "+game.dragonHp+" HP");
		if(game.potion > 0){
			var usePotion = ("Voulez-vous utiliser une potion?");
			if (confirm(usePotion)) {
				game.playerHp = game.playerHp + 100;
				console.log("Utilisation de la potion. Les HP remontent de 100.")
				console.log("les points de vie du joueur sont à "+game.playerHp+" HP");
				game.potion--;
			}
			else{
				console.log("les points de vie du joueur sont à "+game.playerHp+" HP");

			}
		}
		else{
			console.log("les points de vie du joueur sont à "+game.playerHp+" HP");
		}
	}
	if(game.playerHp <= 0){
		game.winner = 2;
	}
	else{
		game.winner = 1;
	}
}

/*************************************************************************/
/**************************fonction choix du niveau***********************/
function requestInteger(message, min, max) {
	do{
		var choix = parseInt(window.prompt(message));
	 }
	 while(isNaN(choix) ||choix > max || choix < min)
	 	return choix;
}
/*******************************************************************************/
/**********************************niveau***********************************/
function choseLevel(choix){
 	var level = requestInteger("choisissez le niveau de difficulté facile(1) normal (2) difficile(3)",1,3);
	switch (level){

		case 1 :
		game.dragonHp = 75;
		game.dragonAttMax =75;
		break;

		case 2 :
		game.dragonHp = 100;
		game.dragonAttMax = 100; 
		break;

		case 3: 
		game.dragonHp = 150;
		game.dragonAttMax = 125;
	}	
}
/***********************************************************************/
/****************************fonction choix des armes requestInteger********************/

function choseWeapon(){
		var weapon = requestInteger("Choisissez une arme : bois(1), bronze(2), acier(3), verredragon(4)",1,4);
	switch(weapon){
		case 1:
		game.playerAttMax=2;
		break;

		case 3:
		game.playerAttMax = 5;
		break;

		case 2:
		game.playerAttMax = 3.5;
		break;

		case 4:
		game.playerAttMax = 10;
		break;
	}
}
/*********************************************************************/
/*******************************fonction  puissance d'attaque aléatoire*******************************/
function getRand(min,max){
	return Math.floor(Math.random()*(max-min + 1)) + min;
}
/********************************************************************/
/***********************************fonction défense****************/
function protect(attack){
	var esquive = Math.random();
	if (esquive < .5) {
		console.log("l'attaque est déviée la puissance de l'attaque est divisée par deux. ");
	return(attack = attack/2);
	}
	else{
		return(attack);
	}
}
/******************************************************************/
/*****************************fonction game initialisation********/
function gameInit()
{	
		game.playerHp=100;
		game.playerAttMin =10;
		game.dragonAttMin =10;
		game.potion =2;
		game.round =1;
	choseLevel();
	choseWeapon();
}
/**********************************************************************/
/****************************fonction boucle de combat******************/
function gameLoop(){
	fight();
}
/******************************************************************/
/****************************fonction declaration du vainqueur*****/
function GameWinner(){
	console.log(game.winner);
	switch(game.winner){

		case 1 :
			document.write("<h1>Vous avez gagné!</h1><br> <img src='img/minicloud.gif'>");
			//document.write("<img src="img/">");
			var again =("Voulez-vous rejouer ?");
			if(confirm(again)){
				window.location.reload(true);
			}
			else{
				document.write("<p>Merci d'avoir jouer</p>");
			}
		break;

		case 2 :
			document.write("<h1>Vous avez perdu!</h1><img src='img/2336.gif'> ");
			var again =("Voulez-vous rejouer ?");
			if(confirm(again)){
				window.location.reload(true);
			}
			else{
				document.write("<p>Merci d'avoir jouer");
			}
		break;
	}
}
/******************************************************************/
/***************************script********************************/
var game = {};
gameInit();
gameLoop();
GameWinner();
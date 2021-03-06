//variables
var bg, bgimg;
var player, playerimg;
var ground;
var goodItem;
var badItem;
var gameState="start";
var startimg;
var startbutton, startbuttonimg;
var badItemsGroup;
var gameOver, gameOverimg;
var bad1, bad2, bad3, bad4, bad5;
var good1, good2, good3;
var help, helpimg;
var info, infoimg;


function preload(){
  playerimg=loadAnimation("7.png","8.png","9.png","10.png","11.png","12.png");
  bgimg=loadImage("BackGround.png");
  startimg=loadImage("forest.png");
  startbuttonimg=loadImage("Start.png");
  gameOverimg=loadImage("gameover.png");
  helpinmg=loadImage("Help.png");

  bad1=loadImage("bgmi.png");
  bad2=loadImage("facebook.png");
  bad3=loadImage("freefire.png");
  bad4=loadImage("snapchat.png");
  bad5=loadImage("instagram.png");

  good1=loadImage("books.png");
  good2=loadImage("coding.png");
  good3=loadImage("outdoorgames1.png");
}

function setup() {
  createCanvas(1000,600);

  badItemsGroup=new Group();

  bg=createSprite(500, 300, 1000, 600);
  
  bg.addImage("bg",bgimg);
  bg.scale=1.5;

  player=createSprite(100, 500, 10, 40);
  player.addAnimation("running",playerimg);

  startbutton=createSprite(500, 300, 50, 50);
  startbutton.addAnimation("button",startbuttonimg);
  startbutton.scale=0.7;

  gameOver=createSprite(500, 300, 50, 50);
  gameOver.addAnimation("button",gameOverimg);
  gameOver.scale=1;

  ground=createSprite(500, 550, 1000, 10);
  ground.visible=false;

  
}

function draw() {
  background(0);  

  if(gameState === "start"){
    bg.addImage("bg1",startimg);
    bg.changeImage("bg1",startimg);

    player.visible=false;
    bg.velocityX=0;
    startbutton.visible=true;
    gameOver.visible=false;

    if(mousePressedOver(startbutton)){
      gameState="play";
    }
  }

  else if(gameState === "play"){

    player.visible=true;
    gameOver.visible=false;
    startbutton.visible=false;

    bg.addImage("bg",bgimg);
    bg.changeImage("bg",bgimg);

    bg.velocityX=-7;

    if(bg.x<0){
      bg.x=500;
    }
  
    if(keyDown("space") && player.y>=400){
      player.velocityY=-10;
    }
    player.velocityY=player.velocityY+0.8;
    player.collide(ground);
  
    var num=Math.round(random(1,2));
    if(num == 1){
      goodItems();
    }
    else{
      badItems();
    }

    if(player.isTouching(badItemsGroup)){
      gameState="end";
    }
  }
    else if(gameState === "end"){
      bg.velocityX=0;
      gameOver.visible=true;
      bg.tint="#EE4B2B";
      player.velocityX=0;
      player.velocityY=0;
      player.x=500;
      player.y=500;
      badItemsGroup.destroyEach();
    }

  drawSprites();
}
function goodItems(){
  if(frameCount%150 === 0){
    goodItem=createSprite(1000,535,20,40);
    goodItem.velocityX=-7;
    goodItem.shapeColor="green";
    goodItem.lifetime=350;
    goodItem.scale=0.3;
    var num=Math.round(random(1,3));
    switch(num){
      case 1:goodItem.addImage(good1);
      break;
      case 2:goodItem.addImage(good2);
      break;
      case 3:goodItem.addImage(good3);
      goodItem.scale=0.15;
      break;
    }
  }
}

function badItems(){
  if(frameCount%150 === 0){
    badItem=createSprite(1000,535,20,40);
    badItem.velocityX=-7;
    badItem.shapeColor="red";
    badItem.lifetime=350;
    badItemsGroup.add(badItem);
    badItem.scale=0.3;
    var num=Math.round(random(1,5));
    switch(num){
      case 1:badItem.addImage(bad1);
      badItem.scale=0.45;
      break;
      case 2:badItem.addImage(bad2);
      break;
      case 3:badItem.addImage(bad3);
      break;
      case 4:badItem.addImage(bad4);
      break;
      case 5:badItem.addImage(bad5);
      break;
    }
  }
}
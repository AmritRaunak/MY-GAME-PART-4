var ground,groundImg;
var runner,runnerImg;
var edges,virus;
var enemy;
var gameState="PLAY";
var runnerStop;
var gameOver,gameOverImg;
var reset,resetImg;
var mask,maskImg;
var score=0;
var life=3;
var police,policeImg;
var imm



function preload(){
    groundImg=loadImage("Road.png");
    runnerImg=loadAnimation("Runner-1.png","Runner-2.png");
    runnerStop=loadAnimation("Runner-1.png");
    virus=loadImage("virus.png");
    gameOverImg=loadImage("gameOver.png");
    resetImg=loadImage("reset.png");
    maskImg=loadImage("mask.png")
    policeImg=loadImage("police.png")
}

function setup(){
    createCanvas(600,660);
  
    ground=createSprite(300,300,600,660);
    ground.addImage(groundImg);

    runner=createSprite(300,610,20,20);
    runner.addAnimation("hello",runnerImg);
    runner.addAnimation("stop",runnerStop);
    runner.scale=0.08;
   
    runner.setCollider("rectangle",0,0,runner.width,runner.height)
    runner.debug=true;
    
    enemyGroup= new Group();
    policeGroup= new Group();
    maskGroup= new Group();

    gameOver=createSprite(300,300);
    gameOver.addImage(gameOverImg);
    gameOver.visible=false;

    reset=createSprite(300,410,10,10);
    reset.addImage(resetImg);
    reset.scale=0.1;
    reset.visible=false;
}


function draw() {

  drawSprites();
 if(gameState=="PLAY"){
   fill("yellow");
   text("Score :"+score,400,100);
  // score=score+Math.round(frameCount%2);

  fill("blue")
  text("Life :"+life,40,100)

  // if(runner.isTouching(policeGroup)){
   // life=life-1;
  //}
   
    ground.velocityY=3;
      if(ground.y>500){
        ground.y=200;
      }

      runner.x=mouseX;

     if(runner.isTouching(enemyGroup) || life==0){
      gameState="END";
      }
      
      
      for (i = 0; i < maskGroup.length; i++) 
      {
        if (runner.isTouching(maskGroup.get(i))) 
        {
        score = score + 10;
        maskGroup.get(i).destroy();
        }
      }
      for (i = 0; i < policeGroup.length; i++) 
      {
        if (runner.isTouching(policeGroup.get(i))) 
        {
        life= life- 1;
        policeGroup.get(i).destroy();
        }
      }

enemies();
Mask();
Police();

  }
  
   if(gameState=="END"){
    runner.changeAnimation("stop",runnerStop);
    ground.velocityY=0;
    enemyGroup.setVelocityYEach(0);
    maskGroup.setVelocityYEach(0);
    policeGroup.setVelocityYEach(0);
    gameOver.visible=true;
    reset.visible=true
    strokeWeight(4);
    fill("skyblue");
    textSize(25);
    text("Don't forget to wear mask and use sanitizers",70,380);
  }
 
  if(mousePressedOver(reset)){
    Reset();
  }

}


function enemies(){
if(frameCount%100==0){

enemy=createSprite(random(50,600),random(260,300))
enemy.addImage(virus)
enemy.scale=0.1
enemy.velocityY=3
enemyGroup.add(enemy)
}
}

function Reset(){

  gameState="PLAY";
gameOver.visible=false;
reset.visible=false;
enemyGroup.destroyEach();
policeGroup.destroyEach();
maskGroup.destroyEach();
text("",70,380)
score=0;
runner.changeAnimation("hello",runnerImg);
life=3;
}

function Mask(){
  if(frameCount%100==0){

    mask=createSprite(random(100,500),random(50,150));
    mask.addImage(maskImg);
    mask.scale=0.1;
    mask.velocityY=3;
    maskGroup.add(mask);
  }
}


function Police(){
  if(frameCount%300==0){

    police=createSprite(random(100,550),random(160,250));
    police.addImage(policeImg);
    police.scale=0.5;
    police.velocityY=3;
    policeGroup.add(police);
  }
}
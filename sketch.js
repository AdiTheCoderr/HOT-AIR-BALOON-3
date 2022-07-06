var bg, bgimg
var bln, blnimg
var topGround
var bottomGround
var topObstacle1, topObstacle2
var bottomObstacle1, bottomObstacle2, bottomObstacle3
var topObstacleGroup, bottomObstacleGroup, barGroup
var score = 0
var gameOverImg, gameOver
var restartImg, restart
var PLAY = 1, END = 0, gameState = PLAY


function preload(){
  bgimg=loadImage("assets/bg.png");
  blnimg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");

  topObstacle1 = loadImage("assets/obsTop1.png");
  topObstacle2 = loadImage("assets/obsTop2.png");

  bottomObstacle1 = loadImage("assets/obsBottom1.png");
  bottomObstacle2 = loadImage("assets/obsBottom2.png");
  bottomObstacle3 = loadImage("assets/obsBottom3.png");

  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
}

function setup(){
bg = createSprite(165,485,1,1);
  bg.addImage(bgimg)
  bg.scale = 1.3

bln = createSprite(100,200,20,50);
  bln.addAnimation("balloonsImg",blnimg);
  bln.scale = 0.15

  topGround = createSprite(200,10,800,20);
  bottomGround = createSprite(200,390,800,20);
  bottomGround.visible = false;
  topGround.visible = false;

  topObstacleGroup = new Group();
  bottomObstacleGroup = new Group();
  barGroup = new Group();

  gameOver = createSprite(220,200);
  restart = createSprite(220,240);

  gameOver.addImage(gameOverImg);
  restart.addImage(restartImg);

  gameOver.scale = 0.5
  gameOver.visible = false
  
  restart.scale = 0.5
  restart.visible = false
}

function draw(){
  background("black")

  if(gameState === PLAY){
    if(keyDown("space")){
      bln.velocityY =-6
   }
   bln.velocityY +=1
    topObstacles()
    bottomObstacles()
    bar()
    if(topObstacleGroup.isTouching(bln)||bottomObstacleGroup.isTouching(bln)
     || bln.isTouching(topGround)|| bln.isTouching(bottomGround)){
          gameState = END
    }

  }
  if(gameState === END){
   restart.visible = true
   gameOver.visible = true
   bln.velocityX = 0
   bln.velocityY = 0
   bottomObstacleGroup.setVelocityXEach(0)
   topObstacleGroup.setVelocityXEach(0)
   barGroup.setVelocityXEach(0)

   topObstacleGroup.setLifetimeEach(-1)
   bottomObstacleGroup.setLifetimeEach(-1)
  }

  
  
drawSprites()
Score()

}
function topObstacles(){
if(frameCount % 70 === 0){
  var topObstacle = createSprite(400,50,40,50)
  topObstacle.velocityX = -4
  
  var rand = Math.round(random(1,2));
  switch(rand) {
    case 1: topObstacle.addImage(topObstacle1);
          break;
    case 2: topObstacle.addImage(topObstacle2);
          break;
    default: break;
  }
  topObstacle.y = Math.round(random(10,100));

  topObstacle.scale = 0.15
  topObstacle.lifetime = 120

  bln.depth = topObstacle.depth
  bln.depth = bln.depth + 1

  topObstacleGroup.add(topObstacle)
}
}
function bottomObstacles(){
if(frameCount % 80 === 0){
  var bottomObstacle = createSprite(400,350,40,50);
  bottomObstacle.velocityX = -4

  var rand = Math.round(random(1,2,3));
  switch(rand) {
    case 1: bottomObstacle.addImage(bottomObstacle1);
        break;
    case 2: bottomObstacle.addImage(bottomObstacle2)
        break;
    case 3: bottomObstacle.addImage(bottomObstacle3)
        break;
  }
  bottomObstacle.scale = 0.07;
  bottomObstacle.lifetime = 120

  bln.depth = bln.depth + 1

  bottomObstacleGroup.add(bottomObstacle)
}
}
function bar(){
  if(frameCount % 60 === 0){
    var bar = createSprite(400, 200, 4, 800)
    bar.velocityX = -6
    
    bar.depth = bln.depth
    bar.lifetime = 120
    bar.visible = false

    barGroup.add(bar)
  }
}
function Score(){
if(bln.isTouching(barGroup)){
  score = score + 1
}
textSize(30);
fill("yellow")
text("score: "+ score, 250,50)
}
function reset(){
  topObstacleGroup.destroyEach()
  bottomObstacleGroup.destroyEach()
  gameState = PLAY
  score = 0
  gameOver.visible = false
  restart.visible = false
}
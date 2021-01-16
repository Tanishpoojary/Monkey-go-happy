
var monkey, monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var obstacleGroup;
var ground,groundImage;
var survivalTime=0;
var bananaGroup;
var obstacleGroup;
var gamestate = "play";
var score =0;
var back,backImage

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png" );
 
   bananaImage =loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backImage =loadImage("jungle.jpg")

   
  
 
}



function setup() {

createCanvas(600, 600);  
  

monkey =createSprite(80,315,20,20);
monkey.addAnimation("running",monkey_running);
monkey.scale =0.12; 
  
  
  
 back =createSprite(400,300);
 back.addImage(backImage)
  back.velocityX =-10;
  back.x = back.width /2;
  
  
  
    bananaGroup = new Group();
    obstacleGroup = new Group();
  
   ground = createSprite(600,550,2000000,20);
  ground.velocityX =-4;
  ground.x = ground.width /2;
  console.log(ground.x)
  ground.visible =false
 

  
  
  
  
}

function draw() {
 background(200) 
  
   if(gamestate === "play"){
     

  
   
     
     
       if (back.x < 0){
      back.x = back.width/2;
    }
     
    monkey.depth =back.depth
    monkey.depth =monkey.depth +1
    
    
 monkey.velocityY = monkey.velocityY + 0.3 
     
  
 
      
   if(keyDown("space") && monkey.y >= 400) {
    monkey.velocityY = -14;
  } 

  
   
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score + 2
  }
  
    if(obstacleGroup.isTouching(monkey)){
      obstacleGroup.destroyEach();
    gamestate = "end"
      }
  
  
   
    if (ground.x < 0){
      ground.x = ground.width/1;
    }
   
  
   
 
  
  spawnObstacles();
  spawnbanana();
  
  
monkey.collide(ground);
  
  
  
  
drawSprites();
text("score: " + score, 500,50);      

  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("SurvivalTime: "+ survivalTime, 100,50)
  }


if(gamestate === "end"){
 
  
   stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over!",230,250)
  
}
}

function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(400,500,10,40);
   obstacle.velocityX = -8
   obstacle.addImage(obstacleImage);
   
  
   
    obstacle.scale = 0.2;
    obstacle.lifetime = 100;
   
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
   obstacleGroup.add(obstacle);
 }
   
   
  
 
}

function spawnbanana (){
    if (frameCount % 80 === 0) { 
    var banana = createSprite(400,222,40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -4;
      banana.scale =0.1
    
     
    banana.lifetime = 190;
      
      ground.depth = banana.depth;
    banana.depth = banana.depth + 1;
      
      
    
    
    bananaGroup.add(banana);
  }
}






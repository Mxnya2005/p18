var monkey,monkeyImage,banana,bananaImage,bananaGroup,obstacle,obstacleImage,obstacleGroup,jungle,jungleImage,invisibleGround ;
var score= 0;
function preload(){
  monkeyImage= loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  bananaImage = loadImage("banana-1.png")
  obstacleImage= loadImage("stone.png")
  jungleImage= loadImage("jungle-1.jpg")
}

function setup() {
  createCanvas(400, 400);
  jungle= createSprite(0,0,400,400);
  jungle.addImage(jungleImage)
  jungle.scale= 1.5
  jungle.x= jungle.width/2
  jungle.velocityX= -3
  monkey= createSprite(70,350,20,20)
  monkey.addAnimation("running",monkeyImage)
  monkey.scale= 0.1;
 
  
  invisibleGround= createSprite(200,355,400,10);
  invisibleGround.visible= false;
  
  bananaGroup = new Group();
 obstacleGroup= new Group();
}

function draw() {
  background(220);
  stroke("white");
  textSize(20);
  fill("white");
  monkey.x= camera.position.x - 150;
  
  if(keyDown("space")){
    monkey.velocityY= -10
  }
  monkey.velocityY=  monkey.velocityY + 0.8
  
  if(jungle.x<camera.position.x - 100){
    jungle.x= camera.position.x;
  }
  if(bananaGroup.isTouching(monkey)){
    score= score+5
    bananaGroup.destroyEach();
  }
  if(obstacleGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    jungle.velocityX=0;
  }
  monkey.collide(invisibleGround);
 
  bananas();
  obstacles();
  
  switch(score){
    case 10:monkey.scale= 0.12;
      break;
      case 20:monkey.scale= 0.14;
      break;
      case 30:monkey.scale= 0.16;
      break;
      case 40:monkey.scale= 0.18;
      break;
      default: break;
  }
  drawSprites();
  text("Score:"+ score, 300,50);
}

function bananas(){
  if(frameCount% 120=== 0){
    var banana = createSprite(camera.position.x +200,220,10,10);
    banana.y=Math.round(random(140,345));
    banana.addImage(bananaImage);
   banana.scale= 0.05
    banana.velocityX= -3;
    
    banana.lifetime= 200;
    bananaGroup.add(banana)
  }
}
function obstacles(){
  if(frameCount% 200===0){
    var obstacle= createSprite(camera.position.x+200,326,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale= 0.15 ;
    obstacle.velocityX= -3;
    
    obstacle.lifetime= 300;
    obstacleGroup.add(obstacle);
  }
}




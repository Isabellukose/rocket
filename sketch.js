var nightImg,night
var rocket,rocketImg;
var meteorit,meteoritImg,meteoritG;
var star,starImg,starG;

var gameState="PLAY";

var gameOver,gameOverImg;

var play,playImg;

var restart,restartImg;

function preload(){

restartImg=loadImage("restate.png")
rocketImg=loadImage("rocket.png")  
meteoritImg=loadImage("Meteorit.png");
gameOverImg=loadImage("images.jpg");
starImg=loadImage("star.png");

nightImg=loadImage("space.jpg")
}



function setup() {
createCanvas(600,600);
  
night=createSprite(400,300);
night.addImage("bg",nightImg);

  
rocket=createSprite(200,400);  
rocket.addImage("rocket",rocketImg); 
rocket.scale=0.5;
rocket.debug=false;
rocket.setCollider("rectangle",0,0,100,350 )

gameOver = createSprite(300,300);
gameOver.addImage(gameOverImg);
gameOver.scale=0.5;
  

  
invisibleG= createSprite(50,600,1800,10)
invisibleG.visible=false;
  


  
meteoritG=new Group();
starG=new Group();
  
score=0;
}

function draw() {
  background("black");
  
  
  

if(gameState==="PLAY"){ 
  
  
   if(keyDown("left_arrow")){
      rocket.x = rocket.x - 3;
    }
    
    if(keyDown("right_arrow")){
      rocket.x = rocket.x + 3;
    }
    
  
   
  if(keyDown("space")){
 rocket.velocityY=-6  ;
  }  
rocket.velocityY=rocket.velocityY+1;
  
   if(night.y>400){
     night.y=300
   }
  night.velocityY=6

  
  gameOver.visible=false;
  
  
  
  if(starG.isTouching(rocket)){
  
   score=score+1; 
    
  starG[0].destroy();
}  

  
   
  
  Meteorit();
  Star();
       
  rocket.collide(invisibleG)
  
  if(meteoritG.isTouching(rocket)){
    meteoritG.destroyEach()
    starG.destroyEach()
    rocket.destroy()
    gameState="END";
}
  

  




  
}  
else if(gameState==="END"){
  
gameOver.visible = true;

night.velocityY=0;
starG.setVelocityYEach(0);
meteoritG.setVelocityYEach(0);
    
}  
  
  
  drawSprites();
  
  
  fill("white")
  textSize(20); 
  text("Score: "+ score, 500,30);
  
  
}

function Meteorit(){
if(frameCount%100===0){
  meteorit=createSprite(200,-50)
  meteorit.addImage("meteorit",meteoritImg);
  meteorit.scale=0.2
  
  meteorit.x=Math.round(random(100,400));
  meteorit.velocityY=3;
  
  meteorit.lifetime=800;
  
  meteoritG.add(meteorit);
  
  
}
  
}
function Star(){
  if(frameCount%200===0){
    
  star=createSprite(200,50)
  star.addImage("star",starImg);
  star.scale=0.2
  
  star.x=Math.round(random(100,400));
   star.velocityY=3;
  
  star.lifetime=800;
  starG.add(star);
  
  
    
  }
  
  
  
  
}

function reset(){
gameState="PLAY";  
gameOver.visible = false;
restart.visible = false;
  
 star.destroyEach();  
meteorit.destroyEach(); 
  rocket.destroy();
  score=0;
}
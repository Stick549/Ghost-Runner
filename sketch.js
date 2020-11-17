var tower, towerImage, door, doorGroup, doorImage, climber, climberImage, climberGroup, ghost, ghostImage, invis, invisGroup, sound;
var gameState = "play";
function preload(){
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  ghostImage = loadImage("ghost-standing.png")
  sound = loadSound("spooky.wav")
}
function setup(){
  createCanvas(600, 600)
  tower = createSprite(300, 300)
  tower.addImage("tower", towerImage)
  tower.velocityY = 1
  doorGroup = new Group()
  climberGroup = new Group()
  invisGroup = new Group()
  ghost = createSprite(200, 200, 50, 50)
  ghost.addImage(ghostImage)
  ghost.scale = 0.3;
  
  
}
function draw(){
   background("black")
  if (gameState === "play"){
    
   if (tower.y > 600){
     tower.y = 300;
   }
  if(keyDown("space")){
    ghost.velocityY = -5
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3
  }
  ghost.velocityY = ghost.velocityY+0.8
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
  if(invisGroup.isTouching(ghost)){
    ghost.destroy()
    gameState = "end"
  }
  spawnDoors()
  drawSprites()
}
  if (gameState === "end"){
    textSize(30)
    fill("red")
    stroke("blue")
    text("Game Over", 225, 300)
  }
  sound.play();
}
function spawnDoors(){
  if (frameCount%240 === 0){
    door = createSprite(200, -80)
    climber = createSprite(200, -20)
    climber.velocityY = 1
    door.addImage(doorImage)
    climber.addImage(climberImage)
    door.velocityY = 1
    door.x = Math.round(random(120, 400))
    climber.x = door.x;
    door.lifetime = 800
    climber.lifetime = 800
    climberGroup.add(climber)
    doorGroup.add(door)
    invis = createSprite(200, -15)
    invis.width = climber.width
    invis.height = 2
    invis.x = climber.x
    invis.velocityY = 1
    ghost.depth = door.depth + 1
    invisGroup.add(invis)
    
  }
}
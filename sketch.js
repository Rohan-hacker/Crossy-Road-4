var grid = 50;
var width = 1366;
var carGroup1,logGroup1;
var grassHeight = 100;
var gameState = "play";
var carAnimation, logAnimation, playerAnimation;
var school;
var win, winImage;
function preload()
{
  cityAnimation=loadAnimation("city.png");
  carAnimation1=loadAnimation("car1.png");
  carAnimation2=loadAnimation("car2.png");
  playerAnimation=loadAnimation("cr playerrun 1.png","cr playerrun 2.png","cr playerrun 3.png","cr playerrun 4.png");
  logAnimation=loadAnimation("log.png");
  grassAnimation=loadAnimation("grass.png");
  roadAnimation=loadAnimation("road.png");
  seaAnimation=loadAnimation("sea1.png","sea1.png");
  winImage=loadImage("congrats.png");
  //backgroundImage=loadAnimation("sea1.png","sea1.png");
}

function setup() {
  createCanvas(1366,700);
  carGroup1 = new Group();
  logGroup1 = new Group();

  win=createSprite(650,-1400);
  win.visible=false;
  //win.debug=true;

 //Grasses where player can rest
 for(var i=0;i<6;i++){
  var bottomGrass1 = createSprite(683,height-50-(i*400),width,(grassHeight-100));
  if(i%2===0)//adding road
  {
   var road= createSprite(683,height-150-(i*400)-grassHeight,width,300,);
   road.addAnimation("road",roadAnimation);
   road.shapeColor="black";
   road.scale=1.25;
  }
  if(i%2===0)//adding road
  {
   var sea= createSprite(683,height-150-(i*400)-grassHeight,width,10,);
   sea.addAnimation("sea",seaAnimation);
   sea.shapeColor="black";
   sea.scale=0.6;
   sea.depth=road.depth-25;
  }
  bottomGrass1.addAnimation("grass",grassAnimation);
  bottomGrass1.shapeColor = "green";
  bottomGrass1.scale=1.02;
  bottomGrass1.depth=bottomGrass1.depth-20;
}
  //To create rows of car
   for(var i = 0; i < 40; i++){
     cars = new Car(2);
     carGroup1.add(cars.spt);
   }
  //To create rows of Logs
    for(var i = 0; i < 40; i++){
      log = new Log(-3);
      logGroup1.add(log.spt);
    }
    //create player
    player = new Player(width/2,height-75);

    //Creating city
    city=createSprite(width/2,-1600);
    city.addAnimation("city",cityAnimation);
    //city.debug=true;
    city.setCollider("rectangle",0,180,2000,200)
 }

function draw() {
  background("skyblue");

  //Making the cars re-apper
  for(i=1;i<carGroup1.length;i++) {
    if(carGroup1[i].x>width)
    {
     carGroup1[i].x=0;
    }
    if(carGroup1[i].x<0)
    {
      carGroup1[i].x=width;
    }
  }

  //making the logs reapper
  for(i=1;i<logGroup1.length;i++){
    if(logGroup1[i].x<0)
    {
    logGroup1[i].x=width;
    }
  }


  //move the screen to location of player.
  translate(0,-player.spt.y+height-150);

  console.log(player.y);

  //to make the player go to the starting position if he will touch car
  if(carGroup1.isTouching(player.spt)){
        player.spt.x = width/2;
        player.spt.y = height-75;
   }

  //to make the player float on the logs and if he will touch the river then he will again start 
  if(logGroup1.isTouching(player.spt)){  
    player.spt.x= player.spt.x-3;
   }
   else if((player.spt.y > height-1550 && player.spt.y < height-1300) ||
           (player.spt.y < height-500 && player.spt.y > height-850)|| 
           (player.spt.y>height)||
           (player.spt.x<0)||
           (player.spt.x>width)){

            player.spt.x = width/2;
            player.spt.y = height-75;
  }

//Win state
if(city.isTouching(player.spt)){
   gameState = "Win";
  }

 if(gameState === "Win")
 {
  stroke("Green");
  fill("Green");
  textSize(40);
  text("Congratulations! You Made It.",width/2-250,-1400  );
  win.addImage("win",winImage);
  //win.x=player.x;
  //win.y=player.y;
  win.scale=0.2;
  win.visible=true;
  win.depth=win.depth+50;
  carGroup1.destroyEach();
  logGroup1.destroyEach();
 } 
  drawSprites();
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    player.move(0,-2);
  }else if(keyCode == DOWN_ARROW){
    player.move(0,2);
  }else if(keyCode == LEFT_ARROW){
    player.move(-2,0);
  }else if(keyCode == RIGHT_ARROW){
    player.move(2,0);
  }
}




var astGroup, ast1, ast2, ast3, ast4, ast5;
var bgImg, bg1,explosion,exImg;
var ast,ship,ship1;
var gameState = 1;
var shipLife = 4;
var planet, planetImg;
var city, cityImg, bg2;

function preload(){
bgImg = loadImage("images/bg1.jpg");
ship1 = loadImage("images/ship.png");
ast1 = loadImage("images/ast1.png");
ast2 = loadImage("images/ast2.png");
ast3 = loadImage("images/ast3.png");
ast4 = loadImage("images/ast4.png");
ast5 = loadImage("images/ast5.png");
exImg = loadImage("images/explosion.png");
planetImg = loadImage("images/planet.png");
cityImg = loadImage("images/city.png");
bg2 = loadImage("images/bg2.png");
}

function setup(){
    createCanvas(600,650);
    bg1 = createSprite(300,325,650,700);
    bg1.addImage(bgImg);
    bg1.velocityX = -2;

    ship = createSprite(80,325,10,10);
    ship.addImage(ship1);
    ship.scale = 0.1
    astGroup = new Group();

    planet = createSprite(300,1000,40,40);
    planet.addImage(planetImg);
    planet.scale = 3;

    
}

function draw(){
    background(0);
if(gameState===1){
    if(bg1.x<200){ 
        bg1.x=300;
    }
    spawnAst();

    if(keyDown("UP_ARROW")){
        ship.y = ship.y - 4;
    }

    if(keyDown("DOWN_ARROW")){
       ship.y = ship.y + 4;
    }

     

    if(astGroup.collide(ship)){
        shipLife = shipLife - 1;
        for(var i = 0; i<astGroup.length;i++){
            astGroup.get(i).destroy();
        }
    }


    

    if(shipLife===0){
        ship.addImage(exImg);
        ship.scale = 0.7;
        ship.x = 140;
        astGroup.setVelocityXEach(0);
        astGroup.destroyEach();
        bg1.velocityX = 0;
    }

    if(frameCount===500){
        bg1.velocityX = 0;
        bg1.velocityY = -2;
        planet.velocityY = -2;
    }

    if(planet.y===250){
        planet.velocityY = 0;
        planet.destroy();
        gameState = 2;
        
    }

    if(gameState===2){
       
        console.log(gameState)
       bg1.addImage(bg2);

       city = createSprite(300,100,30,30);
       city.addImage(cityImg);
    }


    drawSprites();
    fill("white");
    textSize(14)
    text("Ship Defences: "+shipLife,460,45);
}

function spawnAst(){

    if(frameCount%72==0){
     ast = createSprite(600,random(0,650),20,20);
    ast.velocityX = -3
    ast.scale = 0.1

    var rand = Math.round(random(1,5));
    switch(rand){
        case 1: ast.addImage(ast1);
        break;
        case 2: ast.addImage(ast2);
        break;
        case 3: ast.addImage(ast3);
        break;
        case 4: ast.addImage(ast4);
        break;
        case 5: ast.addImage(ast5);
        break;
        default: break;
    }
    astGroup.add(ast);
}
}
}
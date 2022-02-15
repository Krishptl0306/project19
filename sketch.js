var road, car, person, dog, wall
var roadImg, carImg, personImg, dogImg, wallImg, crashImg
var passengerCollection = 0;
var personGroup, dogGroup, wallGroup 

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
roadImg = loadImage("Road.png");
carImg = loadImage("car.png");
personImg = loadImage("person.png");
dogImg = loadImage("dog.png");
wallImg = loadImage("wall.png");
crashImg = loadImage("crash.png");
}

function setup() {
 createCanvas(windowWidth,windowHeight);

 road = createSprite(width/2,200);
 road.addImage(roadImg);
 road.velocityY = 4;

car = createSprite(width/2,height-20,20,20)
car.addImage(carImg);
car.scale=0.2

personGroup = new Group();
dogGroup = new Group();
wallGroup = new Group();
}

function draw() {
    if(gameState === PLAY){
        background(0);
        car.x=World.mouseX;
        edges = createEdgeSprites();
        car.collide(edges);

    if(road.y > height){
        road.y = height/2
    }
    createDog();
    createPerson();
    createWall();
    
    if (personGroup.isTouching(car)) {
        personGroup.destroyEach();
        passengerCollection=passengerCollection + 100
    }
    else if (dogGroup.isTouching(car)){
        dogGroup.destroyEach();
        passengerCollection = passengerCollection + 50
    }else{ if(wallGroup.isTouching(car)){
        gameState=END;
        car.addAnimation(crashImg);
        boy.x = width/2;
        boy.y=height/2;
        boy.scale = 0.6;

        personGroup.destroyEach();
        dogGroup.destroyEach();
        wallGroup.destroyEach();

        personGroup.setVelocityYEach(0);
        dogGroup.setVelocityYEach(0);
        wallGroup.setVelocityYEach(0);
    }
    }
 drawSprites();
 textSize(20);
 fill(255);
 text("Passengers: "+ passengerCollection,width-150,30)
}
}
function createDog(){
    if(World.frameCount % 200 == 0){
    var dog = createSprite(Math.round(random(50,width-50),40,10,10));
    dog.addImage(dogImg);
    dog.scale = 0.1;
    dog.velocityY = 10;
    dog.lifetime = 200
    dogGroup.add(dog);
    }
}
function createPerson() {
    if(World.frameCount % 300 ==0) {
        var person = createSprite(Math.round(random(50,width-50),40,10,10))
        person.addImage(personImg);
        person.scale = 0.15
        person.velocityY = 10
        person.lifetime = 200
        personGroup.add(person);
    }
}
function createWall(){
    if(frameCount % 500 == 0) {
        var wall = createSprite(Math.round(random(50,width-50),40,10,10));
        wall.addImage(wallImg);
        wall.scale = 0.2
        wall.velocityY = 10
        wall.lifetime = 200;
        wallGroup.add(wall);
    }
}
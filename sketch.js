var canvas, backgroundImage;

var gameState = 0;
var playerCount = 0;

var database;

var allPlayers;
var distance = 0;

var form, player, game;

var car1,car2,car3,car4;
var cars; // array

var carIMG1,carIMG2,carIMG3,carIMG4;
var trackIMG, groundIMG;

var xVel, yVel;

function preload(){
  carIMG1 = loadImage("images/car1.png");
  carIMG2 = loadImage("images/car2.png");
  carIMG3 = loadImage("images/car3.png");
  carIMG4 = loadImage("images/car4.png");

  trackIMG = loadImage("images/track.jpg");
  groundIMG = loadImage("images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth,displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
  
}

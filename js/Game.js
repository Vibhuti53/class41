class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }
  
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage("car1",carIMG1);
    car2 = createSprite(300,200);
    car2.addImage("car2",carIMG2);
    car3 = createSprite(500,200);
    car3.addImage("car3",carIMG3);
    car4 = createSprite(700,200);
    car4.addImage("car4",carIMG4);

    // storing in an array
    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
    textSize(30);
  //text("Game Start",120,100);
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      background(groundImg);

      image(trackImg, 0, -displayHeight*4, displayWidth, displayHeight*5);

      // index of an array
      var index = 0;
      // x and y position of the cars
      var x = 175;
      var y;

      //var display_position = 130;
      for(var plr in allPlayers){
        console.log(plr);
        // add 1 to the index for every loop
        index = index+1;

        // position the car a little away from each other in x direction 
        x = 200+ (index*200) + allPlayers[plr].xPos;

        // use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;

        // assigning x and y values to the car
        cars[index-1].x = x;
        cars[index-1].y = y;

        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 75);

        console.log(cars[index-1].x);

        console.log(cars[index-1].y);

        console.log(index);
        console.log("Player Index: " +player.index);
        
        if(index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
        
      }
      
    }
    console.log(player.index);
/*
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance = player.distance + 10;
      player.update();
    }
*/
    if(player.distance < 2150){
      if(keyIsDown(38) && player.index !== null){
        yVel += 0.9;
        if(keyIsDown(37)){
            xVel -= 0.2;
        }
        if(keyIsDown(39)){
            xVel += 0.2;
        }
      }
      else if(keyIsDown(38) && yVel>0 && player.index !== null){
        yVel -= 0.1;
        xVel *= 0.9;
      }
      else{
        xVel *= 0.985;
        yVel *= 0.985;
      }
    }

    /*if(player.distance > 3860){
      gameState = 2;
    }*/

    //move the car
    player.distance += yVel;
    yVel *= 0.98;

    player.xPos += xVel;
    xVel *= 0.985;

    player.update();

    drawSprites();
  }

  end(){
    console.log("Game Ended");
    //alert("game ended");
  }
}
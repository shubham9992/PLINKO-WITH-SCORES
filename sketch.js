var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions=[];
var sc=[];
var divisionHeight=300;
var score =0;
var particle;
var turn=0;
var gameState="PLAY";
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
    r=random(100,1000)%50;
    if(r%50===0)
      text("r= "+r,400,200);
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 


function draw() {
  background("black");
  textSize(20)
 text("Score : "+score,20,30);
 if(gameState==="END"){
   text("GAME OVER");
 }
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
  //  if(frameCount%60===0){
  //    particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
  //   // score++;
  //  }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
     text(score);
   }
   var posx=20,posy=520;
  for(var a=0;a<10;a++,posx+=80){
    if(a<=3)
      text("500",posx,posy);
    if(a>3&&a<=6)
      text("100",posx,posy);
    if(a>6&&a<10) 
      text("200",posx,posy);
  }
  if(particle!=null)
  {
    particle.display();
    console.log("PART"+particle.body.position.y);
    if(particle.body.position.y>760)
    {
      if(particle.body.position.x<300)
      {
        score+=500;
        // particle=null;
        if(turn>=5){
          gameState="END";
        }
      }

      if(particle.body.position.x>=300 && particle.body.position.x<600)
      {
        score+=100;
        // particle=null;
        if(turn>=5){
          gameState="END";
        }
      }

        if(particle.body.position.x>=600 && particle.body.position.x<900)
      {
        score+=200;
        // particle=null;
        if(turn>=5){
          gameState="END";
        }
      }
      particle=null;
    }
  }
    if(gameState==="END"){
      textSize(60);
      text("Game Over !!!",250,250);
    }

}

function mousePressed(){
  if(gameState!=="END"){
    turn++;
    particle=new Particle(mouseX,10,10,10);
  }
}
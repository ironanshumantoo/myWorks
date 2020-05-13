var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth-2;
canvas.height=window.innerHeight-4;
var c=canvas.getContext("2d");
//colors
var snakeheadcolor="#2185C5";
var snakefillcolor='#7ECEFD';
var foodcolor='#FF7F66';
//for alighment of food and snake
var w=Math.floor(window.innerWidth/20)*20;
var h=Math.floor(window.innerHeight/20)*20;
var pixelx=Math.floor(w/200);
var pixely=Math.floor(h/200);
//resize window funcion
window.addEventListener('resize',function(event){

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
     w=Math.floor(window.innerWidth/20)*20;
 h=Math.floor(window.innerHeight/20)*20;
 pixelx=Math.floor(w/200);
 pixely=Math.floor(h/200);
});
//score
var score=0;
var highScore=0;



//var newbody=[];
function Snake(body){
    this.body=body;
    this.direction=1;
    
    this.draw=function(){
        c.fillStyle=snakeheadcolor;
        c.fillRect(this.body[1].x,this.body[1].y,15,15);
        c.fillStyle=snakefillcolor;
        for(var i=2;i<this.body.length;i++)
        c.fillRect(this.body[i].x,this.body[i].y,15,15);
    }
    this.component=function(cx,cy){
        this.x=cx;
        this.y=cy;
    }
    this.addcomp=function(ax,ay){
        this.body.push(new this.component(ax,ay));
        score+=1;
    }
    this.death=function(){
        for(var i=1;i<this.body.length;i++)
        {
            if(Math.abs(this.body[0].x-this.body[i].x)<=10  && Math.abs(this.body[0].y-this.body[i].y)<=10 )  
            this.destroyed();
        }
    }
   this.destroyed=function(){
        if(score>highScore)
        highScore=score;
        score=0;
       var l=this.body.length;
       for(var i=2;i<l;i++)
       this.body.pop();
       speed=0;
       startAnimating(10);
   }
   
 
   this.update=function(){
    if(this.direction==1)
    this.body[0].x+=20;
    if(this.direction==2)
    this.body[0].x-=20;
    if(this.direction==3)
    this.body[0].y-=20;
    if(this.direction==4)
    this.body[0].y+=20;
    if(this.body[0].x>window.innerWidth)
    this.body[0].x=0;
    if(this.body[0].x<0)
    this.body[0].x=w;
    if(this.body[0].y<0)
    this.body[0].y=h;
    if(this.body[0].y>window.innerHeight)
    this.body[0].y=0;
    
     this.death();
    //update
       for(var i=this.body.length-1;i>=1;i--)
       {this.body[i].x=this.body[i-1].x;
        this.body[i].y=this.body[i-1].y;
        //console.log(this.body[i].x);
        
       }
       
       this.draw();
     
   }
  
}

function Food(fx,fy){
    this.x=fx;
    this.y=fy;
    this.draw=function(){
        c.fillStyle=foodcolor;
        c.fillRect(this.x,this.y,15,15);
    }
}

var snakeBody=[];
var snake=new Snake(snakeBody);
snake.addcomp(60,100);
snake.addcomp(80,120);
score=0;

var fx=Math.random()*canvas.width;
var fy=Math.random()*canvas.height;
var eat=new Food(fx,fy);
eat.draw();

window.addEventListener('keypress',dChange,false);
function dChange(e){
    if(e.keyCode==54&&snake.direction!=2)
    snake.direction=1;
    if(e.keyCode==52&&snake.direction!=1)
    snake.direction=2;
    if(e.keyCode==50&& snake.direction!=3)
    snake.direction=4;
    if(e.keyCode==56&&snake.direction!=4)
    snake.direction=3;
    console.log('a');

}

var  fpsInterval, startTime, now, then, elapsed,speed=0,framesps=10;


// initialize the timer variables and start the animation

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate(){
    requestAnimationFrame(animate);
    //calculting distance
   

    //console.log(eat.x);
    if(Math.abs( snake.body[0].x-eat.x)<=15&&Math.abs(snake.body[0].y-eat.y)<=15) 
     {
          var length=snake.body.length-1;
         snake.addcomp(snake.body[length].x,snake.body[length].y  );
         fx=Math.floor(Math.random()*10)*20*pixelx;
         fy=Math.floor(Math.random()*10)*20*pixely;
         console.log(fx);
         console.log(fy);
         eat=new Food(fx,fy);
         speed+=1;
         startAnimating(framesps+speed);
         
     }
            //resize window

     //time


    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);
    
       
    c.clearRect(0,0,canvas.width,canvas.height);
    
    snake.update();
    eat.draw();
    //score update
    c.fillStyle='white';
    c.font='20px verdana'
    c.fillText('Highest Score : ',canvas.width-200,20);
    c.fillText(highScore,canvas.width-70,20);
    c.fillText('Current Score : ',canvas.width-200,40);
    c.fillText(score,canvas.width-70,40);
    }
  
   
}
startAnimating(framesps);

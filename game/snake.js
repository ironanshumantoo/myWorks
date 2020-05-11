var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext("2d");

function Snake(body){
    this.body=body;
    this.direction=1;
    
    this.draw=function(){
        c.fillStyle='white';
        for(var i=0;i<this.body.length;i++)
        c.fillRect(this.body[i].x,this.body[i].y,15,15);
    }
    this.component=function(cx,cy){
        this.x=cx;
        this.y=cy;
    }
   
   this.addcomp=function(ax,ay){
       this.body.push(new this.component(ax,ay));
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
    if(this.body[0].x>canvas.width)
    this.body[0].x=0;
    if(this.body[0].y>canvas.height)
    this.body[0].y=0;
       for(var i=this.body.length-1;i>=1;i--)
       {this.body[i].x=this.body[i-1].x;
        this.body[i].y=this.body[i-1].y;
        //console.log(this.body[i].x);
        
       }
       
       this.draw();
     
   }
  
}

function Food(x,y){
    this.x=x;
    this.y=y;
    this.draw=function(){
        c.fillStyle='white';
        c.fillRect(this.x,this.y,15,15);
    }
}

var snakeBody=[];
var snake=new Snake(snakeBody);
snake.addcomp(50,100);
snake.addcomp(50,120);
snake.addcomp(50,140);snake.addcomp(50,160);snake.addcomp(50,180);

var fx=Math.random()*canvas.width;
var fy=Math.random()*canvas.height;
var eat=new Food(fx,fy);
eat.draw();

window.addEventListener('keypress',dChange,false);
function dChange(e){
    if(e.keyCode==54)
    snake.direction=1;
    if(e.keyCode==52)
    snake.direction=2;
    if(e.keyCode==50)
    snake.direction=4;
    if(e.keyCode==56)
    snake.direction=3;
    console.log('a');

}

var  fpsInterval, startTime, now, then, elapsed;


// initialize the timer variables and start the animation

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}



function animate(){
    requestAnimationFrame(animate);
    
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);
    
       
    c.clearRect(0,0,canvas.width,canvas.height);
    
    snake.update();
    }
  
   
}
startAnimating(10);

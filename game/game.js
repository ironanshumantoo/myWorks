var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

console.log(canvas);

var c=canvas.getContext("2d");

function Circle(x,y,rad,dx,dy){
    this.x=x;
    this.y=y;
    this.radius=rad;
    this.dx=dx;
    this.dy=dy;
    this.draw=function(){
        console.log('object ');
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        c.strokeStyle='blue';
        c.stroke();
    }
    this.update=function(){
           this.x+=dx;
           this.y+=dy;
          
           if(this.x+this.radius>canvas.width||this.x-this.radius<0)
           dx=-dx;
           if(this.y+this.radius>canvas.height||this.y-this.radius<0)
           dy=-dy;
           this.draw();
    }
}

var arrcircle=[];
    for(var i=0;i<50;i++){
     var x=Math.random()*window.innerWidth;
     var y=Math.random()*window.innerHeight;
     var dx=(Math.random()-0.5)*10;
     var dy=(Math.random()-0.5)*10;
     var radius=Math.random()*50;
        arrcircle.push(new Circle(x,y,radius,dx,dy));
    }
    function animate(){
        requestAnimationFrame(animate);

        c.clearRect(0,0,canvas.width,canvas.height);
        for(var i=0;i<arrcircle.length;i++)
        arrcircle[i].update();
        
        

    }
animate();




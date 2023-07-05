const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

window.addEventListener("resize",function()
{
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    // canvas.height = 700;

    ctx=canvas.getContext("2d")
})


canvas.width = window.innerWidth;
canvas.height=window.innerHeight

// canvas.height = 700;
 
let particleArray = [];

class Particle{
    constructor(xCor, yCor, size, speed, angle, color1){
        this.x = (window.innerWidth/100)*xCor;
        this.y = (window.innerHeight/100)*yCor;
        this.size = (canvas.height/100)*size;
        this.angle = ((Math.PI)/180)*angle;
        this.speedy = speed*Math.sin(this.angle);
        this.speedx = speed*Math.cos(this.angle);
        this.color1 = color1;

        
    }
    update(){
        this.x += this.speedx;
        this.y += this.speedy;

        if ((this.x + this.speedx > canvas.width-this.size) ||
            (this.x + this.speedx < this.size)){
                this.speedx = -this.speedx;
            }
        if ((this.y + this.speedy > canvas.height-this.size) ||
            (this.y + this.speedy < this.size)){
                this.speedy = -this.speedy;
            } 
    }
    draw(){
        this.gradient = ctx.createRadialGradient(this.x+this.size/4, this.y-this.size/3, this.size/10000, this.x, this.y, this.size)
        this.gradient.addColorStop(0, "#5967be");
        this.gradient.addColorStop(1, "#0a144f")
        
        ctx.beginPath();
        ctx.fillStyle = this.gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
} 


const particle1 = new Particle(90, 90, 2, 2, 45, "white");
const particle2 = new Particle(50, 50, 4, 2, 10, "white");
const particle3 = new Particle(80, 30, 6, 2, -80, "white");
const particle4 = new Particle(20, 70, 9, 2, 60, "white");
const particle5 = new Particle(40, 70, 12, 1, -45, "white");
const particle6 = new Particle(30, 40, 15, 1, 110, "white");
const particle7 = new Particle(60, 60, 18, 1, -30, "white");

particleArray.push(particle1);
particleArray.push(particle2);
particleArray.push(particle3);
particleArray.push(particle4);
particleArray.push(particle5);
particleArray.push(particle6);
particleArray.push(particle7);


function handel(){
    for (let i=0; i<(particleArray.length); i++){
            particleArray[i].draw();
            particleArray[i].update();
    }
}


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handel();
    requestAnimationFrame(animate);
}




animate();

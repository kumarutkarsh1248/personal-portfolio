const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

window.addEventListener("resize",function()
{
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
    ctx=canvas.getContext("2d")
})


canvas.width = window.innerWidth;
canvas.height = 700;
 
let particleArray = [];

class Particle{
    constructor(xCor, yCor, size, speedx, speedy, color1){
        this.x = xCor;
        this.y = yCor;
        this.size = size;
        this.speedx = speedx;
        this.speedy = speedy;
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
        this.gradient.addColorStop(1, "#13175e")
        
        ctx.beginPath();

        
        ctx.fillStyle = this.gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
} 


const particle1 = new Particle(500, 200, 10, -0.5, 1.5, "white");
const particle2 = new Particle(500, 200, 20, 1, 0.4, "white");
const particle3 = new Particle(400, 500, 30, 1, -1, "white");
const particle4 = new Particle(200, 200, 40, -1, -2, "white");
const particle5 = new Particle(200, 200, 60, -0.2, 1, "white");
const particle6 = new Particle(200, 500, 80, 1, 0.5, "white");
const particle7 = new Particle(600, 600, 100, -0.5, -1, "white");

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

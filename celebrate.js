//definig some constant
const pi = 3.1415;
let ball_array = [];






//to get mouse coordinate relative to the area
let mouse ={
    x: undefined,
    y:undefined
}
let area_element = document.querySelector("#area");
let area_information = area_element.getBoundingClientRect();
let area_computed = window.getComputedStyle(area_element);

let ball = document.querySelector(".ball");
let ball_information = ball.getBoundingClientRect();
let ball_computed = window.getComputedStyle(ball);
// console.log(ball_information)
let cel_img = document.querySelector("#area img");
let cel_img_info = cel_img.getBoundingClientRect();

document.querySelector(" .celebration_img img").left = cel_img_info.left;
document.querySelector(" .celebration_img img").top = cel_img_info.top;

console.log(`x:${cel_img_info.left}, y:${cel_img_info.top}`)


function addBall_updateMouse(e){
    // mouse.x = e.x - area_information.left;
    // mouse.y = e.y - area_information.top;
    for(let i=0; i<60; i++){
        let random_angle = 190+Math.random()*50;
        let random_speed = 10+Math.random()*10;
        ball_array.push(new Ball(cel_img_info.left+25,cel_img_info.top+25, 60, random_speed, random_angle, 0.25))
        // mouse.x, mouse.y
    }
}
function move(){
    // console.log(`mouse x${mouse.x}`)
    let area_width = +(area_computed.width).slice(-area_computed.width.length,-2);
    let area_height = +(area_computed.height).slice(-area_computed.height.length,-2);
    // console.log(area_height)
    // console.log(area_width)

    ball_array.forEach(element=>{
        if((element.position.x  < area_width) && (element.position.y  < area_height) && (element.position.x  > -100) && (element.position.y  > -100)){
            
            // console.log(`elemnt.position.y ${element.position.y} area_height ${area_height}`)
            element.update();

        }else{
            element.element.remove();
            ball_array.splice(ball_array.indexOf(element),1);
        }
    })
}


//constructing the balls
let ball_width = ball_information.width;
let emoji_array = ["🙂","🔥","🎗️","🎈","🧨","✨","🔭","🕯️","💡","🔍"]

class Ball{
    constructor(x_cor, y_cor, size, speed, angle, acc){
        this.angle = (angle)*(pi/180);
        this.x_velocity = speed * Math.cos(this.angle);
        this.y_velocity = speed * Math.sin(this.angle);

        this.position = {x: x_cor-ball_width/2, y: y_cor-ball_width/2}
        this.size = size;
        this.speed = speed;
        this.angle = angle;
        this.acc = acc;
        this.emoji = emoji_array[Math.floor(Math.random()*9)]

        this.element = document.createElement("div");
        this.element.innerText = this.emoji;
        this.element.classList.add("ball");
        this.element.style.width = this.size;
        this.element.style.height = this.size;
        area.appendChild(this.element);

        this.element.style.left = this.position.x +"px";
        this.element.style.top = this.position.y +"px";
    }
    update(){
        this.position.x += this.x_velocity;
        this.position.y += this.y_velocity;
        this.element.style.left = this.position.x +"px";
        this.element.style.top = this.position.y +"px";

        this.y_velocity += this.acc;
    }
}

document.querySelector("#area img").addEventListener("click", addBall_updateMouse);
window.setInterval(move, 10)

document.querySelector(".celebration_img img").addEventListener("click", ()=>{
    addBall_updateMouse();
    document.querySelector("#area").style.zIndex = "3";
    document.querySelector(".celebration_img").style.zIndex = "-1";

    setTimeout(()=>{
        document.querySelector("#area").style.zIndex = "-1";
        document.querySelector(".celebration_img").style.zIndex = "auto";
    }, 5000)
});


console.log(document.querySelector("#area_absolute").style)

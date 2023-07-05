const apiKey = "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"
let blocks_array =[[],[],[]];
let matrix = [[null, null, null],[null, null, null],[null, null, null]];
let human_turn = true;
let computer_turn = false;

const gameBox = document.querySelector('.game_box');
const heading = document.querySelector(".tic_tac h1")
const pop = document.querySelector(".popup")

//object for each cell of the tic tac toe
class Block{
    constructor(X, Y){
        this.position = {x:X, y:Y}
        this.element = document.createElement("div");
        this.element.style.gridRowStart = this.position.x+1;
        this.element.style.gridColumnStart = this.position.y+1;
        this.element.classList.add("block");
        gameBox.appendChild(this.element);
    }
}
//creating the block
for (let i=0; i<3; i++){
    for(let j=0; j<3; j++){
        blocks_array[i].push(new Block(i,j))
    }
}

//calling the api to give undated matrix
async function fetchData(inputMatrix){
    const response = await fetch("https://api.openai.com/v1/completions", {
    method: "post",
    headers:{
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
    "model": "text-davinci-003",
    "prompt": "In a game of tic-tac-toe, the current matrix position is as follows:"+JSON.stringify(inputMatrix)+"\n\nyou can replace only one of null with 0 and give the new matrix after your move",
    "max_tokens": 30
})
    })
    const data = await response.json()
    console.log("got response from the api")
    const matrixString = data.choices[0].text;
    const cleanedString = extractArray(matrixString);
    const matrix = JSON.parse(cleanedString);
    return matrix;
}
//to get array from the responce of the api
function extractArray(string){
    let start=0;
    let end =0;
    for(let i=0; i<string.length; i++){
        if(string[i]=="["){
            start = i;
            break;
        }
    }
    for(let i=string.length-1; i>0; i--){
        if(string[i]=="]"){
            end =i;
            break;
        }
    }
    return string.slice(start, end +1)
}

update();

function update(){
    for (let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(matrix[i][j]==1){
                blocks_array[i][j].element.classList.add("H")
                blocks_array[i][j].element.innerText = "o"
                blocks_array[i][j].element.removeEventListener("click", func)
            }
            else if(matrix[i][j]==0){
                blocks_array[i][j].element.classList.add("A")
                blocks_array[i][j].element.innerText = "x"
                blocks_array[i][j].element.removeEventListener("click", func)
            }
            else{
                blocks_array[i][j].element.addEventListener("click", func);
                blocks_array[i][j].element.classList.remove("A")
                blocks_array[i][j].element.classList.remove("H")
                blocks_array[i][j].element.innerText = ""
            }
        }
    }
}
async function func(event){
    const cell = event.target;
    const gridRow = getGridRow(cell);
    const gridColumn = getGridColumn(cell);
    if(human_turn == true){
        matrix[gridRow-1][gridColumn-1] =1;
    }
    console.log(matrix)
    update();
    if(win(1)==1){
        return;
    }else{
        human_turn=false;
        computer_turn=true;

        heading.innerText ="AI is responding"
        matrix = await fetchData(matrix);
        update();
        win(0)
        heading.innerText ="your turn"
        human_turn=true;
        computer_turn=false;
    }
}
//checking the win or loss
function win(player){
    for(let i=0; i<3; i++){
        if(matrix[i][0]==matrix[i][1] && matrix[i][1]==matrix[i][2] &&matrix[i][0]==player){
            heading.innerText = player==1?"human win":"ai win";
            pop.style.zIndex = 1
            restart()
            return player;
            
        }else if(matrix[0][i]==matrix[1][i] && matrix[1][i]==matrix[2][i] &&matrix[0][i]==player){
            heading.innerText = player==1?"human win":"ai win";
            pop.style.zIndex = 1
            restart()
            return player;

        }else if(matrix[0][0]==matrix[1][1] && matrix[1][1]==matrix[2][2] &&matrix[0][0]==player){
            heading.innerText = player==1?"human win":"ai win";
            pop.style.zIndex = 1
            restart()
            return player;

        }else if(matrix[0][2]==matrix[1][1] && matrix[1][1]==matrix[2][0] &&matrix[1][1]==player){
            heading.innerText = player==1?"human win":"ai win";
            pop.style.zIndex = 1
            restart()
            return player;
        }
    }
    return -1;
}
function restart(){
    blocks_array =[[],[],[]];
    matrix = [[null, null, null],[null, null, null],[null, null, null]];
    for (let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            blocks_array[i].push(new Block(i,j))
        }
    }
    console.log("before update")
    update();
    console.log("after update")

    pop.innerHTML = "<h1>restart the game<\h1>"

}
pop.addEventListener("click", ()=>{
    pop.style.zIndex = -1;
    heading.innerText ="your turn"

})



// Function to get the grid row of a cell
function getGridRow(cell) {
    const gridRow = parseInt(getComputedStyle(cell).gridRowStart);
    return gridRow;
  }
  
  // Function to get the grid column of a cell
  function getGridColumn(cell) {
    const gridColumn = parseInt(getComputedStyle(cell).gridColumnStart);
    return gridColumn;
  }




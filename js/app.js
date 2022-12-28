const saveBtc = document.getElementById("save")
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const EraserBtn = document.getElementById("eraser-btn");
const DestroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const color = document.querySelector("#color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap="round";

//-------------집------------------
// ctx.fillRect(200,200,50,200);
// ctx.fillRect(400,200,50,200);
// ctx.lineWidth = 2;
// ctx.fillRect(300,300,50,100);
// ctx.fillRect(200,200,200, 20)

// ctx.moveTo(200,200);
// ctx.lineTo(325,100);
// ctx.lineTo(450,200)
// ctx.fill();
//---------------------------------


//------------사람-----------------
// ctx.fillRect(210,200,15,100);
// ctx.fillRect(350,200,15,100);
// ctx.fillRect(260,200,60,200);

// ctx.arc(250+39,160,40,0,2*Math.PI);
// ctx.fill();


// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(235 +39,160,5,0,2*Math.PI)
// ctx.arc(265 +39,160,5,0,2*Math.PI)
// ctx.fill();
//---------------------------------


//----------mousemove에 맟춰서 선 그리기--------------
// ctx.moveTo(0,0);
// const colors = [
//     "#ff3838",
//     "#ffb8b8",
//     "#c56cf0",
//     "#ff9f1a",
//     "#fff200",
//     "#32ff7e",
//     "#7efff5",
// ];
// function onClick(event){
//     ctx.beginPath();
//     ctx.moveTo(0,0);
//     const color = colors[Math.floor(Math.random()*colors.length)];
//     ctx.strokeStyle = color;
//     ctx.lineTo(event.offsetX, event.offsetY);
//     ctx.stroke();
// }
// canvas.addEventListener("mousemove",onClick)
//---------------------------------------------------------


let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX,event.offsetY);
}
 
function startPainting(){
    isPainting = true;
}

function cancelPainting(){
    isPainting = false;
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle = "white"
    ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        fileInput.value = null;
    };
}

function onDoubleClick(event){
    const text = textInput.value;
    if(text !==""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "68px serif";
        ctx.fillText(text,event.offsetX,event.offsetY);
        ctx.restore(); //save()부터 값이 변경되더라도 다시 돌아옴
    }
}

function onSaveCilck(){
    const url =canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("dblclick",onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);


colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
DestroyBtn.addEventListener("click",onDestroyClick);
EraserBtn.addEventListener("click",onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtc.addEventListener("click", onSaveCilck);
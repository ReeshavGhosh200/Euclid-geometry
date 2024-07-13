const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const option = document.getElementById("num");
const msg = document.getElementById("msg");

let height = canvas.height = canvas.clientHeight;
let width = canvas.width = canvas.clientWidth;

let xPos = () => Math.floor(Math.random() * width) + 1;
let yPos = () => Math.floor(Math.random() * height) + 1;
canvas.style.touchAction = 'none';

let one = false;
let two = false;
let three = false;
let four = false;
let five = false;
function allFalse () {one=false;two=false;three=false;four=false;five=false;}
option.addEventListener("change", e => {
    switch (e.target.value){
        case "1":
            allFalse();
            one = true;
            break;
        case "2":
            allFalse();
            two = true;
            break;
        case "3":
            allFalse();
            three = true;
            break;
        case "4":
            allFalse();
            four = true;
            break;
        case "5":
            allFalse();
            five = true;
            break
    }
})

const pointA = {
  x: xPos(),
  y: yPos(),
  r: 7,
}

const pointB = {
  x: xPos(),
  y: yPos(),
  r: 7,
}

const pointD = {
    x: xPos(),
    y: yPos(),
    r: 7,
}
const pointE = {
    x: xPos(),
    y: yPos(),
    r: 7,
}

function draw(color, x, y, r, text){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.font = "20px Raleway";
  ctx.fillText(text, x - 6, y + 25);
}

let aHovered = false;
let bHovered = false;
let dHovered = false;
let eHovered = false;
let draggingPoint = null;

function render() {
  ctx.clearRect(0, 0, width, height);
  let radius = getDistance(pointA.x, pointA.y, pointB.x, pointB.y);
  if(one){
    msg.innerHTML = "Postulate 1:  A straight line may be drawn from any one point to any other point";
    draw("red", pointA.x, pointA.y, pointA.r, "A");
    draw("orange", pointB.x, pointB.y, pointB.r, "B");
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.lineTo(pointD.x, pointD.y);
    ctx.stroke();
  }
  //////
  else if(two){
    msg.innerHTML = "Postulate 2: A terminated line can be further produced indefinitely";
    draw("red", pointA.x, pointA.y, pointA.r, "A");
    draw("orange", pointB.x, pointB.y, pointB.r, "B");
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);

    // never really thought maths was this hard
    const angle = Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x);
    ctx.save();
    ctx.translate(pointA.x, pointA.y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(15, -5);
    ctx.lineTo(15, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(pointB.x, pointB.y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(-15, -5);
    ctx.lineTo(-15, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    //!
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(0, (pointA.y - pointB.y) * (0 - pointA.x) / (pointA.x - pointB.x) + pointA.y);
    ctx.lineTo(width, (pointA.y - pointB.y) * (width - pointA.x) / (pointA.x - pointB.x) + pointA.y);

    ctx.moveTo(pointB.x, pointB.y);
    ctx.lineTo(0, (pointB.y - pointA.y) * (0 - pointB.x) / (pointB.x - pointA.x) + pointB.y);
    ctx.lineTo(width, (pointB.y - pointA.y) * (width - pointB.x) / (pointB.x - pointA.x

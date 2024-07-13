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
    ctx.lineTo(width, (pointB.y - pointA.y) * (width - pointB.x) / (pointB.x - pointA.x) + pointB.y);

    ctx.stroke();
  }
  //////
  else if(three){
    msg.innerHTML = "Postulate 3: A circle can be drawn with any centre and any radius.";
    ctx.beginPath();
    ctx.arc(pointA.x, pointA.y, radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "20px Raleway";
    ctx.fillText(`Radius: ${radius.toFixed(2)}px`, width/2-10, height - 10);
    draw("red", pointA.x, pointA.y, pointA.r, "A");
    draw("orange", pointB.x, pointB.y, pointB.r, "B");
  }
  //////
  else if(four) {
    msg.innerHTML = "Postulate 4: All Right Angles are congruent";
    let distance = getDistance(pointA.x, pointA.y, pointB.x, pointB.y)
    midX = (pointA.x + pointB.x) / 2;
    midY = (pointA.y + pointB.y) / 2;

    angle = Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x);
    perpendicularAngle = angle + Math.PI / 2;

    endX = midX + Math.cos(perpendicularAngle) * distance / 2;
    endY = midY + Math.sin(perpendicularAngle) * distance / 2;
    draw("red", pointA.x, pointA.y, pointA.r, "A");
    draw("orange", pointB.x, pointB.y, pointB.r, "B");
    draw("dodgerblue", midX, midY, 7, "C")
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.moveTo(midX, midY);
    ctx.lineTo(endX, endY);
    ////////
    let distance2 = getDistance(pointD.x, pointD.y, pointE.x, pointE.y)
    midX2 = (pointD.x + pointE.x) / 2;
    midY2 = (pointD.y + pointE.y) / 2;
    
    angle = Math.atan2(pointE.y - pointD.y, pointE.x - pointD.x);
    perpendicularAngle = angle + Math.PI / 2;
    
    endX = midX2 + Math.cos(perpendicularAngle) * distance2 / 2;
    endY = midY2 + Math.sin(perpendicularAngle) * distance2 / 2;
    draw("red", pointD.x, pointD.y, pointD.r, "D");
    draw("orange", pointE.x, pointE.y, pointE.r, "E");
    draw("dodgerblue", midX, midY, 7, "C")
    ctx.beginPath();
    ctx.moveTo(pointD.x, pointD.y);
    ctx.lineTo(pointE.x, pointE.y);
    ctx.moveTo(midX2, midY2);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
  //////
  else if(five){
    msg.innerHTML = "Postulate 5: If two lines are drawn which intersect a third in such a way that the sum of the inner angles on one side is less than two Right Angles, then the two lines inevitably must intersect each other on that side if extended far enough.";
    ctx.fillStyle = "dodgerblue";
    ctx.font = "40px Raleway";
    ctx.fillText(`Comming Soon!`, 10, height / 2);
  }
  
  requestAnimationFrame(render);
}

render();

canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    aHovered = check(mouseX, mouseY, pointA);
    bHovered = check(mouseX, mouseY, pointB);

    if (draggingPoint) {
        draggingPoint.x = mouseX;
        draggingPoint.y = mouseY;
    }

    canvas.style.cursor = (aHovered || bHovered) ? "grab" : "default";
});

canvas.addEventListener("mousedown", (event) => {
  if (aHovered) {
    draggingPoint = pointA;
    canvas.style.cursor = "grabbing";
  } else if (bHovered) {
    draggingPoint = pointB;
    canvas.style.cursor = "grabbing";
  }
});

canvas.addEventListener("mouseup", () => {
  draggingPoint = null;
  canvas.style.cursor = (aHovered || bHovered) ? "grab" : "default";
});

// Add touch events
canvas.addEventListener("touchstart", (event) => {
  const rect = canvas.getBoundingClientRect();
  const touchX = event.touches[0].clientX - rect.left;
  const touchY = event.touches[0].clientY - rect.top;

  aHovered = check(touchX, touchY, pointA);
  bHovered = check(touchX, touchY, pointB);

  if (aHovered) {
    draggingPoint = pointA;
    canvas.style.cursor = "grabbing";
  } else if (bHovered) {
    draggingPoint = pointB;
    canvas.style.cursor = "grabbing";
  }
});

canvas.addEventListener("touchmove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const touchX = event.touches[0].clientX - rect.left;
  const touchY = event.touches[0].clientY - rect.top;

  if (draggingPoint) {
    draggingPoint.x = touchX;
    draggingPoint.y = touchY;
  }
});

canvas.addEventListener("touchend", () => {
  draggingPoint = null;
  canvas.style.cursor = (aHovered || bHovered) ? "grab" : "default";
});

function check(mouseX, mouseY, point) {
  const dist = Math.hypot(mouseX - point.x, mouseY - point.y);
  return dist < (point.r + 14);
}

window.addEventListener("resize", () => {
  height = canvas.height = canvas.clientHeight;
  width = canvas.width = canvas.clientWidth;
  pointA.x = xPos();
  pointA.y = yPos();

  pointB.x = xPos();
  pointB.y = yPos();
});

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

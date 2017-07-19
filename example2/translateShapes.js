
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var dragStartX = 0;
var dragStartY = 0;
var flag = false;
var circleX0 = 200;
var circleY0 = 200;
var RectangleX0 = 300;
var RectangleY0 = 300;
var RectangleW= 300;
var RectangleH= 100;
var drawMethods = [];


var Circle = function () {
  this.x = circleX0;
  this.y = circleY0;
  this.radius = 50;
  this.isSelected = false;

}

var Rectangle = function () {
  this.x = RectangleX0;
  this.y = RectangleY0;
  this.w = RectangleW;
  this.h = RectangleH;
  this.isSelected = false;
}

var circle = new Circle();
var rectangle = new Rectangle();

var drawCircle = function () {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y , circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'black';
}

var drawRect = function () {
  ctx.beginPath();
  ctx.rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'black';
}



var checkShapeSelect = function(e) {
    dragStartX = e.offsetX;
    dragStartY = e.offsetY;
    for(var i=0;i < drawMethods.length;i++) {
      drawMethods[i]();
      if (ctx.isPointInPath(dragStartX, dragStartY)) {
        if (i == 0) {
          circle.isSelected = true;
        } else {
          rectangle.isSelected = true;
        }
        flag = true;
        break;
      }
    }

}

var translateShape = function(e) {
  if (flag) {
    var mouseX = e.offsetX;
    var mouseY = e.offsetY;

    var offsetX = mouseX - dragStartX;
    var offsetY = mouseY - dragStartY;
    if (circle.isSelected) {
      circle.x = circleX0 + offsetX;
      circle.y = circleY0 + offsetY;
    } else {
      rectangle.x = RectangleX0 + offsetX;
      rectangle.y = RectangleY0 + offsetY;
    }
    console.log(circle.x);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawCircle();
    ctx.fill();
    drawRect();
    ctx.fill();
  }

}

var endDragShape = function(e) {
  if (circle.isSelected) {
    circleX0 =  circleX0 + e.offsetX - dragStartX;
    circleY0 =  circleY0 + e.offsetY - dragStartY;
    circle.isSelected = false;
  } else {
    RectangleX0 =  RectangleX0 + e.offsetX - dragStartX;
    RectangleY0 =  RectangleY0 + e.offsetY - dragStartY;
    rectangle.isSelected = false;
  }

  flag = false;
}


var init = function() {
  canvas.addEventListener('mousedown',checkShapeSelect);
  canvas.addEventListener('mousemove',translateShape);
  canvas.addEventListener('mouseup',endDragShape);
  drawMethods = [drawCircle, drawRect];
}

init();
drawCircle();
ctx.fill();
drawRect();
ctx.fill();

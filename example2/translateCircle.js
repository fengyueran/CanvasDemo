
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var circle = false;
var dragStartX = 0;
var dragStartY = 0;
var flag = false;
var circleX0 = 200;
var circleY0 = 200;

var Circle = function () {
  this.x = circleX0;
  this.y = circleY0;
  this.radius = 50;
  this.isSelected = false;

}

var drawCircle = function () {
  if (!circle) {
    circle = new Circle();
  }

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.beginPath();
  // 因为是tanslate来平移，即改变坐标系来平移，则圆心不用改变
  ctx.arc(circleX0, circleY0 , circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'black';

  ctx.fill();
  ctx.stroke();
}




var checkCircleSelect = function(e) {
    dragStartX = e.offsetX;
    dragStartY = e.offsetY;

    if (ctx.isPointInPath(dragStartX, dragStartY)) {
      flag = true;
    }
}

var translateCircle = function(e) {
  if (flag) {
    ctx.save();
    var mouseX = e.offsetX;
    var mouseY = e.offsetY;

    var offsetX = mouseX - dragStartX;
    var offsetY = mouseY - dragStartY;

    ctx.translate(offsetX, offsetY);
    drawCircle();
    ctx.restore();
  }

}

var endDragCircle = function(e) {
  circleX0 =  circleX0 + e.offsetX - dragStartX;
  circleY0 =  circleY0 + e.offsetY - dragStartY;
  flag = false;
}


var init = function() {
  canvas.addEventListener('mousedown',checkCircleSelect);
  canvas.addEventListener('mousemove',translateCircle);
  canvas.addEventListener('mouseup',endDragCircle);
}

init();
drawCircle();


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var circle = false;

var Circle = function () {
  this.x = 200;
  this.y = 200;
  this.radius = 50;
  this.isSelected = false;

}

var drawCircle = function () {
  if (!circle) {
    circle = new Circle();
  }

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'black';

  if (circle.isSelected) {
     ctx.lineWidth = 5;
  } else {
    ctx.lineWidth = 1;
  }

  ctx.fill();
  ctx.stroke();
}




var checkCircleSelect = function(e) {
    var clickX = e.offsetX;
    var clickY = e.offsetY;
    //1.计算圆心与鼠标距离
    var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2)+Math.pow(circle.y - clickY,2));
    var isSelected = distanceFromCenter < circle.radius;
    //2. 利用isPointInPath,以最后一次path为准
    isSelected = ctx.isPointInPath(clickX, clickY);
    if (isSelected) {
      circle.isSelected = true;
    } else {
      circle.isSelected = false;
    }
    drawCircle();
}

var init = function() {
  canvas.addEventListener('mousedown',checkCircleSelect);
}

init();
drawCircle();

var getCanvas = function() {
  var canvas = document.getElementById('canvas');
  canvas.width = 2000;
  canvas.height = 800;
  return canvas;
}

var drawLine = function(canvas) {

  var context = canvas.getContext("2d");

  context.moveTo(150,150);
  context.lineTo(230,350);
  context.lineTo(150,550);
  context.lineWidth = 8;
  context.strokeStyle = 'black';
  context.stroke();

  context.moveTo(200,150);
  context.lineTo(280,350);
  context.lineTo(200,550);
  context.lineWidth = 4;
  context.strokeStyle = 'red';
  context.stroke();

  context.beginPath();
  context.moveTo(250,150);
  context.lineTo(330,350);
  context.lineTo(250,550);
  context.lineWidth = 4;
  context.strokeStyle = 'blue';
  context.stroke();
  context.closePath();
}

var drawRect = function(canvas) {

  var context = canvas.getContext("2d");

  context.beginPath();
  context.moveTo(600,150);
  context.lineTo(900,150);
  context.lineTo(900,550);
  context.lineTo(600,550);
  context.closePath();
  context.lineWidth = 4;
  context.strokeStyle = 'blue';
  context.fillStyle = 'red';

  context.fill();
  context.stroke();

  context.beginPath();
  context.rect(1000,150,100,100);

  context.lineWidth = 4;
  context.strokeStyle = 'blue';
  context.fillStyle = 'red';

  context.fill();
  context.stroke();

}

var draw = function() {
  var canvas = getCanvas();
  drawLine(canvas);
  drawRect(canvas);
}

draw();

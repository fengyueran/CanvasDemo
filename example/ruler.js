
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var flag = false;
var startDrawX = 0;
var startDrawY = 0;
var axonLength = 30;
var shortAxonLength = 15;
var shortAxonInterval = 20;
var rotater = {};


var getAxonPosition = function(drawInfo) {
  var startPointX = drawInfo.startPoint.x - drawInfo.length * drawInfo.trace.sinA;
  var startPointY = drawInfo.startPoint.y + drawInfo.length * drawInfo.trace.cosA;

  var endPointX = drawInfo.startPoint.x + drawInfo.length * drawInfo.trace.sinA;
  var endPointY = drawInfo.startPoint.y - drawInfo.length  * drawInfo.trace.cosA;

  var axonPosition = { startPoint:{ x:startPointX, y:startPointY }, endPoint:{ x:endPointX, y:endPointY } };
  return axonPosition;
}


var readyToDraw = function(e) {
  flag = true;
  startDrawX = e.offsetX;
  startDrawY = e.offsetY;
}

var draw = function(e) {
  if (flag) {

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();

    var dx = e.offsetX - startDrawX;
    var dy = e.offsetY - startDrawY;
    var s = Math.sqrt(dx * dx + dy * dy);
    var sinA = dy / s;
    var cosA = dx / s;

    var drawInfo = { startPoint:{ x:startDrawX, y:startDrawY }, trace:{ sinA, cosA }, length:axonLength };
    var headAxonPosition = getAxonPosition(drawInfo);



    ctx.moveTo(headAxonPosition.startPoint.x, headAxonPosition.startPoint.y);
    ctx.lineTo(headAxonPosition.endPoint.x, headAxonPosition.endPoint.y);

    ctx.moveTo(startDrawX,startDrawY);
    ctx.lineTo(e.offsetX, e.offsetY);


    var  numberOfShortAxon = parseInt(s,10) / shortAxonInterval;
    for (var i=0;i<numberOfShortAxon;i++) {
      var shortAxonCenterX = startDrawX + i * shortAxonInterval * cosA;
      var shortAxonCenterY = startDrawY + i * shortAxonInterval * sinA;
      var drawInfo = { startPoint:{ x:shortAxonCenterX, y:shortAxonCenterY }, trace:{ sinA, cosA }, length:shortAxonLength };
      var shortAxonPosition = getAxonPosition(drawInfo);

      ctx.moveTo(shortAxonPosition.startPoint.x, shortAxonPosition.startPoint.y);
      ctx.lineTo(shortAxonPosition.endPoint.x, shortAxonPosition.endPoint.y);
    }




    var drawInfo = { startPoint:{ x:e.offsetX, y:e.offsetY }, trace:{ sinA, cosA }, length:axonLength };
    var footerAxonPosition = getAxonPosition(drawInfo);

    ctx.moveTo(footerAxonPosition.startPoint.x, footerAxonPosition.startPoint.y);
    ctx.lineTo(footerAxonPosition.endPoint.x, footerAxonPosition.endPoint.y);

    routater = { x:e.offsetX - 150, y: e.offsetY + 10 };


    ctx.font = "20px serif";
    ctx.fillText(s.toString(), e.offsetX + 10, e.offsetY + 50);

    ctx.lineWidth = 4;
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    // ctx.closePath();
  } else {

  }

}

var endDraw = function() {
    flag = false;
    // canvas.removeEventListener('mousemove',draw);;

}

var showRouter = function() {
 ctx.beginPath();
 ctx.arc(routater.x, routater.y, 10, 0, 2 * Math.PI);
 ctx.strokeStyle = 'red';
 ctx.fillStyle = 'red';

 ctx.fill();
 ctx.stroke();
}

var init = function() {
  canvas.addEventListener('mousemove',draw);
  canvas.addEventListener('mousedown',readyToDraw);
  canvas.addEventListener('mouseup',endDraw);
  // canvas.addEventListener('click', showRouter);
}

init();

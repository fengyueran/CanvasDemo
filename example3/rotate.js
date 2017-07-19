
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var RectangleX0 = 300;
var RectangleY0 = 100;
var RectangleW= 200;
var RectangleH= 100;





var Rectangle = function () {
  this.x = RectangleX0;
  this.y = RectangleY0;
  this.w = RectangleW;
  this.h = RectangleH;
  this.centerX = RectangleX0 + 0.5 * RectangleW;
  this.centerY = RectangleY0 + 0.5 * RectangleH;
  this.isSelected = false;
}






var drawRect = function () {
  var rectangle = new Rectangle();
console.log(canvas.getBoundingClientRect().right);
  ctx.save();
  ctx.beginPath();

  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'black';
  //90度将会旋转出画布,以画布原点为旋转中心
  ctx.rotate(Math.PI * 0.25);
  ctx.fillRect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
  console.log(canvas.getBoundingClientRect().right);

  ctx.restore();


}



drawRect();

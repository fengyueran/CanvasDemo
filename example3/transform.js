
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var RectangleX0 = 300;
var RectangleY0 = 200;
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

  ctx.save();
  ctx.beginPath();

  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'black';
  console.log(rectangle.centerY);
  //移动坐标系，原点与矩形中心重合
  ctx.translate(rectangle.centerX , rectangle.centerY);
  // //90度将会旋转出画布,以画布原点为旋转中心
  ctx.rotate(Math.PI * 0.25);


  //坐标系移动后矩形坐标应相对新坐标系作变换
  ctx.fillRect(-0.5 * rectangle.w, -0.5 * rectangle.h, rectangle.w, rectangle.h);
  ctx.restore();

}



drawRect();

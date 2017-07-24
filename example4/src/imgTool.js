import { fabric } from 'fabric';

class Ruler {
  constructor() {
    this.shortAxonInterval = 20;
    this.axonLength = 20;
    this.shortAxonLength = 10;
  }
  set hide(isHide) {
    if (isHide) {
      this.headerController.opacity = 0;
      this.footerController.opacity = 0;
    } else {
      this.headerController.opacity = 1;
      this.footerController.opacity = 1;
    }
  }
}


class ImgTool {
  constructor(canvasId) {
    this.canvas = this.createCanvas(canvasId);
    this.toolerState = {
      isImgReadyToMove: false,
      isRulerActive: false,
      isImgReadyToZoom: false,
      isReadyToDrawRuler: false,
      isRulerReadyToMove: false,
    };
    this.mouse = {
      x: 0,
      y: 0,
    };
  }
  createCanvas = (canvasId) => new fabric.Canvas(canvasId, {
    backgroundColor: 'lightgray',
    preserveObjectStacking: true,
    hoverCursor: 'arrow',
    renderOnRemove: false,
  })


  loadImg = (url) => {
    fabric.Image.fromURL(url, (img) => {
      this.dicomImg = img.set({ left: 150, top: 100, angle: 0, selectable: false, hasControls: false, evented: true }).scale(0.5);
      this.dicomImg.type = 'dicomImg';
      this.dicomImg.zoomNum = 1;
      this.dicomImg.startAngle = 0;
      this.canvas.add(this.dicomImg);
    });
  }

  alignLeft = () => {
    this.dicomImg.set({ left: 0 });
    this.canvas.renderAll();
    this.dicomImg.setCoords();
  }

  alignRight = () => {
    const x = this.canvas.width - this.dicomImg.width * this.dicomImg.scaleX;
    this.dicomImg.set({ left: this.canvas.width - this.dicomImg.width * this.dicomImg.scaleX });
    this.canvas.renderAll();
    this.dicomImg.setCoords();
  }

  moveImg = () => {
    this.dicomImg.selectable = true;
    this.dicomImg.evented = true;
    this.canvas.sendToBack(this.dicomImg);
    this.canvas.on('mouse:down', this.resetMousePositon);
    this.canvas.on('object:moving', this.moveRulerWithDicom);
  }

  rotateImg = () => {
    const objects = this.canvas.getObjects();
    this.canvas.remove(objects[0]);

    const group = new fabric.Group([...objects], {
      centeredRotation: true,
      hasControls: false,
    });
    const length = objects.length;
    for (let i = 0; i < length; i++) {
      this.canvas.remove(objects[0]);
    }
    this.dicomImg.setAngle(this.dicomImg.startAngle + 90);
    this.canvas.add(this.dicomImg);
    group.setAngle(90);
    this.canvas.add(group);
    this.dicomImg.startAngle = (this.dicomImg.startAngle + 90) % 360;
  };

  invertImg = () => {
    this.dicomImg.filters.push(new fabric.Image.filters.Invert());
    this.dicomImg.applyFilters(this.canvas.renderAll.bind(this.canvas));
  };


  zoom = (options) => {
    if (!this.toolerState.isImgReadyToZoom) {
      return;
    }
    const p = options.e;
    const offsetY = p.offsetY - this.mouse.y;
    const zoomLevel = 2 * Math.abs(offsetY / this.dicomImg.height);
    let zoomNum = zoomLevel + 1;
    if (offsetY > 0) {
      zoomNum = 1 - zoomLevel;
    }

    zoomNum *= this.dicomImg.zoomNum;
    this.canvas.zoomToPoint(this.dicomImg.getCenterPoint(), zoomNum);
  };

  zoomImg = () => {
    this.dicomImg.selectable = false;
    this.canvas.on('mouse:down', this.readytoZoom);
    this.canvas.on('mouse:move', this.zoom);
    this.canvas.on('mouse:up', this.zoomEnd);
  }


  clear = () => {
    const objects = this.canvas.getObjects();
    const length = objects.length;
    for (let i = 1; i < length; i++) {
      this.canvas.remove(objects[1]);
    }
    this.dicomImg.selectable = false;
  }

  readytoZoom = (options) => {
    this.resetMousePositon(options);
    this.toolerState.isImgReadyToZoom = true;
  }

  zoomEnd = () => {
    this.toolerState.isImgReadyToZoom = false;
    this.dicomImg.zoomNum = this.canvas.getZoom();
  }


  resetMousePositon = (options) => {
    const p = options.e;
    this.mouse.x = p.offsetX;
    this.mouse.y = p.offsetY;
  }

  makeLine = (coords) =>
    new fabric.Line(coords, {
      fill: 'red',
      stroke: 'red',
      strokeWidth: 2,
      selectable: false,
      type: 'ruler',
    });


  makeText = (text, coords) =>
    new fabric.Text(text, {
      fill: 'red',
      left: coords.left,
      top: coords.top,
      fontSize: 20,
      selectable: false,
    });


  makeRect = (coords) =>
    new fabric.Rect({
      fill: 'blue',
      width: 10,
      height: 10,
      left: coords.left,
      top: coords.top,
      opacity: 0.8,
      hasControls: false,
      type: 'controller',
    });


  makeRuler = (ruler) => {
    this.ruler = new Ruler();
  };

  activateRuler = () => {
    this.makeRuler();
    this.toolerState.isRulerActive = true;
    this.dicomImg.selectable = false;
    this.canvas.on('mouse:down', this.readytoDrawRuler);
    this.canvas.on('mouse:move', this.drawRuler);
    this.canvas.on('mouse:up', this.drawRulerControll);
  };

  getAxonPosition = (drawInfo) => {
    const startPointX = drawInfo.startPoint.x - drawInfo.length * drawInfo.trace.sinA;
    const startPointY = drawInfo.startPoint.y + drawInfo.length * drawInfo.trace.cosA;

    const endPointX = drawInfo.startPoint.x + drawInfo.length * drawInfo.trace.sinA;
    const endPointY = drawInfo.startPoint.y - drawInfo.length * drawInfo.trace.cosA;

    const axonPosition = { startPoint: { x: startPointX, y: startPointY }, endPoint: { x: endPointX, y: endPointY } };
    return axonPosition;
  };

  readytoDrawRuler = (options) => {
    this.resetMousePositon(options);
    this.toolerState.isReadyToDrawRuler = true;
  }

  drawRuler = (options) => {
    if (!this.toolerState.isReadyToDrawRuler || !this.toolerState.isRulerActive) {
      return;
    }
    const p = this.canvas.getPointer(options.e);
    const dx = p.x - this.mouse.x;
    const dy = p.y - this.mouse.y;
    const s = Math.sqrt(dx * dx + dy * dy);
    const sinA = dy / s;
    const cosA = dx / s;


    let drawInfo = { startPoint: { x: this.mouse.x, y: this.mouse.y }, trace: { sinA, cosA }, length: this.ruler.axonLength };
    const headAxonPosition = this.getAxonPosition(drawInfo);

    const objects = this.canvas.getObjects();
    const length = objects.length;
    for (let i = 1; i < length; i++) {
      this.canvas.remove(objects[1]);
    }
    const startLine = this.makeLine([headAxonPosition.startPoint.x, headAxonPosition.startPoint.y, headAxonPosition.endPoint.x, headAxonPosition.endPoint.y]);
    this.canvas.add(startLine);

    let routeLine = this.makeLine([this.mouse.x, this.mouse.y, p.x, p.y]);
    this.canvas.add(routeLine);

    const numberOfShortAxon = parseInt(s, 10) / this.ruler.shortAxonInterval;
    for (let i = 0; i < numberOfShortAxon; i++) {
      const shortAxonCenterX = this.mouse.x + i * this.ruler.shortAxonInterval * cosA;
      const shortAxonCenterY = this.mouse.y + i * this.ruler.shortAxonInterval * sinA;
      drawInfo = { startPoint: { x: shortAxonCenterX, y: shortAxonCenterY }, trace: { sinA, cosA }, length: this.ruler.shortAxonLength };
      const shortAxonPosition = this.getAxonPosition(drawInfo);
      routeLine = this.makeLine([shortAxonPosition.startPoint.x, shortAxonPosition.startPoint.y, shortAxonPosition.endPoint.x, shortAxonPosition.endPoint.y]);
      this.canvas.add(routeLine);
    }


    drawInfo = { startPoint: { x: p.x, y: p.y }, trace: { sinA, cosA }, length: this.ruler.axonLength };
    const footerAxonPosition = this.getAxonPosition(drawInfo);

    const endLine = this.makeLine([footerAxonPosition.startPoint.x, footerAxonPosition.startPoint.y, footerAxonPosition.endPoint.x, footerAxonPosition.endPoint.y]);
    this.canvas.add(endLine);
    const lengthText = this.makeText(parseInt(s, 10).toString(), { left: p.x + 10, top: p.y + 10 });
    this.canvas.add(lengthText);
  }

  rulerReadToMove = (options) => {
    const p = this.canvas.getPointer(options.e);
    const target = options.target;

    if (target && target.type) {
      if (target.type === 'dicomImg') {
        this.isReadytoDraw = true;
      } else if (target.type === 'ruler') {
        this.ruler.hide = false;
        this.toolerState.isRulerReadyToMove = true;
        this.resetMousePositon(options);
      } else if (target.type === 'controller') {
        this.ruler.hide = false;
      }
    } else {
      this.ruler.hide = true;
    }
  }

  moveRuler = (options) => {
    if (!this.toolerState.isRulerReadyToMove) {
      return;
    }

    const p = options.target;
    const e = options.e;
    const objects = this.canvas.getObjects();
    const offsetX = e.offsetX - this.mouse.x;
    const offsetY = e.offsetY - this.mouse.y;
    for (let i = 1; i < objects.length; i++) {
      objects[i].set({ left: objects[i].left + offsetX, top: objects[i].top + offsetY });
    }
    this.canvas.renderAll();
    this.mouse.x += offsetX;
    this.mouse.y += offsetY;
  };

  rulerMoveEnd = () => {
    this.toolerState.isRulerReadyToMove = false;
  }

  drawRulerControll = (options) => {
    const headerController = this.makeRect({ left: this.mouse.x - 5, top: this.mouse.y - 5 });
    headerController.Id = 'headerController';

    this.canvas.add(headerController);
    const footerController = this.makeRect({ left: options.e.offsetX - 5, top: options.e.offsetY - 5 });
    footerController.Id = 'footerController';
    this.ruler.headerController = headerController;
    this.ruler.footerController = footerController;

    this.canvas.add(footerController);

    this.canvas.off('mouse:up', this.drawRulerControll);
    this.canvas.off('mouse:move', this.drawRuler);
    this.toolerState.isReadyToDrawRuler = false;
    this.canvas.on('mouse:down', this.rulerReadToMove);
    this.canvas.on('mouse:move', this.moveRuler);
    this.canvas.on('mouse:up', this.rulerMoveEnd);
  }

  moveRulerWithDicom = (options) => {
    const p = options.target;
    const e = options.e;
    const objects = this.canvas.getObjects();
    const offsetX = e.offsetX - this.mouse.x;
    const offsetY = e.offsetY - this.mouse.y;
    for (let i = 1; i < objects.length; i++) {
      objects[i].set({ left: objects[i].left + offsetX, top: objects[i].top + offsetY });
    }
    this.mouse.x += offsetX;
    this.mouse.y += offsetY;
  }

}

export default ImgTool;

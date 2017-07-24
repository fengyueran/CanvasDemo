import ImgTool from './imgTool';

const imgTool = new ImgTool('canvas');

imgTool.loadImg('dicom.png');
const addEventListener = () => {
  const aLeftBtn = document.getElementById('alignleft');
  aLeftBtn.addEventListener('click', imgTool.alignLeft);
  const aRightBtn = document.getElementById('alignright');
  aRightBtn.addEventListener('click', imgTool.alignRight);
  const moveBtn = document.getElementById('move');
  moveBtn.addEventListener('click', imgTool.moveImg);
  const rotateBtn = document.getElementById('rotate');
  rotateBtn.addEventListener('click', imgTool.rotateImg);
  const invertBtn = document.getElementById('invert');
  invertBtn.addEventListener('click', imgTool.invertImg);
  const zoomBtn = document.getElementById('zoom');
  zoomBtn.addEventListener('click', imgTool.zoomImg);
  const clearBtn = document.getElementById('clear');
  clearBtn.addEventListener('click', imgTool.clear);
  const rulerBtn = document.getElementById('ruler');
  rulerBtn.addEventListener('click', imgTool.activateRuler);
};

addEventListener();

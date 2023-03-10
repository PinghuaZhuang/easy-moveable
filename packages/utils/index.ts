import {
  fromString,
  rotateZ,
  translateX,
  translateY,
  multiply,
  toString,
} from 'rematrix';

let id = 0;

/**
 * north east south west
 */
export enum Direction {
  nw = 'nw',
  n = 'n',
  ne = 'ne',
  e = 'e',
  se = 'se',
  s = 's',
  sw = 'sw',
  w = 'w',
}

/**
 * 创建包裹用的容器
 */
export function createWrapper() {
  const wrapper = document.createElement('div');
  wrapper.dataset.moveable = String(id++);
  return wrapper;
}

/**
 * 包裹目标元素
 */
export function pack(
  el: HTMLElement,
  els?: HTMLElement[],
  cb?: (wrapper: HTMLElement, el: HTMLElement) => void,
) {
  const parentElement = el.parentElement;
  if (parentElement == null) {
    throw new Error(`resize element 不在DOM树中`);
  }
  if (parentElement.dataset.moveable) {
    return parentElement;
  }
  const wrapper = createWrapper();
  cb && cb(wrapper, el);
  wrapper.appendChild(el);
  els?.forEach((o) => {
    wrapper.appendChild(o);
  });
  parentElement.appendChild(wrapper);
  return wrapper;
}

export function to360(rotate: number) {
  return ((rotate % 360) + 360) % 360;
}

export function toRadian(rotate: number) {
  return (rotate / 180) * Math.PI;
}

/**
 * matrix中获取旋转角度
 */
export function matrix2Rotate(matrix: number[]) {
  const [a, b /* , c, d */] = matrix;
  // const scale = Math.sqrt(a * a + b * b);
  // arc sin, convert from radians to degrees, round
  // const sin = b / scale;
  // next line works for 30deg but not 130deg (returns 50);
  // var angle = Math.round(Math.asin(sin) * (180/Math.PI));
  return Math.round(Math.atan2(b, a) * (180 / Math.PI));
}

export function toMatrix({ x = 0, y = 0, rotate = 0 }) {
  return toString(
    [rotateZ(rotate), translateX(x), translateY(y)].reduce(multiply),
  );
}

/**
 * 获取目标元素的旋转角度
 */
export function getRotate(element: HTMLElement) {
  const matrix = fromString(getComputedStyle(element, 'transform').transform);
  return matrix2Rotate(matrix);
}

const directionCursorMap = {
  [Direction.n]: 'cursor-ns',
  [Direction.s]: 'cursor-ns',
  [Direction.e]: 'cursor-ew',
  [Direction.w]: 'cursor-ew',
  [Direction.ne]: 'cursor-nesw',
  [Direction.sw]: 'cursor-nesw',
  [Direction.nw]: 'cursor-nwse',
  [Direction.se]: 'cursor-nwse',
};
const cursorList = [
  'cursor-ns',
  'cursor-nesw',
  'cursor-ew',
  'cursor-nwse',
];

/**
 * 设置鼠标样式(拖拽方向)
 */
export function setCursor(target: HTMLElement, rotate: number) {
  const direction = target.dataset.direction as Direction;
  const index = cursorList.findIndex(
    (o) => o === directionCursorMap[direction],
  );
  const cursorIndex = (index + Math.floor(rotate / 45)) % 4;
  target.dataset.cursor = cursorList[cursorIndex];
  return cursorIndex;
}

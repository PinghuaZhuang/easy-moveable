import {
  fromString,
  translateX,
  translateY,
  multiply,
  toString,
} from 'rematrix';

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
 * 角度转弧度
 */
export function toRadian(rotate: number) {
  return (rotate / 180) * Math.PI;
}

/**
 * matrix中获取旋转角度
 */
export function matrix2Rotate(matrix: number[]) {
  const [a, b] = matrix;
  return Math.round(Math.atan2(b, a) * (180 / Math.PI));
}

/**
 * transfrom平移
 */
export function toMatrix({ x = 0, y = 0 }, ...transform: string[]) {
  return toString(
    [
      ...transform.map((o) => fromString(o)),
      translateX(x),
      translateY(y),
    ].reduce(multiply),
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
const cursorList = ['cursor-ns', 'cursor-nesw', 'cursor-ew', 'cursor-nwse'];

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

/**
 * 设置样式
 */
export function setStyle(
  element: HTMLElement,
  style: Partial<Record<keyof CSSStyleDeclaration, number | string>>,
) {
  let prop: keyof typeof style;
  for (prop in style) {
    const value = style[prop]!;
    element.style[prop] = typeof value === 'string' ? value : `${value}px`;
  }
}

/**
 * 保留N位小数
 */
export function toFixed(number: number, digit: number = 0) {
  return +number.toFixed(digit);
}

/**
 * 创建控制容器
 */
export function createControlBox(target: HTMLElement, id: Key) {
  if (target.dataset.moveable) {
    const controlBox = document.querySelector(
      `.control-box[data-target="${id}"]`,
    );
    if (controlBox) {
      // 已经创建过直接返回
      return controlBox as HTMLElement;
    }
  }
  target.dataset.moveable = String(id);
  const controlBox = document.createElement('div');
  controlBox.classList.add('control-box');
  id && (controlBox.dataset.target = String(id));
  setStyle(controlBox, {
    width: getComputedStyle(target).width,
    height: getComputedStyle(target).height,
    transform: getComputedStyle(target).transform,
    left: target.offsetLeft,
    top: target.offsetTop,
  });
  return controlBox;
}

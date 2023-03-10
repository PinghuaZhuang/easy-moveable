import { Direction, setStyle } from '@moveable/utils';

const directionList = [
  Direction.n,
  Direction.e,
  Direction.s,
  Direction.w,
  Direction.nw,
  Direction.ne,
  Direction.se,
  Direction.sw,
];

export function createControlBox(target: HTMLElement) {
  const controlBox = document.createElement('div');
  controlBox.classList.add('inspect-control-box');
  setStyle(controlBox, {
    width: getComputedStyle(target).width,
    height: getComputedStyle(target).height,
    transform: getComputedStyle(target).transform,
    left: target.offsetLeft,
    top: target.offsetTop,
  });
  target.after(controlBox, target);
  return controlBox;
}

export function createPoints(controlBox: HTMLElement) {
  return directionList.map((direction) => {
    const point = document.createElement('div');
    point.dataset.direction = direction;
    point.classList.add('inspect-point', 'inspect-direction', direction);
    controlBox.appendChild(point);
    return point;
  });
}

export function createLines(controlBox: HTMLElement) {
  return [Direction.n, Direction.e, Direction.s, Direction.w].map(
    (direction, index) => {
      const line = document.createElement('div');
      line.dataset.direction = direction;
      line.dataset.lineIndex = String(index);
      line.classList.add('line');
      controlBox.appendChild(line);
      return line;
    },
  );
}

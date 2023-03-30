import { Direction, toRadian, toFixed } from '@moveable/utils';

export const directionList = [
  Direction.n,
  Direction.e,
  Direction.s,
  Direction.w,
  Direction.nw,
  Direction.ne,
  Direction.se,
  Direction.sw,
];

export function createControls(controls?: Direction[]) {
  return (controls ?? directionList).map((direction) => {
    const point = document.createElement('div');
    point.dataset.direction = direction;
    point.classList.add('control-point', direction);
    return point;
  });
}

export function createLines() {
  return [Direction.n, Direction.e, Direction.s, Direction.w].map(
    (direction, index) => {
      const line = document.createElement('div');
      line.dataset.direction = direction;
      line.dataset.lineIndex = String(index);
      line.classList.add('line');
      return line;
    },
  );
}

export function rectVectorTransfrom(
  originRotate: number,
  event: HammerInput,
  /**
   * 触发元素所处的位置
   * 上右下左: 0123.
   */
  tagIndex: number,
) {
  const tagDirection = tagIndex % 2;
  const radian = toRadian(originRotate);
  const methods = [Math.sin, Math.cos];
  const mapping = [1, -1, -1, 1][tagIndex];

  if (tagDirection) {
    methods.reverse();
  }

  const distance = toFixed(
    (methods[0](radian) * event.deltaX +
      methods[1](radian) * event.deltaY * (tagDirection ? 1 : -1)) *
      -mapping,
  );
  const y = +(distance / 2) * Math.sin(radian);
  const x = (distance / 2) * (1 + Math.cos(radian) * mapping);

  // 水平方向
  if (tagDirection === 0) {
    return {
      x: y,
      y: x * mapping,
      height: -distance,
      width: 0,
    };
  }

  // 垂直方向
  return {
    x: -x * mapping,
    y,
    width: distance,
    height: 0,
  };
}

export function rectVectorWithTags(
  rotate: number,
  event: HammerInput,
  tagIndexs: number | number[],
) {
  if (typeof tagIndexs === 'number') {
    return rectVectorTransfrom(rotate, event, tagIndexs);
  }

  return tagIndexs
    .map((tagIndex) => rectVectorTransfrom(rotate, event, tagIndex))
    .reduce(
      (result, cur) => {
        let k: keyof typeof result;
        for (k in result) {
          result[k] += cur[k] ?? 0;
        }
        return result;
      },
      { x: 0, y: 0, height: 0, width: 0 },
    );
}

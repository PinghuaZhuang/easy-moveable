import Manager from '@moveable/utils/Manager';
import { pack, createWrapper, Direction, toRadian } from '@moveable/utils';
import { createControlBox, createPoints, createLines } from './core';
import './index.less';

export interface InspectOption {
  cache?: number | boolean;
}

class Inspect extends Manager {
  static type = 'manager:inspect';
  // static cacheLength = 30;

  controlBox!: HTMLElement;
  target!: HTMLElement;
  points!: HTMLElement[];
  lines!: HTMLElement[];
  controls!: HTMLElement[];
  originTransform!: string;
  options!: InspectOption;

  constructor(target: HTMLElement, options: InspectOption = {}) {
    super();

    // 创建边界元素
    this.target = target;
    this.controlBox = createControlBox(target);
    this.points = createPoints(this.controlBox);
    this.lines = createLines(this.controlBox);
    this.controls = [...this.lines, ...this.points];
    this.options = Object.assign({}, options);
    target.dataset.moveable = String(this.id);
  }

  destroy() {
    super.destroy();
    this.controlBox.remove();
    this.target.removeAttribute('data-moveable');
  }
}

export default Inspect;

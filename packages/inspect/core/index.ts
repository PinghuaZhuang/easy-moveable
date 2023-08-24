import Manager from '@moveable/utils/Manager';
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
  controls!: HTMLElement[];
  lines!: HTMLElement[];
  options!: InspectOption;
  originTransform!: string;

  constructor(target: HTMLElement, options: InspectOption = {}) {
    super();

    // 创建边界元素
    this.target = target;
    this.controlBox = createControlBox(target, this.id);
    this.controls = createPoints(this.controlBox);
    this.lines = createLines(this.controlBox);
    // this.controls = [...this.lines, ...this.points];
    this.options = Object.assign({}, options);
    this.originTransform = getComputedStyle(target).transform;
    target.dataset.moveable = String(this.id);
  }

  destroy() {
    super.destroy();
    this.controlBox.remove();
    this.target.removeAttribute('data-moveable');
  }
}

export default Inspect;

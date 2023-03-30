import Manager, { ManagerOption } from '@moveable/utils/Manager';
import {
  getRotate,
  setCursor,
  toMatrix,
  setStyle,
  createControlBox,
  Direction,
} from '@moveable/utils';
import { Pan, Manager as HammerManager } from 'hammerjs';
import {
  createControls,
  createLines,
  rectVectorWithTags,
  directionList,
} from './core';
import './index.less';

export interface ResizableOption extends ManagerOption {
  controls?: Direction[];
  visible?: boolean;
}

export type Delta = {
  x: number;
  y: number;
  height: number;
  width: number;
};

/**
 * TODO:
 *  1. 支持 transform-origin
 */
class Resizable extends Manager {
  static type = 'manager:Resizable';
  // static cacheLength = 30;

  controlBox!: HTMLElement;
  target!: HTMLElement;
  controls!: HTMLElement[];
  lines!: HTMLElement[];
  options!: ResizableOption;
  formTransform!: string;
  // formTransformOrigin!: string;
  managers!: InstanceType<typeof HammerManager>[];
  #visible = true;

  constructor(target: HTMLElement, options: ResizableOption = {}) {
    super(options);

    this.target = target;
    this.options = Object.assign({}, options);

    this.update();
  }

  #registerEvents() {
    if (this.controlBox == null) return;

    if (this.managers?.length) {
      this.managers.forEach((o) => o.destroy());
    }

    const managers = (this.managers = [] as InstanceType<
      typeof HammerManager
    >[]);
    this.controls.forEach((el) => {
      const direction = el.dataset.direction;
      const realyIndex = directionList.findIndex((o) => direction === o) % 4;
      const mc = new HammerManager(el);
      managers.push(mc);
      mc.add(new Pan());

      const controlBox = this.controlBox!;
      let rotate = getRotate(controlBox);
      let formTransform: string;
      let fromRect: {
        width: number;
        height: number;
      };

      setCursor(el, rotate);

      mc.on('panstart', () => {
        const width = controlBox.offsetWidth;
        const height = controlBox.offsetHeight;
        formTransform = getComputedStyle(controlBox).transform;
        fromRect = { width, height };
        rotate = getRotate(controlBox);

        // 设置鼠标样式
        setCursor(el, rotate);
      });

      mc.on('panmove', (event: HammerInput) => {
        const { height, width } = fromRect;

        let delta: Delta | undefined;
        switch (direction) {
          case 'n':
          case 's':
          case 'e':
          case 'w':
            delta = rectVectorWithTags(rotate, event, realyIndex);
            break;
          case 'nw':
            delta = rectVectorWithTags(rotate, event, [0, 3]);
            break;
          case 'se':
            delta = rectVectorWithTags(rotate, event, [1, 2]);
            break;
          case 'ne':
            delta = rectVectorWithTags(rotate, event, [0, 1]);
            break;
          case 'sw':
            delta = rectVectorWithTags(rotate, event, [2, 3]);
            break;
        }
        if (delta == null) return;

        // delta = toFixed(delta) as Delta;
        const style = {
          width: width + delta.width,
          height: height + delta.height,
          transform: toMatrix(
            {
              x: delta.x,
              y: delta.y,
            },
            formTransform,
          ),
        };
        if (style.width < 0 || style.height < 0) {
          return;
        }
        setStyle(controlBox, style);
        setStyle(this.target, style);
      });
    });
  }

  update() {
    if (this.controlBox == null) {
      this.controlBox = createControlBox(this.target, this.id);
    }

    this.visible = this.options.visible ?? true;

    // lines => inspect
    this.lines = this.lines ?? createLines();
    this.controls = this.controls ?? createControls(this.options.controls);
    this.controlBox.append(...this.lines, ...this.controls);
    this.target.after(this.controlBox, this.target);

    const computedStyle = getComputedStyle(this.target);
    this.formTransform = computedStyle.transform;
    // this.formTransformOrigin = computedStyle.transformOrigin;
    this.target.dataset.moveable = String(this.id);
    this.controlBox.style.transform = this.formTransform;
    // this.controlBox.style.transformOrigin = this.formTransformOrigin;

    this.#registerEvents();
  }

  get rect() {
    const computedStyle = getComputedStyle(this.controlBox);
    const left = Number.parseFloat(computedStyle.left);
    const top = Number.parseFloat(computedStyle.top);
    const transform = computedStyle.transform;
    const { width, height } = this.controlBox.getBoundingClientRect();

    return {
      x: left,
      y: top,
      width,
      height,
      transform,
    };
  }

  get visible() {
    return this.#visible;
  }
  set visible(v: boolean) {
    this.#visible = v;
    this.controlBox.dataset.visible = String(v);
  }

  destroy() {
    super.destroy();
    this.managers.forEach((o) => o.destroy());
    [...this.controls, ...this.lines].forEach((o) => o.remove());
    if (this.controlBox.childElementCount <= 0) {
      this.controlBox.remove();
    }
    this.target.removeAttribute('data-moveable');
  }
}

export default Resizable;

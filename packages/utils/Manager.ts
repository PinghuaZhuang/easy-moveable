import { createCache } from '@moveable/utils';

let id = 1;

class Manager {
  /**
   * 构造类型
   */
  static type: string;
  /**
   * 最大缓存数
   * @default 20
   */
  static cacheLength?: number;

  /**
   * 缓存函数
   */
  static cache?: ReturnType<typeof createCache>;

  id: Key;

  /**
   * 销毁实例
   */
  destroy() {
    const ctr = this.constructor as typeof Manager;
    ctr.cache?.delete(this.id);
  }

  constructor(cacheLength?: boolean | number) {
    this.id = id++;
    if (!cacheLength) return;
    const ctr = this.constructor as typeof Manager;
    if (ctr.cache) {
      ctr.cache<Manager>(this.id, this);
    } else {
      ctr.cache = createCache(cacheLength === true ? undefined : cacheLength);
    }
  }
}

export default Manager;

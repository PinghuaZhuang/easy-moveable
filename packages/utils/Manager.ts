import EventEmitter from 'events';

let id = 1;

export interface ManagerOption
  extends NonUndefined<ConstructorParameters<typeof EventEmitter>[0]> {
  cache?: boolean | number;
}

class Manager extends EventEmitter {
  /**
   * 构造类型
   */
  static type: string;
  /**
   * 最大缓存数
   * @default 20
   */
  static cacheLength = 100;

  /**
   * 所有实例
   */
  static #instances: Manager[] = [];

  id: Key;

  constructor(option?: ManagerOption) {
    super(option);
    this.id = id++;
    const ctr = this.constructor as typeof Manager;
    ctr.#add(this, option);
  }

  /**
   * 实例数组中新增实例, 如果超出设置的缓存长度, 从头部开始清理
   */
  static #add(
    instance: Manager,
    option?: ConstructorParameters<typeof Manager>[0],
  ) {
    const length = Manager.#instances.push(instance);
    if (option?.cache) {
      const maxLength =
        typeof option.cache === 'number'
          ? option.cache
          : (this.constructor as typeof Manager).cacheLength;
      if (length > maxLength) {
        const target = Manager.#instances.pop()!;
        target.destroy();
      }
    }
  }

  /**
   * 从缓存的实例数组中删除, 不销毁.
   */
  static #delete(id: Key) {
    const ctr = this.constructor as typeof Manager;
    const index = ctr.#instances.findIndex((o) => o.id === id);
    if (index === -1) return;
    ctr.#instances.splice(index, 1);
    return ctr.#instances[index];
  }

  /**
   * 销毁实例
   */
  destroy() {
    const ctr = this.constructor as typeof Manager;
    ctr.#delete(this.id);
  }

  /**
   * 销毁所有的实例
   */
  destroyAll() {
    Manager.#instances.forEach((o) => o.destroy());
  }
}

export default Manager;

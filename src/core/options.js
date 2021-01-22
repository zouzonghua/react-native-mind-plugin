import config from '../config';
import { isObject } from '../core/utils';

class SingletonOptions {
  constructor() {
    this._options = {};
    this.set(config);
    // 一个标志，用来判断是否已将建了该类的实例
    this.instance = null;
  }

  /**
   * 静态方法: 获取实例（单例）
   * 类相当于实例的原型 所有在类中定义的方法，都会被实例继承。
   * 如果在一个方法前， 加上static关键字， 就表示该方法不会被实例继承， 而是直接通过类来调用， 这就称为“ 静态方法”。
   */
  static getInstance() {
    // 没有实例化的时候創建一个该类的实例
    if (!this.instance) {
      this.instance = new SingletonOptions();
    }
    // 已经实例化了,返回第一次实例化对象的引用
    return this.instance;
  }

  set(key, value) {
    if (isObject(key)) {
      var data = key;
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          this._options[key] = data[key];
        }
      }
    } else {
      this._options[key] = value;
    }
    return this;
  }

  get(key) {
    return key ? this._options[key] : this._options;
  }
}

export default SingletonOptions.getInstance();

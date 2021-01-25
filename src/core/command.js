class SingletonCommand {
  constructor() {
    this._command = {};
    // 一个标志，用来判断是否已创建了该类的实例
    this.instance = null;
  }

  // 静态方法: 获取实例（单例）
  static getInstance() {
    if (!this.instance) {
      this.instance = new SingletonCommand()
    }
    return this.instance
  }

  exec(key) {
    let result = [];
    // 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）
    if (this._command.hasOwnProperty(key)) {
      this._command[key].forEach((item) => {
        // 执行方法时把返回参数存起来
        result.push(item.apply(this, Array.prototype.slice.call(arguments, 1)));
      });
    }

    if (result.length === 1) {
      return result[0];
    }
  }

  register(key, value) {
    this._command[key] = [];
    this._command[key].push(value);
    return this;
  }

}

export default SingletonCommand.getInstance();

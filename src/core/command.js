class SingletonCommand {
  constructor() {
    this._command = {};
    // 一个标志，用来判断是否已将建了该类的实例
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
    if (this._command.hasOwnProperty(key)) {
      this._command[key].forEach((item) => {
        result.push(item.apply(this, Array.prototype.slice.call(arguments, 1)));
      });
    }

    if (result.length === 1) {
      return result[0];
    }
    return result;
  }

  register(key, value) {
    this._command[key] = [];
    this._command[key].push(value);
    return this;
  }
}

export default SingletonCommand.getInstance();

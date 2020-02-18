/**
 * 异步操作队列
 */
export default class AsyncQueue {
  concurrency = 1; // 同时执行数量 负数则全部执行
  results = []; // 异步队列返回结果集
  _asyncQueue = []; // 异步队列
  _off = false; // 开关

  constructor(options) {
    const { concurrency = 1 } = options || {};
    this.concurrency = concurrency;
  }

  get length() {
    return this._asyncQueue.length;
  }

  /**
   * 添加任务
   * @param {function} fn 一个返回promise对象的函数
   */
  unshift(fn) {
    if (typeof fn === "function") console.warn("添加的异步任务非可执行函数");
    this._asyncQueue.unshift(fn);
  }

  /**
   * 返回第一个任务
   * @param {boolean} execute 不执行任务直接返回
   * @returns {Promise | function} 默认返回Promise。若不执行则返回 function
   */
  shift(execute) {
    let task = this._asyncQueue.shift();
    if (!execute && typeof task === "function") return task();
    else return task;
  }

  /**
   * 添加任务
   * @param {function} fn 一个返回promise对象的函数
   */
  push(fn) {
    if (typeof fn !== "function") console.warn("添加的异步任务非可执行函数");
    this._asyncQueue.push(fn);
    if (!this._off) this.start();
  }

  /**
   * 返回最后一个任务
   * @param {boolean} execute 不执行任务直接返回
   * @returns {Promise | function} 默认返回Promise。若不执行则返回 function
   */
  pop() {
    let task = this._asyncQueue.pop();
    if (!execute && typeof task === "function") return task();
    else return task;
  }

  // 队列停止执行
  stop() {
    this._off = false;
  }

  // 队列开始执行
  start() {
    if (!this._off) {
      this._off = true;
      this._execute();
    }
  }

  // 队列是否执行完毕
  hasNext() {
    return this.length > 0;
  }

  // 执行任务
  _execute() {
    while (this._off && this.hasNext()) {
      let tasks = this._getTask();
      Promise.all(tasks)
        .then(results => {
          this.results.push(results);
        })
        .catch(err => {
          this.results.push(err);
        });
    }
    if (!this.hasNext()) this.stop();
  }

  _getTask() {
    let num = this.concurrency;
    switch (true) {
      case num === 0:
        this.stop();
        break;
      case num < 0:
        return this._asyncQueue.map(task => {
          if (typeof task === "function") return task();
          else return task;
        });
      case num > 0:
        return this._asyncQueue.splice(0, num).map(task => {
          if (typeof task === "function") return task();
          else return task;
        });
    }
  }
}

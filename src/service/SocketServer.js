import { Socket, AsyncQueue } from "../utils";

class WS {
  _events = {};

  _socket = null;

  _rooms = { length: 0 };

  _messageQueue = new AsyncQueue();

  /**
   * @description 创建ws连接,成功后自动开始处理消息队列
   */
  constructor() {}

  // 设置socket成功后自动开始处理消息队列
  set socket(s) {
    this._init(s);
    this._socket = s;
    this._messageQueue.start();
  }

  /**
   * 返回socket对象
   * @returns {Socket}
   */
  get socket() {
    return this._socket;
  }

  /**
   * @param {string} 房间名
   * @description 加入房间
   */
  join(name) {
    if (!this.hasRoom(name)) {
      this._rooms[name] = new Room();
      this._rooms.length++;
      this.emit("join", name);
    }
    return this;
  }

  /**
   *
   * @param {String} eventName 事件名称
   * @param  {...any} args 参数
   * @description 发出广播
   */
  emit(eventName, ...args) {
    let data = this._stringify(eventName, ...args);
    let task = () => {
      return new Promise((resolve, reject) => {
        this.socket.send({
          data,
          success: () => resolve("success"),
          fail: err => {
            console.log(err);
            reject(err);
          }
        });
      });
    };
    this._messageQueue.push(task);
  }

  /**
   * 监听广播
   * @param {string} eventName 事件名称
   * @param {function} callback 回调
   * @param {boolean} unique 若该事件存在监听者则不再添加此监听
   */
  on(eventName, callback, unique) {
    if (!this._events.hasOwnProperty(eventName))
      this._events[eventName] = new Array();
    if (!(unique && this._events[eventName].length > 0))
      this._events[eventName].push(callback);
  }

  // socket连接，成功后设置socket
  connect() {
    let s = new Socket();
    s.handleOpen = () => {
      this.socket = s;
    };
    s.connect();
  }

  // 连接成功后设置socket相关属性
  _init(ws) {
    ws.handleMessage = res => {
      let data = this._parse(res.data);
      let eventName = data.shift();
      let args = data;
      if (this._events.hasOwnProperty(eventName)) {
        this._events[eventName].forEach(fn => {
          fn(...args);
        });
      }
    };
  }

  // 广播事件转文本
  _stringify() {
    return JSON.stringify(Array.prototype.slice.apply(arguments));
  }

  // 广播文本转对象
  _parse(event) {
    return JSON.parse(event);
  }
}

export default new WS();

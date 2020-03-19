import Taro from "@tarojs/taro";

export default class Socket {
  /**
   * 参数	类型	必填	说明
   * url	String	是	开发者服务器接口地址，必须是 wss 协议
   * header	Object	否	HTTP Header , header 中不能设置 Referer
   * method	String	否	默认是 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
   * protocols	StringArray	否	子协议数组
   * success	Function	否	接口调用成功的回调函数
   * fail	Function	否	接口调用失败的回调函数
   * complete	Function	否	接口调用结束的回调函数（调用成功、失败都会执行）
   */
  connectOptions = {
    url: "ws://47.100.222.159:7320",
    success(e) {
      console.log("[Socket] is trying to connect...", e);
    },
    fail(e) {
      console.log("[Socket] try connect failed", e);
    }
  };

  sendOptions = {
    data: "send test",
    success(e) {
      console.log("[Socket] send success", e);
    },
    fail(e) {
      console.log("[Socket] send fail", e);
    }
  };

  closeOptions = {
    reason: "close test",
    success(e) {
      console.log("[Socket] close success", e);
    },
    fail(e) {
      console.log("[Socket] close fail", e);
    }
  };

  /**
   * 属性
   *
   * - socketTask.readyState: WebSocket 当前的连接状态。
   *
   * - socketTask.CONNECTING: WebSocket 状态值：连接中。
   *
   * - socketTask.OPEN: WebSocket 状态值：已连接。
   *
   * - socketTask.CLOSING: WebSocket 状态值：关闭中。
   *
   * - socketTask.CLOSED: WebSocket 状态值：已关闭。
   *
   * - socketTask.ws: 浏览器 WebSocket 实例。（H5 端独有）
   */
  _socketTask = null;

  _onOpen = (e)=>{
    console.log("[Socket] connect success", e);
  };
  _onMessage = null;
  _onError = null;
  _onClose = null;

  constructor(options) {
    Object.assign(this.connectOptions, options);
  }

  set socketTask(task) {
    this._socketTask = task;
  }

  get socketTask() {
    return this._socketTask;
  }

  /**
   * @param {Object} obj 参数
   * - **参数	类型	必填	说明**
   * - data	String/ArrayBuffer	是	需要发送的内容
   * - success	Function	否	接口调用成功的回调函数
   * - fail	Function	否	接口调用失败的回调函数
   * - complete	Function	否	接口调用结束的回调函数（调用成功、失败都会执行）
   */
  send(obj) {
    let msg = Object.assign({}, this.sendOptions, obj);
    return this.socketTask.send(msg);
  }

  /**
   *
   * @param {Object} obj
   * - **参数	类型	必填	说明**
   * - code	Number	否	一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是 1000 （表示正常连接关闭）
   * - reason	String	否	一个可读的字符串，表示连接被关闭的原因
   * - success	Function	否	接口调用成功的回调函数
   * - fail	Function	否	接口调用失败的回调函数
   * - complete	Function	否	接口调用结束的回调函数（调用成功、失败都会执行）
   */
  close(obj) {
    this.closeOptions.assign(...obj);
    this.socketTask.close(this.closeOptions);
  }

  set handleOpen(fn) {
    this._onOpen = fn;
    if (this._socketTask) this.socketTask.onOpen(this._onOpen);
  }

  /**
   * String/ArrayBuffer	服务器返回的消息
   * @param {Function} fn
   */
  set handleMessage(fn) {
    this._onMessage = fn;
    if (this._socketTask) this.socketTask.onMessage(this._onMessage);
  }

  /**
   * @param {Function} fn
   */
  set handleError(fn) {
    this._onError = fn;
    if (this._socketTask) this.socketTask.onError(this._onError);
  }

  /**
   * code	Number	关闭连接的状态号
   * reason	String	连接被关闭的原因
   */
  set handleClose(fn) {
    this._onClose = fn;
    if (this._socketTask) this.socketTask.onClose(this._onClose);
  }

  /**
   * 创建一个 WebSocket 链接。
   * 支持存在最多两个 WebSocket 链接，每次成功调用 Taro.connectSocket 会返回一个新的 SocketTask。
   */
  connect() {
    return Taro.connectSocket(this.connectOptions).then(task => {
      this._socketTask = task;
      this._socketTask.onOpen(this._onOpen);
      this._socketTask.onMessage(this._onMessage);
      this._socketTask.onError(this._onError);
      this._socketTask.onClose(this._onClose);
    })
  }
}

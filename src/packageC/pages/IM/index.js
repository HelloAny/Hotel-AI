import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Header, Noticebar, MsgsBox, InputField } from "./components";
import { Message, MessageDB } from "./message";
import Server from "../../../service/SocketServer";

import "./assets/style/index.scss";
import "./assets/icon/iconfont.css";

let ID =
  MessageDB.dbInfo.master.info.id ||
  "testID" + Math.floor(Math.random() * 10000);

export default class IM extends Component {
  config = {
    navigationBarTitleText: "",
    navigationStyle: "custom"
  };
  headerHeight = 45;
  InputFieldHeight = 45;

  defaultProps = {};

  state = {
    initialized: false,
    msgBoxHeight: "calc(100% - 45Px)",
    needKeyboardHeight: false,
    keyboardHeight: 280,
    scrollOffset: 0,
    msgBoxRefreshFlag: false,
    inputFieldResetFlag: false,
    roomName: "",
    breakBug: false
  };

  info = null;

  _breakBug = false;

  constructor() {
    super(...arguments);

    // 从缓存获取键盘高度，若不存在则在键盘拉起时设置
    let keyboardHeight = this.getKeyboardHeight();
    if (keyboardHeight) {
      this.state.keyboardHeight = keyboardHeight;
    } else {
      this.state.needKeyboardHeight = true;
    }
  }

  // socket 广播
  sendMessage(msg) {
    const { phone } = this.$router.params;
    let uuid = "";
    let content = "哈啊哈啊啊哈";
    if (msg instanceof Array) {
      uuid = msg.map(m => m.uuid.toString());
      let msgStr = msg.map(m => m.stringify());
      Server.emit("message", msgStr, phone, uuid);
    } else {
      uuid = msg.uuid.toString();
      let msgStr = msg.stringify();
      content = msg.description.content || content;
      Server.emit("message", msgStr, phone, uuid);
    }
  }

  sendToRobot(msg) {
    let uuid = "";
    let content = "哈啊哈啊啊哈";
    if (msg instanceof Array) {
      uuid = msg.map(m => m.uuid.toString());
      let msgStr = msg.map(m => m.stringify());
      Server.emit("robot", msgStr, uuid);
    } else {
      uuid = msg.uuid.toString();
      let msgStr = msg.stringify();
      content = msg.description.content || content;
      if (msg.description.type == "VOICE") {
        Server.emit("robot", msgStr, uuid);
      } else {
        Server.emit("robot", msgStr, uuid, content);
      }
    }
  }

  // 坑！回调中执行setState时， this._disable 可能为 true。组件锁定，无法setState,this._dirty 可能为 true。 未初始化,无法setState
  // socket 事件回调
  onLogin(res) {
    const { code, uuid, info, robotRoom } = res;
    if (code == 2011) MessageDB.setMaster({ ID, uuid });
    if (code == 2012 || code == 2013)
      MessageDB.setMaster({ robotRoom, ID, uuid });

    const { phone, roomName } = this.$router.params;
    if (!phone || roomName == "robot")
      this.setState({
        roomName: robotRoom ? robotRoom : this.state.roomName
      });
    else {
      let room = MessageDB.getRoomByPhone(phone);
      if (room)
        Server.emit(
          "joinByPhone",
          Object.assign({}, room, { uuid: room.uuid.toString() })
        );
      else Server.emit("joinByPhone", { phone });
    }
    this._breakBug = true;
    Server.status = "login";
  }

  // 消息回调
  onMessage(res) {
    let { msgStr, phone } = res;
    if (typeof msgStr == "string") msgStr = [msgStr];
    let room = MessageDB.getRoomByPhone(phone);
    if (room) {
      let uuid = room.uuid.toString();
      msgStr.forEach(m => {
        let msg = Message.parse("", m);
        MessageDB.pushMessage(uuid, msg);
      });
    }
  }

  // 消息回调
  onRobot(res) {
    const { code, reply, recipient } = res;
    if (code == 2040) {
      let msg = new Message(reply);
      msg.sender = "robot";
      MessageDB.pushMessage(recipient, msg);
    }
  }

  // 加入房间后再初始化消息列表
  onJoin(res) {
    const { phone } = this.$router.params;
    const { uuid, msg_list } = res;
    this.setState({
      roomName: uuid
    });
    MessageDB.pushMessage(uuid, msg_list);
    if (phone) MessageDB.getRoom(uuid).setPhone(phone);
  }

  // 初始化房间
  setRoom() {
    this.setState();
  }

  // 从缓存读取键盘高度
  getKeyboardHeight() {
    return Taro.getStorageSync("keyboardHeight");
  }

  // 缓存键盘高度
  setKeyboardHeight(height) {
    return Taro.setStorageSync("keyboardHeight", height);
  }

  /**
   * 获取输入区消息Message对象
   * @param {Message | Array<Message>} msgs 消息对象,可为数组
   */
  handleInput(msgs) {
    console.log("输入区: ", msgs);

    let master = MessageDB.dbInfo.master;

    if (msgs instanceof Array) {
      msgs.forEach(msg => {
        msg.sender = master;
      });
    } else {
      msgs.sender = master;
    }

    MessageDB.pushMessage(this.state.roomName, msgs);
    if (this.state.roomName == master.robotRoom) {
      this.sendToRobot(msgs);
    } else {
      this.sendMessage(msgs);
    }
  }

  // 消息区点击收起input区
  handleClickMsgBox() {
    this.setState({
      inputFieldResetFlag: !this.state.inputFieldResetFlag
    });
  }

  // 监听记录获取的键盘高度
  handleGetKeyboardHeight(height) {
    // wx开发者工具模拟则不记录
    if (this.state.needKeyboardHeight && height) {
      this.setKeyboardHeight(height);
      this.setState({
        keyboardHeight: height,
        needKeyboardHeight: false
      });
    }
  }

  // 监听输入区高度变化，响应到消息内容区
  handleHeightChange(mode) {
    let InputFieldHeight = this.InputFieldHeight;
    let keyboardHeight = this.state.keyboardHeight;
    let height = 0;
    if (mode === "up") height = keyboardHeight + InputFieldHeight;
    if (mode === "low") height = InputFieldHeight;
    if (mode === "over") height = keyboardHeight;
    if (mode === "over-low") height = InputFieldHeight;
    this.setState({
      msgBoxHeight: `calc(100% - ${this.headerHeight + height}Px)`,
      scrollOffset: height - InputFieldHeight
    });
  }

  componentWillMount() {
    console.log(11)
    Server.emit(
      "login",
      Object.assign({}, MessageDB.dbInfo.master, {
        ID: ID
      })
    );
    Server.on("login", this.onLogin.bind(this), true);
    Server.on("message", this.onMessage.bind(this), true);
    Server.on("robot", this.onRobot.bind(this), true);
    Server.on("join", this.onJoin.bind(this), true);
  }

  componentWillUpdate() {
    console.time("IM");
  }

  componentDidUpdate() {
    if (this._breakBug) {
      this.setState({ breakBug: !this.state.breakBug });
      this._breakBug = false;
    }
    console.timeEnd("IM");
  }

  render() {
    const {
      msgBoxHeight,
      scrollOffset,
      keyboardHeight,
      roomName,
      msgBoxRefreshFlag,
      inputFieldResetFlag,
      breakBug
    } = this.state;
    return (
      <View className="IM">
        <View className="header">
          <Header />
          {/* <Noticebar /> */}
        </View>
        <View
          className="msg-box"
          style={{ height: msgBoxHeight }}
          onClick={this.handleClickMsgBox.bind(this)}
        >
          <MsgsBox
            scrollOffset={scrollOffset}
            roomName={roomName}
            refresh={msgBoxRefreshFlag}
            breakBug={breakBug}
          />
        </View>
        <View className="input-filed">
          <InputField
            resetFlag={inputFieldResetFlag}
            keyboardHeight={keyboardHeight}
            onGetKeyboardHeight={this.handleGetKeyboardHeight.bind(this)}
            onHeightChange={this.handleHeightChange.bind(this)}
            onInput={this.handleInput.bind(this)}
          />
        </View>
      </View>
    );
  }
}
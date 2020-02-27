import Taro, { Component } from "@tarojs/taro";
import { View, Input } from "@tarojs/components";
import { EmojiBox, ImgPicker, SoundRecorder, ExtensionArea } from "./extension";
import { Message, MessageDB } from "../../message";
import Server from "../../../../../service/SocketServer";
import ExtensionList from "./extension/config.json";
import "../../assets/style/inputField.scss";

export default class InputField extends Component {
  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
    resetFlag: false,
    keyboardHeight: 280,
    onGetKeyboardHeight: () => {},
    onHeightChange: () => {},
    onInput: () => {}
  };

  state = {
    pullMode: "low", //["low","up","over","over-low"]
    player: {
      ExtensionArea: false,
      EmojiBox: false,
      ImgPicker: false,
      SoundRecorder: false
    },
    value: ""
  };

  propsKeys = [
    "keyboardHeight"
  ];

  stateKeys = ["pullMode", "player"];

  constructor() {
    Server.on("image", res => this.onImage(res), true);

    Server.on("voice", res => this.onVoice(res), true);
  }

  // 切换输入模式设置state.player和拉起状态pullMode
  _switchPlayer(name) {
    let player = Object.assign({}, this.state.player);
    let older = player[name];
    let pullMode = name ? ExtensionList[name].pullMode : "low";

    // 清空状态
    for (const key in player) {
      player[key] = false;
    }

    if (typeof older !== "undefined") player[name] = !older;

    this.setState({
      pullMode,
      player
    });
  }

  // 若pull模式改变则触发事件HeightChange并返回true
  _checkPullMode(nextState) {
    if (this.state.pullMode != nextState.pullMode) {
      this.props.onHeightChange(nextState.pullMode);
    }
  }

  // 收起输入区, 除语音输入模式外将被重置
  _reset() {
    if (!this.state.player.SoundRecorder) this._switchPlayer("");
  }

  // 监听server返回图片地址
  onImage(res) {
    const { uuid, url } = res;
    MessageDB.updateMessage("IMAGE", uuid, { url });
  }

  // 监听server返回音频地址或文本
  onVoice(res) {
    let { uuid, url, text } = res;
    if (!text) text = "主人，我没有听清哦";
    MessageDB.updateMessage("VOICE", uuid, { url, text });
  }

  // 打开拓展功能选择区
  openExtensionArea() {
    if (this.state.player.ExtensionArea) {
      this._switchPlayer("");
    } else {
      this._switchPlayer("ExtensionArea");
    }
  }

  // 打开录音
  openSoundRecorder() {
    this._switchPlayer("SoundRecorder");
  }

  // 打开表情输入
  openEmojiBox() {
    if (this.state.player.EmojiBox) {
      this._switchPlayer("");
    } else {
      this._switchPlayer("EmojiBox");
    }
  }

  // 选中拓展
  handleSelectUtility(name) {
    this._switchPlayer(name);
  }

  // 选中表情
  handleSelectEmoji(res) {
    console.log("选中表情： ", res);
  }

  // 选中图片
  handleSelectImg(res) {
    let FileSystemManager =
      Taro.getEnv() === "WEAPP" ? wx.getFileSystemManager() : null;
    Promise.all(
      res.tempFilePaths.map(filePath => {
        return Taro.getImageInfo({
          src: filePath
        });
      })
    )
      .then(results =>
        this.props.onInput(
          results.map(info => {
            console.log(info);
            let msg = new Message("IMAGE", info);
            FileSystemManager.readFile({
              filePath: info.path,
              encoding: "base64",
              success: data => {
                Server.emit("image", msg.uuid.toString(), data.data, info.type);
              }
            });
            return msg;
          })
        )
      )
      .catch(err => console.log(err));
  }

  // 获取到音频信息
  handleVoiceInput(res) {
    const { duration, tempFilePath } = res;
    if (duration < 1000) return;
    let msg = new Message("VOICE", { path: tempFilePath, duration });
    let FileSystemManager =
      Taro.getEnv() === "WEAPP" ? wx.getFileSystemManager() : null;
    FileSystemManager.readFile({
      filePath: tempFilePath,
      encoding: "base64",
      success: data =>
        Server.emit("voice", msg.uuid.toString(), data.data, true, "wav")
    });
    this.props.onInput(msg);
  }

  // 从语音输入模式切换至其他模式
  handleSwitchInputMode(mode) {
    switch (mode) {
      case "Text":
        this._switchPlayer("");
        break;
      case "Emoji":
        this._switchPlayer("EmojiBox");
        break;
      case "Extension":
        this._switchPlayer("ExtensionArea");
        break;
      default:
        this._switchPlayer("");
        break;
    }
  }

  // 输入框获取焦点
  handleFocus(e) {
    let height = e.detail.height;
    this.props.onGetKeyboardHeight(height);
  }

  // 输入框内容变化
  // 含有内容时关闭拓展区
  handleChange(e) {
    let value = e.detail.value;
    this.setState({ value });
    return value;
  }

  // 确认发送
  handleConfirm() {
    let msg = new Message(this.state.value);
    this.props.onInput(msg);
    this.setState({ value: "" });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.resetFlag != nextProps.resetFlag && this.state.pullMode != "low") this._reset();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);

    this._checkPullMode(nextState);

    if (
      (nextState.value == "" && this.state.value != "") ||
      (nextState.value != "" && this.state.value == "")
    )
      flag = true;

    if (flag) console.log("InputField", { nextProps, nextState });
    return flag;
  }

  componentWillUpdate() {
    console.time("InputField");
  }

  componentDidUpdate() {
    console.timeEnd("InputField");
  }

  render() {
    const { player, pullMode, value } = this.state;
    return (
      <View className="input-box">
        <View className="input-box-row">
          <View className="input-left">
            <View
              onClick={this.openSoundRecorder.bind(this)}
              className="iconfont icon-voice"
            />
          </View>
          <Input
            value={this.state.value}
            className="input"
            placeholder="输入内容"
            cursorSpacing={10}
            confirmType="send"
            onFocus={this.handleFocus.bind(this)}
            onConfirm={this.handleConfirm.bind(this)}
            onInput={this.handleChange.bind(this)}
          />
          <View className="input-right">
            <View
              onClick={this.openEmojiBox.bind(this)}
              className="iconfont icon-emoji"
            />
            <View
              style={{ display: value == "" ? "block" : "none" }}
              onClick={this.openExtensionArea.bind(this)}
              className="iconfont icon-more"
            />
            <View
              style={{ display: value == "" ? "none" : "block" }}
              className="input-confirm"
              onClick={this.handleConfirm.bind(this)}
            >
              发 送
            </View>
          </View>
        </View>
        <View
          className="input-expand"
          style={{
            marginTop: pullMode.indexOf("over") !== -1 ? "0Px" : "45Px"
          }}
        >
          <ExtensionArea
            play={player.ExtensionArea}
            list={ExtensionList}
            onSelect={this.handleSelectUtility.bind(this)}
          />
          <EmojiBox
            play={player.EmojiBox}
            onInput={this.handleSelectEmoji.bind(this)}
          />
          <ImgPicker
            play={player.ImgPicker}
            onInput={this.handleSelectImg.bind(this)}
          />
          <SoundRecorder
            play={player.SoundRecorder}
            onInput={this.handleVoiceInput.bind(this)}
            onSwitchInputMode={this.handleSwitchInputMode.bind(this)}
          />
        </View>
      </View>
    );
  }
}

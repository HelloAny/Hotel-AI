import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "../../../../assets/style/extension/soundRecorder.scss";

export default class SoundRecorder extends Component {
  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
    play: false,
    onSwitchInputMode: () => {},
    onInput: () => {}
  };

  state = {
    isRecording: false
  };

  propsKeys = ["play"];

  stateKeys = ["isRecording"];

  _RecorderManager = null;

  constructor() {
    super(...arguments);
    this._RecorderManager =
      Taro.getEnv() === "WEAPP" ? wx.getRecorderManager() : null;
    this._RecorderManager.onStop(res => this.props.onInput(res));
    this._RecorderManager.onError(errMsg => console.error(errMsg));
  }

  handleStartRecord() {
    if (this._RecorderManager)
      this._RecorderManager.start({
        duration: 60000,
        sampleRate: 16000,
        numberOfChannels: 1,
        encodeBitRate: 96000,
        format: "wav"
      });
    this.setState({
      isRecording: true
    });
  }

  handleStopRecord() {
    if (this._RecorderManager) this._RecorderManager.stop();
    this.setState({
      isRecording: false
    });
  }

  handleCloseSoundRecorder() {
    this.props.onSwitchInputMode("Text");
  }

  handleOpenEmojiBox() {
    this.props.onSwitchInputMode("Emoji");
  }

  handleOpenExtensionArea() {
    this.props.onSwitchInputMode("Extension");
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("SoundRecorder", { nextProps, nextState });
    return flag;
  }

  componentWillUpdate() {
    console.time("SoundRecorder");
  }

  componentDidUpdate() {
    console.timeEnd("SoundRecorder");
  }

  render() {
    const { play } = this.props;
    const { isRecording } = this.state;
    return (
      <View className="input-box" style={{ display: play ? "block" : "none" }}>
        <View className="input-box-row">
          <View className="input-left">
            <View
              onClick={this.handleCloseSoundRecorder.bind(this)}
              className="iconfont icon-keyboard"
            />
          </View>
          <View
            className="input"
            onTouchStart={this.handleStartRecord.bind(this)}
            ontouchend={this.handleStopRecord.bind(this)}
          >
            {isRecording ? "松开 结束" : "按住 开始"}
          </View>
          <View className="input-right">
            <View
              onClick={this.handleOpenEmojiBox.bind(this)}
              className="iconfont icon-emoji"
            />
            <View
              onClick={this.handleOpenExtensionArea.bind(this)}
              className="iconfont icon-more"
            />
          </View>
        </View>
        <View className={`recorder ${isRecording ? "active" : ""}`}>
          <View className="stripe au1" />
          <View className="stripe au2" />
          <View className="stripe au3" />
          <View className="stripe au4" />
          <View className="stripe au5" />
          <View className="stripe au6" />
          <View className="stripe au7" />
          <View className="stripe au8" />
        </View>
      </View>
    );
  }
}

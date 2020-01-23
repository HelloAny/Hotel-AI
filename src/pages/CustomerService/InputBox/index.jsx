import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Input, Image } from "@tarojs/components";
import SoundRecorder from "../../../components/SoundRecorder/index";
import * as Server from "../../../service/api";
import Message from "../message";
import "./input-box.css";
import icon_voice from "../assets/voice.png";
import icon_emoji from "../assets/emoji.png";
import icon_photo from "../assets/photo.png";
import icon_keyboard from "../assets/keyboard.png";
import icon_send from "../assets/send.png";

export default class InputBox extends Component {
  TYPES = ["TEXT", "IMAGE", "EMOJI", "VOICE"];
  tempTypes = [];
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      preType: 0,
      type: 0,
      focus: false,
      isRecording: false,
      value: "",
      __isSB: false
    };
  }

  componentWillMount() {
    let uid = 2222;
    Message.home = uid;
    Server.connectToCustomerService({ uid });
  }

  switchToText = () => {
    this.setState({
      preType: this.state.type,
      type: 0
    });
  };

  switchToImage = () => {
    this.setState({
      preType: this.state.type,
      type: 1
    });
    this.chooseImage();
  };

  switchToEmoji = () => {
    this.setState({
      preType: this.state.type,
      type: 2
    });
  };

  switchToVoice = () => {
    this.setState({
      preType: this.state.type,
      type: 3
    });
  };

  handleTouchStart = () => {
    console.log("开始录音");

    this.setState({
      isRecording: true
    });
  };

  handleTouchEnd = () => {
    console.log("停止录音");
    this.setState({
      isRecording: false
    });
  };

  handleRecode = v => {
    this.handleConfirm(v);
  };

  handleInput = e => {
    let value = e.detail.value;
    this.setState({
      value
    });
  };

  /**
   * 返回   [Message]
   */
  handleConfirm = (v, status) => {
    let type =
      status === "ORG" ? this.tempTypes.pop() : this.TYPES[this.state.type];
    switch (type) {
      case "TEXT":
        let { value } = this.state;
        this.props.onConfirm([new Message(value)], status);
        this.setState({
          __isSB: !this.state.__isSB,
          value: ""
        });
        break;
      case "IMAGE":
        this.props.onConfirm(
          v.map(path => {
            return new Message("IMAGE", path);
          }),
          status
        );
        this.setState({
          type: this.state.preType
        });
        break;
      case "EMOJI":
        this.props.onConfirm([new Message("EMOJI", v)], status);
        this.setState({
          type: this.state.preType
        });
        break;
      case "VOICE":
        this.props.onConfirm([new Message(v)], status);
        break;
    }
  };

  chooseImage = () => {
    Taro.chooseImage({
      success: res => {
        this.tempTypes.unshift("IMAGE");
        Promise.all(
          res.tempFilePaths.map(async filePath => {
            let uid = 2222;
            const res = await Taro.uploadFile({
              url: "http://129.211.14.92:8000/customerserver/image_receive",
              filePath,
              name: "image",
              formData: {
                uid
              }
            });

            let data = JSON.parse(res.data);
            let path = "";
            if (data.code == 200) path = data.results;
            const info = await Taro.getImageInfo({
              src: path
            });

            let content = { path, width: info.width, height: info.height };
            return content;
          })
        ).then(InfoGroup => {
          this.handleConfirm(InfoGroup, "ORG");
        });
        Promise.all(
          res.tempFilePaths.map(async filePath => {
            const info = await Taro.getImageInfo({
              src: filePath
            });
            let content = {
              path: filePath,
              width: info.width,
              height: info.height
            };
            return content;
          })
        ).then(InfoGroup => {
          this.handleConfirm(InfoGroup, "TEMP");
        });
      },
      fail: () => {
        this.setState({
          type: this.state.preType
        });
      }
    });
  };

  render() {
    let VoiceBtn =
      this.state.type === 3 ||
      (this.state.preType === 3 && this.state.type !== 0)
        ? "none"
        : "inline-block";
    let TextBtn =
      this.state.type === 0 ||
      (this.state.preType === 0 && this.state.type !== 3)
        ? "none"
        : "inline-block";
    let VoiceInput =
      this.state.type === 3 ||
      (this.state.preType === 3 && this.state.type !== 0)
        ? "inline-block"
        : "none";
    let ConfirmBtn =
      this.state.type === 0 ||
      (this.state.preType === 0 && this.state.type !== 3)
        ? true
        : false;
    let TextInput =
      this.state.type === 0 ||
      (this.state.preType === 0 && this.state.type !== 3)
        ? "inline-block"
        : "none";

    return (
      <View className="cs-input-box">
        <Button
          plain
          className="cs-btn-input fly1"
          onClick={this.switchToImage}
        >
          <Image className="cs-icon" src={icon_photo} />
        </Button>
        <Button
          plain
          className="cs-btn-input fly2"
          onClick={this.switchToEmoji}
        >
          <Image className="cs-icon" src={icon_emoji} />
        </Button>

        <SoundRecorder
          off={this.state.isRecording}
          onInput={this.handleRecode}
        />

        <Button
          plain
          className="cs-btn-input"
          style={{ display: VoiceBtn }}
          onClick={this.switchToVoice}
        >
          <Image className="cs-icon" src={icon_voice} />
        </Button>
        <Button
          plain
          className="cs-btn-input"
          style={{ display: TextBtn }}
          onClick={this.switchToText}
        >
          <Image className="cs-icon" src={icon_keyboard} />
        </Button>
        <Button
          plain
          className="cs-input"
          style={{ display: VoiceInput }}
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
        >
          {this.isRecording ? "松开  结束" : "按住  说话"}
        </Button>

        <Input
          style={{ display: TextInput }}
          className="cs-input"
          value={this.state.value}
          focus={this.state.focus}
          placeholder="输入问题"
          cursorSpacing="10"
          onInput={this.handleInput}
          onConfirm={this.handleConfirm}
          confirmType="send"
        />
        <Button plain className="cs-btn-input" onClick={this.handleConfirm}>
          {ConfirmBtn ? (
            <Image className="cs-icon" src={icon_send} />
          ) : (
            <Image className="cs-icon" />
          )}
        </Button>
      </View>
    );
  }
}

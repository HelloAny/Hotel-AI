import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./sound-record.css";
import icon_microphone from "./microphone.png";

export default class index extends Component {
  RecorderManager = null;
  constructor(props) {
    super(props);
    this.state = {
      off: false,
      isRecording: -1,
      isTranslating: false,
      config: {
        duration: 60000,
        sampleRate: 16000,
        numberOfChannels: 1,
        encodeBitRate: 64000,
        format: "PCM",
        ...props.config
      },
      show: [
        "none",
        "none",
        "none",
        "none",
        "none",
        "block",
        "block",
        "block",
        "block",
        "block"
      ]
    };
  }

  createRecorderManager() {
    this.RecorderManager = wx.getRecorderManager();
    this.RecorderManager.onStop(this.handleRecord);
  }

  handleInput(v) {
    if (this.props.onInput) this.props.onInput(v);
  }

  handleRecord = v => {
    Taro.showLoading()
    Taro.uploadFile({
      url: "http://129.211.14.92:8000/customerserver/audio_recognize",
      filePath: v.tempFilePath,
      name: "audio_file",
      success: res => {
        let data = JSON.parse(res.data);
        let value = "...";
        if (data.code == 200) {
          value = data.results;
          this.handleInput(value);
        } else {
          Taro.showToast({
            title:"我听不太清楚哦！",
            mask: true,
            icon:"none"
          })
        }
      },
      complete:()=>{
        this.setState({
          isRecording: -1,
          isTranslating: false,
          off: false
        });
        Taro.hideLoading()
      }
    });
  };

  flicker() {
    if (this.state.isRecording !== -1)
      setTimeout(() => {
        this.setState(preState => {
          let { show } = preState;
          show.push(show.shift());
          return { show };
        });
        this.flicker();
      }, 250);
  }

  clear() {
    this.setState({
      show: [
        "none",
        "none",
        "none",
        "none",
        "none",
        "block",
        "block",
        "block",
        "block",
        "block"
      ]
    });
  }

  start() {
    this.clear();
    this.RecorderManager.start(this.state.config);
    this.setState({
      off: true,
      isRecording: 0
    });
  }

  close() {
    this.RecorderManager.stop();
    if (this.state.isRecording !== -1)
      this.setState({
        isRecording: -1,
        isTranslating: true
      });
    else
      this.setState({
        off: false
      });
  }

  componentWillMount() {
    this.createRecorderManager();
  }

  componentDidMount() {
    this.flicker();
  }

  componentDidUpdate() {
    if (this.state.isRecording === 0) {
      this.flicker();
      this.setState({
        isRecording: 1
      });
    }
  }

  componentWillReceiveProps(props) {
    let { off } = props;
    let { isRecording, isTranslating } = this.state;
    
    if (off && isRecording === -1 && !isTranslating) {
      this.start();
    }
    if (!off) {
      this.close();
    }
  }

  render() {
    let { show, off, isRecording, isTranslating } = this.state;
    return (
      <View
        style={{ display: off ? "block" : "none" }}
        className="sr-record-ctr"
      >
        <View
          style={{ display: isRecording !== -1 ? "flex" : "none" }}
          className="sr-record-box"
        >
          <Image src={icon_microphone} className="sr-microphone" />
          <View className="sr-blocks">
            <View style={{ display: show[0] }} className="sr-white-block" />
            <View style={{ display: show[1] }} className="sr-white-block " />
            <View style={{ display: show[2] }} className="sr-white-block " />
            <View style={{ display: show[3] }} className="sr-white-block " />
            <View style={{ display: show[4] }} className="sr-white-block " />
            <View className="sr-black-block" />
          </View>
        </View>
      </View>
    );
  }
}

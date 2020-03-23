import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import "./voice.scss";

const Audio = Taro.createInnerAudioContext();

export default class VoiceMsg extends Component {
  static defaultProps = {
    position: "",
    description: null
  };

  state = {
    isPlaying: false
  };

  handleClick() {
    const { description } = this.props;
    Audio.src = description.path;
    Audio.play();
    this.setState({
      isPlaying: true
    });

    setTimeout(() => {
      this.setState({
        isPlaying: false
      });
    }, description.duration);
  }

  render() {
    const { position, description } = this.props;
    if (!description || !position) return;
    const { duration } = description;
    const { isPlaying } = this.state;
    return (
      <View
        className={"voice-box " + position}
        onClick={this.handleClick.bind(this)}
      >
        <View className={"box " + position}>
          <View class="wife-symbol">
            <View class="wife-circle first" />
            <View
              class={"wife-circle second " + (isPlaying ? "animation" : "")}
            />
            <View
              class={"wife-circle third " + (isPlaying ? "animation" : "")}
            />
          </View>
        </View>
        <Text>{Math.floor(duration / 1000)}"</Text>
      </View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class EmojiBox extends Component {
  static defaultProps = {
    play: false
  };

  state = {};

  propsKeys = ["play"];
  
  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("EmojiBox", {nextProps, nextState});
    return flag;
  }

  componentWillUpdate() {
    console.time("EmojiBox");
  }

  componentDidUpdate() {
    console.timeEnd("EmojiBox");
  }

  render() {
    const { play } = this.props;
    return <View style={{ display: play ? "block" : "none" }}>Emojibox</View>;
  }
}

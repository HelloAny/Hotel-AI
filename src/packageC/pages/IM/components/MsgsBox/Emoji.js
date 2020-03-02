import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class EmojiMsg extends Component {
  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
    msg: null
  };

  state = {};

  componentWillUpdate() {
    console.time("EmojiMsg");
  }

  componentDidUpdate() {
    console.timeEnd("EmojiMsg");
  }

  render() {
    return <View></View>;
  }
}

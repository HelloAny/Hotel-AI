import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class NoticeTip extends Component {
  static defaultProps = {};

  state = {}

  shouldComponentUpdate(nextProps, nextState) {
    console.log("NoticeTip",nextProps, nextState);
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("NoticeTip");
  }

  componentDidUpdate() {
    console.timeEnd("NoticeTip");
  }

  render() {
    return (
      <View></View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class Receipt extends Component {
  static defaultProps = {};

  state = {};

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("Receipt", nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Receipt");
  }

  componentDidUpdate() {
    console.timeEnd("Receipt");
  }

  render() {
    return <View>Receipt</View>;
  }
}

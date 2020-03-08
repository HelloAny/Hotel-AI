import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class Invitation extends Component {
  static defaultProps = {};

  state = {}

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Invitation");
  }

  componentDidUpdate() {
    console.timeEnd("Invitation");
  }

  render() {
    return (
      <View>Invitation</View>
    );
  }
}

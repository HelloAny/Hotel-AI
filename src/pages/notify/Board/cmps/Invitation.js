import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "../assets/style/invitation.scss"

export default class Invitation extends Component {
  static defaultProps = {
    notify:{}
  };

  state = {}

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    return (
      <View className="invitation-container">Invitation</View>
    );
  }
}

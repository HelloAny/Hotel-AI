import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "../assets/style/board-item.scss"

export default class BoardItem extends Component {
  static defaultProps = {
    onClick: () => {},
    type: "",
    mark: false
  };

  state = {};

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    const { type } = this.props
    return (
      <View className="board-item" onClick={this.props.onClick}>
        <View className="tag"></View>
        <View className="detail">{this.props.children}</View>
      </View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class System extends Component {
  static defaultProps = {
    notify: {}
  };

  state = {};

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    return <View>{this.props.notify.content}</View>;
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from 'taro-ui'

export default class Notify extends Component {
  config = {
    navigationBarTitleText: "",
  };

  static defaultProps = {};

  state = {};

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Notify", nextProps, nextState);
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Notify");
  }

  componentDidUpdate() {
    console.timeEnd("Notify");
  }

  render() {
    return (
      <View>
        Notify
      </View>
    );
  }
}

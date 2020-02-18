import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "../../../assets/style/journey-recmd.scss";

export default class RecmdItem extends Component {
  static defaultProps = {};

  state = {};

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    return (
      <View className="container">
        <Image
          src="http://q4ehilcoe.bkt.clouddn.com/temp3.jpg"
          className="bg"
        />
        <View className="icon">推 荐</View>
        <View className="content">
          <Text className="title">首尔亲子三日游</Text>
          <Text className="tab1">四季皆宜</Text>
          <View className="tab2-list">
            <Text className="tab2">购物街</Text>
          </View>
        </View>
      </View>
    );
  }
}

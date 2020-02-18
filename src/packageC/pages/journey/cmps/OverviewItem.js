import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "../../../assets/style/journey-overview.scss";

export default class OverviewItem extends Component {
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
          src="http://q4ehilcoe.bkt.clouddn.com/temp4.jpg"
          className="bg"
        />
        <View className="content">
          <View className="row1">
            <Text className="status">行程结束</Text>
            <Text className="btn">···</Text>
          </View>
          <View className="row2 title">访问浙科</View>
          <View className="row3 tip">2020.02.02 - 2020.02.08</View>
        </View>
      </View>
    );
  }
}

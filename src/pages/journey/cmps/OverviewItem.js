import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

import "../style/journey-overview.scss";

export default class OverviewItem extends Component {
  static defaultProps = {
    info: {}
  };

  state = {};

  propsKeys = ["info"];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    const { name, img, des, time1, time2 } = this.props.info;
    return (
      <View className="ov-container" onClick={this.props.onClick}>
        <Image src={img} className="bg" />
        <View className="content">
          <View className="row1">
            <Text className="status">{des}</Text>
            <Text className="btn">···</Text>
          </View>
          <View className="row2 title">{name}</View>
          <View className="row3 tip">
            {time1} - {time2}
          </View>
        </View>
      </View>
    );
  }
}

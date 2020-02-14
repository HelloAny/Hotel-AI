import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtBadge, AtButton } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";

import "./HClistline.sass";

export default class HClistline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static defaultProps = {
    MaxNumber: 3,
    listLine: [
      {
        id: Number,
        name: String,
        icon: String,
        badge: Number
      }
    ]
  };

  static options = {
    addGlobalClass: true
  };

  renderListline = () => {
    const { listLine, MaxNumber } = this.props;
    const list = listLine.map(item => {
      return (
        <View className="at-col swiper" taroKey={item.id}>
          <AtBadge value={item.badge || ""} maxValue={99}>
            <View className={"iconListLine " + "iconfont " + item.icon}></View>
            <View className="textListLine">{item.name}</View>
          </AtBadge>
        </View>
      );
    });
    return <View className="at-row at-row__justify--center">{list}</View>;
  };
  render() {
    return <View className="container">{this.renderListline()}</View>;
  }
}

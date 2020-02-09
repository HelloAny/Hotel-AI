import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";

import "./HClistline.sass";

export default class HClistline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static defaultProps = {
    MaxNumber: 3,
    listLine: ""
  };

  renderList = () => {
    const { listLine, MaxNumber } = this.props;
    const list = listLine.map(item => {
      return (
        <View className="at-col swiper" taroKey={item.id}>
          <View className={"icon " + "iconfont " + item.icon}></View>
        </View>
      );
    });
    return <View className="at-row at-row__justify--center">{list}</View>;
  };
  render() {
    return <View className="container">{this.renderList()}</View>;
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

import "../style/journey-notice.scss";

export default class NoticeItem extends Component {
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
    const { name, img, time1, time2, des, status } = this.props.info;
    return (
      <View className="nt-container" onClick={this.props.onClick}>
        <Image src={img} className="figure" />
        <View className="gist">
          <Text className="title">{name}</Text>
          <Text className="tip">
            {time1} - {time2}
          </Text>
        </View>
        <View style={{ display: "block" }} className={"btn"}>
          {des}
        </View>
      </View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtBadge } from "taro-ui";

import "./chat-item.scss";

export default class ChatItem extends Component {
  static defaultProps = {
    onClick:()=>{}
  };

  state = {};

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    return (
      <View className="chat-item" onClick={this.props.onClick}>
        <View className="portrait-box">
          <AtBadge value={10} maxValue={99}>
            <Image src="https://hotel.lcworkroom.cn/api/pic/get/users/?name=13858181317" className="portrait" />
          </AtBadge>
        </View>
        <View className="info-box">
          <View className="row">
            <Text className="title">吼吼哈</Text>
            <Text className="time">11:20</Text>
          </View>
          <View className="row">
            <Text className="summary">这是一条消息</Text>
          </View>
        </View>
      </View>
    );
  }
}

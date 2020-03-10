import Taro, { Component, checkSession } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtBadge } from "taro-ui";
import { dateFormat, isJson } from "../../../utils";

import "./chat-item.scss";

export default class ChatItem extends Component {
  static defaultProps = {
    onClick: () => {},
    unreadNum: 0,
    nickName: "",
    time: "",
    content: "",
    phone: ""
  };

  state = {};

  propsKeys = ["unreadNum", "nickName", "time", "content", "phone"];

  stateKeys = [];

  getTipTime(t) {
    let now = new Date();
    let time = new Date(t);
    if (
      time.getDate() == now.getDate() &&
      now.getTime() - time.getTime() < 24 * 60 * 60 * 1000
    )
      return dateFormat("HH:MM", time);
    if (
      (time.getDate() == now.getDate() - 1 ||
        time.getMonth() == now.getMonth() - 1) &&
      now.getTime() - time.getTime() < 24 * 60 * 60 * 1000
    )
      return "昨天";
    return dateFormat("YYYY-mm-dd", time);
  }

  getContent(c) {
    c = decodeURI(c);
    if (!isJson(c)) return c;
    else {
      let msg = JSON.parse(c);
      switch (msg.description.type) {
        case "TEXT":
          return msg.description.content.length > 20
            ? msg.description.content.substr(0, 20) + "..."
            : msg.description.content;
        case "IMAGE":
          return "[图片]";
        case "VOICE":
          return "[语音]";
        case "EMOJI":
          return "[表情]";
        default:
          return "[消息]";
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    console.log(this.props);
    return (
      <View className="chat-item" onClick={this.props.onClick}>
        <View className="portrait-box">
          <AtBadge
            value={this.props.unreadNum > 0 ? this.props.unreadNum : ""}
            maxValue={99}
          >
            <Image
              src={
                "https://hotel.lcworkroom.cn/api/pic/get/users/?name=" +
                this.props.phone
              }
              className="portrait"
            />
          </AtBadge>
        </View>
        <View className="info-box">
          <View className="row">
            <Text className="title">{this.props.nickName}</Text>
            <Text className="time">{this.getTipTime(this.props.time)}</Text>
          </View>
          <View className="row">
            <Text className="summary">
              {this.getContent(this.props.content)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

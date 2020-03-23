import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { dateFormat } from "../../../../utils";
import { userStore } from "../../../../store";
import "../assets/style/visit.scss";

export default class Invitation extends Component {
  static defaultProps = {
    notify: {
      extra: {
        nickname: "",
        travel: "",
        time: 21312321321,
        visit_id: "",
        phone: ""
      },
      subtype: ""
    }
  };

  state = {};

  propsKeys = ["notify"];

  stateKeys = [];

  getTipTime() {
    let t = this.props.notify.extra.time * 1000;
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

  getTitle() {
    const { subtype } = this.props.notify;
    const { sender } = this.props.notify.extra;

    switch (subtype) {
      case "accept":
        return sender == userStore.user.id ? "拜访已被接受" : "接受拜访";
      case "refuse":
        return sender == userStore.user.id ? "拜访已被拒绝" : "拒绝拜访";
      case "waiting":
        return "拜访函";
      default:
        return "";
    }
  }

  getContent() {
    const { subtype } = this.props.notify;
    const { nickname, travel, visit_id, sender } = this.props.notify.extra;

    switch (subtype) {
      case "accept":
        return sender == userStore.user.id
          ? `${nickname} 同意您加入 ${travel}`
          : `已接受 ${nickname} 参与行程 ${travel}`;
      case "refuse":
        return sender == userStore.user.id
          ? `${nickname} 拒绝拜访`
          : `已拒绝 ${nickname}参与行程 ${travel}`;
      case "waiting":
        return `${nickname} 申请参与行程 ${travel}`;
      default:
        return "";
    }
  }

  handleClick(id) {
    const { subtype } = this.props.notify;
    switch (subtype) {
      case "accept":
        return setTimeout(() => {
          Taro.switchTab({
            url: "/pages/journey/index"
          });
        }, 300);
      case "refuse":
        return Taro.showToast({
          title: "已拒绝",
          icon: "none",
          duration: 2000
        });
      case "waiting":
        return setTimeout(() => {
          Taro.navigateTo({
            url: "/packageC/pages/receipt/index?type=visit&visitId=" + id
          });
        }, 300);
      default:
        return "";
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    return (
      <View
        className="invitation-container"
        onClick={this.handleClick.bind(this, this.props.notify.extra.visit_id)}
      >
        <View className="row">
          <Text className="title">{this.getTitle()}</Text>
          <Text className="time">{this.getTipTime()}</Text>
        </View>
        <View className="row">
          <Text className="content">{this.getContent()}</Text>
        </View>
      </View>
    );
  }
}

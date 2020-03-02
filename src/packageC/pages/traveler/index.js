import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtIcon, AtActionSheet, AtActionSheetItem } from "taro-ui";
import { Ico } from "../../../components/Ico";

import "../../assets/style/traveler.scss";

export default class Traveler extends Component {
  config = {
    navigationBarTitleText: "同行者"
  };
  static defaultProps = {};

  state = {
    boxOpen: false
  };

  propsKeys = [];

  stateKeys = ["boxOpen"];

  // 打开邀请
  handleOpenInviteBox() {
    this.setState({
      boxOpen: true
    });
  }

  // 关闭邀请
  handleClose() {
    this.setState({
      boxOpen: false
    })
  }

  // 应用内私聊分享
  handleInviteByChat() {}

  // 微信好友分享
  handleInviteByWx() {}

  // QQ好友分享
  handleInviteByQQ() {}

  // 微信朋友圈分享
  handleInviteByWxShare() {}

  // 二维码分享邀请
  handleInviteByCode() {}

  // 复制到粘贴板
  handleInviteByText() {
    console.log(this);
  }

  // 进入行程详情
  handleNavToDetail() {
    const { id } = this.$router.params;
    Taro.navigateTo({
      url: "/packageC/pages/detail/index?id=" + id
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("Traveler", nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Traveler");
  }

  componentDidUpdate() {
    console.timeEnd("Traveler");
  }

  render() {
    const { boxOpen } = this.state;
    return (
      <View className="traveler-container">
        <View
          className="add-traveler"
          onClick={this.handleOpenInviteBox.bind(this)}
        >
          邀请同行人
          <AtIcon value="chevron-right" size="12" color="#606266" />
        </View>
        <View className="traveler-box">
          <View className="title">所有同行人</View>
          <View className="traveler-list">
            <View className="traveler-item">
              <View className="user">
                <Image
                  src="https://hotel.lcworkroom.cn/api/pic/get/users/?name=13858181317"
                  className="user-portrait"
                />
                <Text className="user-name">用户名</Text>
              </View>
              <Text className="character">发起者</Text>
            </View>
            <View className="traveler-item">
              <View className="user">
                <Image
                  src="https://hotel.lcworkroom.cn/api/pic/get/users/?name=13858181317"
                  className="user-portrait"
                />
                <Text className="user-name">用户名</Text>
              </View>
              <Text className="character">成员</Text>
            </View>
            <View className="traveler-item">
              <View className="user">
                <Image
                  src="https://hotel.lcworkroom.cn/api/pic/get/users/?name=13858181317"
                  className="user-portrait"
                />
                <Text className="user-name">用户名</Text>
              </View>
              <Text className="character">成员</Text>
            </View>
          </View>
        </View>
        <View className="bottomNav">
          <View className="left" onClick={this.handleNavToDetail.bind(this)}>
            <AtIcon value="calendar" />
            <Text className="nav-text">我的行程</Text>
          </View>
          <View
            className="center"
            onClick={this.handleSpreadExpansion.bind(this)}
          >
            <Image
              className="btn"
              src="https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/centerBtn.png"
            />
          </View>
          <View className="right">
            <AtIcon value="user" />
            <Text className="nav-text">同行者</Text>
          </View>
        </View>
        <AtActionSheet
          isOpened={boxOpen}
          cancelText="取消"
          title="发起邀请"
          onClose={this.handleClose.bind(this)}
          onCancel={this.handleClose.bind(this)}
        >
          <AtActionSheetItem>
            <View
              className="invite-box"
              onClick={this.handleInviteByChat.bind(this)}
            >
              <View className="btn red">
                <Ico value="icon-chat" size="30" />
                <Text className="title">私聊</Text>
              </View>
              <View
                className="btn green"
                onClick={this.handleInviteByWx.bind(this)}
              >
                <Ico value="icon-wx" size="25" />
                <Text className="title">微信好友</Text>
              </View>
              <View
                className="btn green-grey"
                onClick={this.handleInviteByQQ.bind(this)}
              >
                <Ico value="icon-qq" size="30" />
                <Text className="title">QQ好友</Text>
              </View>
              <View
                className="btn blue"
                onClick={this.handleInviteByWxShare.bind(this)}
              >
                <Ico value="icon-wxshare" size="30" />
                <Text className="title">微信友圈</Text>
              </View>
            </View>
          </AtActionSheetItem>
          <AtActionSheetItem>
            <View className="invite-box">
              <View
                className="btn white"
                onClick={this.handleInviteByCode.bind(this)}
              >
                <Ico value="icon-erweima" size="28" />
                <Text className="title">二维码</Text>
              </View>
              <View
                className="btn white"
                onClick={this.handleInviteByText.bind(this)}
              >
                <Ico value="icon-fuzhi" size="30" />
                <Text className="title">复制</Text>
              </View>
            </View>
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    );
  }
}

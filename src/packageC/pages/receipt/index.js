import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { dateFormat } from "../../../utils";
import { Navbar } from "../../../components"
import * as Server from "../../../actions";

import "../../assets/style/receipt.scss";

export default class Receipt extends Component {
  config = {
    navigationStyle: "custom"
  };
  static defaultProps = {};

  state = {
    note: "你好啊",
    startTime: "",
    endTime: "",
    hotel: "",
    nickname: "",
    type: "invite"
  };

  propsKeys = [];

  stateKeys = ["note", "startTime", "endTime", "hotel", "nickname", "type"];

  handleRefuse() {
    const { visitId, type } = this.$router.params;
    Server.acceptVisit(visitId)
      .then(() =>
        Taro.redirectTo({
          url: "/packageC/pages/receipt/result?result=refuse&type=" + type
        })
      )
      .catch(err => {
        Taro.showToast({
          title: "网络开小差了...",
          icon: "none",
          duration: 2000
        });
        console.log(err);
      });
  }

  handleAccept() {
    const { visitId, type } = this.$router.params;
    Server.refuseVisit(visitId)
      .then(() =>
        Taro.redirectTo({
          url: "/packageC/pages/receipt/result?result=accept&type=" + type
        })
      )
      .catch(err => {
        Taro.showToast({
          title: "网络开小差了...",
          icon: "none",
          duration: 2000
        });
        console.log(err);
      });
  }

  componentWillMount() {
    const { visitId, type } = this.$router.params;
    Taro.showLoading({
      title: "loading"
    });
    Server.getVisitInfo(visitId)
      .then(res => {
        this.setState({
          note: res.visitor_content,
          startTime: res.start_time,
          endTime: res.end_time,
          hotel: res.hotel,
          nickname: res.nickname,
          type: type || "invite"
        });
      })
      .catch(err => {
        Taro.showToast({
          title: "网络开小差了...",
          icon: "none",
          duration: 2000
        });
        console.log(err);
      })
      .then(() => Taro.hideLoading());
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("Receipt", nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Receipt");
  }

  componentDidUpdate() {
    console.timeEnd("Receipt");
  }

  render() {
    const { note, startTime, endTime, hotel, nickname, type } = this.state;
    return (
      <View className="container">
        <Navbar color="white" shade/>
        <View className="container-bg">
          <View className="head">
            <View className="user">-来自用户{nickname}的-</View>
            <View className="title">
              {type == "invite" ? (
                <Image
                  className="img"
                  src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/visit/invite_title.png"
                  mode="widthFix"
                />
              ) : (
                <Image
                  className="img"
                  src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/visit/visit_title.png"
                  mode="widthFix"
                />
              )}
            </View>
            <View className="note">{note}</View>
          </View>
          <View className="time">
            <View className="time-start">
              {startTime ? dateFormat("YYYY年mm月dd日 HH:MM", startTime) : ""}
            </View>
            <View className="time-end">
              {endTime ? dateFormat("YYYY年mm月dd日 HH:MM", endTime) : ""}
            </View>
          </View>
          <View className="place">{hotel}</View>
          <View className="btn-group">
            <Text onClick={this.handleRefuse.bind(this)} className="btn">
              拒绝 {type == "invite" ? "邀请" : "申请"}
            </Text>
            <Text onClick={this.handleAccept.bind(this)} className="btn">
              接受 {type == "invite" ? "邀请" : "申请"}
            </Text>
          </View>
          <View className="billboard">
            <View className="code">
              <Image
                className="img"
                src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/visit/code.png"
              />
            </View>
            <View className="ad">
              <View className="tip">扫码添加小程序</View>
              <View className="tip">享受智慧酒店，获取更多优惠哦</View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

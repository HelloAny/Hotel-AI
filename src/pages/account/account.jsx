/* eslint-disable react/sort-comp */
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
import { infoByToken } from "@actions/api";
import { reLaunch } from "@utils";
import { HClist, HClistline } from "@components";

import "./account.sass";

@inject("userStore")
@observer
// eslint-disable-next-line no-unused-vars
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    (this.list = [
      {
        id: 1,
        name: "我的订单",
        hr: true,
        icon: "icon-RectangleCopy153",
        url: "",
      },
      {
        id: 2,
        name: "收藏",
        hr: true,
        icon: "icon-RectangleCopy19",
        url: "",
      },
      {
        id: 3,
        name: "优惠券",
        hr: true,
        icon: "icon-RectangleCopy42",
        url: "",
      },
      {
        id: 4,
        name: "会员服务",
        hr: true,
        icon: "icon-RectangleCopy59",
        url: "",
      },
      {
        id: 5,
        name: "设置",
        hr: false,
        icon: "icon-RectangleCopy16",
        url: "/packageA/setting/setting",
      },
    ]),
      (this.listline = [
        {
          id: 1,
          name: "酒店订单",
          icon: "icon-RectangleCopy103",
          badge: "",
          url: "/packageA/hotelOrder/hotelOrder",
        },
        {
          id: 2,
          name: "账户",
          icon: "icon-RectangleCopy153",
          badge: "",
          url: "/packageA/bill/bill",
        },
        {
          id: 3,
          name: "客服",
          icon: "icon-kefu",
          badge: "",
          url: "",
        },
      ]);
  }
  config = {
    navigationBarTitleText: "我的",
    navigationBarBackgroundColor: "#4F4FCB",
  };

  /**界面初始化*/
  mountedInterface = () => {
    const { userStore } = this.props;
    /**
     * 获取个人信息并保存到mobx
     * @param {string} token token缓存
     */
    const setUserInfo = (token) => {
      infoByToken(token).then((res) => {
        if (res.data.status == 0) {
          userStore.setUserInfo(res.data.data); //保存到mobx
        } else if (res.data.status == -100) {
          Taro.showToast({
            title: "参数错误",
            icon: "fail",
            duration: 2000,
          });
        }
      });
    };
    //调用路由
    reLaunch(setUserInfo);
  };

  /**
   * 路由转跳
   * @param {string} url 路径
   */
  navgiateTo(url) {
    Taro.navigateTo({
      url: url,
    });
  }

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {
    this.mountedInterface();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  render() {
    const {
      userStore: {
        user: { nickName, userName },
      },
    } = this.props;
    return (
      <View className="container">
        <View className="topSet at-row at-row__align--center">
          <View
            className="at-col at-col-3"
            onClick={this.navgiateTo.bind(this, "/packageA/user/user")}
          >
            <AtAvatar
              circle
              className="visitor"
              image={`https://hotel.lcworkroom.cn/api/pic/get/users?name=${userName}`}
            ></AtAvatar>
          </View>
          <View
            className="at-col at-col-4"
            onClick={this.navgiateTo.bind(this, "/packageA/user/user")}
          >
            <View className="account_name">{nickName}</View>
            <View className="set_account_info">点击编辑个人信息</View>
          </View>
          <View className="hrx">|</View>
          <View className="icon iconfont icon-RectangleCopy61"></View>
          <View className="priceText">奖励点:</View>
          <Text className="priceNumber">450</Text>
        </View>
        <View className="list">
          <View>
            <HClistline listLine={this.listline} MaxNumber="3" />
            <View className="hrFull"></View>
            <HClist lists={this.list}></HClist>
          </View>
        </View>
      </View>
    );
  }
}
export default Account;

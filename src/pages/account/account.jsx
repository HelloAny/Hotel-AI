import Taro, { Component, getUserInfo } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
import { infoByToken } from "@actions/api";
import { reLaunch } from "@utils";
import { HClist, HClistline } from "@components";

import "./account.sass";

@inject("userStore")
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  config = {
    navigationBarTitleText: "我的",
    navigationBarBackgroundColor: "#2d8cf0"
  };

  /**界面初始化*/
  mountedInterface = () => {
    const { userStore } = this.props;
    /**
     * 获取个人信息并保存到mobx
     * @param {string} token token缓存
     */
    const setUserInfo = token => {
      infoByToken(token).then(res => {
        if (res.data.status == 0) {
          console.log(res.data.data);
          userStore.setUserInfo(res.data.data); //保存到mobx
          console.log(userStore.user);
        } else if (res.data.status == -100) {
          Taro.showToast({
            title: "参数错误",
            icon: "fail",
            duration: 2000
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
      url: url
    });
  }

  componentWillMount() {
    this.mountedInterface();
  }

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  render() {
    const {
      userStore: {
        user: { nickName, userName }
      }
    } = this.props;
    //lisline统一设置
    const listline = [
      {
        id: 1,
        name: "酒店订单",
        icon: "icon-l-enterprise",
        badge: "2",
        url: ""
      },
      {
        id: 2,
        name: "账户",
        icon: "icon-l-coupon",
        badge: "",
        url: ""
      },
      {
        id: 3,
        name: "客服",
        icon: "icon-l-headset",
        badge: "",
        url: ""
      }
    ];
    //list统一设置
    const list = [
      {
        id: 1,
        name: "我的订单",
        hr: true,
        icon: "icon-RectangleCopy153",
        url: ""
      },
      {
        id: 2,
        name: "收藏",
        hr: true,
        icon: "icon-RectangleCopy19",
        url: ""
      },
      {
        id: 3,
        name: "优惠券",
        hr: true,
        icon: "icon-RectangleCopy42",
        url: ""
      },
      {
        id: 4,
        name: "设置",
        hr: false,
        icon: "icon-RectangleCopy16",
        url: ""
      }
    ];
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
              image={`https://hotel.lcworkroom.cn/api/user/portrait/?username=${userName}`}
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
          <View className="priceNumber">0</View>
        </View>
        <View className="list">
          <View>
            <HClistline listLine={listline} MaxNumber="3" />
            <View className="hrFull"></View>
            <HClist lists={list}></HClist>
          </View>
        </View>
      </View>
    );
  }
}

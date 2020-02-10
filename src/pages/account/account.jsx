import Taro, { Component, getUserInfo } from "@tarojs/taro";
import "./account.sass";
import { View } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
import axios from "../../actions/api";
import { reLaunch } from "../../utils";
import HClistline from "./HClistline/HClistline";

@inject("userStore")
@observer
class Login extends Component {
  config = {
    navigationBarTitleText: "我的",
    navigationBarBackgroundColor: "#2d8cf0"
  };

  /**界面初始化*/
  mountedInterface = () => {
    /**
     * 获取个人信息并保存到mobx
     * @param {string} token token缓存
     */
    const setUserInfo = token => {
      const { userStore } = this.props;
      axios.infoByToken(token).then(res => {
        if (res.data.status == 0) {
          userStore.setUserInfo(res.data.data); //保存到mobx
        } else if (res.data.status == -100) {
          console.log("丢失参数!");
          Taro.showToast({
            title: "参数丢失",
            icon: "fail",
            duration: 2000
          });
        }
      });
    };
    //调用路由
    reLaunch(setUserInfo);
  };

  NavTo(url) {
    if (url) {
      Taro.navigateTo({
        url: url
      });
    }
  }

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  render() {
    const listline = [
      {
        id: 1,
        name: "测试",
        icon: "icon-RectangleCopy153"
      },
      {
        id: 2,
        name: "测试2",
        icon: "icon-RectangleCopy4"
      },
      {
        id: 3,
        name: "测试3",
        icon: "icon-RectangleCopy8"
      }
    ];
    const configList = [
      {
        id: 1,
        name: "信息",
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
    const List = configList.map(item => {
      return (
        <View taroKey={item.id}>
          <View className="account_list at-row at-row__align--center">
            <View className="at-col at-col-2">
              <View className={"icon " + "iconfont " + item.icon}></View>
            </View>
            <View className="at-col at-col-8">
              <View className="information_title">{item.name}</View>
            </View>
            <View className="at-col at-col-1">
              <View className="arch">›</View>
            </View>
          </View>
          {item.hr ? (
            <View>
              <View className="hr"></View>
              <View className="hr"></View>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      );
    });
    return (
      <View className="container">
        <View className="topSet at-row at-row__align--center">
          <View className="at-col at-col-3">
            <AtAvatar
              circle
              className="visitor iconfont icon-RectangleCopy4"
            ></AtAvatar>
          </View>
          <View className="at-col at-col-4">
            <View className="account_name">游客</View>
            <View className="set_account_info">点击编辑个人信息</View>
          </View>
          <View className="hrx at-col at-col-1">|</View>
          <View
            className="login at-col"
            onClick={this.NavTo.bind(this, "/pages/login/login")}
          >
            登录/注册
          </View>
        </View>
        <View className="list">
          <View>
            <HClistline listLine={listline} MaxNumber="3" />
          </View>
          {List}
        </View>
      </View>
    );
  }
}

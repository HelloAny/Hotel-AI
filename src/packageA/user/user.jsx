import Taro, { Component, getUserInfo } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import axios from "../../actions/api";
import { reLaunch } from "../../utils"; //测试用
import { observer, inject } from "@tarojs/mobx";

import "./user.sass";

import background from "../../assets/images/realAuth/realAuth.png";

@inject("userStore")
@observer
class user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNickName: ""
    };
  }
  config = {
    navigationBarTitleText: "个人资料",
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
      axios.infoByToken(token).then(res => {
        if (res.data.status == 0) {
          console.log(res.data.data);
          userStore.setUserInfo(res.data.data); //保存到mobx
          console.log(userStore.user);
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

  /**
   * 修改昵称
   * @param {string} value 默认
   */
  nickNameChange(value) {
    this.setState({
      userNickName: value
    });
    return value;
  }

  /**
   * 上传头像
   * @param {Object} event 默认
   */
  uploadPortrait(event) {
    const { portrait } = this.state;
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: "original",
      sourceType: ["camera", "album"],
      success: function(res) {
        Taro.getImageInfo({
          src: res.tempFilePaths[0],
          success: function(res) {
            const param = {
              token: Taro.getStorageSync("token"),
              image: res.path
            };
            axios.userPortraitUpload(param).then(res => {
              if (res.data.status == 0) {
                Taro.showToast({
                  title: "上传成功",
                  icon: "success",
                  duration: 2000
                });
                Taro.reLaunch({
                  url: "/pages/account/account"
                });
              }
            });
          }
        });
      }
    });
  }

  /**
   * 路由转跳
   * @param {string} url 路径
   */
  navigateTo(url) {
    Taro.navigateTo({
      url: url
    });
  }

  getUserPortrait() {}
  componentWillMount() {
    this.mountedInterface();
  }

  render() {
    const {
      userStore: {
        user: { userName, nickName, ID }
      }
    } = this.props;
    return (
      <View className="container">
        <View
          className="at-row at-row__align--center userInfo userPortrait"
          onClick={this.uploadPortrait.bind(this)}
        >
          <View className="at-col at-col-2 title">头像</View>
          <View className="at-col at-col-6 text">点击上传头像</View>
          <View className="at-col at-col-3">
            <AtAvatar
              circle
              className="userAvatar"
              size="large"
              image={`https://hotel.lcworkroom.cn/api/user/portrait/?username=${userName}`}
            ></AtAvatar>
          </View>
        </View>
        <View className="hr"></View>
        <View
          className="at-row at-row__align--center userInfo"
          onClick={this.navigateTo.bind(
            this,
            "/packageA/user/HCchangeName/HCchangeName"
          )}
        >
          <View className="at-col at-col-2 title">昵称</View>
          <View className="at-col at-col-7 text">{nickName}</View>
          <View className="at-col at-col-1">
            <View className="arch">›</View>
          </View>
        </View>
        <View className="hr"></View>
        <View className="hr"></View>
        <View
          className="realAuth"
          onClick={this.navigateTo.bind(this, "/packageA/realAuth/realAuth")}
        >
          <Image className="realAuthBackground" src={background} />
          <View className="at-row">
            <View className="at-col at-col-2">
              <View className="realAuthLogo">
                <View
                  className={
                    !!ID
                      ? "iconRealAuthPass iconfont icon-RectangleCopy4"
                      : "iconRealAuthPro iconfont icon-RectangleCopy4"
                  }
                ></View>
              </View>
            </View>
            <View className="realAuthInfo at-col at-col-8">
              {!!ID ? (
                <View>ID证件:{ID}</View>
              ) : (
                <View className="realAuthText">
                  <View className="iconRealAuthNo iconfont icon-RectangleCopy"></View>
                  未实名认证
                  <View className="realAuthWhy">了解为什么要实名认证?</View>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

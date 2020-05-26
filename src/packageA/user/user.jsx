import Taro, { Component, getUserInfo } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import { infoByToken, picUpload } from "@actions/api";
import { reLaunch } from "@utils"; //测试用
import { observer, inject } from "@tarojs/mobx";
import { Navbar } from "@components";

import "./user.sass";


@inject("userStore")
@observer
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNickName: ""
    };
  }
  config = {
    navigationBarBackgroundColor: "#4F4FCB",
    navigationBarTextStyle: "black",
    navigationBarTitleText: "个人信息",
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
          userStore.setUserInfo(res.data.data); //保存到mobx
        } else if (res.data.status == -100) {
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
    const {
      userStore: {
        user: { userName }
      }
    } = this.props;
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: "original",
      sourceType: ["camera", "album"],
      success: function (res) {
        Taro.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            const param = {
              imagePath: res.path,
              type: res.type,
              name: userName,
              upload_to: "users",
              if_local: false,
              content: "头像"
            };
            picUpload(param).then(res => {
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

  checkInfo() {
    Taro.showToast({
      title: "系统维护中",
      duration: 2000
    })
  }

  getUserPortrait() { }
  componentWillMount() {
    this.mountedInterface();
  }



  render() {
    const {
      userStore: {
        user: { userName, nickName, ID, email, if_face }
      }
    } = this.props;
    return (
      <View className="container">
        <View
          className="at-row at-row__align--center userInfo userPortrait"
          onClick={this.uploadPortrait}
        >
          <View className="at-col at-col-2 title">头像</View>
          <View className="at-col at-col-6 text">点击上传头像</View>
          <View className="at-col at-col-3">
            <AtAvatar
              circle
              className="userAvatar"
              size="large"
              image={`https://hotel.lcworkroom.cn/api/pic/get/users?name=${userName}`}
            ></AtAvatar>
          </View>
        </View>
        <View className="hr"></View>
        <View
          className="at-row at-row__align--center userInfo"
          onClick={this.navigateTo.bind(
            this,
            "/packageA/user/changeName/changeName"
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
          className="at-row at-row__align--center userInfo"
          onClick={this.navigateTo.bind(
            this,
            "/packageA/user/changeEmail/changeEmail"
          )}
        >
          <View className="at-col at-col-2 title">邮箱</View>
          <View className="at-col at-col-7 text">{email}</View>
          <View className="at-col at-col-1">
            <View className="arch">›</View>
          </View>
        </View>
        <View className="hr"></View>
        <View className="hr"></View>
        <View className="realAuth">
          <Image className="realAuthBackground" src="http://cdn.amikara.com/realAuth.png" />
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
              {!!ID && if_face ? (
                <View className="realAuthText">
                  <View className="iconRealAuthYes iconfont icon-RectangleCopy11"></View>
                  已认证
                  <View className="realAuthWhy">ID证件:{ID}</View>
                  <View
                    className="realAuthAgain"
                    // onClick={this.navigateTo.bind(
                    //   this,
                    //   "/packageA/realAuth/realAuth"
                    // )}
                    onClick={this.checkInfo.bind(this)}
                  >
                    重新认证
                  </View>
                </View>
              ) : (
                  <View
                    className="realAuthText"
                    // onClick={this.navigateTo.bind(
                    //   this,
                    //   "/packageA/realAuth/realAuth"
                    // )}
                    onClick={this.checkInfo.bind(this)}
                  >
                    <View className="iconRealAuthNo iconfont icon-RectangleCopy"></View>
                  未实名认证和人脸认证
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
export default User;

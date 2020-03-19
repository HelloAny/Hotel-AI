import Taro, { Component, getUserInfo } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtAvatar, AtInput, AtForm, AtButton } from "taro-ui";
import { infoUpdataByToken } from "@actions/api";
import { reLaunch } from "@utils"; //测试用
import { observer, inject } from "@tarojs/mobx";

import "./changeName.sass";

@inject("userStore")
@observer
class changeName extends Component {
  constructor(props) {
    super(props);
    this.state = { nickNameChange: "" };
  }
  config = {
    navigationBarTitleText: "修改昵称",
    navigationBarBackgroundColor: "#2d8cf0"
  };
  /**
   * 更改昵称
   * @param {string} value 默认
   */
  nameChange(value) {
    this.setState({
      nickNameChange: value
    });
    return value;
  }

  /**
   * 发送请求更改用户信息
   */
  updateUserInfo() {
    const { nickNameChange } = this.state;
    const {
      userStore: {
        user: { userName, email, ID }
      },
      userStore
    } = this.props;
    if (nickNameChange.trim().length <= 8 && nickNameChange.trim().length > 0) {
      const param = {
        token: Taro.getStorageSync("token"),
        username: userName,
        nickname: nickNameChange,
        email: email,
        ID: ID
      };
      infoUpdataByToken(param).then(res => {
        console.log(res);
        if (res.data.status == 0) {
          Taro.showToast({
            title: "修改成功",
            icon: "success",
            duration: 2000,
            mask: true,
            success: function() {
              userStore.updateUserInfo(param);
              Taro.reLaunch({
                url: "/packageA/user/user"
              });
            }
          });
        } else {
          Taro.showToast({
            title: "修改失败",
            icon: "fail",
            duration: 2000
          });
        }
      });
    }
  }
  render() {
    const {
      userStore: {
        user: { nickName }
      }
    } = this.props;
    return (
      <View className="container">
        <View className="at-row nameInput">
          <View className="at-col at-col-11">
            <AtInput
              name="value"
              title="昵称"
              type="text"
              value={nickName}
              autoFocus={true}
              selectionStart="-1"
              onChange={this.nameChange.bind(this)}
            />
          </View>
        </View>
        <View className="at-row userChangeNameBtn">
          <View className="at-col">
            <AtButton
              type="primary"
              className=""
              onClick={this.updateUserInfo.bind(this)}
            >
              保存
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}

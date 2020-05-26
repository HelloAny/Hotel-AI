import Taro, { Component, getUserInfo } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";
import { infoUpdataByToken } from "@actions/api";
import { reLaunch } from "@utils"; //测试用
import { observer, inject } from "@tarojs/mobx";
import { Navbar } from "@components";

import "./changeEmail.sass";

@inject("userStore")
@observer
class changeEmail extends Component {
  constructor(props) {
    super(props);
    this.state = { emailChange: "" };
  }
  config = {
    navigationBarBackgroundColor: "#4F4FCB",
    navigationBarTextStyle: "black",
    navigationBarTitleText: "修改邮箱",
  };
  /**
   * 更改昵称
   * @param {string} value 默认
   */
  emailChange(value) {
    this.setState({
      emailChange: value
    });
    return value;
  }

  /**
   * 发送请求更改用户信息
   */
  updateUserInfo() {
    const { emailChange } = this.state;
    const {
      userStore: {
        user: { userName, nickName, ID }
      },
      userStore
    } = this.props;
    if (
      /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
        emailChange
      )
    ) {
      const param = {
        token: Taro.getStorageSync("token"),
        username: userName,
        nickname: nickName,
        email: emailChange,
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
            success: function () {
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
  componentDidMount() {
    const {
      userStore: {
        user: { email }
      }
    } = this.props;
    this.setState({
      emailChange: email
    })
  }
  render() {
    const {
      userStore: {
        user: { email }
      }
    } = this.props;
    return (
      <View className="container">
        <View className="at-row nameInput">
          <View className="at-col at-col-11">
            <AtInput
              name="value"
              title="邮箱"
              type="text"
              value={this.state.emailChange}
              autoFocus={true}
              onChange={this.emailChange.bind(this)}
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

export default changeEmail;

import Taro, { Component, login } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { AtButton, AtInput } from "taro-ui";
import { loginByPsw } from "@actions/api";
import { HCerror } from "@components";
import "./registerByPsw.sass";

class LoginByPsw extends Component {
  config = {
    navigationBarTitleText: "密码登录",
    navigationBarBackgroundColor: "#2d8cf0",
    navigationBarTextStyle: "white",
  };

  constructor() {
    super();
    this.state = {
      phone: "", //电话
      passWord: "", //密码
      errorCap: 0,
      show_resBtn: false,
    };
  }

  handleChange(value) {
    this.setState({
      phone: value,
      show_resBtn: false,
    });
    if (!!this.state.passWord && !!value) {
      this.setState({
        show_resBtn: true,
      });
    }
  }

  password(value) {
    this.setState({
      passWord: value,
      show_resBtn: false,
    });
    if (!!this.state.phone && !!value) {
      this.setState({
        show_resBtn: true,
      });
    }
  }

  //登录
  login() {
    const param = {
      phone: this.state.phone,
      passWord: this.state.passWord,
    };
    loginByPsw(param).then((res) => {
      console.log(res);
      if (res.data.status == 0) {
        Taro.setStorage({
          key: "token",
          data: res.data.data.token,
        });
        Taro.reLaunch({
          url: "/pages/account/account",
        });
      } else if (res.data.status == 102) {
        this.setState({
          errorCap: 4,
        });
      }
    });
  }
  /**
   * 路由转跳
   * @param {string} url
   */
  navigateTo(url) {
    Taro.navigateTo({
      url: url,
    });
  }

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  renderInfo() {
    const { phone, passWord, show_resBtn } = this.state;
    return (
      <View>
        <View className="phone_input at-row at-row__align--center">
          <View className="at-col">
            <AtInput
              name="value6"
              border={true}
              maxLength="13"
              type="phone"
              placeholder="输入手机号码"
              value={phone}
              onChange={this.handleChange.bind(this)}
            />
          </View>
        </View>
        <View className="passWord_input at-row at-row__align--center">
          <View className="at-col">
            <AtInput
              name="密码"
              border={true}
              type="password"
              placeholder="输入密码"
              value={passWord}
              onChange={this.password.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View className="container">
        <View className="at-row">
          <View className="loginByPsw_title at-col">密码登录</View>
        </View>
        {this.renderInfo()}
        <HCerror error={this.state.errorCap} />
        <View className="phone_btn at-row">
          <View className="phone_input at-col">
            {this.state.show_resBtn ? (
              <AtButton
                type="primary"
                circle
                size="normal"
                onClick={this.login.bind(this)}
              >
                登录
              </AtButton>
            ) : (
              <AtButton type="primary" circle size="normal" disabled={true}>
                登录
              </AtButton>
            )}
          </View>
        </View>
        <View className="forgetPsw at-row">
          <View
            className="at-col"
            onClick={this.navigateTo.bind(
              this,
              "/packageA/login/registerByPsw"
            )}
          >
            密码注册
          </View>
        </View>
        <View className="forgetPsw at-row">
          <View
            className="at-col"
            onClick={this.navigateTo.bind(this, "/packageA/login/forgetPsw")}
          >
            忘记密码?
          </View>
        </View>
      </View>
    );
  }
}

export default LoginByPsw;

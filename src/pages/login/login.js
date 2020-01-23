import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { AtButton } from "taro-ui";

import "./login.sass";

class Login extends Component {
  config = {
    navigationBarTitleText: "Login",
    navigationBarBackgroundColor: "#2d8cf0",
    navigationBarTextStyle: "white"
  };

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  render() {
    return <View className="index">登录</View>;
  }
}

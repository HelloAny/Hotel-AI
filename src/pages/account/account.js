import Taro, { Component } from "@tarojs/taro";
import "./account.sass";
import { View } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";

class Login extends Component {
  config = {
    navigationBarTitleText: "我的",
    navigationBarBackgroundColor: "#2d8cf0"
  };

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  render() {
    return (
      <View className="container">
        <View className="topSet at-row">
          <View className="at-col at-col-9">
            <AtAvatar className="iconfont icon-RectangleCopy4"></AtAvatar>
          </View>
        </View>
      </View>
    );
  }
}

import Taro, { Component, getUserInfo } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import { infoByToken, picUpload } from "@actions/api";
import { reLaunch } from "@utils";

import "./setting.sass";

class user extends Component {
  constructor(props) {
    super(props);
  }
  config = {
    navigationBarTitleText: "设置",
    navigationBarBackgroundColor: "#2d8cf0",
  };

  /**
   * 清除登录
   */
  clearLoginStatus() {
    Taro.removeStorageSync("token");
    reLaunch();
  }

  render() {
    return (
      <View className="setting-container">
        <Button onClick={this.clearLoginStatus.bind(this)}>退出登录</Button>
      </View>
    );
  }
}

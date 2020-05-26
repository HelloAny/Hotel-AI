import Taro, { Component, getUserInfo } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { infoByToken, picUpload } from "@actions/api";
import { reLaunch } from "@utils";
import { Navbar } from "@components";

import "./setting.sass";

class setting extends Component {
  constructor(props) {
    super(props);
  }
  config = {
    navigationBarBackgroundColor: "#4F4FCB",
    navigationBarTextStyle: "black",
    navigationBarTitleText: "设置",
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
        <Button className="signout" onClick={this.clearLoginStatus.bind(this)}>
          退出登录
        </Button>
      </View>
    );
  }
}

export default setting;

import Taro, { PureComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.sass";

class Error extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    error: "",
    className: ""
  };

  render() {
    return (
      <View className={this.props.className + " at-col"}>
        {
          {
            0: <View className="tapCap at-col">验证码和手机号提醒</View>,
            1: <View className="errorCap at-col">验证码错误</View>,
            2: <View className="errorCap at-col">手机号错误</View>,
            3: <View className="errorCap at-col">无法找到账号</View>,
            4: <View className="errorCap at-col">密码输入错误</View>,
            5: <View className="errorCap at-col">两次密码不一致</View>,
            6: <View className="errorCap at-col">用户密码未设置</View>,
            7: <View className="errorCap at-col">无账户记录</View>
          }[this.props.error]
        }
      </View>
    );
  }
}

export default Error;

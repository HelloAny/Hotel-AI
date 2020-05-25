import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.sass";
class Navbar extends Component {
  render() {
    const style = {
      paddingTop: 0 + "px",
      height: 44 + "px",
      position: "fixed"
    };
    // 将状态栏的区域空余出来
    return (
      <View className="navbarContainer">
        <View className="navbarWrap" style={style}>
          <View className="navbar">自定义导航栏</View>
        </View>
      </View>
    );
  }
}
export default Navbar;

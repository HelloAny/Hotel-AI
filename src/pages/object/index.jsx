import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Text } from "@tarojs/components";
import { HCwifi, HCkongtiao, HCyushi } from "@components";
import "./index.sass";

class object extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objectNumber: "3"
    };
  }

  config = {
    navigationBarTitleText: "物联设置",
    navigationBarTextStyle: "white",
    navigationBarBackgroundColor: "#4F4FCB"
  };

  render() {
    const { objectNumber } = this.state;
    return (
      <View>
        <View className="container">
          <View className="top_title">物联设备</View>
          <View className="tip">
            已检测到{objectNumber}个设备，若无法显示或缺少设备，请
            <Text className="subtip">点此重新刷新>></Text>
          </View>
          <View className="objectlist">
            <HCwifi secret={"hotelai8888"}></HCwifi>
            <HCkongtiao initHeat={20} minHeat={16} maxHeat={35}></HCkongtiao>
            <HCyushi initHeat={20} minHeat={16} maxHeat={35}></HCyushi>
          </View>
        </View>
      </View>
    );
  }
}

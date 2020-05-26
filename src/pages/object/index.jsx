import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Text } from "@tarojs/components";
import { Navbar, HCwifi, HCkongtiao, HCyushi } from "@components";
import "./index.sass";

class object extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objectNumber: "3"
    };
  }

  config = {
    navigationStyle: "custom"
  };

  render() {
    const { objectNumber } = this.state;
    return (
      <View>
        <View className="Objectcontainer">
          <Navbar title="物联信息" weight={true} backgroundColor="white"></Navbar>
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

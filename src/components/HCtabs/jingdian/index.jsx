import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { HCtabCardjingdian } from "@components";
import "./index.sass";

class HCtabs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View className="attabs_jingdian">
        <View className="jiangdian_tabs">
          <HCtabCardjingdian
            screenList={[
              {
                name: "吴山广场",
                people: 2658,
                kilo: 2.1,
                left: 1,
                image: "http://cdn.amikara.com/timg.jpeg"
              },
              {
                name: "断桥残雪",
                people: 45962,
                kilo: 1.3,
                left: 0,
                image: "http://cdn.amikara.com/timg%20%281%29.jpeg"
              },
              {
                name: "湖滨银泰",
                people: 4056,
                kilo: 3.6,
                left: 1,
                image: "http://cdn.amikara.com/timg%20%282%29.jpeg"
              }
            ]}
          ></HCtabCardjingdian>
        </View>

        <View className="checkMore">显示更多娱乐场所</View>
      </View>
    );
  }
}

export default HCtabs;

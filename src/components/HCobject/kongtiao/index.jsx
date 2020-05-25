import Taro, { PureComponent } from "@tarojs/taro";
import { AtSlider } from "taro-ui";
import { View, Image } from "@tarojs/components";
import "./index.sass";

class HCkongtiao extends PureComponent {
  static defaultProps = {
    initHeat: 24,
    minHeat: 16,
    maxHeat: 32
  };

  render() {
    return (
      <View>
        <View className="object_title at-row at-row__align--center">
          <View className="object_image">
            <Image style="height:100%;width:100%" src="http://cdn.amikara.com/kongtiao.png"></Image>
          </View>
          空调
        </View>
        <View className="object_container">
          <View className="at-row">
            <View className="objectheattitle at-col at-col-2">温度℃</View>
            <View className="at-col at-col-10">
              <AtSlider
                value={this.props.initHeat}
                min={this.props.minHeat}
                max={this.props.maxHeat}
                activeColor="#4F4FCB"
                showValue={true}
              ></AtSlider>
            </View>
          </View>
          <View className="at-row at-row__justify--around">
            <View className="objectbtn at-col at-col-4">制冷</View>
            <View className="objectbtn at-col at-col-4">制热</View>
          </View>
          <View className="at-row at-row__justify--around">
            <View className="objectbtn at-col at-col-4">开关</View>
            <View className="objectbtn at-col at-col-4">风速</View>
          </View>
        </View>
      </View>
    );
  }
}

export default HCkongtiao;

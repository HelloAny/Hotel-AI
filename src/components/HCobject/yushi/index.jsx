import Taro, { PureComponent } from "@tarojs/taro";
import { AtSlider } from "taro-ui";
import { View, Image } from "@tarojs/components";
import "./index.sass";

class HCyushi extends PureComponent {
  static defaultProps = {
    initHeat: 24,
    minHeat: 16,
    maxHeat: 32
  };
  render() {
    return (
      <View className="yushicontainer">
        <View className="object_title at-row at-row__align--center">
          <View className="object_image">
            <Image style="height:100%;width:100%" src="http://cdn.amikara.com/yushi.png"></Image>
          </View>
          浴室
        </View>

        <View className="object_container">
          <View className="at-row">
            <View className="at-col at-col-2">水温℃</View>
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
            <View className="objectbtn at-col at-col-4">抽风扇</View>
            <View className="objectbtn at-col at-col-4">灯光</View>
          </View>
        </View>
      </View>
    );
  }
}

export default HCyushi;

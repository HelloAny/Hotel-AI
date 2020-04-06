import Taro, { PureComponent } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import wifi from "./assets/wifi.png";
import "./index.sass";

class HCwifi extends PureComponent {
  static defaultProps = {
    secret: ""
  };
  render() {
    return (
      <View>
        <View className="object_title at-row at-row__align--center">
          <View className="object_image">
            <Image style="height:100%;width:100%" src={wifi}></Image>
          </View>
          Wi-Fi
        </View>
        <View className="at-row object_container">
          <View className="wifi_secret at-col-9">
            密码:<Text className="secret">{this.props.secret}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default HCwifi;

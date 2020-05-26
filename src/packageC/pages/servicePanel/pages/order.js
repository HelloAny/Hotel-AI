import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Navbar } from "../../../../components/Navbar"

export default class Vip extends Component {
  config = {
    navigationStyle: "custom"
  };
  static defaultProps = {};

  state = {};

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Vip");
  }

  componentDidUpdate() {
    console.timeEnd("Vip");
  }

  render() {
    return (
      <View style="padding-top:85PX">
        <Navbar color="white" />
        <Image
          style={{ width: "360Px", height: "730Px" }}
          mode="aspectFit"
          src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/order1.png"
        />
        <View style={{ position: "absolute", right: "0Px", top: "469Px", height: "346Px", width: "289Px", overflowY: "scroll" }}>
          <Image
            style={{ width: "289Px", height: "884Px" }}
            mode="aspectFit"
            src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/order2.png"
          />
        </View>
      </View>
    );
  }
}

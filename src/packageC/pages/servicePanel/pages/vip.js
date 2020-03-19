import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

export default class Vip extends Component {
  config = {
    navigationBarTitleText: "我的会员"
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
      <View>
        <Image
          style={{ width: "100vw", height: "1890Px" }}
          mode="aspectFit"
          src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/vip.png"
        />
      </View>
    );
  }
}

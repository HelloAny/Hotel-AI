import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import Navbar from "../../../components/Navbar";

import "../../assets/style/receipt-result.scss";

export default class Result extends Component {
  config = {
    navigationStyle: "custom"
  };
  static defaultProps = {};

  state = {};

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("Result", nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Result");
  }

  componentDidUpdate() {
    console.timeEnd("Result");
  }

  render() {
    const { type, result } = this.$router.params;
    return (
      <View class="ctr">
        <Navbar shade color="white" />
        {result == "accept" ? (
          <Image
            class="title-icon"
            src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/visit/accept.png"
          />
        ) : (
          <Image
            class="title-icon"
            src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/visit/refuse.png"
          />
        )}
        <View class="title">您已{result == "accept" ? "接受":"拒绝"}{type == "invite" ? "邀请" : "申请"}</View>
        <View class="billboard">
          <View class="code">
            <Image
              class="img"
              src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/visit/code.png"
            />
          </View>
          <View class="ad">
            <View class="tip">扫码添加小程序</View>
            <View class="tip">享受智慧酒店，获取更多优惠哦</View>
          </View>
        </View>
      </View>
    );
  }
}

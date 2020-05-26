import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { Navbar } from "../../../../components/Navbar";

export default class Vip extends Component {
  config = {
    navigationStyle: "custom"
  };
  static defaultProps = {};

  state = {
    index: 0
  };

  propsKeys = [];

  stateKeys = ["index"];

  handleNext() {
    this.setState({
      index: this.state.index + 1 > 2 ? 2 : this.state.index + 1
    });
  }

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
      <View onClick={this.handleNext.bind(this)} style="padding-top:85PX">
        <Navbar color="white" />
        <Image
          style={{ width: "100vw", height: "730Px", display: this.state.index == 0 ? "block" : "none" }}
          mode="aspectFit"
          src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/medicine.png"
        />
        <Image
          style={{ width: "100vw", height: "730Px", display: this.state.index == 1 ? "block" : "none" }}
          mode="aspectFit"
          src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/medicine2.png"
        />
        <Image
          style={{ width: "100vw", height: "730Px", display: this.state.index == 2 ? "block" : "none" }}
          mode="aspectFit"
          src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/medicine-search.jpg"
        />
      </View>
    );
  }
}

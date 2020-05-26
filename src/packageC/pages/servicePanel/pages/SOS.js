import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { Navbar } from "../../../../components/Navbar";

export default class Vip extends Component {
  config = {
    navigationStyle: "custom"
  };
  static defaultProps = {};

  state = {
    class: "btn"
  };

  propsKeys = [];

  stateKeys = ["class"];

  handleSOS() {
    this.setState({
      class: "activeBtn"
    });
    setTimeout(() => {
      this.setState({
        class: "btn"
      });
      Taro.showModal({
        title: "紧急信息已发出",
        content: "请保持镇定，您的求助信息已收到！正在赶来！"
      });
    }, 150);
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
      <View style="padding-top:85PX">
        <Navbar color="white"/>
        <View
          style={StyleSheet[this.state.class]}
          onClick={this.handleSOS.bind(this)}
        >
          S O S
        </View>
        <Image
          style={{ width: "100vw", height: "1323Px" }}
          mode="aspectFit"
          src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/SOS.png"
        />
      </View>
    );
  }
}

const StyleSheet = {
  btn: {
    position: "absolute",
    top: "195Px",
    left: "40Px",
    height: "45Px",
    padding: "0Px 30Px",
    lineHeight: "45Px",
    border: "2Px solid white",
    borderRadius: "60Px",
    color: "white",
    fontSize: "28Px"
  },
  activeBtn: {
    position: "absolute",
    top: "195Px",
    left: "40Px",
    height: "45Px",
    padding: "0Px 30Px",
    lineHeight: "45Px",
    border: "2Px solid white",
    borderRadius: "60Px",
    color: "#333",
    fontSize: "28Px",
    backgroundColor: "white",
    opacity: ".8"
  }
};

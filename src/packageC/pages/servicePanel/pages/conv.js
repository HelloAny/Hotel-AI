import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

export default class Vip extends Component {
  config = {
    navigationBarTitleText: "小蓝鲸线上便利店"
  };
  static defaultProps = {};

  state = { num: 0, class: "dot" };

  propsKeys = [];

  stateKeys = ["num", "class"];

  handleAddCart() {
    this.setState({
      class: "activeDot",
      num: this.state.num + 1
    });
    setTimeout(() => {
      this.setState({
        class: "dot"
      });
    }, 250);
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
      <View onClick={this.handleAddCart.bind(this)}>
        <Image
          style={{ height: "2991Px", width: "100vw" }}
          mode="aspectFit"
          src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/conv.png"
        />
        <Image
          style={{
            height: "50Px",
            width: "100vw",
            position: "fixed",
            bottom: "0",
            left: "0"
          }}
          mode="scaleToFill"
          src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/conv-nav.png"
        />
        <View style={StyleSheet[this.state.class]}/>
        <View style={StyleSheet.dotBg}/>
        <Text style={StyleSheet.num}>{this.state.num}</Text>
      </View>
    );
  }
}

const StyleSheet = {
  dot: {
    position: "fixed",
    right: "120Px",
    bottom: "32Px",
    transition: "all .25s",
    backgroundColor: "rgba(255,0,0,.5)",
    width: "10Px",
    height: "10PX",
    borderRadius: "10Px"
  },
  dotBg: {
    position: "fixed",
    right: "120Px",
    bottom: "32Px",
    backgroundColor: "rgba(255,0,0,.8)",
    width: "16Px",
    height: "16PX",
    borderRadius: "16Px"
  },
  num: {
    position: "fixed",
    right: "123.5Px",
    bottom: "32Px",
    fontSize: "12Px",
    color: "white"
  },
  activeDot: {
    position: "fixed",
    right: "120Px",
    bottom: "32Px",
    transition: "all .25s",
    backgroundColor: "rgba(255,0,0,.5)",
    width: "10Px",
    height: "10PX",
    borderRadius: "10Px",
    transform: "scale(5,5)"
  }
};

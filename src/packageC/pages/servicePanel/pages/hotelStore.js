import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

export default class Vip extends Component {
  config = {
    navigationBarTitleText: "酒店同款"
  };
  static defaultProps = {};

  state = {
    class: "dot",
    num: 0
  };

  propsKeys = [];

  stateKeys = ["class"];

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
          style={{ width: "100vw", height: "7156Px" }}
          mode="aspectFit"
          src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/store.png"
        />
        <View style={StyleSheet.cartBox}>
          <View style={StyleSheet[this.state.class]} />
          <Text style={StyleSheet.num}>{this.state.num}</Text>
          <Image
            style={StyleSheet.cart}
            mode="aspectFit"
            src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/cart.png"
          />
        </View>
      </View>
    );
  }
}

const StyleSheet = {
  cartBox: {
    position: "fixed",
    right: "20Px",
    bottom: "100Px",
    width: "40Px",
    height: "40Px",
    padding: "6Px 6Px 4Px 4Px",
    borderRadius: "50Px",
    border: "1Px solid #ccc"
  },
  cart: {
    width: "40Px",
    height: "40Px"
  },
  dot: {
    position: "fixed",
    right: "34.5Px",
    bottom: "132Px",
    transition: "all .25s",
    backgroundColor: "rgba(255,0,0,.5)",
    width: "10Px",
    height: "10PX",
    borderRadius: "10Px"
  },
  num: {
    position: "fixed",
    right: "34.5Px",
    bottom: "129Px",
    fontSize: "12Px",
    color: "white"
  },
  activeDot: {
    position: "fixed",
    right: "34.5Px",
    bottom: "132Px",
    transition: "all .25s",
    backgroundColor: "rgba(255,0,0,.5)",
    width: "10Px",
    height: "10PX",
    borderRadius: "10Px",
    transform: "scale(5,5)"
  }
};

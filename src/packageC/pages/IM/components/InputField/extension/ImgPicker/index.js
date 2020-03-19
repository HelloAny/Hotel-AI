import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class ImgPicker extends Component {
  static defaultProps = {
    play: false,
    onInput: () => {}
  };

  state = {};

  propsKeys = ["play"];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("ImgPicker", { nextProps, nextState });
    return flag;
  }

  componentWillUpdate() {
    console.time("ImgPicker");
  }

  componentDidUpdate() {
    console.timeEnd("ImgPicker");
    if (this.props.play)
      Taro.chooseImage()
        .then(res => this.props.onInput(res))
        .catch(err => {
          Taro.showToast({
            title: "取消选择",
            icon: "none",
            duration: 1000
          });
        });
  }

  render() {
    const { play } = this.props;
    return <View style={{ display: play ? "block" : "none" }}>ImgPicker</View>;
  }
}

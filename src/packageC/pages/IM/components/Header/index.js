import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import "../../assets/style/header.scss";

export default class Header extends Component {
  static options = {
    addGlobalClass: true
  };
  static defaultProps = {
    title: "哈哈哈哈",
    subTitle: "离线",
    leftTitle: "返回",
    leftIcon: "icon-back",
    rightTitle: "",
    rightIcon: "icon-user",
    backgroundColor: "white"
  };

  propsKeys = [];

  stateKeys = [];

  // 返回
  handleNavigateBack() {
    Taro.navigateBack()
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("Header", { nextProps, nextState });
    return flag;
  }

  componentWillUpdate() {
    console.time("Header");
  }

  componentDidUpdate() {
    console.timeEnd("Header");
  }

  render() {
    const {
      title,
      subTitle,
      leftTitle,
      leftIcon,
      rightTitle,
      rightIcon,
      backgroundColor
    } = this.props;
    return (
      <View className="IM-header" style={{ backgroundColor }}>
        <View className="left" onClick={this.handleNavigateBack}>
          <View className={`iconfont ${leftIcon}`} />
          <Text>{leftTitle}</Text>
        </View>
        <View className="center">
          {this.props.children}
          <Text className="title">{title}</Text>
          <Text className="subTitle">{subTitle}</Text>
        </View>
        <View className="right">
          <Text>{rightTitle}</Text>
          <View className={`iconfont ${rightIcon}`} />
        </View>
      </View>
    );
  }
}

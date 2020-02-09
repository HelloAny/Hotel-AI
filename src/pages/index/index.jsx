import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";

import "./index.sass";

// @inject("counterStore")
// @observer
class Index extends Component {
  config = {
    navigationBarTitleText: "首页",
    navigationBarBackgroundColor: "#ffc"
  };

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return <View className="index">首页</View>;
  }
}

export default Index;

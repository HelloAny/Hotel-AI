import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";

import "./index.scss";

class Index extends Component {
  config = {
    navigationBarTitleText: "首页",
    navigationBarBackgroundColor: "#ffc"
  };

  state = {
    nodes: [
      {
        name: "div",
        attrs: {
          class: "div_class",
          style: "line-height: 60px; color: red;"
        },
        children: [
          {
            type: "text",
            text: "Hello World!"
          }
        ]
      }
    ]
  };

  componentWillMount() {}

  componentWillReact() {
    console.log("componentWillReact");
  }

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return <View className="index"></View>;
  }
}

export default Index;

//用作测试文件，提交BUG
import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Picker } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";

import "./demo.sass";

class Demo extends Component {
  config = {
    navigationBarTitleText: "Demo",
    navigationBarBackgroundColor: "#ffc"
  };

  state = {
    selector: ["美国", "中国", "巴西", "日本"],
    selectorChecked: "美国"
  };
  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    });
  };
  onTimeChange = e => {
    this.setState({
      timeSel: e.detail.value
    });
  };
  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    });
  };
  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="container">
        <View className="page-section">
          <Text>地区选择器</Text>
          <View>
            <Picker
              mode="selector"
              range={this.state.selector}
              onChange={this.onChange}
            >
              <View className="picker">
                当前选择：{this.state.selectorChecked}
              </View>
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}

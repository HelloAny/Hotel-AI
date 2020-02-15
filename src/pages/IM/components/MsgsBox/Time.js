import Taro, { Component } from "@tarojs/taro";
import { Text } from "@tarojs/components";

export default class TimeMsg extends Component {
  static defaultProps = {
    description: null
  };

  render() {
    const { description } = this.props;
    if (!description) return;
    const { time } = description;
    return <Text style={StyleSheet.time}>{time}</Text>;
  }
}

const StyleSheet = {
  time: {
    fontSize: "12Px",
    color: "#303133"
  }
};

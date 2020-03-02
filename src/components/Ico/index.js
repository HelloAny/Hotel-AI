import { Component } from "@tarojs/taro";
import { Text } from "@tarojs/components";

export default class Ico extends Component {
  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
    value: "",
    size: ""
  };

  propsKeys = ["value", "size"];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    return (
      <Text
        style={{ fontSize: (this.props.size || 16) + "px" }}
        className={`iconfont ${this.props.value}`}
      />
    );
  }
}

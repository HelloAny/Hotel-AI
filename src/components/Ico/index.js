import { Component } from "@tarojs/taro";
import { Text } from "@tarojs/components";

export class Ico extends Component {
  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
    value: "",
    size: "",
    color: ""
  };

  propsKeys = ["value", "size", "color"];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    return (
      <Text
        style={{ fontSize: (this.props.size || 16) + "Px", color: this.props.color }}
        className={`iconfont ${this.props.value}`}
      />
    );
  }
}

export default Ico;

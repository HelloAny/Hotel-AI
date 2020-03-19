import Taro, { Component } from "@tarojs/taro";
import { Text } from "@tarojs/components";

export default class TextMsg extends Component {
  static defaultProps = {
    position: "none",
    description: null
  };

  render() {
    const { position, description } = this.props;
    if (!description || !position) return;
    const { content } = description;
    return (
      <Text
        style={Object.assign({}, StyleSheet.text, {
          color: position == "right" ? "white" : "#606266"
        })}
      >
        {content}
      </Text>
    );
  }
}

const StyleSheet = {
  text: {
    wordBreak: "break-all"
  }
};

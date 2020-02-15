import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { getDeviceInfo } from "../../../utils/index";

export default class MessageBox extends Component {
  static TYPES = ["TEXT", "IMAGE", "EMOJI", "SYSTEM"];
  constructor(props) {
    super(props);
    let msg = props.message;
    if (msg) msg = msg.toMinMsg();
    this.state = {
      type: "TEXT",
      from: "hotel",
      content: "你好",
      time: "",
      ...msg
    };
  }

  compute(content) {
    let { width = 90, height = 90 } = content;
    let { windowWidth } = getDeviceInfo();
    let scale = width / height;
    if (content.width) content.width = Math.min(windowWidth * 0.7, width);
    if (content.height) content.height = content.width / scale;
  }

  componentWillMount() {
    let { content, type } = this.state;
    if (type === "IMAGE" || type === "EMOJI") this.compute(content);
  }

  /**
   * ??????
   * @param {??????} props ??????
   */
  componentWillReceiveProps(props){
    let msg = props.message;
    if (msg) msg = msg.toMinMsg();
    this.setState({
      ...msg
    })
  }

  render() {
    let { from, type, content } = this.state;
    let position = from.indexOf("hotel") != -1 ? styles.left : type === "SYSTEM" ? styles.center : styles.right;
    return (
      <View style={{ ...styles.MessageBox, ...position }}>
        {type === "TEXT" || type === "SYSTEM" ? <Text> {content} </Text> : null}
        {type === "IMAGE" || type === "EMOJI" ? (
          <Image
            style={{
              ...styles.img,
              height: content.height + "Px",
              width: content.width + "Px"
            }}
            src={content.path || content}
            mode="widthFix"
          />
        ) : null}
      </View>
    );
  }
}

const styles = {
  MessageBox: {
    display: "inline-block",
    borderRadius: "22px",
    padding: "10px",
    fontSize: "14px",
    maxWidth: "70%",
    margin: "15px 10px"
  },
  left: {
    color: "#000",
    backgroundColor: "#fff",
    borderBottomLeftRadius: "6px",
    float: "left",
    textAlign: "left"
  },
  right: {
    color: "#fff",
    backgroundColor: "#007DFF",
    borderBottomRightRadius: "6px",
    float: "right",
    textAlign: "left"
  },
  center: {
    backgroundColor:"gainsboro",
    fontSize: "12Px"
  },
  img: {
    maxWidth: "100%"
  }
};

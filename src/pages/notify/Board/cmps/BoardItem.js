import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "../assets/style/board-item.scss";

const TYPES = [
  "INVITATION_RECEIVE",
  "INVITATION_ACCEPT",
  "INVITATION_REFUSE",
  "VISIT_RECEIVE",
  "VISIT_ACCEPT",
  "VISIT_REFUSE"
];

export default class BoardItem extends Component {
  static defaultProps = {
    onClick: () => {},
    mark: false,
    imgUrl: "https://hotel.lcworkroom.cn/api/pic/get/users/?name=13858181317"
  };

  state = {};

  propsKeys = ["mark", "imgUrl"];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    const { imgUrl, mark } = this.props;
    return (
      <View className="board-item" onClick={this.props.onClick}>
        <View className={"tag " + (mark ? "mark" : "")}>
          <Image src={imgUrl} className="img" />
        </View>
        <View className="detail">{this.props.children}</View>
      </View>
    );
  }
}

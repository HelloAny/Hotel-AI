import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "../../../assets/style/journey-notice.scss";

export default class NoticeItem extends Component {
  static defaultProps = {
    info: {}
  };

  state = {};

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    const { name, img, time1, time2 } = this.props.info;
    return (
      <View className="container" onClick={this.props.onClick}>
        <Image src={img} className="figure" />
        <View className="gist">
          <Text className="title">{name}</Text>
          <Text className="tip">
            {time1} - {time2}
          </Text>
        </View>
        <View style={{ display: "none" }} className="status success">
          已同意
        </View>
        <View style={{ display: "block" }} className="btn">
          查看
        </View>
      </View>
    );
  }
}

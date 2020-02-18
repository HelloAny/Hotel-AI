import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "../../../assets/style/journey-notice.scss";

export default class NoticeItem extends Component {
  static defaultProps = {};

  state = {};

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    return (
      <View className="container">
        <Image
          src="https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/journeyBg.jpg"
          className="figure"
        >
          图片
        </Image>
        <View className="gist">
          <Text className="title">访问浙科</Text>
          <Text className="tip">2020.02.02 - 2020.02.08</Text>
        </View>
        <View style={{display:"none"}} className="status success">已同意</View>
        <View style={{display:"block"}} className="btn">查看</View>
      </View>
    );
  }
}

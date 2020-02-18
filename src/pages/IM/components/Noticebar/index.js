import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtNoticebar } from "taro-ui";

import "../../assets/style/notice.scss";

export default class Noticebar extends Component {
  static defaultProps = {};

  state = {};

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("Noticebar", nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Noticebar");
  }

  componentDidUpdate() {
    console.timeEnd("Noticebar");
  }

  render() {
    return (
      <View className="notice">
        <View>
          <AtNoticebar close={true}>这是 NoticeBar 通告栏</AtNoticebar>
        </View>
      </View>
    );
  }
}

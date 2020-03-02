import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

import "../../assets/style/receipt.scss";

export default class Receipt extends Component {
  config = {
    navigationStyle: "custom"
  };
  static defaultProps = {};

  state = {};

  propsKeys = [];

  stateKeys = [];

  handleRefuse(){

  }

  handleAccept(){

  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("Receipt", nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Receipt");
  }

  componentDidUpdate() {
    console.timeEnd("Receipt");
  }

  render() {
    return (
      <View className="container">
        <View className="container-bg">
          <View className="head">
            <View className="user">-来自用户XXXX的-</View>
            <View className="title">
              {/* <Image className="img" src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/visit/visit_title.png"  mode="widthFix"/>  */}
              <Image
                className="img"
                src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/visit/invite_title.png"
                mode="widthFix"
              />
            </View>
            <View className="note">
              哈哈哈哈哈啊哈哈，别来无恙啊啊啊啊哈哈哈哈哈哈哈
            </View>
          </View>
          <View className="time">
            <View className="time-start">2020年12月22日 17：00</View>
            <View className="time-end">2020年13月24日 16：00</View>
          </View>
          <View className="place">上海市浦东新区XX国际酒店</View>
          <View className="btn-group">
            <Text onClick={this.handleRefuse.bind(this)} className="btn">
              拒绝邀请
            </Text>
            <Text onClick={this.handleAccept.bind(this)} className="btn">
              接受邀请
            </Text>
            {/* <Text href="" className="btn">拒绝申请</Text>
      <Text href="" className="btn">接受申请</Text>  */}
          </View>
          <View className="billboard">
            <View className="code">
              <Image
                className="img"
                src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/visit/code.png"
              />
            </View>
            <View className="ad">
              <View className="tip">扫码添加小程序</View>
              <View className="tip">享受智慧酒店，获取更多优惠哦</View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

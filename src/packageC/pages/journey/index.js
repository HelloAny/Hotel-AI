import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import NavBar from "../../components/Navbar";
import { NoticeItem, OverviewItem, RecmdItem } from "./cmps";

import "../../assets/style/journey.scss";

export default class Journey extends Component {
  config = {
    navigationStyle: "custom"
  };

  static defaultProps = {};

  state = {};

  propsKeys = [];

  stateKeys = [];

  handleAddJourney() {}

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Journey");
  }

  componentDidUpdate() {
    console.timeEnd("Journey");
  }
  render() {
    console.log(" Journey is rendering...");
    return (
      <View className="container">
        <NavBar color="white" />
        <View className="header">
          <View className="bg-container">
            <Image
              src="https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/journeyBg.jpg"
              className="bg"
            />
          </View>
          <View className="ad">
            <Text className="ad-title">选择智慧酒店，让旅途更省心</Text>
            <View onClick={this.handleAddJourney.bind(this)} className="ad-btn">
              + 添加行程
            </View>
            <Text className="ad-sub-title">拜访好友，加入同行</Text>
          </View>
        </View>
        <View className="notice">
          <Text className="title">行程动态</Text>
          <NoticeItem />
        </View>
        <View className="overview">
          <Text className="title">我的行程</Text>
          <View className="overview-box">
            <View className="overview-container">
              <OverviewItem />
            </View>
            <View className="overview-container">
              <OverviewItem />
            </View>
            <View className="overview-container">
              <OverviewItem />
            </View>
          </View>
        </View>
        <View className="recommend">
          <Text className="title">周边精彩</Text>
          <View className="recommend-container">
            <RecmdItem />
          </View>
          <View className="recommend-container">
            <RecmdItem />
          </View>
          <View className="recommend-container">
            <RecmdItem />
          </View>
          <View className="recommend-container">
            <RecmdItem />
          </View>
        </View>
      </View>
    );
  }
}

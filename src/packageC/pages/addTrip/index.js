import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import NavBar from "../../../components/Navbar";

import "../../assets/style/addTrip.scss";
import yvding from "../../assets/imgs/yvding.png";
import fangke from "../../assets/imgs/fangke.png";

export default class AddTrip extends Component {
  config = {
    navigationStyle: "custom"
  };

  static defaultProps = {};

  state = {};

  propsKeys = [];

  stateKeys = [];

  handleNavigateToReserve() {
    Taro.navigateTo({
      url: "/packageC/pages/addTrip/tripForm"
    });
  }

  handleNavigateToVisit() {
    Taro.navigateTo({
      url: "/packageC/pages/addTrip/tripForm"
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("AddTrip");
  }

  componentDidUpdate() {
    console.timeEnd("AddTrip");
  }

  render() {
    return (
      <View className="addTrip-container">
        <NavBar title="选择行程类型" weight />
        <View
          className="bisect"
          onClick={this.handleNavigateToReserve.bind(this)}
        >
          <Image className="icon" src={yvding} />
          <Text className="title">预订酒店</Text>
          <Text className="intro">
            现在立刻预定酒店即可畅想五折优惠，外送史诗级神宠Z老板一只哦！！限时优惠！！心动不如行动！！
          </Text>
        </View>
        <View
          className="bisect"
          onClick={this.handleNavigateToVisit.bind(this)}
        >
          <Image className="icon" src={fangke} />
          <Text className="title">申请访问住客</Text>
          <Text className="intro">
            现在立刻预定酒店即可畅想五折优惠，外送史诗级神宠Z老板一只哦！！限时优惠！！心动不如行动！！
          </Text>
        </View>
      </View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View, Image, Form } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import NavBar from "../../components/Navbar";

import "../../assets/style/details.scss";

export default class Details extends Component {
  config = {
    navigationStyle: "custom"
  };
  static defaultProps = {};

  state = {};

  propsKeys = [];

  stateKeys = [];

  handleSpreadExpansion() {
    console.log("handleSpreadExpansion");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Details", nextProps, nextState);
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Details");
  }

  componentDidUpdate() {
    console.timeEnd("Details");
  }

  render() {
    return (
      <View className="details-container">
        <NavBar color="white" shade />
        <Swiper className="bg-container" autoplay>
          <SwiperItem>
            <Image
              src="http://q4ehilcoe.bkt.clouddn.com/temp3.jpg"
              className="bg"
            />
          </SwiperItem>
          <SwiperItem>
            <Image
              src="https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/journeyBg.jpg"
              className="bg"
            />
          </SwiperItem>
          <SwiperItem>
            <Image
              src="http://q4ehilcoe.bkt.clouddn.com/temp3.jpg"
              className="bg"
            />
          </SwiperItem>
        </Swiper>
        <View className="main">
          <View className="title">
            访问浙科
            <AtIcon value="edit" />
          </View>
          <View className="time">
            2月5日-2月8日
          </View>
          <View className="address">
            <Text className="address-text"></Text>
          </View>
        </View>
        <View className="bottomNav">
          <View className="left">
            <AtIcon value="calendar" />
            <Text className="nav-text">我的行程</Text>
          </View>
          <View
            className="center"
            onClick={this.handleSpreadExpansion.bind(this)}
          >
            <Image
              className="btn"
              src="http://q4ehilcoe.bkt.clouddn.com/centerBtn.png"
            />
          </View>
          <View className="right">
            <AtIcon value="user" />
            <Text className="nav-text">同行者</Text>
          </View>
        </View>
      </View>
    );
  }
}

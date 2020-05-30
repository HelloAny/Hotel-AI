/* eslint-disable react/sort-comp */
import Taro, { Component } from "@tarojs/taro";
import {
  View,
  Text,
  Swiper,
  SwiperItem,
  Image,
  ScrollView,
  Button
} from "@tarojs/components";
import {
  AtRate,
  AtSearchBar,
  AtTabs,
  AtTabsPane,
  AtActionSheet,
  AtActionSheetItem
} from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
import { reLaunch } from "@utils";
import { HCtabsjingdian, HCtabshotel, Navbar } from "@components";
import * as Server from "@actions";
import "./index.sass";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      swiperName: "",
      swiperNamearr: ["杭州西子湖酒店", "速8酒店", "快捷酒店"],
      swiperRate: "",
      swiperRateArr: [4, 5, 2.5],
      atSearchBar: "",
      address: "获取定位",
      atActionSheet: false,
      swiperAutoplay: true
    };
  }

  config = {
    navigationBarBackgroundColor: "#4F4FCB",
    navigationBarTextStyle: "black",
    navigationBarTitleText: "首页",
  };

  swiperChange(event) {
    this.setState({
      swiperName: this.state.swiperNamearr[event.target.current],
      swiperRate: this.state.swiperRateArr[event.target.current]
    });
  }

  changeAtSearchBar(value) {
    this.setState({
      atSearchBar: value
    });
  }
  getLocation() {
    Taro.getLocation()
      .then(res => {
        return Server.getLocation(res);
      })
      .then(res => {
        let city = res.result.address_component.city;
        this.setState({
          address: city
        });
        Taro.setStorage({
          key: "location",
          data: city,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          address: "定位失败"
        });
      });
  }

  changeAtActionSheet() {
    this.setState({
      atActionSheet: !this.state.atActionSheet,
      swiperAutoplay: false
    });
  }

  closeAtActionSheet() {
    this.setState({
      atActionSheet: !this.state.atActionSheet,
      swiperAutoplay: true
    });
  }
  clickLike() {
    Taro.getStorageSync("token")
      ? Taro.showToast({
        title: "收藏成功",
        icon: "success",
        duration: 2000
      })
      : Taro.showToast({
        title: "请先登录",
        icon: "none",
        duration: 2000
      });
  }
  componentWillMount() {
    this.setState({
      swiperName: this.state.swiperNamearr[0],
      swiperRate: this.state.swiperRateArr[0]
    });
    Taro.getStorageSync("location")
      ? this.setState({
        address: Taro.getStorageSync("location"),
      })
      : this.getLocation();
  }
  render() {
    const {
      swiperName,
      swiperRate,
      atSearchBar,
      address,
      atActionSheet,
      swiperAutoplay
    } = this.state;
    return (
      <View className="home-container">
        <View className="tabbar"></View>
        <View style="position: relative;margin-top: 10px">
          <View className="at-row">
            <View
              className="address at-col at-col-3"
              onClick={this.getLocation.bind(this)}
            >
              <Image className="zhoubian" src="http://cdn.amikara.com/zhoubian.png" />
              {address}
            </View>
            <View className="at-col at-col-9">
              <AtSearchBar
                value={atSearchBar}
                onChange={this.changeAtSearchBar.bind(this)}
                className="atSearchBar"
              />
            </View>
          </View>

          <View className="swiper_info">
            <View className="at-row">
              <View className="at-col at-col-8">
                {swiperName}
                <View>
                  <AtRate value={swiperRate} size={20}></AtRate>
                </View>
              </View>
              <View className="at-col at-col-4">
                <Image
                  className="more"
                  onClick={this.clickLike.bind(this)}
                  src="http://cdn.amikara.com/like1.png"
                />
                <Image
                  className="more"
                  src="http://cdn.amikara.com/more.png"
                  onClick={this.changeAtActionSheet.bind(this)}
                />
              </View>
            </View>
          </View>
          <View className="swiper">
            <Swiper
              className="swiper_container"
              indicatorColor="#999"
              indicatorActiveColor="#333"
              circular
              indicatorDots
              autoplay={swiperAutoplay}
              onChange={this.swiperChange.bind(this)}
            >
              <SwiperItem>
                <View className="demo-text-1">
                  <Image
                    mode="widthFix"
                    style="width:100vw;height:100vh"
                    src="http://cdn.amikara.com/IMG_6289%2820200220-213548%29.JPG"
                  ></Image>
                </View>
              </SwiperItem>
              <SwiperItem>
                <View className="demo-text-2">
                  <Image
                    mode="widthFix"
                    style="width:100vw;height:100vh"
                    src="http://cdn.amikara.com/511584086420_.pic.jpg"
                  ></Image>
                </View>
              </SwiperItem>
              <SwiperItem>
                <View className="demo-text-3">
                  <Image
                    mode="aspectFill"
                    style="width:100vw;height:100vh"
                    src="http://cdn.amikara.com/501584086419_.pic.jpg"
                  ></Image>
                </View>
              </SwiperItem>
            </Swiper>
          </View>
          <View className="title">为您推荐</View>
          <View className="subtitle">更多高分酒店尽在</View>
          <HCtabshotel></HCtabshotel>
          <View className="title">精品Plus酒店</View>
          <View className="subtitle">品质和设计经过验证的精品酒店</View>
          <View className="plusHotel">
            <Image
              style="width:100%;height:100%"
              src="http://cdn.amikara.com/1.jpg"
            ></Image>
            <View className="plusBtn">浏 览 PLUS 酒 店</View>
          </View>
          <View className="title">旅行保障</View>
          <View className="subtitle">更放心的保障，让您和家人安心旅行</View>
          <View className="tripfuwu">
            <View className="at-row at-row__align--center" style="height:33.3%">
              <View className="at-col at-col-3 at-col__offset-1">
                <Image className="baozhang" src="http://cdn.amikara.com/anquan.png"></Image>
              </View>
              <View className="at-col at-col-9">
                <View className="tripmsg">
                  更放心的房源{" "}
                  <Text className="subtripmsg"> 人工审核所有酒</Text>
                  <View className="subtripmsg">店页面信息，入住更放心</View>
                </View>
              </View>
            </View>
            <View className="at-row at-row__align--center" style="height:33.3%">
              <View className="at-col at-col-3 at-col__offset-1">
                <Image className="baozhang" src="http://cdn.amikara.com/renlian.png"></Image>
              </View>
              <View className="at-col at-col-9">
                <View className="tripmsg">
                  全程人脸服务{" "}
                  <Text className="subtripmsg"> 所有信息人脸录</Text>
                  <View className="subtripmsg">入，安全便捷进一步升级</View>
                </View>
              </View>
            </View>
            <View className="at-row at-row__align--center" style="height:33.3%">
              <View className="at-col at-col-3 at-col__offset-1">
                <Image className="baozhang" src="http://cdn.amikara.com/shuju.png"></Image>
              </View>
              <View className="at-col at-col-9">
                <View className="tripmsg">
                  安全加密数据{" "}
                  <Text className="subtripmsg"> 加密您的隐私信</Text>
                  <View className="subtripmsg">息，旅行全程倍加舒心</View>
                </View>
              </View>
            </View>
          </View>
          <View className="title">周边娱乐</View>
          <View className="subtitle">游玩享受更多超低优惠</View>
          <HCtabsjingdian></HCtabsjingdian>
        </View>
        <AtActionSheet
          isOpened={atActionSheet}
          onClose={this.closeAtActionSheet.bind(this)}
        >
          <AtActionSheetItem>立刻办理</AtActionSheetItem>
          <AtActionSheetItem>查看更多</AtActionSheetItem>
        </AtActionSheet>
      </View>
    );
  }
}

export default Home;

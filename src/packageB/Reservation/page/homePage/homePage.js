import Taro, { Component } from "@tarojs/taro";
import {
  Swiper,
  SwiperItem,
  Image,
  View,
  Text,
  Picker
} from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { HCdistrict } from "../../../../components";
import * as Server from "../../../../actions";
import { dateFormat } from "../../../../utils";
import Navbar from "@components/Navbar";

import "./homePage.scss";
import "../overall.scss";

class HomePage extends Component {
  config = {
    // navigationBarTitleText: "预订酒店"
    navigationStyle: "custom"
  };

  constructor() {
    super(...arguments);
    this.state = {
      homeAdvertises: [
        {
          imgSrc:
            "https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/reservation/ic_home_advertise.png"
        },
        {
          imgSrc:
            "https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/reservation/ic_home_advertise.png"
        },
        {
          imgSrc:
            "https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/reservation/ic_home_advertise.png"
        }
      ],
      location: "定位中...",
      isDistrict: false,
      startDate: Date.now(),
      endDate: Date.now() + 24 * 60 * 60 * 1000,
      dayCount: 1
    };
  }

  componentWillMount() {
    this.getLocalLocation();
  }

  // 点击了头部推广
  homeAdvertisesTap(e) {
    var index = e.currentTarget.dataset.index;
    console.log("点击了" + index);
  }

  // 获取地理位置
  getLocalLocation() {
    Taro.getLocation()
      .then(res => {
        return Server.getLocation(res);
      })
      .then(res => {
        let city = res.result.address_component.city;
        this.setState({
          location: city
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          location: "定位失败"
        });
      });
  }

  // 关闭选择城市
  handleCloseHCdistrict(e) {
    this.setState({
      isDistrict: false
    });
  }

  // 打开选择城市
  handleOpenHCdistrict() {
    this.setState({
      isDistrict: true
    });
  }

  // 选择城市
  handleChangeCity(e) {
    this.setState({
      location: e[2].name
    });
  }

  // 搜索酒店，未定位成功阻止跳转
  searchHotel() {
    const { location, startDate, endDate } = this.state;
    if (location == "定位中...") {
      Taro.showToast({
        title: "定位中，请稍后",
        icon: "none"
      });
    } else {
      Taro.navigateTo({
        url: `/packageB/Reservation/page/searchHotel/searchHotel?location=${location}&startDate=${startDate}&endDate=${endDate}`
      });
    }
  }

  // 入住时间改变
  startDateChange(e) {
    let startDate = new Date(e.detail.value).getTime();
    let dayCount = Math.floor(
      (this.state.endDate - startDate) / 24 / 60 / 60 / 1000
    );
    this.setState({
      startDate,
      dayCount
    });
  }

  // 离开时间改变
  endDateChange(e) {
    let endDate = new Date(e.detail.value).getTime() + 16 * 60 * 60 * 1000 - 1;
    let dayCount = Math.floor(
      (endDate - this.state.startDate) / 24 / 60 / 60 / 1000
    );
    this.setState({
      endDate,
      dayCount
    });
  }

  render() {
    const {
      homeAdvertises,
      location,
      startDate,
      endDate,
      dayCount,
      isDistrict
    } = this.state;
    return (
      <View className="hP-container-smt">
        <Navbar title="预订酒店" backgroundColor="white" />
        <Swiper
          className="homeHeader"
          indicatorDots
          autoplay
          interval="3000"
          circular
          skipHiddenItemLayout
        >
          {homeAdvertises.map((item, index) => {
            return (
              <SwiperItem key={index} className="swiper">
                <Image
                  src={item.imgSrc}
                  mode="scaleToFill"
                  className="swiper"
                  onClick={this.homeAdvertisesTap}
                  data-index={index}
                ></Image>
              </SwiperItem>
            );
          })}
        </Swiper>
        <View className="filterContent">
          <View className="filterView">
            <View className="location">
              <View
                className="iconfont icon-juli"
                style="font-size:20PX;color:#1296db"
                onClick={this.getLocalLocation}
              ></View>
              <Text className="caption" onClick={this.handleOpenHCdistrict}>
                当前城市：
              </Text>
              <Text className="city" onClick={this.handleOpenHCdistrict}>
                {location}
              </Text>
              <AtIcon
                value="chevron-right"
                onClick={this.handleOpenHCdistrict}
              ></AtIcon>
            </View>
            <View className="location">
              <View className="filter" onClick={this.searchHotel.bind(this)}>
                <View
                  className="iconfont icon-shaixuan"
                  style="font-size:15px;color:#1296db"
                ></View>
                <Text className="text">筛选</Text>
              </View>
              <View style="color:#ccc;text-align: center;">|</View>
              <View className="filter" onClick={this.searchHotel.bind(this)}>
                <View
                  className="iconfont icon-tubiao-wode-fujindedian"
                  style="font-size:20px;color:#1296db"
                ></View>
                <Text className="text">我的附近</Text>
              </View>
            </View>
            <View className="divideItem">
              <Text className="divideText">入住</Text>
              <Text className="divideText">退房</Text>
            </View>
            <View className="dateContent">
              <View className="dateItem">
                <Picker
                  className="date"
                  mode="date"
                  value={dateFormat("YYYY-mm-dd", startDate)}
                  start={dateFormat("YYYY-mm-dd", Date.now())}
                  onChange={this.startDateChange.bind(this)}
                >
                  <View className="date">
                    <Text className="day">{dateFormat("dd", startDate)}</Text>
                    <View className="monthWeek">
                      <Text className="month">
                        {dateFormat("mm月", startDate)}
                      </Text>
                      <Text className="week">
                        {dateFormat("周w", startDate)}
                      </Text>
                    </View>
                  </View>
                </Picker>
                <View
                  className="horizontalLine"
                  style="width:60rpx;position:absolute;right:0;"
                ></View>
              </View>
              <Text className="dayCount">{dayCount + "天"}</Text>
              <View className="dateItem">
                <View
                  className="horizontalLine"
                  style="width:60rpx;position:absolute;"
                ></View>
                <Picker
                  className="date"
                  mode="date"
                  value={dateFormat("YYYY-mm-dd", endDate)}
                  start={dateFormat("YYYY-mm-dd", startDate)}
                  onChange={this.endDateChange.bind(this)}
                >
                  <View className="date">
                    <Text className="day">{dateFormat("dd", endDate)}</Text>
                    <View className="monthWeek">
                      <Text className="month">
                        {dateFormat("mm月", endDate)}
                      </Text>
                      <Text className="week">{dateFormat("周w", endDate)}</Text>
                    </View>
                  </View>
                </Picker>
              </View>
            </View>
            <View
              className="commonBtn"
              hoverClass="commonBtnHover"
              onClick={this.searchHotel.bind(this)}
              hoverStayTime="100"
            >
              立即搜索
            </View>
          </View>
        </View>
        <View
          onClick={this.handleCloseHCdistrict.bind(this)}
          style={{
            display: isDistrict ? "block" : "none",
            position: "fixed",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,.5)",
            top: "0"
          }}
        >
          <View
            onClick={e => e.stopPropagation()}
            style={{ position: "fixed", bottom: "0", width: "100vw" }}
          >
            <HCdistrict onChange={this.handleChangeCity.bind(this)} />
          </View>
        </View>
      </View>
    );
  }
}

export default HomePage;

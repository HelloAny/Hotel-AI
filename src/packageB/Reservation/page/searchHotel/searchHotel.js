import { View, Text, Image } from "@tarojs/components";
import Taro, { Component } from "@tarojs/taro";
import { AtSearchBar } from "taro-ui";
import HotelListItemTmpl from "../../imports/HotelListItemTmpl";
import * as Server from "../../../../actions";
import "./searchHotel.scss";

const distanceList = [640, 1500, 700, 300, 1200, 1700, 850, 1300, 550];

const priceList = [200, 223, 180, 199, 780, 650, 1111, 150, 350];

class SearchHotel extends Component {
  config = {
    navigationBarTitleText: "酒店列表",
    enablePullDownRefresh: true
  };

  constructor() {
    this.state = {
      nowLocation: "",
      hotelList: [],
      isLoading: false,
      filterIndex: 1,
      priceL2H: true,
      value: ""
    };
  }

  //初始化酒店列表
  initHotels(data) {
    this.setState({
      hotelList: data.map(hotel => {
        const { pk: hotelId } = hotel;
        const { name, location, imgs } = hotel.fields;
        return {
          hotelId,
          imageUrl: imgs.horizontal[0],
          address: location,
          name,
          score: (Math.random() + 4).toFixed(1),
          price: priceList[Math.floor(Math.random() * 9)],
          distance: distanceList[Math.floor(Math.random() * 9)]
        };
      })
    });
  }

  // 进入酒店详情页
  navHotelDetail(hotel) {
    const { location, startDate, endDate } = this.$router.params;
    Taro.navigateTo({
      url: `/packageB/Reservation/page/hotelDetail/hotelDetail?location=${location}&startDate=${startDate}&endDate=${endDate}&hotel=${JSON.stringify(
        hotel
      )}`
    });
  }

  componentWillMount() {
    const nowLocation = this.$router.params.location;
    this.setState({
      nowLocation: nowLocation || "定位中..."
    });

    Server.getHotels() //加载酒店
      .then(data => {
        this.initHotels(data);
      })
      .catch(err => {
        console.log("服务出错啦", err);
        Taro.showToast({
          title: "网络开小差了...",
          icon: "none",
          duration: 2000
        });
      });
  }

  // 监听搜索栏内容
  onChange(value) {
    this.setState({
      value: value
    });
  }

  // 假装搜索酒店
  onActionClick() {
    console.log(this.state.value);
    this.setState({
      value: ""
    });
  }

  // 排序
  sort(key) {
    let list = this.state.hotelList;
    let m = new Map();
    let ks = [];

    for (const e of list) {
      m.set(e[key], e);
      ks.push(e[key]);
    }

    ks.sort();
    if (this.state.priceL2H && key == "price") ks.reverse();

    this.setState({
      hotelList: ks.map(k => {
        return m.get(k);
      })
    });
  }

  // 强行筛选
  filterMenuTap(e) {
    let index = e.currentTarget.dataset.index;
    this.setState({
      filterIndex: index
    });
    if (index == 2)
      this.setState({
        priceL2H: !this.state.priceL2H
      });
    else
      this.setState({
        priceL2H: true
      });

    switch (index) {
      case "1":
        this.sort("name");
        break;
      case "2":
        this.sort("price");
        break;
      case "3":
        this.sort("score");
        break;
      case "4":
        this.sort("distance");
        break;
    }
  }

  // 筛选酒店条件选择
  filterTap() {
    Taro.navigateTo({
      url: "/packageB/Reservation/page/hotelFilter/hotelFilter"
    });
  }

  // 选择地区
  locationTap() {
    console.log("搜索地区");
  }

  //下拉刷新
  onPullDownRefresh() {
    this.setState({
      isLoading: true
    });
    Server.getHotels() //加载酒店
      .then(data => {
        this.initHotels(data);
        Taro.showToast({
          title: "刷新成功",
          duration: 1500
        });
      })
      .catch(err => {
        console.log("服务出错啦", err);
        Taro.showToast({
          title: "网络开小差了...",
          icon: "none",
          duration: 2000
        });
      })
      .then(() => {
        setTimeout(() => {
          Taro.stopPullDownRefresh();
          this.setState({
            isLoading: false
          });
        }, 1500);
      });
  }

  render() {
    const {
      nowLocation,
      filterIndex,
      priceL2H,
      hotelList,
      isLoading
    } = this.state;
    return (
      <View className="seH-container-smt">
        <View className="pageHeader">
          <View className="searchHeader">
            <Text className="location" onClick={this.locationTap}>
              {nowLocation}
            </Text>
            <Image
              src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/reservation/ic_down_arrow.png"
              mode="aspectFit"
              style="width:20rpx;height:20rpx;"
            ></Image>
            <View className="searchBar">
              <AtSearchBar
                actionName="搜一下"
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                onActionClick={this.onActionClick.bind(this)}
              />
            </View>
          </View>
          <View className="filterView">
            <View className="filterOptions">
              <Text
                className={filterIndex == 1 ? "filterActive" : "filterItem"}
                onClick={this.filterMenuTap}
                data-index="1"
              >
                推荐
              </Text>
              <View
                className={filterIndex == 2 ? "filterActive" : "filterItem"}
                onClick={this.filterMenuTap}
                data-index="2"
              >
                <Text>价格</Text>
                <View className={priceL2H ? "arrowUp" : "arrowDown"}></View>
              </View>
              <Text
                className={filterIndex == 3 ? "filterActive" : "filterItem"}
                onClick={this.filterMenuTap}
                data-index="3"
              >
                好评
              </Text>
              <Text
                className={filterIndex == 4 ? "filterActive" : "filterItem"}
                onClick={this.filterMenuTap}
                data-index="4"
              >
                距离
              </Text>
            </View>
            <View className="filterMenu" onClick={this.filterTap}>
              <Text className="title">筛选</Text>
              <View
                className="iconfont icon-shaixuan"
                style="font-size:10px;color:#1296db"
              ></View>
            </View>
          </View>
        </View>
        <View className="hotelListContent">
          {hotelList.map(hotel => {
            return (
              <HotelListItemTmpl
                key={hotel.hotelId}
                info={hotel}
                onClick={this.navHotelDetail.bind(this, hotel)}
              />
            );
          })}
          {isLoading ? (
            <View className="loadmore">
              <Image
                src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/reservation/loading.gif"
                className="loading"
                mode="scaleToFill"
                style="margin:auto 0;"
              />
              <Text style="margin-left:20rpx;">正在加载更多</Text>
            </View>
          ) : (
            <Text className="loadmore">没有更多了</Text>
          )}
        </View>
      </View>
    );
  }
}

export default SearchHotel;

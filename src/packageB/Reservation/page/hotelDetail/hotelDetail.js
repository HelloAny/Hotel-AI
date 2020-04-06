import Taro from "@tarojs/taro";
import { View, Image, Text, ScrollView, Picker } from "@tarojs/components";
import RoomListItemTmpl from "../../imports/RoomListItemTmpl";
import * as Server from "../../../../actions";
import { dateFormat } from "../../../../utils";
import "./hotelDetail.scss";

const ic_hotel_image =
  "https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/reservation/ic_hotel_image.png";

class HotelDetail extends Taro.Component {
  config = {
    navigationBarTitleText: "酒店详情"
  };

  state = {
    startDate: Date.now(),
    endDate: Date.now() + 24 * 60 * 60 * 1000,
    dayCount: 1,

    hotel: {
      hotelName: "酒店名字",
      hotelAddress: "酒店位置",
      hotelImage: "",
      hotelId: 3
    },

    roomArray: [],

    serviceList: [
      {
        icon:
          "https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/reservation/hotel-detail/car.png",
        name: "停车场"
      },
      {
        icon:
          "https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/reservation/hotel-detail/breakfast.png",
        name: "营养早餐"
      },
      {
        icon:
          "https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/reservation/hotel-detail/gym.png",
        name: "健身室"
      },
      {
        icon:
          "https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/reservation/hotel-detail/wifi.png",
        name: "免费WiFi"
      }
    ]
  };

  bookRoom(index) {
    const { startDate, endDate, hotel, roomArray, dayCount } = this.state;
    const room = roomArray[index];
    Taro.navigateTo({
      url: `/packageB/Reservation/page/bookHotel/bookHotel?startDate=${startDate}&endDate=${endDate}&hotel=${JSON.stringify(hotel)}&roomType=${room.name}&price=${room.price}&dayCount=${dayCount}`
    });
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

  componentWillMount() {
    const { startDate, endDate, hotel } = this.$router.params;
    let h = JSON.parse(hotel);
    let dayCount = Math.floor(
      (endDate * 1 + 10 * 1000 - startDate) / 24 / 60 / 60 / 1000
    );

    this.setState({
      startDate,
      endDate,
      dayCount,
      hotel: {
        hotelId:h.hotelId,
        hotelImage:h.imageUrl,
        hotelAddress:h.address,
        hotelName: h.name
      }
    });

    Server.getRooms({
      hotel_id: h.hotelId
    })
      .then(res => {
        let roomArray = [];

        for (let key in res) {
          const element = res[key];
          element.type = key;
          roomArray.push(element);
        }

        this.setState({
          roomArray: roomArray.map(room => {
            return {
              image: room.imgs[0] || ic_hotel_image,
              name: room.type,
              service: room.room_type_content,
              price: room.price
            };
          })
        });
      })
      .catch(err => {
        console.log(err);
        Taro.showToast({
          title: "网络开小差了...",
          icon: "none",
          duration: 2000
        });
      });
  }

  render() {
    const {
      hotel,
      serviceList,
      startDate,
      endDate,
      dayCount,
      roomArray
    } = this.state;
    return (
      <View className="hd-container-smt">
        <View className="hotelDetailPic">
          <Image
            className="image"
            mode="scaleToFill"
            src={hotel.hotelImage || ic_hotel_image}
          ></Image>
          <View className="introduce">
            <View className="text">{hotel.hotelName}</View>
          </View>
        </View>
        <View className="addressItem">
          <View
            className="iconfont icon-juli"
            style="font-size:20px; color: #777"
          >
            <Text className="address">{hotel.hotelAddress}</Text>
          </View>
          <View className="phone-box">
            <Image
              className="phoneIcon"
              mode="aspectFit"
              src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/reservation/hotel-detail/phonecall.png"
            ></Image>
            <Text>联系</Text>
          </View>
        </View>
        <View className="serviceItem">
          <Text className="title">配套设施</Text>
          <ScrollView className="serviceList" enableFlex scrollX>
            {serviceList.map((item, index) => {
              return (
                <View key={"serviceList" + index} className="service">
                  <Image
                    className="icon"
                    mode="widthFix"
                    src={item.icon}
                  ></Image>
                  <Text className="text">{item.name}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style="width:100%;height:16rpx;background:#dedede"></View>
        <View className="divideItem">
          <Text className="divideText">入住</Text>
          <Text className="divideText">退房</Text>
        </View>
        {/*  日期计算  */}
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
                  <Text className="month">{dateFormat("mm月", startDate)}</Text>
                  <Text className="week"> {dateFormat("周w", startDate)}</Text>
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
                  <Text className="month"> {dateFormat("mm月", endDate)}</Text>
                  <Text className="week">{dateFormat("周w", endDate)}</Text>
                </View>
              </View>
            </Picker>
          </View>
        </View>
        {roomArray.map((item, index) => {
          return (
            <RoomListItemTmpl
              key={"room" + index}
              info={{
                imageUrl: item.image,
                roomName: item.name,
                services: item.service,
                price: item.price
              }}
              onBook={this.bookRoom.bind(this, index)}
            ></RoomListItemTmpl>
          );
        })}
      </View>
    );
  }
}

export default HotelDetail;

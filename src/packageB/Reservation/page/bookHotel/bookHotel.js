import Taro from "@tarojs/taro";
import { View, Text, Image, Switch, Input } from "@tarojs/components";
import { userStore } from "../../../../store";
import * as Server from "../../../../actions";
import { dateFormat } from "../../../../utils";
import SettingItemTmpl from "../../imports/SettingItemTmpl";
import { Navbar, HCcamera } from "@components";
import "./bookHotel.scss";

class BookHotel extends Taro.Component {
  config = {
    // navigationBarTitleText: "客房预订",
    // backgroundColor: "#ffffff"
    navigationStyle: "custom"
  };

  state = {
    roomId: "",
    isDiscount: false,
    roomPrice: 0,
    hotel: {},
    hotelName: "酒店名称",
    roomName: "房间类型",
    startDate: Date.now(),
    endDate: Date.now(),
    discount: "不选择优惠",
    faceShow: false
  };

  floorOfDay(time) {
    let t1 = dateFormat("mm dd 2020 00:00:01", time);
    return new Date(t1).getTime();
  }

  handleTimeChange(v) {
    let time = new Date(
      dateFormat(`mm dd 2020 ${v}:01`, this.state.startDate)
    ).getTime();

    this.setState({
      startDate: time
    });
  }

  handleBook() {
    Taro.showLoading({
      title: "支付中...",
      mask: true
    });
    const { startDate, endDate } = this.state;
    const { roomType } = this.$router.params;
    let st = Math.max(
      this.floorOfDay(startDate) + 13 * 60 * 60 * 1000 + 2,
      startDate
    );
    let et = this.floorOfDay(endDate) + 12 * 60 * 60 * 1000 - 60 * 1000;

    Server.calculatePrices({
      uid: userStore.user.id,
      room_type: roomType,
      start_date: st,
      end_date: et
    }).then(res => {
      this.setState({
        roomId: res.room_id || "",
        roomPrice: res.total_price
      });
      return Server.succPay({
        uid: userStore.user.id,
        room_id: res.room_id || "",
        start_time: st,
        end_time: et
      });
    })
      .then(() => {
        Taro.showToast({
          title: "支付成功",
          icon: "success",
          duration: 2000
        });
        Taro.switchTab({
          url: '/pages/journey/index'
        })
      })
      .catch(err => {
        console.log(err);
        Taro.showToast({
          title: "网络开小差了...",
          icon: "none",
          duration: 2000
        });
      })
      .then(() => {
        Taro.hideLoading();
      });
  }

  handleNameChange(v) {
    console.log(v);
  }

  handlePhoneChange(v) {
    console.log(v);
  }

  componentWillMount() {
    const {
      startDate,
      endDate,
      hotel,
      roomType,
      price,
      dayCount
    } = this.$router.params;
    let h = JSON.parse(hotel);
    this.setState({
      hotel: h,
      hotelName: h.hotelName,
      roomName: roomType,
      startDate,
      endDate,
      roomPrice: price * dayCount
    });
  }

  render() {
    const {
      hotelName,
      roomName,
      startDate,
      endDate,
      discount,
      roomPrice,
      isDiscount
    } = this.state;
    return (
      <View className="bh-container">
        {

        }
        <Navbar title="客房预订" backgroundColor="white" />
        <View className="bookScroll">
          <View className="bookBody">
            <View className="bookMsg">
              <View>{hotelName}</View>
              <View style="margin-top:10rpx;">{"房型：" + roomName}</View>
            </View>
            <SettingItemTmpl
              caption="入住/离店"
              value={
                dateFormat("YYYY-mm-dd", startDate) +
                "/" +
                dateFormat("YYYY-mm-dd", endDate)
              }
            />
            <SettingItemTmpl caption="房间数量" value="1间" />
            <View style="width:100%;height:24rpx;"></View>
            <SettingItemTmpl
              caption="入住人 "
              isInput
              hint="请输入姓名"
              onInput={this.handleNameChange.bind(this)}
            />
            <SettingItemTmpl
              caption="手机号码 "
              hint="请输入手机号码"
              isInput
              inputType="number"
              onInput={this.handlePhoneChange.bind(this)}
            />
            <SettingItemTmpl
              caption="到店时间"
              hint="13:00"
              isPicker
              onInput={this.handleTimeChange.bind(this)}
            />
            <View style="width:100%;height:24rpx;"></View>
            <View className="settingItem">
              <Text className="caption">选择优惠</Text>
              <Text className="discount">{discount}</Text>
              <Image
                src={require("../../res/images/ic_down_arrow.png")}
                mode="widthFix"
                className="icon"
              ></Image>
            </View>
            <View className="settingItem">
              <Text className="caption">发票</Text>
              <Switch className="invoice" color="#409EFF" checked></Switch>
            </View>
            <View className="settingItem">
              <Text className="caption">备注</Text>
              <Input
                className="remark"
                placeholder="请补充你的其他需求"
              ></Input>
            </View>
            <View style="width:100%;height:100rpx;"></View>
          </View>
        </View>
        <View className="payItem">
          <View className="priceItem">
            <Text>应付：</Text>
            <Text>{"¥" + roomPrice}</Text>
            {isDiscount && (
              <Text className="payMsg">{"(已优惠" + discount + "元)"}</Text>
            )}
          </View>
          <View className="payBtn" onClick={this.handleBook.bind(this)}>
            立即支付
          </View>
        </View>
      </View>
    );
  }
}

export default BookHotel;

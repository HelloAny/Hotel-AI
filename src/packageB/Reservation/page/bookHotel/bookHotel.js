import {
  Block,
  ScrollView,
  View,
  Text,
  Image,
  Switch,
  Input
} from '@tarojs/components'
import Taro from '@tarojs/taro'
// import ClearInput from '../../components/clearInput/clearInput'
import SettingItemTmpl from '../../imports/SettingItemTmpl'
import './bookHotel.scss'
// pages/bookHotel/bookHotel.js

var roomPrice
var hotelName
var roomName
var startDate
var endDate


class BookHotel extends Taro.Component {

  constructor(){
    super(...arguments);
    this.state={
      isDiscount: false,
    roomPrice,
    hotelName,
    roomName,
    startDate,
    endDate,
    discount: '不选择优惠'
    };
  }

  componentWillMount(options) {
    console.log(options)
    roomPrice = options.price
    hotelName = options.hotelName
    roomName = options.roomName
    startDate = options.startDate
    endDate = options.endDate

    this.setState({
      roomPrice: roomPrice,
      hotelName: hotelName,
      roomName: roomName,
      startDate: startDate,
      endDate: endDate
    })
  }

  config = {
    navigationBarTitleText: '客房预订',
    backgroundColor: '#ffffff'
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
    } = this.state
    return (
      <Block>
        <ScrollView className="bookScroll" scrollY>
          <View className="bookBody">
            <View className="bookMsg">
              <View>{hotelName}</View>
              <View style="margin-top:10rpx;">{'房型：' + roomName}</View>
            </View>
            <SettingItemTmpl
              state={{
                caption: '入住/离店',
                value: startDate + '/' + endDate,
                needIcon: false,
                isInput: false
              }}
            ></SettingItemTmpl>
            <SettingItemTmpl
              state={{
                caption: '房间数量 ',
                value: '1间 ',
                needIcon: true,
                isInput: false
              }}
            ></SettingItemTmpl>
            <View style="width:100%;height:24rpx;"></View>
            <SettingItemTmpl
              state={{
                caption: '入住人 ',
                value: '1间 ',
                needIcon: false,
                isInput: true,
                hint: '请输入姓名',
                inputType: 'text'
              }}
            ></SettingItemTmpl>
            <SettingItemTmpl
              state={{
                caption: '手机号码 ',
                value: '1间 ',
                needIcon: false,
                isInput: true,
                hint: '请输入手机号码',
                inputType: 'number'
              }}
            ></SettingItemTmpl>
            <SettingItemTmpl
              state={{
                caption: '到店时间',
                value: '19:00',
                needIcon: false,
                isInput: false
              }}
            ></SettingItemTmpl>
            <View style="width:100%;height:24rpx;"></View>
            <View className="settingItem">
              <Text className="caption">选择优惠</Text>
              <Text className="discount">{discount}</Text>
              <Image
                src={require('../../res/images/ic_down_arrow.png')}
                mode="widthFix"
                className="icon"
              ></Image>
            </View>
            <View className="settingItem">
              <Text className="caption">发票</Text>
              <Switch className="invoice" color="#ee6715" checked></Switch>
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
        </ScrollView>
        <View className="payItem">
          <View className="priceItem">
            <Text>应付：</Text>
            <Text>{'¥' + roomPrice}</Text>
            {isDiscount && (
              <Text className="payMsg">{'(已优惠' + discount + '元)'}</Text>
            )}
          </View>
          <View className="payBtn">立即支付</View>
        </View>
      </Block>
    )
  }
}

export default BookHotel;

import {
  Block,
  View,
  Image,
  Text,
  ScrollView,
  Picker
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import RoomListItemTmpl from '../../imports/RoomListItemTmpl.js'
import './hotelDetail.scss'
import ic_hotel_detail from '../../res/images/ic_hotel_detail.png'
import ic_city_location from '../../res/images/ic_city_location.png'
import ic_hotel_phone from '../../res/images/ic_hotel_phone.png'
import ic_hotel_imag from'../../res/images/ic_hotel_image.png'

// pages/hotelDetail/hotelDetail.js

var currentYear = new Date().getFullYear()
var currentMonth = new Date().getMonth() + 1
var currentDay = new Date().getDate()
var currentWeek = new Date().getDay()
var currentDate = currentYear + '-' + currentMonth + '-' + currentDay

var startDate = ''
var startYear
var startDay
var startMonth
var startWeek
var endOfStartDate = '2020-12-31'
var startDayCount

var endDate = ''
var endYear
var endDay
var endMonth
var endWeek
var endOfEndDate = '2020-12-31'

var dayCount = 1

function RoomBean() {
  var image
  var name
  var service
  var price
}


class HotelDetail extends Taro.Component {
  constructor(){
    super(...arguments);
    this.state={
      startDate: '',
      currentDate: '',
      endOfStartDate: '',
      endDate: '',
      endOfEndDate: '',
      startDay: '',
      startMonth: '',
      startWeek: '',
      endDay: '',
      endMonth: '',
      endWeek: '',
      dayCount: 1,

      hotelName: '',
      hotelAddress: '',
      roomArray: [
        {
          image: '../../res/images/ic_hotel_image.png',
          name: '标准单人间',
          service: 'WiFi/有窗/空调',
          price: 158
        },
        {
          image: '../../res/images/ic_hotel_image.png',
          name: '标准双人间',
          service: 'WiFi/有窗/空调',
          price: 258
        },
        {
          image: '../../res/images/ic_hotel_image.png',
          name: '豪华单人间',
          service: 'WiFi/有窗/空调',
          price: 198
        },
        {
          image: '../../res/images/ic_hotel_image.png',
          name: '豪华双人间',
          service: 'WiFi/有窗/空调',
          price: 358
        }
      ],
      serviceList: [
        {
          icon: '../../res/images/ic_service_park.png',
          name: '停车场'
        },
        {
          icon: '../../res/images/ic_service_food.png',
          name: '营养早餐'
        },
        {
          icon: '../../res/images/ic_service_park.png',
          name: '健身室'
        },
        {
          icon: '../../res/images/ic_service_food.png',
          name: '免费WiFi'
        },
        {
          icon: '../../res/images/ic_service_park.png',
          name: '叫车服务'
        },
        {
          icon: '../../res/images/ic_service_food.png',
          name: '营养早餐'
        },
        {
          icon: '../../res/images/ic_service_park.png',
          name: '健身室'
        },
        {
          icon: '../../res/images/ic_service_food.png',
          name: '免费WiFi'
        },
        {
          icon: '../../res/images/ic_service_park.png',
          name: '叫车服务'
        }
      ]
    };
  }
  componentWillMount(options) {
    startDate = currentDate
    startYear = currentYear
    startDay = currentDay
    startMonth = currentMonth
    startWeek = currentWeek

    this.initEndDate()
    this.setSearchDate()

    console.log(options)
    var hotelName = options.name
    var address = options.address
    var distance = options.distance
    if (hotelName !== undefined) {
      this.setState({
        hotelName: hotelName,
        hotelAddress: address + '\n距我' + distance + '公里'
      })
    }
  }

  bookRoom(e) {
    var index = e.currentTarget.dataset.index
    var room = this.state.roomArray[index]
    Taro.navigateTo({
      url:
        '/packageB/Reservation/page/bookHotel/bookHotel?price=' +
        room.price +
        '&hotelName=' +
        this.state.hotelName +
        '&roomName=' +
        room.name +
        '&startDate=' +
        startDate +
        '&endDate=' +
        endDate
    })
  }

  startDateChange(e) {
    console.log(e)
    startDate = e.detail.value
    var startArray = startDate.split('-')
    startYear = parseInt(startArray[0])
    startDay = parseInt(startArray[2])
    startMonth = parseInt(startArray[1])
    startWeek = new Date(startYear, startMonth, startDay).getDay()

    var startFormat = this.formatDate(startDate)
    var endFormat = this.formatDate(endDate)
    if (new Date(endFormat) < new Date(startFormat)) {
      this.initEndDate()
    }

    this.setSearchDate()
  }

  endDateChange(e) {
    console.log(e)
    endDate = e.detail.value
    var endArray = endDate.split('-')
    endYear = parseInt(endArray[0])
    endDay = parseInt(endArray[2])
    endMonth = parseInt(endArray[1])
    endWeek = new Date(endYear, endMonth, endDay).getDay()

    this.setSearchDate()
  }

  formatDate(date) {
    return date
      .replace(/T/g, ' ')
      .replace(/\.[\d]{3}Z/, '')
      .replace(/(-)/g, '/')
  }

  getWeekday(week) {
    var weekday = new Array(7)
    weekday[0] = '周日'
    weekday[1] = '周一'
    weekday[2] = '周二'
    weekday[3] = '周三'
    weekday[4] = '周四'
    weekday[5] = '周五'
    weekday[6] = '周六'

    return weekday[week]
  }

  prefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length)
  }

  getDayCount(startDate, endDate) {
    var startFormat = this.formatDate(startDate)
    var endFormat = this.formatDate(endDate)

    var start = new Date(startFormat)
    var end = new Date(endFormat)

    var result = end - start
    if (result >= 0) {
      var days = parseInt(result / (1000 * 60 * 60 * 24))
      return days == 0 ? 1 : days
    } else {
      return 0
    }
  }

  initEndDate() {
    startDayCount = new Date(startYear, startMonth, 0).getDate()

    if (startMonth == 12 && startDay == 31) {
      endYear = startYear + 1
      endMonth = 1
      endDay = 1
    } else {
      endYear = startYear
      if (startDay <= startDayCount) {
        endMonth = startMonth
        endDay = startDay + 1
      } else {
        endMonth = startMonth + 1
        endDay = 1
      }
    }
    if (currentWeek >= 7) {
      endWeek = 1
    } else {
      endWeek = currentWeek + 1
    }
    endDate = endYear + '-' + endMonth + '-' + endDay
  }

  setSearchDate() {
    this.setState({
      currentDate: currentDate,

      startDate: startDate,
      startDay: this.prefixInteger(startDay, 2),
      startMonth: this.prefixInteger(startMonth, 2),
      startWeek: this.getWeekday(startWeek),
      endOfStartDate: '2020-12-31',

      endDate: endDate,
      endDay: this.prefixInteger(endDay, 2),
      endMonth: this.prefixInteger(endMonth, 2),
      endWeek: this.getWeekday(endWeek),
      endOfEndDate: '2020-12-31',

      dayCount: this.getDayCount(startDate, endDate)
    })
  }
  config = {
    navigationBarTitleText: '酒店详情'
  }

  render() {
    const {
      hotelName,
      hotelAddress,
      serviceList,
      startDate,
      currentDate,
      endOfStartDate,
      startDay,
      startMonth,
      startWeek,
      dayCount,
      endDate,
      endOfEndDate,
      endDay,
      endMonth,
      endWeek,
      roomArray
    } = this.state
    return (
      <Block>
        <View className="hotelDetailPic">
          <Image
            src={ic_hotel_detail}
            className="image"
            mode="aspectFill"
          ></Image>
          <View className="introduce">
            <View className="hotelName">{hotelName}</View>
            <View className="text">酒店介绍</View>
          </View>
        </View>
        <View className="addressItem">
          <Image
            className="locationIcon"
            mode="aspectFit"
            src={ic_city_location}
          ></Image>
          <Text className="address">{hotelAddress}</Text>
          <Image
            className="phoneIcon"
            mode="aspectFill"
            src={ic_hotel_phone}
          ></Image>
        </View>
        <View className="serviceItem">
          <Text className="title">配套设施</Text>
          <ScrollView className="serviceList" scrollX>
            <View style="width:100%;">
              {serviceList.map((item, index) => {
                return (
                  <View className="service">
                    <Image
                      className="icon"
                      mode="widthFix"
                      src={item.icon}
                    ></Image>
                    <Text className="text">{item.name}</Text>
                  </View>
                )
              })}
            </View>
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
              value={startDate}
              start={currentDate}
              end={endOfStartDate}
              onChange={this.startDateChange}
            >
              <View className="date">
                <Text className="day">{startDay}</Text>
                <View className="monthWeek">
                  <Text className="month">{startMonth + '月'}</Text>
                  <Text className="week">{startWeek}</Text>
                </View>
              </View>
            </Picker>
            <View
              className="horizontalLine"
              style="width:60rpx;position:absolute;right:0;"
            ></View>
          </View>
          <Text className="dayCount">{dayCount + '天'}</Text>
          <View className="dateItem">
            <View
              className="horizontalLine"
              style="width:60rpx;position:absolute;"
            ></View>
            <Picker
              className="date"
              mode="date"
              value={endDate}
              start={startDate}
              end={endOfEndDate}
              onChange={this.endDateChange}
            >
              <View className="date">
                <Text className="day">{endDay}</Text>
                <View className="monthWeek">
                  <Text className="month">{endMonth + '月'}</Text>
                  <Text className="week">{endWeek}</Text>
                </View>
              </View>
            </Picker>
          </View>
        </View>
        {/*  日期end  */}
        {roomArray.map((item, index) => {
          return (
            <RoomListItemTmpl
              state={{
                imageUrl: item.image,
                roomName: item.name,
                services: item.service,
                price: item.price,
                index: index,
                bookTap: this.bookRoom.bind(this)
              }}
            ></RoomListItemTmpl>
          )
        })}
      </Block>
    )
  }
}

export default HotelDetail;

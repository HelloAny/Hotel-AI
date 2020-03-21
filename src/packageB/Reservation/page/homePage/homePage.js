import {
  Block,
  Swiper,
  SwiperItem,
  Image,
  View,
  Text,
  Picker
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './homePage.scss'
import '../overall.scss'

import ic_home_advertise from '../../res/images/ic_home_advertise.png'
import { $mobx } from 'mobx'


var app = Taro.getApp()
// var locationUrl = 'https://apis.map.qq.com/ws/geocoder/v1/?address='
// const tencentMapKey = '6XNBZ-QHPKS-5B2O4-6V622-DOVLQ-ZXBVF'

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

class HomePage extends Taro.Component {

  constructor(){
    super(...arguments);
    this.state={
      homeAdvertises: [
        {
          imgSrc: ic_home_advertise,
          webUrl: ''
        },
        {
          imgSrc: ic_home_advertise,
          webUrl: ''
        },
        {
          imgSrc: ic_home_advertise,
          webUrl: ''
        }
      ],
    location: '定位中...',
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
    dayCount: 1
    };
  }

  componentWillMount(options){
    this.getLocalLocation()

    startDate = currentDate
    startYear = currentYear
    startDay = currentDay
    startMonth = currentMonth
    startWeek = currentWeek

    this.initEndDate()

    this.setSearchDate()
  }


  homeAdvertisesTap(e) {
    var index = e.currentTarget.dataset.index
    Taro.showToast({
      title: '点击了' + index,
      icon: 'none'
    })
  }

  getLocalLocation() {
    this.setState({
      location: '定位中...'
    })
    var that = this
    Taro.getLocation({
      type:'wgs84',
      success: function(res) {
        var latitude =res.latitude;
        var longitude = res.longitude;
        Taro.request({
          url:"https://apis.map.qq.com/ws/geocoder/v1/",
          type:'get',
          dataType:'json',
          data:{
            location:latitude + ',' +longitude,
            key:'6XNBZ-QHPKS-5B2O4-6V622-DOVLQ-ZXBVF',
            output:'json'
          },
          success:function(res){
            var City = res.data.result.address_component.city
            that.setState({
              location :City
            })
            console.log(City)
          }

        })
      },
      fail(res) {
        that.setState({
          location: '定位失败'
        })
      }
    })
  }

  selectCity() {
    Taro.navigateTo({
      url: '/packageB/Reservation/page/selectCities/selectCities'
    })
  }

  searchEvent() {
    if (location == '定位中...') {
      Taro.showToast({
        title: '定位中，请稍后',
        icon: 'none'
      })
    } else {
      Taro.navigateTo({
        url:
          '/packageB/Reservation/page/searchHotel/searchHotel?location=' + this.state.location
      })
    }
  }

  filterTap() {
    if (location == '定位中...') {
      Taro.showToast({
        title: '定位中，请稍后',
        icon: 'none'
      })
    } else {
      Taro.navigateTo({
        url:
          '/packageB/Reservation/page/searchHotel/searchHotel?location=' + this.state.location
      })
    }
  }

  nearbyTap() {
    if (location == '定位中...') {
      Taro.showToast({
        title: '定位中，请稍后',
        icon: 'none'
      })
    } else {
      Taro.navigateTo({
        url:
          '/packageB/Reservation/page/searchHotel/searchHotel?location=' + this.state.location
      })
    }
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
    console.log(startFormat + '->' + endFormat)
    var start = new Date(startFormat)
    var end = new Date(endFormat)

    console.log(start + '->' + end)
    var result = end - start
    if (result >= 0) {
      var days = parseInt(result / (1000 * 60 * 60 * 24))
      return days == 0 ? 1 : days
    } else {
      return 0
    }
  }

  formatDate(date) {
    return date
      .replace(/T/g, ' ')
      .replace(/\.[\d]{3}Z/, '')
      .replace(/(-)/g, '/')
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


  config = {}

  render() {
    const {
      homeAdvertises,
      location,
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
      endWeek
    } = this.state
    return (
      <Block>
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
              <SwiperItem className="swiper">
                <Image
                  src={item.imgSrc}
                  mode="scaleToFill"
                  className="swiper"
                  onClick={this.homeAdvertisesTap}
                  data-index={index}
                ></Image>
              </SwiperItem>
            )
          })}
        </Swiper>
        <View className="filterContent">
          <View className="filterView">
            <View className="location">
              <Image
                src={ic_home_advertise}
                mode="aspectFit"
                className="icon"
                onClick={this.getLocalLocation}
              ></Image>
              <Text className="caption" onClick={this.getLocalLocation}>
                当前城市：
              </Text>
              <Text className="city" onClick={this.selectCity}>
                {location}
              </Text>
              <Image
                src={ic_home_advertise}
                mode="widthFix"
                className="icon"
                onClick={this.selectCity}
              ></Image>
            </View>
            <View className="location">
              <View className="filter" onClick={this.filterTap}>
                <Image
                  src={ic_home_advertise}
                  mode="widthFix"
                  className="icon"
                ></Image>
                <Text className="text">筛选</Text>
              </View>
              <View style="color:#ccc;text-align: center;">|</View>
              <View className="filter" onClick={this.nearbyTap}>
                <Image
                  src={ic_home_advertise}
                  mode="widthFix"
                  className="icon"
                ></Image>
                <Text className="text">我的附近</Text>
              </View>
            </View>
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
            <View
              className="commonBtn"
              hoverClass="commonBtnHover"
              onClick={this.searchEvent}
              hoverStayTime="100"
            >
              立即搜索
            </View>
          </View>
        </View>
      </Block>
    )
  }
}

export default HomePage;

import { Block, View, Text, Image, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ClearInput from '../../components/clearInput/ClearInput.js'
import HotelListItemTmpl from '../../imports/HotelListItemTmpl.js'
import './searchHotel.scss'
import ic_hotel_image from '../../res/images/ic_hotel_image.png'
import ic_down_arrow from '../../res/images/ic_down_arrow.png'
import ic_hotel_filter from '../../res/images/ic_hotel_filter.png'
import loading from '../../res/images/loading.gif'


var mHotelList = []

function HotelBean() {
  var image
  var name
  var score
  var service
  var address
  var distance
  var price
}

class SearchHotel extends Taro.Component {
  constructor(){
    super(...arguments);
    this.state={
      location: '',
      hotelArray: [],
      loadenable: true,
      shownavindex: 1,
      priceL2H: true
    };
  }

  componentWillMount() {
    const location = this.$router.params.location
    this.setState({
       location
    })

    for (var i = 0; i < 10; i++) {
      var hotelBean = new HotelBean()
      hotelBean.image = ic_hotel_image
      hotelBean.name = '杭州科技大酒店'
      hotelBean.score = 4.5
      hotelBean.service = '停车场/温泉/餐饮'
      hotelBean.address = '地铁站'
      hotelBean.distance = '3.5'
      hotelBean.price = 299

      mHotelList.push(hotelBean)
    }
    this.setState({
      hotelArray: mHotelList
    })
  }

  filterMenuTap(e) {
    var index = e.currentTarget.dataset.index
    this.setState({
      shownavindex: index
    })
    if (index == 2) {
      var priceL2H = !this.state.priceL2H
      this.setState({
        priceL2H: priceL2H
      })
    } else {
      this.setState({
        priceL2H: true
      })
    }
  }

  filterTap() {
    Taro.navigateTo({
      url: '/packageB/Reservation/page/hotelFilter/hotelFilter'
    })
  }

  locationTap() {
    Taro.navigateTo({
      url: '/packageB/Reservation/page/selectCities/selectCities'
    })
  }


  onPullDownRefresh() {
    var that = this
     setTimeout(function() {
      mHotelList = []
      for (var i = 0; i < 10; i++) {
        var hotelBean = new HotelBean()
        hotelBean.image = ic_hotel_image
        hotelBean.name = '杭州科技大酒店'
        hotelBean.score = 4.5
        hotelBean.service = '停车场/温泉/餐饮'
        hotelBean.address = '地铁站'
        hotelBean.distance = '3.5'
        hotelBean.price = 299

        mHotelList.push(hotelBean)
      }

      that.setState({
        hotelArray: mHotelList
      })
      Taro.showToast({
        title: '刷新成功',
        duration: 1500
      })
      Taro.stopPullDownRefresh()
    }, 2000)
  }

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    var that = this
    setTimeout(function() {
      for (var i = 0; i < 10; i++) {
        var hotelBean = new HotelBean()
        hotelBean.image = ic_hotel_image
        hotelBean.name = '杭州科技大酒店'
        hotelBean.score = 4.5
        hotelBean.service = '停车场/温泉/餐饮'
        hotelBean.address = '深大地铁站'
        hotelBean.distance = '3.5'
        hotelBean.price = 299

        mHotelList.push(hotelBean)
      }

      that.setState({
        hotelArray: mHotelList
      })
    }, 2000)
  }

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}

  config = {
    navigationBarTitleText: '酒店列表',
    enablePullDownRefresh: true
  }

  render() {
    const {
      location,
      shownavindex,
      priceL2H,
      hotelArray,
      loadenable
    } = this.state
    return (
      <Block>
        <View className="pageHeader">
          <View className="searchHeader">
            <Text className="location" onClick={this.locationTap}>
              {location}
            </Text>
            <Image
              src={ic_down_arrow}
              mode="aspectFit"
              style="width:20rpx;height:20rpx;"
            ></Image>
            <ClearInput
              style="flex:1"
              inputHint="搜索酒店"
              iconClass="common_search_img"
              inputClass="common_search_input"
              confirmType="search"
              onInputListener={this.inputListener}
              onInputConfirm={this.searchEvent}
            ></ClearInput>
          </View>
          <View className="filterView">
            <View className="filterOptions">
              <Text
                className={shownavindex == 1 ? 'filterActive' : 'filterItem'}
                onClick={this.filterMenuTap}
                data-index="1"
              >
                推荐
              </Text>
              <View
                className={shownavindex == 2 ? 'filterActive' : 'filterItem'}
                onClick={this.filterMenuTap}
                data-index="2"
              >
                <Text>价格</Text>
                <View className={priceL2H ? 'arrowUp' : 'arrowDown'}></View>
              </View>
              <Text
                className={shownavindex == 3 ? 'filterActive' : 'filterItem'}
                onClick={this.filterMenuTap}
                data-index="3"
              >
                好评
              </Text>
              <Text
                className={shownavindex == 4 ? 'filterActive' : 'filterItem'}
                onClick={this.filterMenuTap}
                data-index="4"
              >
                距离
              </Text>
            </View>
            <View className="filterMenu" onClick={this.filterTap}>
              <Text className="title">筛选</Text>
              <Image
                src={ic_hotel_filter}
                mode="aspectFit"
                className="icon"
              ></Image>
            </View>
          </View>
        </View>
        <View className="hotelListContent">
        {hotelArray.map((item, index) => {
            return (
              <HotelListItemTmpl
                state={{
                  imageUrl: item.image,
                  name: item.name,
                  score: item.score,
                  services: item.service,
                  address: item.address,
                  distance: item.distance,
                  price: item.price
                }}
              ></HotelListItemTmpl>
            )
          })}
          {loadenable ? (
            <View className="loadmore">
              <Image
                src={loading }
                className="loading"
                mode="scaleToFill"
                style="margin:auto 0;"
              ></Image>
              <Text style="margin-left:20rpx;">正在加载更多</Text>
            </View>
          ) : (
            <Text className="loadmore">没有更多了</Text>
          )}
        </View>
      </Block>
    )
  }
}

export default SearchHotel;

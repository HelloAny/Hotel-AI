import { Block, View, Text, Image, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtSearchBar } from 'taro-ui'
import HotelListItemTmpl from '../../imports/HotelListItemTmpl.js'
import * as Server from "../../../../actions";
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
      nowLocation: '',
      hotelArray: [],
      hotelList:[],
      loadenable: false,
      shownavindex: 1,
      priceL2H: true,
      value:''
    };
  }

   initHotels(data){         //初始化酒店列表
      this.setState({
        hotelList:data.map(hotel => {
          const {pk:id}= hotel;
          const {name,location,imgs}=hotel.fields;
          return{id,img:imgs.horizontal[0],location,name};
        })
      })
   }


  componentWillMount() {
    const nowLocation = this.$router.params.location
    this.setState({
       nowLocation
    })


    Server.getHotels()                     //加载酒店
    .then(data => {
      this.initHotels(data);
      setTimeout(() => {
        if (this.state.stepIndex == 0) this.handleNextStep();
      }, 1000);
    })
    .catch(err => {
      console.log("服务出错啦", err);
      Taro.showToast({
        title: "网络开小差了...",
        icon: "none",
        duration: 2000
      });
    })
  }

  onChange (value) {
    this.setState({
      value: value
    })
  }
  onActionClick () {
    console.log('开始搜索')
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


  onPullDownRefresh() {             //下拉刷新
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
    // setTimeout(function() {
    //   for (var i = 0; i < 10; i++) {
    //     var hotelBean = new HotelBean()
    //     hotelBean.image = ic_hotel_image
    //     hotelBean.name = '杭州科技大酒店'
    //     hotelBean.score = 4.5
    //     hotelBean.service = '停车场/温泉/餐饮'
    //     hotelBean.address = '深大地铁站'
    //     hotelBean.distance = '3.5'
    //     hotelBean.price = 299

    //     mHotelList.push(hotelBean)
    //   }

    //   that.setState({
    //     hotelArray: mHotelList
    //   })
    // }, 2000)



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
      nowLocation,
      shownavindex,
      priceL2H,
      hotelArray,
      hotelList,
      loadenable
    } = this.state
    return (
      <Block>
        <View className="pageHeader">
          <View className="searchHeader">
            <Text className="location" onClick={this.locationTap}>
              {nowLocation}
            </Text>
            <Image
              src={ic_down_arrow}
              mode="aspectFit"
              style="width:20rpx;height:20rpx;"
            ></Image>

            <View className='searchBar'>
              <AtSearchBar
                actionName='搜一下'
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                onActionClick={this.onActionClick.bind(this)}
               />
            </View>
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
              <View className='iconfont icon-shaixuan' style='font-size:10px;color:#1296db' ></View>
            </View>
          </View>
        </View>
        <View className="hotelListContent">

        {hotelList.map(hotel => {        //显示酒店
            return (
              <HotelListItemTmpl
                state={{
                  imageUrl: hotel.img,
                  name: hotel.name,
                  //score: hotel.score,
                  services: hotel.service,
                  address: hotel.location,
                  //distance: hotel.distance,
                  price:hotel.price,
                  hotelId: hotel.id
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

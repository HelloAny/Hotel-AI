import { Block, View, Text, Image, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'

export default class HotelListItemTmpl extends Taro.Component {
  render() {
    const {
    hotelName, address, distance, imageUrl, score, services, price }
    = this.props
    return (
      <Block>
        <Navigator
          className="hotelListItem"
          url={
            '../hotelDetail/hotelDetail?name=' +
            hotelName +
            '&address=' +
            address +
            '&distance=' +
            distance
          }
        >
          <Image className="image" mode="scaleToFill" src={imageUrl}></Image>
          <View className="content">
            <Text className="hotelName">{hotelName}</Text>
            <View className="scoreItem">
              <Text className="score">{score + '分'}</Text>
              <Text className="services">{services}</Text>
            </View>
            <View className="scoreItem">
              <Image
                src="../../res/images/ic_city_location.png"
                style="width:24rpx;height:24rpx;margin-right:10rpx;"
              ></Image>
              <Text className="address">
                {address + '，距我' + distance + '公里'}
              </Text>
            </View>
          </View>
          <View className="priceItem">
            <Text className="price">¥</Text>
            <Text className="price">{price}</Text>
            <Text className="priceTip">起</Text>
          </View>
        </Navigator>
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }

}

import { Block, View, Text, Image, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'

export default class HotelListItemTmpl extends Taro.Component {
  render() {
    const {
    name, address, distance, imageUrl, score, services, price,hotelId }
    = this.props.state
    return (
      <Block>
        <Navigator
          className="hotelListItem"
          url={
            '../hotelDetail/hotelDetail?name=' +
            name +
            '&address=' +
            address +
            '&distance=' +
            distance +
            '&imageUrl=' +
            imageUrl  +
            '&hotelId=' +
            hotelId
          }
        >
          <Image className="image" mode="scaleToFill" src={imageUrl}></Image>
          <View className="content">
            <Text className="hotelName">{name}</Text>
            {/* <View className="scoreItem">
              <Text className="score">{score + '分'}</Text>
              <Text className="services">{services}</Text>
            </View> */}
            <View className="scoreItem">
            <View className='iconfont icon-juli' style='font-size:13PX;color:#dbdbdb' onClick={this.getLocalLocation}></View>
              <Text className="address">
                {address } {/* + '，距我' + distance + '公里' */}
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

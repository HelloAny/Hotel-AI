import {
  Block,
  View,
  Image,
  Text,
  ScrollView,
  Picker
} from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class RoomListItemTmpl extends Taro.Component {
  render() {
    const {
        //hotelItemTap,
        imageUrl,
        roomName,
        services,
        price,
        bookTap,
        index
    } = this.props
    return (
      <Block>
        <View className="roomListItem" >  {/* onClick={hotelItemTap} */}
          <Image className="image" mode="scaleToFill" src={imageUrl}></Image>
          <View className="content">
            <Text className="roomName">{roomName}</Text>
            <Text className="roomService">{services}</Text>
            <View className="priceItem">
              <Text className="price">¥</Text>
              <Text className="price">{price}</Text>
              <Text className="priceTip">起</Text>
            </View>
          </View>
          <View
            className="bookBtn"
            hoverClass="bookBtnHover"
            onClick={bookTap}
            data-index={index}
          >
            预订
          </View>
        </View>
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}

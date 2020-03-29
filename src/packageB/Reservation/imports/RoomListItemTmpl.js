import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

export default class RoomListItemTmpl extends Taro.Component {
  static options = {
    addGlobalClass: true
  };

  defaultProps = {
    onBook: ()=>{}
  }

  state = {
    imageUrl: "",
    roomName: "",
    services: "",
    price: 0
  };

  constructor(props) {
    Object.assign(this.state, { ...props.info });
  }

  componentWillReceiveProps(props) {
    this.setState({ ...props.info });
  }

  render() {
    const { imageUrl, roomName, services, price } = this.state;
    return (
      <View className="roomListItem">
        <Image className="image" mode="scaleToFill" src={imageUrl}></Image>
        <View className="content">
          <Text className="roomName">{roomName}</Text>
          <Text className="roomService">{services}</Text>
          <View className="priceItem">
            <Text className="price">¥</Text>
            <Text className="price">{price}</Text>
          </View>
        </View>
        <View
          className="bookBtn"
          hoverClass="bookBtnHover"
          onClick={this.props.onBook}
        >
          预订
        </View>
      </View>
    );
  }
}

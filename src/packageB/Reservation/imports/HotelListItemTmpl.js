import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";

export default class HotelListItemTmpl extends Taro.Component {
  static options = {
    addGlobalClass: true,
  };

  static defaultProps = {
    onHotelClick: () => { },
    info: {}
  };

  state = {
    name: "酒店名字",
    address: "地址",
    distance: 0,
    imageUrl: "图片地址",
    score: 0,
    price: 0,
    hotelId: 1,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, { ...props.info });

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.info });
  }

  render() {
    const { name, address, distance, imageUrl, score, price } = this.state;
    return (
      <View className="hotelListItem" onClick={this.props.onHotelClick}>
        <Image className="image" mode="scaleToFill" src={imageUrl}></Image>
        <View className="content">
          <Text className="hotelName">{name}</Text>
          <View className="scoreItem">
            <Text className="score">{score + "分"}</Text>
            <Text className="services">
              {"距我 " +
                (distance >= 1000
                  ? Math.floor(distance / 1000) + "公里"
                  : distance + "米")}
            </Text>
          </View>
          <View className="scoreItem">
            <View
              className="iconfont icon-juli"
              style="font-size:13PX;color:#dbdbdb"
            ></View>
            <Text className="address">
              {address.length > 15 ? address.substring(0, 15) + "..." : address}
            </Text>
          </View>
        </View>
        <View className="priceItem">
          <Text className="price">¥</Text>
          <Text className="price">{price}</Text>
          <Text className="priceTip">起</Text>
        </View>
      </View>
    );
  }
}

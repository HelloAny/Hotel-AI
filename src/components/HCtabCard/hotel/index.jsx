import Taro, { PureComponent } from "@tarojs/taro";
import { View, Image, CoverImage, CoverView } from "@tarojs/components";
import { AtRate } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
import soucang from "./assets/soucang.png";
import "./index.sass";

class HChotel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    hotelList: [],
  };
  render() {
    const { hotelList } = this.props;
    return (
      <View className="hotelcard-container">
        {hotelList &&
          hotelList.map((item, index) => (
            <View taroKey={index}>
              <View className="box at-row">
                <View className="at-col at-col-6" style="position:relative">
                  <Image className="soucang" src={soucang}></Image>
                  <View className="hotel_img" style="background:#eeeeee;">
                    <Image
                      style="height:100%;width:100%"
                      src={item.imageOne}
                      mode="scaleToFill"
                    ></Image>
                  </View>
                  <View className="hotel_name">{item.nameOne}</View>
                  <View className="hotel_subname">{item.subnameOne}</View>
                  <View className="hotel_price">每人￥{item.priceOne}</View>
                  <View className="hotel_rate">
                    <AtRate value={item.rateOne} size="10" />
                  </View>
                </View>
                <View className="at-col at-col-6" style="position:relative">
                  <Image className="soucang" src={soucang}></Image>
                  <View className="hotel_img" style="background:red">
                    <Image
                      style="height:100%;width:100%"
                      src={item.imageTwo}
                      mode="scaleToFill"
                    ></Image>
                  </View>
                  <View className="hotel_name">{item.nameTwo}</View>
                  <View className="hotel_subname">{item.subnameTwo}</View>
                  <View className="hotel_price">每人￥{item.priceTwo}</View>
                  <View className="hotel_rate">
                    <AtRate value={item.rateTwo} size="10" />
                  </View>
                </View>
              </View>
            </View>
          ))}
      </View>
    );
  }
}

export default HChotel;

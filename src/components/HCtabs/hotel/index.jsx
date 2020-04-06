import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { HCtabCardhotel } from "@components";
import "./index.sass";

class HCtabs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View className="attabs">
        <View className="hotel_tabs">
          <HCtabCardhotel
            hotelList={[
              {
                nameOne: "金陵酒店",
                subnameOne: "不一样的居住体验",
                priceOne: 120,
                rateOne: 3,
                imageOne:
                  "http://q74d0nj5h.bkt.clouddn.com/541584262935_.pic.jpg",
                nameTwo: "杭州西子湖四季酒店",
                subnameTwo: "别具特色",
                priceTwo: 580,
                rateTwo: 4,
                imageTwo:
                  "http://q74d0nj5h.bkt.clouddn.com/581584264397_.pic.jpg",
              },
              {
                nameOne: "飞跃酒店",
                subnameOne: "极致的入住体验",
                priceOne: 300,
                rateOne: 5,
                imageOne:
                  "http://q74d0nj5h.bkt.clouddn.com/591584264399_.pic.jpg",
                nameTwo: "乐福行政酒店",
                subnameTwo: "高档酒店的代言词",
                priceTwo: 700,
                rateTwo: 3.5,
                imageTwo:
                  "http://q74d0nj5h.bkt.clouddn.com/571584264387_.pic.jpg",
              },
            ]}
          ></HCtabCardhotel>
        </View>

        <View className="checkMore">显示更多优质房源</View>
      </View>
    );
  }
}

export default HCtabs;

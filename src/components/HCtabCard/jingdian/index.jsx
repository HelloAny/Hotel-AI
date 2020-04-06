import Taro, { PureComponent } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import dianzan from "./assets/dianzan.png";
import juli from "./assets/juli.png";
import "./index.sass";

class HCtabCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    screenList: [],
  };

  render() {
    const { screenList } = this.props;
    return (
      <View className="jingdian_container">
        {screenList &&
          screenList.map((item, index) => (
            <View className="box at-row" taroKey={index}>
              {item.left ? (
                <View className="at-col at-col-6">
                  <Image
                    src={item.image}
                    className="jingdian_pic"
                    mode="aspectFill"
                  ></Image>
                </View>
              ) : (
                <View className="at-col at-col-6">
                  <View className="jingdian_name">{item.name}</View>
                  <View className="jingdian_dianzan">
                    <Image className="dianzan" src={dianzan}></Image>{" "}
                    <Text className="jingdian_text">
                      {" " + item.people}人向您推荐
                    </Text>
                  </View>
                  <View className="jingdian_juli">
                    <Image className="dianzan" src={juli}></Image>{" "}
                    <Text className="jingdian_text">
                      {" "}
                      距离您{item.kilo}公里
                    </Text>
                  </View>
                  <View className="more_btn">查看更多</View>
                </View>
              )}
              {!item.left ? (
                <View className="at-col at-col-6">
                  <Image
                    src={item.image}
                    className="jingdian_pic"
                    mode="aspectFill"
                  ></Image>
                </View>
              ) : (
                <View className="at-col at-col-6">
                  <View className="jingdian_name">{item.name}</View>
                  <View className="jingdian_dianzan">
                    <Image className="dianzan" src={dianzan}></Image>{" "}
                    <Text className="jingdian_text">
                      {" " + item.people}人向您推荐
                    </Text>
                  </View>
                  <View className="jingdian_juli">
                    <Image className="dianzan" src={juli}></Image>{" "}
                    <Text className="jingdian_text">
                      {" "}
                      距离您{item.kilo}公里
                    </Text>
                  </View>
                  <View className="more_btn">查看更多</View>
                </View>
              )}
            </View>
          ))}
      </View>
    );
  }
}

export default HCtabCard;

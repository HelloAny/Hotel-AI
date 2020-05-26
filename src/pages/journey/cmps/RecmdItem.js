import { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

import "../style/journey-recmd.scss";

export default class RecmdItem extends Component {
  static defaultProps = {
    info: {}
  };

  state = {};

  propsKeys = ["info"];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  render() {
    const { name, tab1, tab2, img } = this.props.info;
    return (
      <View className="rd-container">
        <Image src={img} className="bg" />
        <View className="icon">推 荐</View>
        <View className="content">
          <View className="title-box">
            <Text className="title">{name}</Text>
          </View>
          {tab1.map((tab,index) => (
            <Text key={index} className="tab1">{tab}</Text>
          ))}
          <View className="tab2-list">
            {tab2.map((tab,index) => (
              <Text key={index} className="tab2">{tab}</Text>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

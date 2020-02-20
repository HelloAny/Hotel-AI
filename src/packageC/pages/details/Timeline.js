import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "../../assets/style/details-timeline.scss";

const PROCESS = [{ color: "", content: "" }];

export default class Timeline extends Component {
  static defaultProps = {
    timeline: [
      {
        day: 1,
        time: "-月-日 周-",
        list: [
          {
            type: "memo",
            content: ""
          }
        ]
      },
      {
        day: 2,
        time: "-月-日 周-",
        list: [
          {
            type: "memo",
            content: ""
          }
        ]
      }
    ]
  };

  state = {};

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Timeline");
  }

  componentDidUpdate() {
    console.timeEnd("Timeline");
  }

  render() {
    return (
      <View className="container">
        <View className="row">
          <View className="head">
            <View className="before-title">···</View>
            <Text className="tip">已收起2月8日-2月9日的行程</Text>
            <Text className="tip-btn">展开</Text>
          </View>
        </View>
        <View className="row">
          <View className="head">
            <View className="before-title">D1</View>
            <Text className="time">2月10日 周一</Text>
          </View>
          <View className="main">
            <View className="process">10:36 预定房间</View>
            <View className="process">10:38 付款成功</View>
            <View className="memo">
              <View className="icon">
                <View className="adjust">
                  <AtIcon size="12" value="edit" />
                </View>
              </View>
              <View className="name">备忘</View>
              <View className="content">aaaaa啊啊啊啊啊啊啊啊</View>
              <View className="memo-btn">
                <Text className="value">修改备忘</Text>
              </View>
            </View>
            <Button className="add-memo">+ 添加备注</Button>
          </View>
        </View>
        <View className="row">
          <View className="head">
            <View className="before-title">D2</View>
            <Text className="time">2月11日 周二</Text>
          </View>
          <View className="main">
            <View className="memo">
              <View className="icon">
                <View className="adjust">
                  <AtIcon size="12" value="edit" />
                </View>
              </View>
              <View className="name">备忘</View>
              <View className="content">aaaaa啊啊啊啊啊啊啊啊</View>
              <View className="memo-btn">
                <Text className="value">修改备忘</Text>
              </View>
            </View>
            <Button className="add-memo">+ 添加备忘</Button>
          </View>
        </View>
        <View className="row">
          <View className="head">
            <View className="before-title">D4</View>
            <Text className="time">2月13日 周四</Text>
          </View>
          <View className="main">
            <View className="memo">
              <View className="icon">
                <View className="adjust">
                  <AtIcon size="12" value="edit" />
                </View>
              </View>
              <View className="name">备忘</View>
              <View className="content">aaaaa啊啊啊啊啊啊啊啊</View>
              <View className="memo-btn">
                <Text className="value">修改备忘</Text>
              </View>
            </View>
            <Button className="add-memo">+ 添加备忘</Button>
          </View>
        </View>
        <View className="row">
          <View className="head">
            <View className="before-title">D6</View>
            <Text className="time">2月15日 周六</Text>
          </View>
          <View className="main">
            <View className="memo">
              <View className="icon">
                <View className="adjust">
                  <AtIcon size="12" value="edit" />
                </View>
              </View>
              <View className="name">备忘</View>
              <View className="content">aaaaa啊啊啊啊啊啊啊啊</View>
              <View className="memo-btn">
                <Text className="value">修改备忘</Text>
              </View>
            </View>
            <Button className="add-memo">+ 添加备忘</Button>
          </View>
        </View>
      </View>
    );
  }
}

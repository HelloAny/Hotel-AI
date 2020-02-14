import Taro, { Component, getUserInfo } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtInput, AtForm, AtButton, AtSteps } from "taro-ui";
import axios from "../../actions/api";
import { reLaunch } from "../../utils"; //测试用
import { observer, inject } from "@tarojs/mobx";
import HCinfo from "./HCinfo/HCinfo";
import HCcamera from "./HCcamera/HCcamera";

import "./realAuth.sass";

@inject("userStore")
@observer
class realAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1
    };
  }
  config = {
    navigationBarTitleText: "实名认证",
    navigationBarBackgroundColor: "#2d8cf0"
  };
  onChange(current) {
    this.setState({
      current
    });
  }
  render() {
    const items = [
      {
        title: "身份证验证"
      },
      {
        title: "人脸认证"
      }
    ];
    const { current } = this.state;
    return (
      <View className="container">
        <AtSteps
          className="stepText"
          items={items}
          current={current}
          onChange={this.onChange.bind(this)}
        />
        <View>
          {
            {
              0: <HCinfo></HCinfo>,
              1: <HCcamera></HCcamera>
            }[current]
          }
        </View>
      </View>
    );
  }
}

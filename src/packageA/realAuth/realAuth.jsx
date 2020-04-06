import Taro, { Component, getUserInfo } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtInput, AtForm, AtButton, AtSteps } from "taro-ui";
import { reLaunch } from "@utils"; //测试用
import { observer, inject } from "@tarojs/mobx";
import { HCinfo, HCcamera } from "@components";

import "./realAuth.sass";

@inject("userStore")
@observer
class realAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      hadRealAuth: Boolean
    };
  }
  config = {
    navigationBarTitleText: "实名认证",
    navigationBarBackgroundColor: "#2d8cf0"
  };
  hadRealAuth() {
    const {
      userStore: {
        user: { ID }
      }
    } = this.props;
    if (ID) {
      this.setState({
        hadRealAuth: true
      });
    } else {
      this.setState({
        hadRealAuth: false
      });
    }
  }
  /**
   * 跳转到下一步
   */
  changeCurrent() {
    this.setState({
      current: this.state.current + 1
    });
  }
  componentDidMount() {
    this.hadRealAuth();
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
    const { current, hadRealAuth } = this.state;
    return (
      <View className="container">
        <AtSteps className="stepText" items={items} current={current} />
        <View>
          {
            {
              0: (
                <HCinfo
                  nextBtn={this.changeCurrent}
                  detailAuth={hadRealAuth}
                ></HCinfo>
              ),
              1: <HCcamera></HCcamera>
            }[current]
          }
        </View>
      </View>
    );
  }
}

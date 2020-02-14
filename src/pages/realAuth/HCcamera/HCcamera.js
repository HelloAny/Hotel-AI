import Taro, { Component } from "@tarojs/taro";
import { View, Camera } from "@tarojs/components";
import { AtAvatar, AtInput, AtForm, AtButton } from "taro-ui";
import axios from "../../../actions/api";
import { reLaunch } from "../../../utils"; //测试用
import { observer, inject } from "@tarojs/mobx";

import "./HCcamera.sass";

@inject("userStore")
@observer
class HCcamera extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static options = {
    addGlobalClass: true
  };
  static defaultProps = {};

  openCamera() {
    const context = Taro.createCameraContext();
    console.log(context);
    context.takePhoto({
      quality: "high",
      success: function() {
        console.log(1);
      }
    });
  }
  render() {
    return (
      <View className="container">
        <Camera
          device-position="back"
          style="width: 100%; height: 300px;"
        ></Camera>
        <AtButton onClick={this.openCamera.bind(this)}>相机</AtButton>
      </View>
    );
  }
}

export default HCcamera;

import Taro, { Component } from "@tarojs/taro";
import { View, Camera, CoverView, CoverImage, Image } from "@tarojs/components";
import { AtInput, AtButton } from "taro-ui";
import { faceRegister } from "@actions/api";
import { image2Base64 } from "@utils"; //测试用
import { observer, inject } from "@tarojs/mobx";
import "./index.sass";

@inject("userStore")
@observer
class HCcamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageCameraPath: "",
      changeCameraBtn: false
    };
  }
  static options = {
    addGlobalClass: true
  };
  static defaultProps = {};

  /**
   * 拍摄
   */
  takePhoto() {
    const that = this;
    const context = Taro.createCameraContext();
    context.takePhoto({
      quality: "low",
      success(res) {
        const imagePath = res.tempImagePath;
        const imageBase64 = image2Base64(imagePath);
        that.setState({
          imageCameraPath: imagePath,
          changeCameraBtn: true
        });
      }
    });
  }

  /**
   * 重新拍摄
   */
  refreshCamera() {
    this.setState({
      imageCameraPath: "",
      changeCameraBtn: false
    });
  }

  /**
   * 上传照片
   */
  postImage() {
    const { imageCameraPath } = this.state;
    const param = {
      token: Taro.getStorageSync("token"),
      imagePath: imageCameraPath
    };
    Taro.showLoading({
      title: "认证中",
      mask: true
    });
    faceRegister(param).then(res => {
      Taro.hideLoading();
      console.log("身份认证" + res);
      if (res.data.status == 0) {
        Taro.showToast({
          title: "认证成功",
          icon: "success",
          mask: true,
          duration: 2000
        });
      } else {
        Taro.showToast({
          title: "认证失败",
          icon: "fail",
          duration: 2000
        });
      }
    });
  }
  componentWillMount() { }
  render() {
    const { imageCameraPath, changeCameraBtn } = this.state;
    return (
      <View className="container">
        {imageCameraPath ? (
          <CoverView className="cameraImage">
            <cover-image
              src="http://cdn.amikara.com/cover.png"
              className="coverImage"
            ></cover-image>
          </CoverView>
        ) : (
            <Camera devicePosition="front" className="camera">
              <CoverView className="cameraBorder">
                <cover-image src="http://cdn.amikara.com/cover.png" className="coverImage"></cover-image>
              </CoverView>
            </Camera>
          )}

        <View>
          {changeCameraBtn ? (
            <View>
              <View className="at-row cameraBtn">
                <View className="at-col">
                  <AtButton
                    circle
                    type="primary"
                    onClick={this.postImage.bind(this)}
                  >
                    上传
                  </AtButton>
                </View>
              </View>
              <View className="at-row cameraBtn">
                <View className="at-col">
                  <AtButton
                    circle
                    type="primary"
                    onClick={this.refreshCamera.bind(this)}
                  >
                    重新拍摄
                  </AtButton>
                </View>
              </View>
            </View>
          ) : (
              <View className="at-row cameraBtn">
                <View className="at-col">
                  <AtButton
                    circle
                    type="primary"
                    onClick={this.takePhoto.bind(this)}
                  >
                    拍摄
                </AtButton>
                </View>
              </View>
            )}
        </View>
      </View>
    );
  }
}

export default HCcamera;

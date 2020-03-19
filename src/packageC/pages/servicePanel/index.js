import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import { Navbar, Ico } from "../../../components";
import { AtIcon, AtTabs, AtTabsPane } from "taro-ui";

import "./style/index.scss";

export default class ServicePanel extends Component {
  config = {
    navigationStyle: "custom"
  };
  state = {
    showerIndex: 0,
    timer: ""
  };

  propsKeys = [];

  stateKeys = ["showerIndex"];

  handleNavToService(page) {
    switch (page) {
      case "vip":
        Taro.navigateTo({
          url: "/packageC/pages/servicePanel/pages/vip"
        });
        break;
      case "cleaner":
        Taro.navigateTo({
          url: "/packageC/pages/servicePanel/pages/cleaner"
        });
        break;
      case "store":
        Taro.navigateTo({
          url: "/packageC/pages/servicePanel/pages/conv"
        });
        break;
      case "furniture":
        Taro.navigateTo({
          url: "/packageC/pages/servicePanel/pages/hotelStore"
        });
        break;
      case "drug":
        Taro.navigateTo({
          url: "/packageC/pages/servicePanel/pages/medicine"
        });
        break;
      case "order":
        Taro.navigateTo({
          url: "/packageC/pages/servicePanel/pages/order"
        });
        break;
      case "SOS":
        Taro.navigateTo({
          url: "/packageC/pages/servicePanel/pages/SOS"
        });
        break;
      case "tool":
        Taro.navigateTo({
          url: "/packageC/pages/servicePanel/pages/tool"
        });
        break;
      case "SIoT": // 物联
        Taro.navigateTo({
          url: "/packageC/pages/servicePanel/pages/vip"
        });
        break; // 疫情
      case "virus":
        Taro.navigateTo({
          url: "/packageC/pages/servicePanel/pages/vip"
        });
        break; // 寄存柜
      case "luggage":
        Taro.navigateTo({
          url: "/packageC/pages/servicePanel/pages/vip"
        });
        break;
      default:
        break;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentDidMount() {
    this.setState({
      timer: setInterval(() => {
        if (this.state.showerIndex > 10) {
          clearInterval(this.state.timer);
        } else {
          this.setState({
            showerIndex: this.state.showerIndex + 1
          });
        }
      }, 250)
    });
  }

  componentWillUpdate() {
    console.time("ServicePanel");
  }

  componentDidUpdate() {
    console.timeEnd("ServicePanel");
  }

  render() {
    const { showerIndex } = this.state;
    return (
      <View className="sp-container">
        <Navbar color="white" />
        <View className="head">
          <Image
            mode="aspectFill"
            className="head-bg"
            src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/head.png"
          />
        </View>
        <View enableFlex className="body">
          <View
            className="vip-nav"
            onClick={this.handleNavToService.bind(this, "vip")}
          >
            <View>
              <Ico value=".icon-huiyuan" />
              我的酒店会员
            </View>
            <View>
              获取更多优惠
              <AtIcon value="chevron-right" size="24" />
            </View>
          </View>
          <ScrollView enableFlex scrollY className="service-nav">
            <View
              className={"service-item " + (showerIndex > 0 ? "" : "hidden")}
              onClick={this.handleNavToService.bind(this, "SOS")}
            >
              <View className="title-box">
                <Text className="title">紧急求助</Text>
                <Text className="sub-title">无论何时，我们必将及时赶到！</Text>
              </View>
              <Ico value=".icon-help-urgency" color="whitesmoke" size="36" />
            </View>
            <View
              className={"service-item " + (showerIndex > 1 ? "" : "hidden")}
              onClick={this.handleNavToService.bind(this, "SIoT")}
            >
              <View className="title-box">
                <Text className="title">我的房间</Text>
                <Text className="sub-title">智慧酒店从此开始</Text>
              </View>
              <Ico value=".icon-SIoT" color="whitesmoke" size="36" />
            </View>
            <View
              className={"service-item " + (showerIndex > 2 ? "" : "hidden")}
              onClick={this.handleNavToService.bind(this, "cleaner")}
            >
              <View className="title-box">
                <Text className="title">呼叫打扫</Text>
                <Text className="sub-title">
                  专业、严谨、细心，还您整洁空间
                </Text>
              </View>
              <Ico value=".icon-cleaner" color="whitesmoke" size="36" />
            </View>
            <View
              className={"service-item " + (showerIndex > 3 ? "" : "hidden")}
              onClick={this.handleNavToService.bind(this, "order")}
            >
              <View className="title-box">
                <Text className="title">预定点餐</Text>
                <Text className="sub-title">店内餐饮，快捷又安心</Text>
              </View>
              <Ico value=".icon-order-meal" color="whitesmoke" size="36" />
            </View>
            <View
              className={"service-item " + (showerIndex > 4 ? "" : "hidden")}
              onClick={this.handleNavToService.bind(this, "tool")}
            >
              <View className="title-box">
                <Text className="title">工具借用</Text>
                <Text className="sub-title">70多种物品，任您使用</Text>
              </View>
              <Ico value=".icon-tool-provider" color="whitesmoke" size="36" />
            </View>
            <View
              className={"service-item " + (showerIndex > 5 ? "" : "hidden")}
              onClick={this.handleNavToService.bind(this, "drug")}
            >
              <View className="title-box">
                <Text className="title">送药上门</Text>
                <Text className="sub-title">专业医生，在线免费咨询</Text>
              </View>
              <Ico value=".icon-drug" color="whitesmoke" size="36" />
            </View>
            <View
              className={"service-item " + (showerIndex > 6 ? "" : "hidden")}
              onClick={this.handleNavToService.bind(this, "luggage")}
            >
              <View className="title-box">
                <Text className="title">行李寄存</Text>
                <Text className="sub-title">人脸验证，自助使用，享受科技</Text>
              </View>
              <Ico value=".icon-luggage" color="whitesmoke" size="36" />
            </View>
            <View
              className={"service-item " + (showerIndex > 7 ? "" : "hidden")}
              onClick={this.handleNavToService.bind(this, "virus")}
            >
              <View className="title-box">
                <Text className="title">同乘疫情</Text>
                <Text className="sub-title">疫情当前，惟愿您身体安康</Text>
              </View>
              <Ico value=".icon-virus-query" color="whitesmoke" size="36" />
            </View>
            <View
              className={"service-item " + (showerIndex > 8 ? "" : "hidden")}
              onClick={this.handleNavToService.bind(this, "furniture")}
            >
              <View className="title-box">
                <Text className="title">酒店同款</Text>
                <Text className="sub-title">
                  所见即所购，酒店同款，严选好物
                </Text>
              </View>
              <Ico value=".icon-furniture" color="whitesmoke" size="36" />
            </View>
            <View
              className={"service-item " + (showerIndex > 9 ? "" : "hidden")}
              onClick={this.handleNavToService.bind(this, "store")}
            >
              <View className="title-box">
                <Text className="title">线上便利店</Text>
                <Text className="sub-title">送货上楼，10分必达</Text>
              </View>
              <Ico value=".icon-hotel-store" color="whitesmoke" size="36" />
            </View>
            <View
              className={"service-end " + (showerIndex > 10 ? "" : "hidden")}
              onClick={this.handleNavToService.bind(this, "end")}
            >
              更多服务等您来体验
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

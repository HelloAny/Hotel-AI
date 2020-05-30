import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { getDeviceInfo } from "../../utils";

const defaultMenuButton = {
  height: 25,
  top: 20,
  right: 350,
};

export class Navbar extends Component {
  static defaultProps = {
    color: "#303133", //字体颜色
    shade: false, // 返回添加黑色阴影
    title: "", // 标题
    weight: false, //标题是否加粗
    isBackBtn: true,
    backgroundColor: "rgba(0,0,0,0)",
  };

  state = {};

  propsKeys = [];

  stateKeys = [];

  handleClick(e) {
    e.stopPropagation();
    Taro.navigateBack();
  }

  componentWillMount() {
    const props = this.props;
    const MenuButton =
      typeof wx == "undefined" || !wx
        ? defaultMenuButton
        : wx.getMenuButtonBoundingClientRect();
    const DeviceInfo = getDeviceInfo();

    let headerHeight =
      DeviceInfo.statusBarHeight +
      MenuButton.height +
      (MenuButton.top - DeviceInfo.statusBarHeight) || 70;
    let top = 90 || 30;
    let left = DeviceInfo.windowWidth - MenuButton.right || 10;
    let btnHeight = MenuButton.height || 32;

    Object.assign(StyleSheet.navcontainer, {
      height: 127 + "Px",
      color: this.props.color,
      backgroundColor: props.backgroundColor,
    });
    Object.assign(StyleSheet.navheader, {
      height: btnHeight + "Px",
      top: top + "Px",
      left: left + "Px",
    });
    Object.assign(StyleSheet.navbtn, {
      backgroundColor: props.shade ? "rgba(0,0,0,.25)" : "",
    });
    Object.assign(StyleSheet.navtitle, {
      fontWeight: props.weight ? "800" : "300",
      transform: props.isBackBtn
        ? "translate(-67%,-50%)"
        : "translate(-100%,-50%)",
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("NavBar");
  }

  componentDidUpdate() {
    console.timeEnd("NavBar");
  }

  render() {
    const { title, isBackBtn } = this.props;
    return (
      <View style={StyleSheet.navcontainer}>
        <View style={StyleSheet.navheader}>
          {isBackBtn ? (
            <View
              style={StyleSheet.navbtn}
              onClick={this.handleClick.bind(this)}
            >
              <AtIcon value="chevron-left" />
              <Text style={StyleSheet.navbackTitle}>返回</Text>
            </View>
          ) : (
              <View>{""}</View>
            )}

          <View style={StyleSheet.navtitle}>{title}</View>
        </View>
      </View>
    );
  }
}

const StyleSheet = {
  navcontainer: {
    zIndex: "9999",
    position: "fixed",
    width: "100%",
    height: "50Px",
    top: "0",
    left: "0",
  },
  navheader: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  navbtn: {
    transform: "translateY(2px)",
    backgroundColor: "",
    borderRadius: "20Px",
    padding: "2Px 10Px 2Px 5Px",
    display: "flex",
    alignItems: "center",
  },
  navbackTitle: {
    fontSize: "18Px",
  },
  navtitle: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-100%,-50%)",
  },
};

export default Navbar;

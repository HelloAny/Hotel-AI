import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { getDeviceInfo } from "../../utils";

const defaultMenuButton = {
  height: 25,
  top: 20,
  right: 350
};

export class Navbar extends Component {
  static defaultProps = {
    color: "#303133", //字体颜色
    shade: false, // 返回添加黑色阴影
    title: "", // 标题
    weight: false //标题是否加粗
  };

  state = {};

  propsKeys = [];

  stateKeys = [];

  handleClick(e) {
    e.stopPropagation();
    Taro.navigateBack();
  }

  componentWillMount() {
    const props = this.props
    const MenuButton =
      typeof wx == "undefined" || !wx
        ? defaultMenuButton
        : wx.getMenuButtonBoundingClientRect();
    const DeviceInfo = getDeviceInfo();

    let headerHeight =
      DeviceInfo.statusBarHeight +
        MenuButton.height +
        (MenuButton.top - DeviceInfo.statusBarHeight) * 2 || 70;
    let top = MenuButton.top || 30;
    let left = DeviceInfo.windowWidth - MenuButton.right || 10;
    let btnHeight = MenuButton.height || 32;
 
    Object.assign(StyleSheet.container, {
      height: Math.min(headerHeight, 50) + "Px",
      color: this.props.color
    });
    Object.assign(StyleSheet.header, {
      height: btnHeight + "Px",
      top: top + "Px",
      left: left + "Px"
    });
    Object.assign(StyleSheet.btn, {
      backgroundColor: props.shade ? "rgba(0,0,0,.25)" : ""
    });
    Object.assign(StyleSheet.title, {
      fontWeight: props.weight ? "800" : "300"
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
    const { title } = this.props;
    return (
      <View style={StyleSheet.container}>
        <View style={StyleSheet.header}>
          <View style={StyleSheet.btn} onClick={this.handleClick.bind(this)}>
            <AtIcon value="chevron-left" />
            <Text style={StyleSheet.backTitle}>返回</Text>
          </View>
          <View style={StyleSheet.title}>{title}</View>
        </View>
      </View>
    );
  }
}

const StyleSheet = {
  container: {
    zIndex: "999",
    position: "fixed",
    width: "100%",
    height: "50Px",
    top: "0",
    left: "0",
    backgroundColor: "transparent"
  },
  header: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  btn: {
    transform: "translateY(2px)",
    backgroundColor: "",
    borderRadius: "20Px",
    padding: "2Px 10Px 2Px 5Px",
    display: "flex",
    alignItems: "center",
  },
  backTitle: {
    fontSize: "18Px"
  },
  title: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-68%,-50%)"
  }
};

export default Navbar;

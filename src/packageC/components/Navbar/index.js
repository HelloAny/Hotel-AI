import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { getDeviceInfo } from "../../../utils";

const StyleSheet = {
  container: {
    zIndex: "999",
    position: "fixed",
    width: "100%",
    top: "0",
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
    padding: "2Px 10Px 2Px 5Px"
  },
  title: {
    position:"absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-55%,-50%)"
  }
};

export default class NavBar extends Component {
  static defaultProps = {
    color: "#303133",
    shade: false,
    title: "",
    weight: false
  };

  state = {};

  propsKeys = [];

  stateKeys = [];

  constructor(props) {
    const MenuButton = wx.getMenuButtonBoundingClientRect();
    const DeviceInfo = getDeviceInfo();

    let headerHeight =
      DeviceInfo.statusBarHeight +
        MenuButton.height +
        (MenuButton.top - DeviceInfo.statusBarHeight) * 2 || 70;
    let top = MenuButton.top || 30;
    let left = DeviceInfo.windowWidth - MenuButton.right || 10;
    let btnHeight = MenuButton.height || 32;

    Object.assign(StyleSheet.container, {
      height: headerHeight + "Px",
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
    })
  }

  handleClick() {
    Taro.navigateBack();
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
            <AtIcon value="chevron-left" /> 返回
          </View>
          <View style={StyleSheet.title}>{title}</View>
        </View>
      </View>
    );
  }
}

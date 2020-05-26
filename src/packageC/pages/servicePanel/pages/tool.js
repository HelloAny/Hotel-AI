import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import { Navbar } from "../../../../components/Navbar";

export default class Vip extends Component {
  config = {
    navigationStyle: "custom"
  };
  static defaultProps = {};

  state = {
    current: 0,
    tabList: [{ title: "生活" }, { title: "数码" }, { title: "文具" }]
  };

  propsKeys = [];

  stateKeys = ["current"];

  handleClick(e) {
    this.setState({
      current: e
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Vip");
  }

  componentDidUpdate() {
    console.timeEnd("Vip");
  }

  render() {
    return (
      <View style="padding-top:85PX">
        <Navbar title="物品借用" />
        <Image
          style={StyleSheet.bg}
          mode="aspectFit"
          src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/tool-bg.png"
        />
        {/* <View style={StyleSheet.help}>
          <View>
            <View>借用站：酒店二楼房间B2671</View>
            <View>请根据物品借用码按流程操作</View>
          </View>
          <View style={StyleSheet.helpBtn}>找人代取</View>
        </View> */}
        <View style={StyleSheet.content}>
          <AtTabs
            current={this.state.current}
            tabList={this.state.tabList}
            onClick={this.handleClick.bind(this)}
          >
            <AtTabsPane current={this.state.current} index={0}>
              <View style={StyleSheet.box}>
                <Image
                  style={{ width: "240Px", height: "2839Px" }}
                  mode="aspectFit"
                  src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/tool-sh.png"
                />
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View style={StyleSheet.box}>
                <Image
                  style={{ width: "240Px", height: "1821Px" }}
                  mode="aspectFit"
                  src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/tool-sm.png"
                />
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}>
              <View style={StyleSheet.box}>
                <Image
                  style={{ width: "240Px", height: "1680Px" }}
                  mode="aspectFit"
                  src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/tool-wj.png"
                />
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    );
  }
}

const StyleSheet = {
  bg: {
    width: "100vw",
    height: "calc(100% - 85Px)",
    position: "fixed",
    top: "85Px",
    left: "0",
    backgroundColor: "#e8e8e8"
  },
  help: {
    width: "80vw",
    height: "50Px",
    position: "fixed",
    marginLeft: "10vw",
    top: "155PX",
    left: "0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13Px",
    color: "#666",
    lineHeight: "25Px"
  },
  helpBtn: {
    fontSize: "14Px",
    color: "#333",
    padding:"5Px 15Px",
    border: "1px solid #ccc",
    borderRadius: "50Px"
  },
  content: {
    width: "80vw",
    height: "480Px",
    position: "fixed",
    marginLeft: "10vw",
    top: "260PX",
    left: "0"
  },
  box: {
    width: "100%",
    height: "480Px",
    position: "relative",
    overflow: "scroll",
    textAlign: "center"
  }
};

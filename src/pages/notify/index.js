import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import Board from "./Board";
import ChatList from "./ChatList";

export default class Notify extends Component {
  config = {
    navigationBarTitleText: ""
  };

  static defaultProps = {};

  state = {
    current: 0,
    notificationNum: 1,
    messageNum: 2
  };

  propsKeys = [];

  stateKeys = ["current", "notificationNum", "messageNum"];

  // 切换tab
  handleSwitchTab(index) {
    this.setState({
      current: index
    });
  }

  // 未读通知
  handleReadied(num) {
    this.setState({
      notificationNum: this.state.notificationNum - num
    });
  }

  // 未读聊天消息
  handleChatReadied(num) {
    this.setState({
      messageNum: this.state.messageNum - num
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("Notify", nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Notify");
  }

  componentDidUpdate() {
    console.timeEnd("Notify");
  }

  render() {
    const { current, notificationNum, messageNum } = this.state;
    const tabList = [
      { title: "通知" + (notificationNum ? `(${notificationNum})` : "") },
      { title: "私信" + (messageNum ? `(${messageNum})` : "") }
    ];
    return (
      <View style={{ backgroundColor: "whitesmoke", height: "100vh" }}>
        <AtTabs
          current={current}
          tabList={tabList}
          onClick={this.handleSwitchTab.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <Board onNoticeReadied={this.handleReadied.bind(this)} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <ChatList onChatReadied={this.handleChatReadied.bind(this)} />
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

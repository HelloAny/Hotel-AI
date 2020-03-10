import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import * as Server from "../../actions";
import SocketServer from "../../service/SocketServer";
import Board from "./Board";
import ChatList from "./ChatList";

export default class Notify extends Component {
  config = {
    navigationBarTitleText: ""
  };

  static defaultProps = {};

  state = {
    current: 0,
    messageNum: "",
    notificationNum: "",
    unreadList: {}
  };
  boardRefreshFlag = false;
  chatListRefreshFlag = false;

  propsKeys = [];

  stateKeys = ["current", "notificationNum", "messageNum", "unreadList"];

  // 页面数据
  pullData() {
    Server.getNewsNumber()
      .then(res => {
        console.log("未读消息", res);
        this.setState({
          notificationNum: res.sys,
          messageNum: res.private,
          unreadList: res.private_detail
        });
      })
      .catch(err => {
        Taro.showToast({
          title: "网络开小差了...",
          icon: "none",
          duration: 2000
        });
        console.log(err);
      });
  }

  // 切换tab
  handleSwitchTab(index) {
    this.setState({
      current: index
    });
  }

  // 未读通知标为已读数量
  handleReadied(msgId) {
    if (msgId == "all") {
      Server.markedAllNotifyAsRead().then(() => {
        this.setState({
          notificationNum: 0
        });
      });
    } else {
      Server.markedNotifyAsRead(msgId).then(() => {
        this.setState({
          notificationNum: Math.max(this.state.notificationNum - 1, 0)
        });
      });
    }
  }

  // 未读聊天消息标为已读数量
  handleChatReadied(people) {
    let num = this.state.unreadList[people];
    if (num) {
      this.setState({
        messageNum: Math.max(this.state.messageNum - num, 0)
      });
      this.state.unreadList[people] = 0;
    }
  }

  componentWillMount() {
    this.pullData();
    SocketServer.on("globalMessage", () => {
      this.pullData();
      this.chatListRefreshFlag = !this.chatListRefreshFlag;
    });
    SocketServer.on("notify", () => {
      this.pullData();
    });
  }

  componentDidShow() {
    if (this.state.messageNum !== "") this.pullData();
  }

  onPullDownRefresh() {
    this.pullData();
  }

  componentWillPreload() {
    this.pullData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);

    if (this.state.notificationNum != nextState.notificationNum) {
      this.boardRefreshFlag = !this.boardRefreshFlag;
    }

    return flag;
  }

  componentWillUpdate() {
    console.time("Notify");
  }

  componentDidUpdate() {
    console.timeEnd("Notify");
  }

  render() {
    const { current, notificationNum, messageNum, unreadList } = this.state;
    const tabList = [
      {
        title:
          "通知" +
          (notificationNum
            ? `(${notificationNum > 99 ? "99+" : notificationNum})`
            : "")
      },
      {
        title:
          "私信" +
          (messageNum ? `(${messageNum > 99 ? "99+" : messageNum})` : "")
      }
    ];
    return (
      <View style={{ backgroundColor: "whitesmoke", height: "100vh" }}>
        <AtTabs
          current={current}
          tabList={tabList}
          onClick={this.handleSwitchTab.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <Board
              onNoticeReadied={this.handleReadied.bind(this)}
              refreshFlag={this.boardRefreshFlag}
            />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <ChatList
              onChatReadied={this.handleChatReadied.bind(this)}
              unreadList={unreadList}
              refreshFlag={this.chatListRefreshFlag}
            />
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

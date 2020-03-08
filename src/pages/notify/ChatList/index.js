import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import { AtSearchBar } from "taro-ui";
import * as Server from "../../../actions";
import ChatItem from "./ChatItem";

import "./chat-list.scss";

export default class ChatList extends Component {
  static defaultProps = {
    unreadList: [],
    onChatReadied: () => {}
  };

  state = {
    search: "",
    chatList: []
  };

  propsKeys = [];

  stateKeys = ["search", "chatList"];

  mergeChatInfo(chatList) {
    console.log("私信列表", chatList, "未读列表", this.props.unreadList);
    this.setState({
      chatList: chatList
    });
  }

  // 搜索框输入
  handleSearchInput(v) {
    this.setState({
      search: v
    });
  }

  // 搜索好友
  handleSearchChat() {
    this.setState({
      search: ""
    });
  }

  // 打开某好友聊天界面
  handleOpenChatView(phone) {
    Taro.navigateTo({
      url: "/packageC/pages/IM/index?phone=" + phone
    });
  }

  componentWillMount() {
    Server.getMsgSummaryInfo()
      .then(res => {
        this.mergeChatInfo(res.list);
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

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("ChatList");
  }

  componentDidUpdate() {
    console.timeEnd("ChatList");
  }

  render() {
    return (
      <ScrollView className="list-box">
        <View className="search">
          <AtSearchBar
            actionName="搜一下"
            value={this.state.search}
            onChange={this.handleSearchInput.bind(this)}
            onActionClick={this.handleSearchChat.bind(this)}
          />
        </View>
        <View className="chats-box">
          {this.state.chatList.map(chat => {
            return (
              <ChatItem
                onClick={this.handleOpenChatView.bind(this, chat.username)}
                unreadNum={chat.unreadNum || 0}
                nickName={chat.nickname}
                time={chat.add_time}
                content={chat.content}
              />
            );
          })}
        </View>
        <View className="tip">没有更多内容</View>
      </ScrollView>
    );
  }
}

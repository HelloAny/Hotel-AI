import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import { AtSearchBar } from "taro-ui";
import ChatItem from "./ChatItem";

import "./chat-list.scss";

export default class ChatList extends Component {
  static defaultProps = {
    onChatReadied: () => {}
  };

  state = {
    search: ""
  };

  propsKeys = [];

  stateKeys = ["search"];

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
  handleOpenChatView(index) {
    console.log(index);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag && this.state.search == nextState.search)
      console.log("ChatList", nextProps, nextState);
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
          <ChatItem onClick={this.handleOpenChatView.bind(this, 1)} />
          <ChatItem onClick={this.handleOpenChatView.bind(this, 2)} />
          <ChatItem onClick={this.handleOpenChatView.bind(this, 3)} />
        </View>
        <View className="tip">没有更多内容</View>
      </ScrollView>
    );
  }
}

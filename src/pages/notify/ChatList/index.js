import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import { AtSearchBar } from "taro-ui";
import * as Server from "../../../actions";
import ChatItem from "./ChatItem";

import "./chat-list.scss";

export default class ChatList extends Component {
  static defaultProps = {
    unreadList: {},
    refreshFlag: false,
    onChatReadied: () => {}
  };

  state = {
    search: "",
    chatList: [],
    filter: ""
  };

  propsKeys = ["unreadList", "refreshFlag"];

  stateKeys = ["search", "chatList", "filter"];

  pullData() {
    Server.getMsgSummaryInfo()
      .then(res => {
        console.log("私信列表", res.list, "未读列表", this.props.unreadList);
        this.setState({
          chatList: res.list
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

  // 搜索框输入
  handleSearchInput(v) {
    this.setState({
      search: v
    });
  }

  // 搜索好友
  handleSearchChat() {
    this.setState({
      filter: this.state.search
    });
  }

  //清空搜索
  handleSearchClear() {
    this.setState({
      search: "",
      filter: ""
    });
  }

  // 打开某好友聊天界面
  handleOpenChatView(phone, nickName) {
    this.props.onChatReadied(phone);
    setTimeout(() => {
      Taro.navigateTo({
        url: `/packageC/pages/IM/index?phone=${phone}&nickName=${nickName}`
      });
    }, 300);
  }

  componentWillMount() {
    this.pullData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.refreshFlag != nextProps.refreshFlag) console.log("该刷新啦")
    if (this.props.refreshFlag != nextProps.refreshFlag) this.pullData();
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
    const { chatList, search, filter } = this.state;
    const { unreadList } = this.props;
    return (
      <ScrollView className="list-box">
        <View className="search">
          <AtSearchBar
            actionName="搜一下"
            value={search}
            onChange={this.handleSearchInput.bind(this)}
            onActionClick={this.handleSearchChat.bind(this)}
            onConfirm={this.handleSearchChat.bind(this)}
            onClear={this.handleSearchClear.bind(this)}
          />
        </View>
        <View className="chats-box">
          {chatList.map(chat => {
            return chat.nickname.indexOf(filter || "") != -1 ? (
              <ChatItem
                key={chat.add_time}
                onClick={this.handleOpenChatView.bind(
                  this,
                  chat.username,
                  chat.nickname
                )}
                unreadNum={unreadList[chat.username] || 0}
                nickName={chat.nickname}
                time={chat.add_time}
                content={chat.content}
                phone={chat.username}
              />
            ) : null;
          })}
        </View>
        <View className="tip">没有更多内容</View>
      </ScrollView>
    );
  }
}

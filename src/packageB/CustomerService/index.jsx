import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Input } from "@tarojs/components";
import { AtInput, AtForm } from "taro-ui";
import MessageBox from "./MessageBox/index";

import "./style.css";

export default class CustomerService extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      __clear: false,
      isloading: false,
      isSending: false,
      messagesList: [
        {
          from: "hotl_928139",
          content: "1你好",
          time: 4332432
        },
        {
          from: "hotl_928139",
          content: "2你好",
          time: 32432432
        },
        {
          from: "hotl_928139",
          content: "3你好",
          time: 3242342
        },
        {
          from: "hotl_928139",
          content: "4你好",
          time: 3242342
        },
        {
          from: "hotl_928139",
          content: "5你好",
          time: 324234
        },
        {
          from: "hotel_928139",
          content: "6你好",
          time: 324324
        },
        {
          from: "hotel_928139",
          content: "7你好",
          time: 432432
        },
        {
          from: "hotel_928139",
          content: "8你好",
          time: 23432
        },
        {
          from: "hotl_928139",
          content: "9你好",
          time: 21312
        }
      ]
    };
  }

  handConfirm = e => {
    this.setState({
      __clear: !this.state.__clear,
      isSending: true,
      messagesList: [
        ...this.state.messagesList,
        {
          from: "user",
          content: e.detail.value,
          time: Date.now()
        }
      ]
    });
  };

  handInput(e) {
    return e.detail.value;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.checkMsgBox();
  }

  checkMsgBox() {
    if (this.state.isSending) this.scrollToBottom(300);
    else
      this.setState({
        isSending: false
      });
  }

  render() {
    return (
      <View className="CustomerService">
        <View className="message-list">
          {this.state.messagesList.map(msg => {
            return <MessageBox message={msg} />;
          })}
        </View>
        <View className="inputBox">
          {this.state.__clear ? (
            <Input
              className="input"
              focus={this.state.messagesList.length < 5}
              placeholder="输入问题"
              cursorSpacing="10"
              value={this.state.content}
              onInput={this.handInput}
              onConfirm={this.handConfirm}
              confirmType="send"
            />
          ) : (
            <Input
              className="input"
              focus={this.state.messagesList.length < 5}
              placeholder="输入问题"
              cursorSpacing="10"
              value={this.state.content}
              onInput={this.handInput}
              onConfirm={this.handConfirm}
              confirmType="send"
            />
          )}
        </View>
      </View>
    );
  }

  scrollToBottom(t) {
    let time = t || 0;
    const query = wx.createSelectorQuery();
    query.select(".message-list");
    query.selectViewport().scrollOffset();
    query.exec(function(res) {
      wx.pageScrollTo({
        scrollTop: res[0].scrollHeight,
        duration: time,
        selector: ".message-list"
      });
    });
  }
}

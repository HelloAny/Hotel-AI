import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import * as Server from "../../service/api";
import { scroll, dateFormat } from "../../utils/index";
import MessageBox from "./MessageBox/index";
import QuickMenu from "./QuickMenu/index";
import InputBox from "./InputBox/index";
import Message from "./message";
import "./customer-service.css";

export default class CustomerService extends Component {
  touch = null;
  changeTouch = null;
  scrollOffset = null;
  isloading = false;
  messagesDB = [];
  constructor() {
    super(...arguments);
    this.state = {
      uid: 2222,
      isTuringRobot: true,
      isSending: true, //初始化拉取消息列表，初始sending状态
      messagesList: []
    };
  }

  handleConfirm = (msgs, type) => {
    if(!type || type === "TEMP")
    this.setState({
      isSending: true,
      messagesList: [...this.state.messagesList, ...msgs]
    });
    if (!type || type === "ORG") this.sendMsg(msgs);
  };

  handleTouchStart = e => {
    this.touch = e.touches[0];
  };

  handleTouchEnd = e => {
    this.changeTouch = e.changedTouches[0];
    if (this.touch) {
      let offset =
        this.changeTouch.pageY -
        this.touch.pageY -
        (this.changeTouch.clientY - this.touch.clientY);
      if (offset <= 0 && offset > -5) {
        const query = Taro.createSelectorQuery();
        query.select(".cs-message-list");
        query.selectViewport().scrollOffset();
        query.exec(res => {
          this.scrollOffset = res[0];
          if (res[0].scrollTop === 0) {
            Taro.showLoading({
              title: "正在加载消息"
            });
            this.loadMsgs();
            setTimeout(() => {
              Taro.hideLoading();
            }, 1000);
          }
        });
      }
    }
  };

  getTipTime(time) {
    let date = new Date(time);
    return dateFormat("HH:MM", time);
  }

  loadMsgs() {
    let list = [];
    let data = this.messagesDB.splice(-25);
    let limitTime = null;

    // 判空
    if (data.length == 0) {
      return Taro.showToast({ title: "没有更多消息了", icon: "none" });
    } else {
      limitTime = data[data.length - 1].date;
    }

    // 消息穿插时间
    for (let i = data.length - 1; i > -1; i--) {
      const msg = data.pop();
      if (limitTime - msg.date > 10 * 60 * 1000) {
        list.unshift(new Message("SYSTEM", this.getTipTime(limitTime)));
      }
      limitTime = msg.date;
      list.unshift(msg);
    }

    // 追加邻近消息
    while (
      list.length < 50 &&
      this.messagesDB.length !== 0 &&
      limitTime - this.messagesDB[this.messagesDB.length - 1].date <
        10 * 60 * 1000
    ) {
      list.unshift(this.messagesDB.pop());
    }

    //收尾工作
    limitTime = list[0].date;
    list.unshift(new Message("SYSTEM", this.getTipTime(limitTime)));
    this.isloading = true;
    this.setState({
      messagesList: list.concat(this.state.messagesList)
    });
  }

  sendMsg(msgs) {
    msgs.forEach(msg => {
      if (this.state.isTuringRobot)
        Server.getAutoResponse({
          uid: this.state.uid,
          content: msg.content || ""
        }).then(resMsg => {
          this.setState({
            isSending: true,
            messagesList: [
              ...this.state.messagesList,
              new Message().msgFromRobot(resMsg)
            ]
          });
        });
      else {
        // 发送给人工客服
      }
    });
  }

  restoreScroll() {
    if (!this.scrollOffset) return;
    const query = Taro.createSelectorQuery();
    query.select(".cs-message-list");
    query.selectViewport().scrollOffset();
    query.exec(res => {
      Taro.pageScrollTo({
        scrollTop: Math.abs(
          res[0].scrollHeight - this.scrollOffset.scrollHeight - 90
        ),
        duration: 0,
        selector: ".cs-message-list"
      });
    });
    this.isloading = false;
  }

  checkMsgBox() {
    if (this.state.isSending) {
      this.scrollToBottom(300);
      return this.setState({
        isSending: false
      });
    }
  }

  componentWillMount() {
    let uid = 2222;
    Taro.showLoading({
      title: "loading",
      mask: true
    });
    Server.getMegList({ uid }).then(res => {
      this.messagesDB = res.map(msg => {
        return new Message(...Object.values(msg));
      });
      this.loadMsgs();
      Taro.hideLoading();
    });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    if (this.isloading && !this.state.isSending) this.restoreScroll();
    this.checkMsgBox();
  }

  render() {
    return (
      <View className="CustomerService">
        <View
          className="cs-message-list"
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
        >
          {this.state.messagesList.map(msg => {
            return <MessageBox message={msg} />;
          })}
        </View>
        <View className="cs-quickmenu-box">
          <QuickMenu menuList={this.state.menuList} />
        </View>
        <View>
          <InputBox onConfirm={this.handleConfirm} />
        </View>
      </View>
    );
  }

  scrollToBottom(t) {
    scroll(".cs-message-list", "bottom", t);
  }
}

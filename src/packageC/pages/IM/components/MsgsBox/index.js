import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Text } from "@tarojs/components";
import { Message, MessageDB } from "../../message";
import TextMsg from "./Text";
import TimeMsg from "./Time";
import EmojiMsg from "./Emoji";
import VoiceMsg from "./Voice";
import ImageMsg from "./Image";

import "../../assets/style/msgsbox.scss";

export default class MsgsBox extends Component {
  static options = {
    addGlobalClass: true
  };

  props = {
    scrollOffset: 0,
    roomName: "",
    refresh: false,
    breakBug: false
  };

  state = {
    scrollTop: 100860,
    messageList: [],
    scrollIntoView: "",
    scrollToBottom: false,
    isloading: false,
    scrollWithAnimation: true
  };

  // 从MessageDB获取的房间实例
  room = null;
  start = 0;
  end = 0;
  _start = 0;
  _end = 0;

  propsKeys = ["breakBug", "scrollOffset", "roomName", "refresh"];

  stateKeys = ["scrollTop", "messageList", "scrollIntoView"];

  //应对css动画延迟问题
  _scrollTop = 100860;
  _oldOffset = 0;
  _newOffset = 0;
  _scrolling = 100860;
  _maxScroll = 0;

  constructor(props) {
    super();
    this.newScrollOffset = props.scrollOffset;
  }

  // 查询滚动条
  _scrollQuery(fn) {
    return new Promise((resolve, reject) => {
      let query = Taro.createSelectorQuery();
      if (process.env.TARO_ENV === "h5") {
        query = Taro.createSelectorQuery().in(this);
      } else {
        query = Taro.createSelectorQuery().in(this.$scope);
      }
      query
        .select(".msgsbox")
        .fields(
          {
            scrollOffset: true,
            size: true
          },
          res => {
            resolve(res);
          }
        )
        .exec();
    });
  }

  // 必须在css过渡动画结束之后执行！！
  // 底部输入区域高度变化
  _checkScroll() {
    setTimeout(() => {
      if (this._newOffset != this._oldOffset) {
        let scrollTop = this._scrolling + this._newOffset - this._oldOffset;
        this.setState({
          scrollTop
        });
        this._oldOffset = this._newOffset;
      }
    }, 250);
  }

  // 加载消息滚动条设置
  _checkLoading() {
    if (this.state.isloading) {
      this._scrollQuery().then(res => {
        // 隐藏loading
        setTimeout(() => {
          Taro.hideLoading();
        }, 1000);
        // 加载消息时保持滚动位置, 开启滚动动画
        let scroll = res.scrollHeight - this._maxScroll - 20;
        this._maxScroll = res.scrollHeight;
        this.setState({
          scrollTop: scroll,
          isloading: false,
          scrollWithAnimation: true
        });
      });
    }
  }

  // 发送消息设置滚动条
  _checkSending() {
    // 本人发送消息滚动到底部 或 正在底部时接收消息，滚动到底部
    if (this.state.scrollToBottom) {
      // 规避动画问题
      setTimeout(() => {
        this.setState({
          scrollTop: Math.random() * 10086 + 100860,
          scrollToBottom: false
        });
      }, 250);
    }
  }

  // 获取渲染中的消息列表最旧消息对应index
  _getStartIndex(list) {
    let uuid = "";
    let msg = list[1];
    if (msg) uuid = msg.uuid.toString();
    else return 0;
    for (let i = this.start; i > -1; i--) {
      const uid = this.room.messageList[i];
      if (uid == uuid) return i;
    }
    return 0;
  }

  // 房间id更新将重置房间
  _checkUpdate(nextProps) {
    if (
      nextProps.breakBug != this.props.breakBug ||
      nextProps.roomName != this.props.roomName
    ) {
      this.init(nextProps.roomName);
    }
  }

  init(rn) {
    let roomName = rn || this.props.roomName;
    if (!roomName) return;
    this.room = MessageDB.getRoom(roomName);
    this.room.onPush = this.handlePush.bind(this);
    this.end = this._end = this.room.getMsgAmount();
    this.start = this._start = Math.max(0, this.room.getMsgAmount() - 15);
    this.getMessageList();
  }

  // 根据起始和终止下标追加消息
  getMessageList() {
    let olderList = [];
    let newerList = [];
    if (this.state.messageList.length == 0)
      newerList = this.room.getMessage(this.start, this.end, true, true);
    if (this.end > this._end) {
      newerList = this.room.getMessage(this._end, this.end, true, true);
      this._end = this.end;
    }
    if (this.start < this._start) {
      olderList = this.room.getMessage(this.start, this._start, true, true);
    }
    let list = olderList.concat(this.state.messageList, newerList);
    this._start = this.start = this._getStartIndex(list);
    this.setState({
      messageList: list
    });
  }

  // 加载更多，滚动动画
  loadMore() {
    this._scrollQuery().then(res => {
      if (this.start != 0) {
        this.start = Math.max(0, this.start - 35);
        this.getMessageList();
        this._maxScroll = res.scrollHeight;
        this.setState({
          isloading: true,
          scrollWithAnimation: false
        });
        Taro.showLoading({
          mask: true,
          title: "加载更多消息..."
        });
      } else {
        if (Math.floor(res.height) < res.scrollHeight - 5)
          Taro.showToast({
            title: "没有更多信息了...",
            icon: "none",
            duration: 2000
          });
      }
    });
  }

  // 监听room最新追加的消息
  handlePush(msgId) {
    this._end = this.end++;
    let endMsg = this.state.messageList[this.state.messageList.length - 1];
    let newMsg = this.room.getMessage(msgId);

    // 插入时间
    if (
      endMsg &&
      newMsg.info.timestamp - endMsg.info.timestamp > 3 * 60 * 1000
    ) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          new Message("TIME", new Date(newMsg.info.timestamp)),
          newMsg
        ]
      });
    } else {
      this.setState({
        messageList: [...this.state.messageList, newMsg]
      });
    }

    // 滚动到底部
    if (
      this._maxScroll - this._scrollTop < 50 ||
      (newMsg.sender && newMsg.sender.uuid == MessageDB.dbInfo.master.uuid)
    ) {
      this.setState({
        scrollToBottom: true
      });
    }
  }

  handleScrollToTop() {
    this.loadMore();
  }

  handleScroll(e) {
    let scrollTop = e.detail.scrollTop;
    this._scrollTop = scrollTop;
    this._maxScroll = Math.max(scrollTop, this._maxScroll);
  }

  componentWillMount() {
    this.init();
  }

  componentDidMount() {
    this._scrollQuery().then(res => {
      setTimeout(() => {
        this.setState({
          scrollTop: res.scrollHeight+10086
        });
      }, 500);
    });
  }

  componentWillReceiveProps(nextProps) {
    this._newOffset = nextProps.scrollOffset;
    this._checkUpdate(nextProps);
    this.props = nextProps
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("MsgsBox", { nextProps, nextState });
    return flag;
  }

  componentWillUpdate() {
    console.time("MsgsBox");
    this._scrolling = this._scrollTop;
  }

  componentDidUpdate() {
    console.timeEnd("MsgsBox");
    this._checkScroll();
    this._checkLoading();
    this._checkSending();
  }

  render() {
    const {
      scrollTop,
      messageList,
      scrollIntoView,
      scrollWithAnimation
    } = this.state;

    return (
      <ScrollView
        className="msgsbox"
        scrollY
        enableBackToTop
        onScrollToUpper={this.handleScrollToTop.bind(this)}
        onScroll={this.handleScroll.bind(this)}
        scrollIntoView={scrollIntoView}
        enableFlex
        scrollWithAnimation={scrollWithAnimation}
        scrollTop={scrollTop}
      >
        {messageList.map((msg, index) => {
          let { sender, description } = msg;
          let uuid = msg.uuid.uuid
          let type = description.type;
          let position = "left";
          if (sender == null) position = "center";
          if (sender && sender.uuid == MessageDB.dbInfo.master.uuid)
            position = "right";
          if (type == "TEXT")
            return (
              <View key={uuid} id={"MsgBox" + index} className={"bubble " + position}>
                <TextMsg position={position} description={description} />
              </View>
            );
          if (type == "TIME")
            return (
              <View key={uuid} id={"MsgBox" + index} className={"bubble " + position}>
                <TimeMsg description={description} />
              </View>
            );
          if (type == "EMOJI")
            return (
              <View key={uuid} id={"MsgBox" + index} className={"bubble " + position}>
                <ImageMsg description={description} />
              </View>
            );
          if (type == "IMAGE")
            return (
              <View key={uuid} id={"MsgBox" + index} className={"bubble " + position}>
                <ImageMsg description={description} />
              </View>
            );
          if (type == "VOICE")
            return (
              <View key={uuid} id={"MsgBox" + index} className={"bubble " + position}>
                <VoiceMsg description={description} position={position} />
              </View>
            );
        })}
      </ScrollView>
    );
  }
}

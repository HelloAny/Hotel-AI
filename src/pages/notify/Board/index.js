import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Ico } from "../../../components/Ico";
import { FriendPlus, Visit, Invitation, System, BoardItem } from "./cmps";
import { isJson } from "../../../utils";
import * as Server from "../../../actions";

import "./assets/style/board.scss";

export default class Board extends Component {
  static defaultProps = {
    onNoticeReadied: () => {},
    refreshFlag: false
  };

  state = {
    notifyList: []
  };

  propsKeys = ["refreshFlag"];

  stateKeys = ["notifyList"];

  pullData() {
    Server.getNotifyList()
      .then(res => {
        console.log("通知列表", res);
        this.setState({
          notifyList: res.map(notify => {
            notify.extra = isJson(notify.extra)
              ? JSON.parse(notify.extra)
              : notify.extra;
            return notify;
          })
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

  // 标记已读
  handleClick(index) {
    if (index == "all") this.props.onNoticeReadied(index);
    for (const notify of this.state.notifyList) {
      if (notify.msg_id == index) {
        if (!notify.status) {
          notify.status = true;
          this.props.onNoticeReadied(index);
        }
        return;
      }
    }
  }

  componentWillMount() {
    this.pullData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.refreshFlag != nextProps.refreshFlag) this.pullData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("Board", nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Board");
  }

  componentDidUpdate() {
    console.timeEnd("Board");
  }

  render() {
    return (
      <View className="board-container">
        <View className="head">
          <Text className="title">通知列表</Text>
          <View onClick={this.handleClick.bind(this, "all")}>
            <Text className="title">全部已读 </Text>
            <Ico value="icon-sign-readied" />
          </View>
        </View>
        <View className="list">
          {this.state.notifyList.map(notify => {
            if (notify.type == "system") {
              return (
                <BoardItem
                  onClick={this.handleClick.bind(this, notify.msg_id)}
                  mark={!notify.status}
                  imgUrl={
                    "https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/notify/%E9%85%92%E5%BA%97.png"
                  }
                >
                  <System notify={notify} />
                </BoardItem>
              );
            }
            if (notify.type == "visit") {
              return (
                <BoardItem
                  onClick={this.handleClick.bind(this, notify.msg_id)}
                  imgUrl={
                    notify.extra.phone
                      ? "https://hotel.lcworkroom.cn/api/pic/get/users/?name=" +
                        notify.extra.phone
                      : "https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/notify/%E9%80%9A%E7%9F%A5.png"
                  }
                  mark={!notify.status}
                >
                  <Visit notify={notify} />
                </BoardItem>
              );
            }
            if (notify.type == "invite") {
              return (
                <BoardItem
                  onClick={this.handleClick.bind(this, notify.msg_id)}
                  imgUrl={
                    "https://hotel.lcworkroom.cn/api/pic/get/users/?name=" +
                    notify.extra.phone
                  }
                  mark={!notify.status}
                >
                  <Invitation notify={notify} />
                </BoardItem>
              );
            }
          })}
        </View>
        <View className="tip">没有更多内容</View>
      </View>
    );
  }
}

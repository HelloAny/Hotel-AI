import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Ico } from "../../../components/Ico";
import { FriendPlus, Visit, Invitation, BoardItem } from "./cmps";
import * as Server from "../../../actions";

import "./assets/style/board.scss";

const TYPES = [
  "INVITATION_RECEIVE",
  "INVITATION_ACCEPT",
  "INVITATION_REFUSE",
  "VISIT_RECEIVE",
  "VISIT_ACCEPT",
  "VISIT_REFUSE"
];

export default class Board extends Component {
  static defaultProps = {
    onNoticeReadied: () => {}
  };

  state = {
    notifyList: []
  };

  propsKeys = [];

  stateKeys = [];

  handleClick(index) {
    this.props.onNoticeReadied(1);
    Taro.navigateTo({
      url: "/packageC/pages/receipt/index?visitId=1&type=visit"
    });
  }

  componentWillMount() {
    Server.getNotifyList()
      .then(res => {
        console.log("通知列表",res);
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
          <View>
            <Text className="title">全部已读 </Text>
            <Ico value="icon-sign-readied" />
          </View>
        </View>
        <View className="list">
          <BoardItem onClick={this.handleClick.bind(this, 1)} mark>
            <FriendPlus />
          </BoardItem>
          <BoardItem onClick={this.handleClick.bind(this, 2)} mark>
            <Visit />
          </BoardItem>
          <BoardItem onClick={this.handleClick.bind(this, 3)} mark>
            <Invitation />
          </BoardItem>
        </View>
        <View className="tip">没有更多内容</View>
      </View>
    );
  }
}

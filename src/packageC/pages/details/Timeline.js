import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { dateFormat } from "../../../utils";

import "../../assets/style/details-timeline.scss";

export default class Timeline extends Component {
  static defaultProps = {
    timeline: [],
    id: "",
    endTime: "",
  };

  state = {
    packUp: {
      time1: "",
      time2: "",
      index: -1,
    },
    list: [],
    startTime: "",
  };

  propsKeys = ["timeline"];

  stateKeys = ["list", "packUp"];

  _getDayDiff(d1, d2) {
    d1 -= 16 * 1000 * 60 * 60;
    d2 -= 16 * 1000 * 60 * 60;
    d1 = Math.floor(d1 / 24 / 60 / 60 / 1000);
    d2 = Math.floor(d2 / 24 / 60 / 60 / 1000);
    return d2 - d1;
  }

  initState(timeline, endTime) {
    let packUp = { time1: "", time2: "", index: 0 };
    let oldTime = timeline[0].time;
    let now = Date.now() > endTime ? endTime : Date.now() - 24 * 60 * 60 * 1000;
    packUp.index = this._getDayDiff(oldTime, now);
    packUp.time1 = dateFormat("mm月dd日", oldTime);
    packUp.time2 = dateFormat("mm月dd日", now);

    let list = new Array(this._getDayDiff(oldTime, endTime)).fill("");
    timeline.forEach((t, index) => {
      if (!list[index]) list[index] = new Array();
      list[index].push(t);
    });

    this.setState({
      list,
      packUp,
      startTime: oldTime,
    });
  }

  handleAddNote() {}

  handleUpdateNote() {}

  handleOpenTimeline() {
    this.setState({
      packUp: {
        time1: "",
        time2: "",
        index: -1,
      },
    });
  }

  componentDidMount() {
    if (this.props.timeline.length != 0)
      this.initState(this.props.timeline, this.props.endTime);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillReceiveProps(props) {
    if (props.timeline.length != 0)
      this.initState(props.timeline, props.endTime);
  }

  componentWillUpdate() {
    console.time("Timeline");
  }

  componentDidUpdate() {
    console.timeEnd("Timeline");
  }

  render() {
    const { packUp, list, startTime } = this.state;
    return (
      <View className="tml-container">
        {packUp.index == -1 ? null : (
          <View className="row">
            <View className="head">
              <View className="before-title">···</View>
              <Text className="tip">
                已收起{packUp.time1} - {packUp.time2}的行程
              </Text>
              <Text
                className="tip-btn"
                onClick={this.handleOpenTimeline.bind(this)}
              >
                展开
              </Text>
            </View>
          </View>
        )}
        {list.map((e, index) => (
          <View
            taroKey={index}
            style={{ display: index <= packUp.index ? "none" : "block" }}
            className="row"
          >
            <View className="head">
              <View className="before-title">D{index + 1}</View>
              <Text className="time">
                {dateFormat(
                  "mm月dd日 周w",
                  startTime + index * 24 * 60 * 60 * 1000
                )}
              </Text>
            </View>
            <View className="main">
              {e
                ? e.map((v) => (
                    <View key={v.time}>
                      <View
                        style={{
                          display: v.type == "process" ? "block" : "none",
                        }}
                        className="process"
                      >
                        {dateFormat("HH:MM", v.time) + " " + v.content}
                      </View>
                      <View className="memo">
                        <View className="icon">
                          <View className="adjust">
                            <AtIcon size="12" value="edit" />
                          </View>
                        </View>
                        <View className="name">备忘</View>
                        <View className="content">aaaaa啊啊啊啊啊啊啊啊</View>
                        <View
                          className="memo-btn"
                          onClick={this.handleUpdateNote.bind(this, index)}
                        >
                          <Text className="value">修改备忘</Text>
                        </View>
                      </View>
                    </View>
                  ))
                : null}
              <Button
                className="add-memo"
                onClick={this.handleAddNote.bind(this, index)}
              >
                + 添加备忘
              </Button>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

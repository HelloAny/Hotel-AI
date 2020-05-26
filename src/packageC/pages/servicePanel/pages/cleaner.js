import Taro, { Component } from "@tarojs/taro";
import { View, Image, Picker, Text } from "@tarojs/components";
import { Navbar } from "../../../../components/Navbar";

export default class Vip extends Component {
  config = {
    navigationStyle: "custom"
  };
  static defaultProps = {};

  state = {
    dateList: ["今天", "明天", "后天"],
    date: "0",
    time1: "00:00",
    time2: "00:00"
  };

  propsKeys = [];

  stateKeys = ["date", "time1", "time2"];

  handleStopPropagation(e) {
    e.stopPropagation();
  }

  handleChooseDate(e) {
    this.setState({
      date: e.detail.value
    });
  }

  handleChooseTime1(e) {
    this.setState({
      time1: e.detail.value
    });
  }

  handleChooseTime2(e) {
    this.setState({
      time2: e.detail.value
    });
  }

  handleConfirm() {
    Taro.showModal({
      title: "操作成功",
      content: "正在为您安排保洁人员，请等待！"
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Vip");
  }

  componentDidUpdate() {
    console.timeEnd("Vip");
  }

  render() {
    const { date, time1, time2, dateList } = this.state;
    return (
      <View onClick={this.handleConfirm.bind(this)} style="padding-top:85Px">
        <Navbar color="white" />
        <Image
          style={{ width: "100vw", height: "730Px" }}
          mode="aspectFit"
          src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/servicePanel/psGroup/cleaner.png"
        />
        <View
          style={styleSheet.pickerBox}
          onClick={this.handleStopPropagation.bind(this)}
        >
          <View style={styleSheet.picker}>
            <Picker
              mode="selector"
              range={dateList}
              rangeKey="0"
              onChange={this.handleChooseDate.bind(this)}
            >
              <Text style={styleSheet.time}>{dateList[date]}: </Text>
            </Picker>
            <Picker mode="time" onChange={this.handleChooseTime1.bind(this)}>
              <Text style={styleSheet.time}>{time1}</Text>
            </Picker>
            <Text> - </Text>
            <Picker mode="time" onChange={this.handleChooseTime2.bind(this)}>
              <Text style={styleSheet.time}>{time2}</Text>
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}

const styleSheet = {
  pickerBox: {
    position: "absolute",
    width: "100vw",
    top: "435Px",
    display: "flex",
    justifyContent: "center",
    color: "#333"
  },
  picker: {
    width: "300Px",
    height: "40Px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    border: "1Px solid #DCDFE6",
    borderRadius: "8Px"
  },
  time: {
    margin: "10Px"
  }
};

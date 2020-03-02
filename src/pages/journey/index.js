import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import Server from "../../actions/api";
import NavBar from "../../components/Navbar";
import { NoticeItem, OverviewItem, RecmdItem } from "./cmps";
import { dateFormat } from "../../utils";

import "./style/journey.scss";

export default class Journey extends Component {
  config = {
    navigationStyle: "custom"
  };

  static defaultProps = {};

  state = {
    ambitus: [],
    records: [],
    ongoing: []
  };

  propsKeys = [];

  stateKeys = ["ambitus", "records"];

  initState(data) {
    const { ambitus, records } = data;

    this.setState({
      ambitus: ambitus.map(ambit => {
        ambit.tab2 = ["经典打卡"];
        if (ambit.tabs.length > 1) ambit.tab2.push(ambit.tabs.pop());
        ambit.tab1 = ambit.tabs;
        return ambit;
      }),
      ongoing: records
        .map(record => {
          if (record.status == "booking" || record.status == "checkin") {
            let task = {};
            task.id = record.id;
            task.name = record.name;
            task.time1 = dateFormat("YYYY.mm.dd", record.check_in_time);
            task.time2 = dateFormat("YYYY.mm.dd", record.check_out_time);
            let imgs = record.imgs.horizontal;
            task.img = imgs[Math.floor(Math.random() * imgs.length)];
            return task;
          }
        })
        .filter(v => v !== undefined),
      records: records.map(record => {
        record.time1 = dateFormat("YYYY.mm.dd", record.check_in_time);
        record.time2 = dateFormat("YYYY.mm.dd", record.check_out_time);
        switch (record.status) {
          case "booking":
            record.status = "预定中";
            break;
          case "checkin":
            record.status = "入住中";
            break;
          case "checkout":
            record.status = "行程结束";
            break;
          case "out_back":
            record.status = "已退订";
            break;
        }
        let imgs = record.imgs.Upright;
        record.img = imgs[Math.floor(Math.random() * imgs.length)];
        return record;
      })
    });
  }

  handleAddJourney() {
    setTimeout(() => {
      Taro.navigateTo({
        url: "/packageC/pages/addTrip/index"
      });
    }, 200);
  }

  handleGoToDetails(id) {
    Taro.navigateTo({
      url: "/packageC/pages/details/index?id=" + id
    });
  }

  componentWillMount() {
    Taro.showLoading({
      title: "loading"
    });
    Server.getJourneyList({
      uid: "4"
    })
      .then(res => {
        Taro.hideLoading();
        if (res.code == 200) {
          this.initState(res);
        } else {
          Taro.showToast({
            title: "网络开小差了...",
            icon: "none",
            duration: 2000
          });
        }
      })
      .catch(err => {
        Taro.hideLoading();
        Taro.showToast({
          title: "网络开小差了...",
          icon: "none",
          duration: 2000
        });
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Journey");
  }

  componentDidUpdate() {
    console.timeEnd("Journey");
  }
  render() {
    const { ambitus, records, ongoing } = this.state;
    return (
      <View className="container">
        <NavBar color="white" />
        <View className="header">
          <View className="bg-container">
            <Image
              src="https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/journeyBg.jpg"
              className="bg"
            />
          </View>
          <View className="ad">
            <Text className="ad-title">选择智慧酒店，让旅途更省心</Text>
            <View onClick={this.handleAddJourney.bind(this)} className="ad-btn">
              + 添加行程
            </View>
            <Text className="ad-sub-title">拜访好友，加入同行</Text>
          </View>
        </View>
        <View className="notice">
          <Text className="title">行程动态</Text>
          {ongoing.map(o => (
            <NoticeItem
              info={o}
              onClick={this.handleGoToDetails.bind(this, o.id)}
            />
          ))}
        </View>
        <View className="overview">
          <Text className="title">我的行程</Text>
          <View className="overview-box">
            {records.map(r => (
              <View className="overview-container">
                <OverviewItem
                  info={r}
                  onClick={this.handleGoToDetails.bind(this, r.id)}
                />
              </View>
            ))}
          </View>
        </View>
        <View className="recommend">
          <Text className="title">周边精彩</Text>
          {ambitus.map(a => (
            <View className="recommend-container">
              <RecmdItem info={a} />
            </View>
          ))}
        </View>
      </View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { inject, observer } from "@tarojs/mobx";
import { View, Image, Text } from "@tarojs/components";
import * as Server from "../../actions";
import { userStore } from "../../store";
import { NoticeItem, OverviewItem, RecmdItem } from "./cmps";
import { dateFormat } from "../../utils";

import "./style/journey.scss";

@inject("userStore")
class Journey extends Component {
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

  stateKeys = ["ambitus", "records", "ongoing"];

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
          if (
            record.status == "booking" ||
            record.status == "checkin" ||
            (record.type == "visit" && record.end_time > Date.now())
          ) {
            let task = {};
            task.id = record.id;
            task.name = record.name || "访问" + record.hotel;
            task.time1 = dateFormat(
              "YYYY.mm.dd",
              record.check_in_time || record.start_time
            );
            task.time2 = dateFormat(
              "YYYY.mm.dd",
              record.check_out_time || record.end_time
            );
            let imgs = record.imgs.horizontal;
            task.img = imgs[Math.floor(Math.random() * imgs.length)];
            task.type = record.type;
            task.status = record.status;
            task.hotel_id =
              record.type == "host" ? record.id : record.guest_room_id;
            switch (record.status) {
              case "booking":
                task.des = "查看";
                break;
              case "checkin":
                task.des = "查看";
                break;
              case "waiting":
                task.des = "等待回复";
                break;
              case "accept":
                task.des = "已接受";
                break;
              case "refuse":
                task.des = "已拒绝";
                break;
            }
            return task;
          }
        })
        .filter(v => v !== undefined),
      records: records.map(record => {
        record.time1 = dateFormat(
          "YYYY.mm.dd",
          record.check_in_time || record.start_time
        );
        record.time2 = dateFormat(
          "YYYY.mm.dd",
          record.check_out_time || record.end_time
        );
        record.name = record.name || "访问" + record.hotel;
        record.hotel_id =
          record.type == "host" ? record.id : record.guest_room_id;
        switch (record.status) {
          case "booking":
            record.des = "预定中";
            break;
          case "checkin":
            record.des = "入住中";
            break;
          case "checkout":
            record.des = "行程结束";
            break;
          case "out_back":
            record.des = "已退订";
          case "waiting":
            record.des = "等待";
            break;
          case "accept":
            record.des = "已接受";
            break;
          case "refuse":
            record.des = "已拒绝";
            break;
        }
        let imgs = record.imgs.Upright;
        record.img = imgs[Math.floor(Math.random() * imgs.length)];
        return record;
      })
    });
  }

  pullDate() {
    Taro.showLoading({
      title: "loading"
    });
    Server.getJourneyList({
      uid: userStore.user.id
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

  handleAddJourney() {
    setTimeout(() => {
      Taro.navigateTo({
        url: "/packageC/pages/addTrip/chose"
      });
    }, 200);
  }

  handleGoToDetails(id, type = "host", status) {
    if (type == "visit" && status != "accept") {
      return Taro.showToast({
        title: "暂时无法查看哦",
        icon: "none",
        duration: 2000
      });
    }
    Taro.navigateTo({
      url: "/packageC/pages/details/index?id=" + id
    });
  }

  componentWillMount() {
    if (!!Taro.getStorageSync("userInfo")) this.pullDate();
    else {
      Taro.navigateTo({
        url: "/packageA/login/login"
      });
    }
  }

  onPullDownRefresh() {
    this.pullDate();
  }

  componentDidShow() {
    if (this.state.ambitus.length != 0) this.pullDate();
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
      <View className="jur-container">
        <View className="header">
          <View className="bg-container">
            <Image
              src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/journey/journeyBg.jpg"
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
              key={o.hotel_id}
              info={o}
              onClick={this.handleGoToDetails.bind(
                this,
                o.hotel_id,
                o.type,
                o.status
              )}
            />
          ))}
        </View>
        <View className="overview">
          <Text className="title">我的行程</Text>
          <View className="overview-box">
            {records.map(r => (
              <View className="overview-container">
                <OverviewItem
                  key={r.hotel_id}
                  info={r}
                  onClick={this.handleGoToDetails.bind(
                    this,
                    r.hotel_id,
                    r.type,
                    r.status
                  )}
                />
              </View>
            ))}
          </View>
        </View>
        <View className="recommend">
          <Text className="title">周边精彩</Text>
          {ambitus.map((a, index) => (
            <View taroKey={index} className="recommend-container">
              <RecmdItem info={a} />
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default Journey;

import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import Server from "../../../actions/api";
import { dateFormat } from "../../../utils";
import NavBar from "../../../components/Navbar";
import Timeline from "./Timeline";

import "../../assets/style/details.scss";

export default class Details extends Component {
  config = {
    navigationStyle: "custom"
  };
  static defaultProps = {};

  state = {
    timeline: [],
    address: "火星",
    time1: "",
    time2: "",
    content: "",
    hotel: "",
    imgs: [],
    name: "",
    id: "",
    room: "",
    introClass: "more",
    timelineEndTime: Date.now()
  };

  _getDayDiff(d1, d2) {
    d1 -= 16 * 1000 * 60 * 60;
    d2 -= 16 * 1000 * 60 * 60;
    d1 = Math.floor(d1 / 24 / 60 / 60 / 1000);
    d2 = Math.floor(d2 / 24 / 60 / 60 / 1000);
    return d2 - d1;
  }

  initState(data) {
    const {
      address,
      check_in_time,
      check_out_time,
      content,
      hotel,
      imgs,
      name,
      order_time,
      journey_id,
      out_back_time,
      room,
      status
    } = data;
    this.setState({
      timelineEndTime: check_out_time,
      address,
      time1: dateFormat("mm月dd日", check_in_time),
      time2: dateFormat("mm月dd日", check_out_time),
      content,
      hotel,
      imgs: imgs.horizontal,
      name,
      id: journey_id,
      room,
      status
    });

    let flagTime = order_time;
    this.initTimeline(status, {
      outTime: check_out_time,
      outDay: this._getDayDiff(flagTime, check_out_time),
      inTime: check_in_time,
      inDay: this._getDayDiff(flagTime, check_in_time),
      orderTime: order_time,
      orderDay: 0,
      orderBackTime: out_back_time,
      orderBackDay: this._getDayDiff(flagTime, out_back_time)
    });
  }

  initTimeline(status, timer) {
    let timeline = [];

    switch (status) {
      case "checkout":
        timeline[timer.outDay] = {
          type: "process",
          time: timer.outTime,
          content: "完成退房"
        };
      case "checkin":
        timeline[timer.inDay] = {
          type: "process",
          time: timer.inTime,
          content: "入住酒店"
        };
      case "out_back":
        if (status == "out_back") {
          timeline[timer.orderBackDay] = {
            type: "process",
            time: timer.orderBackTime,
            content: "成功退订"
          };
        }
      case "booking":
        timeline[0] = {
          type: "process",
          time: timer.orderTime,
          content: "成功预订"
        };
        break;
    }

    this.setState({
      timeline
    });
  }

  // 展开介绍
  handleIntroControl() {
    this.setState({
      introClass: this.state.introClass == "more" ? "fewer" : "more"
    });
  }

  // 进入同行者
  handleNavToTraveler() {
    const { id } = this.$router.params;
    Taro.navigateTo({
      url: "/packageC/pages/traveler/index?id=" + id
    });
  }

  // 打开拓展
  handleSpreadExpansion() {
    console.log("handleSpreadExpansion");
  }

  componentDidMount() {
    const { id } = this.$router.params;
    if (!id) return;

    Taro.showLoading({
      title: "loading"
    });
    Server.getJourneyDetails({
      journey_id: id
    })
      .then(res => {
        Taro.hideLoading();
        if (res.code == 200) {
          this.initState(res.journey_info);
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

  componentWillPreload() {
    const { id } = this.$router.params;
    if (!id) return;
    Taro.showLoading({
      title: "loading"
    });
    Server.getJourneyDetails({
      journey_id: id
    })
      .then(res => {
        Taro.hideLoading();
        if (res.code == 200) {
          this.initState(res.journey_info);
        } else {
          Taro.showToast({
            title: "网络开小差了...",
            icon: "none",
            duration: 2000
          });
        }
      })
      .catch(err => {
        console.log(err);
        Taro.hideLoading();
        Taro.showToast({
          title: "网络开小差了...",
          icon: "none",
          duration: 2000
        });
      });
  }

  componentWillUpdate() {
    console.time("Details");
  }

  componentDidUpdate() {
    console.timeEnd("Details");
  }

  render() {
    const {
      timeline,
      timelineEndTime,
      address,
      time1,
      time2,
      content,
      imgs,
      id,
      room,
      name,
      hotel,
      introClass
    } = this.state;

    return (
      <View className="details-container">
        <NavBar color="white" shade />
        <Swiper className="bg-container" autoplay>
          {imgs.map(img => (
            <SwiperItem>
              <Image src={img} className="bg" />
            </SwiperItem>
          ))}
        </Swiper>
        <View className="main">
          <View className="title">
            {name}
            <AtIcon value="edit" />
          </View>
          <View className="time">
            {time1} - {time2}
          </View>
          <View className="address-box">
            <View className="address-text">
              <Text className="address">
                {hotel}
                {room}
              </Text>
              <Text className="address">{address}</Text>
            </View>
            <View className="address-help">
              <AtIcon value="map-pin" />
              地图/导航
            </View>
          </View>
          <Text className="intro-line"></Text>
          <View className="intro">
            {introClass == "more" ? content.substr(0, 130) + "..." : content}
            <Text
              onClick={this.handleIntroControl.bind(this)}
              className={"intro-btn " + introClass}
            ></Text>
          </View>
          <View className="timeline">
            <Timeline timeline={timeline} id={id} endTime={timelineEndTime} />
          </View>
        </View>
        <View className="bottomNav">
          <View className="left">
            <AtIcon value="calendar" />
            <Text className="nav-text">我的行程</Text>
          </View>
          <View
            className="center"
            onClick={this.handleSpreadExpansion.bind(this)}
          >
            <Image
              className="btn"
              src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/journey/centerBtn.png"
            />
          </View>
          <View className="right" onClick={this.handleNavToTraveler.bind(this)}>
            <AtIcon value="user" />
            <Text className="nav-text">同行者</Text>
          </View>
        </View>
      </View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View, Text, Picker, Textarea, Image } from "@tarojs/components";
import * as Server from "../../../actions";
import { AtIcon, AtList, AtListItem, AtSearchBar } from "taro-ui";
import { dateFormat } from "../../../utils";

import "../../assets/style/addTrip-form.scss";

import ok from "../../assets/imgs/ok.png";
import error from "../../assets/imgs/error.png";

export default class TripForm extends Component {
  config = {
    navigationBarBackgroundColor: "#67c23a",
    navigationBarTextStyle: "black",
    navigationBarTitleText: "申请访问",
    backgroundColor: "#eeeeee",
    backgroundTextStyle: "light"
  };

  static defaultProps = {};

  state = {
    stepIndex: 0,
    hotelList: [],
    hotelId: "4",
    rooms: [],
    vagueRoomName: "",
    roomId: "",
    beginDate: "",
    beginTime: "13:00",
    endDate: "",
    endTime: "12:00",
    note: "",
    security: true
  };

  propsKeys = [];

  stateKeys = [
    "stepIndex",
    "hotelList",
    "rooms",
    "beginDate",
    "beginTime",
    "endDate",
    "endTime",
    "security"
  ];

  /**
   * 初始化第二步骤酒店列表
   */
  initPage2State(data) {
    this.setState({
      hotelList: data.map(hotel => {
        const { pk: id } = hotel;
        const { imgs, location, name } = hotel.fields;
        return { id, img: imgs.horizontal[0], location, name };
      })
    });
  }

  /**
   * 更新第三步骤房间列表
   */
  updatePage3Rooms(data) {
    this.setState({
      rooms: data.map(room => {
        const { pk: id } = room;
        const { room_type_name: roomType, name, content } = room.fields;
        return { id, roomType, name, content };
      })
    });
  }

  /** 步骤变化校验
   * * 0安全认证失败禁止跳转
   * * 1-2 检验hotelId是否空
   * * 2-3 检验roomId是否空
   * * 3-4 检验beginTime\endTime是否空, 检验是否有效
   * * 5最终确认页
   */
  onStepIndexChange(oldV, newV) {
    switch (oldV + "-" + newV) {
      case "0-1":
        if (!this.state.security) {
          return false;
        }
      case "1-2":
        if (this.state.hotelId) {
          return true;
        } else {
          Taro.showToast({
            title: "请选择酒店",
            icon: "none",
            duration: 2000
          });
          return false;
        }
      case "2-3":
        if (this.state.roomId) {
          return true;
        } else {
          Taro.showToast({
            title: "请选择房间",
            icon: "none",
            duration: 2000
          });
          return false;
        }
      case "3-4":
        let { beginDate, beginTime, endDate, endTime } = this.state;
        if (
          beginDate &&
          endDate &&
          new Date(endDate + " " + endTime).getTime() >
            new Date(beginDate + " " + beginTime).getTime()
        ) {
          return true;
        } else {
          Taro.showToast({
            title: "请选择正确日期",
            icon: "none",
            duration: 2000
          });
          return false;
        }
      default:
        return true;
    }
  }

  // 获取步骤点样式class名
  getClass(step, index) {
    return step == index ? "active" : step > index ? "ok" : "";
  }

  /**
   * 上一个步骤
   * @param {Number} num stepIndex
   * @param {Boolean} noCheck 是否不校验
   */
  handlePreStep(num, noCheck) {
    let index =
      typeof num == "number" ? num : Math.max(0, this.state.stepIndex - 1);
    if (noCheck || this.onStepIndexChange(this.state.stepIndex, index))
      this.setState({
        stepIndex: index
      });
  }

  /**
   * 下一个步骤
   * @param {Number} num pageIndex
   * @param {Boolean} noCheck 是否不校验
   */
  handleNextStep(num, noCheck) {
    let index =
      typeof num == "number" ? num : Math.min(5, this.state.stepIndex + 1);
    if (noCheck || this.onStepIndexChange(this.state.stepIndex, index))
      this.setState({
        stepIndex: index
      });
  }

  // 进入身份验证页
  handleToVerify() {
    console.log(1);
  }

  // 选择酒店 进入酒店房间选择
  handleChooseHotel(id) {
    if (id) {
      this.setState({
        hotelId: id,
        rooms: [],
        roomId: "",
        vagueRoomName: ""
      });
      this.handleNextStep(2, true);
    }
  }

  // 监听房间名字输入
  handleChangeRoomName(v) {
    this.setState({
      vagueRoomName: v
    });
  }

  // 模糊搜索房间
  handleSearchRoom() {
    Taro.showLoading({
      title: "loading"
    });
    Server.getVagueRoomInfo({
      hotel_id: this.state.hotelId,
      inp: this.state.vagueRoomName
    })
      .then(data => {
        this.updatePage3Rooms(data);
      })
      .catch(err => {
        console.log("服务出错啦", err);
        Taro.showToast({
          title: "网络开小差了...",
          icon: "none",
          duration: 2000
        });
      })
      .then(() => Taro.hideLoading());
  }

  // 选择房间
  handleChooseRoom(id) {
    this.setState({
      roomId: id
    });
    this.handleNextStep(3, true);
  }

  // 选择开始日期
  handleChooseBeginDate(e) {
    let date = e.detail.value;
    this.setState({
      beginDate: date
    });
  }

  // 选择开始时间
  handleChooseBeginTime(e) {
    let time = e.detail.value;
    this.setState({
      beginTime: time
    });
  }

  // 选择结束日期
  handleChooseEndDate(e) {
    let date = e.detail.value;
    this.setState({
      endDate: date
    });
  }

  // 选择结束时间
  handleChooseEndTime(e) {
    let time = e.detail.value;
    this.setState({
      endTime: time
    });
  }

  // 提交时间
  handleSubmitTime() {
    this.handleNextStep();
  }

  // 监听备注输入
  handleChangeNote(e) {
    let content = e.detail.value;
    this.setState({
      note: content
    });
  }

  // 确认提交
  handleConfirm() {
    let { roomId, beginDate, beginTime, endDate, endTime, note } = this.state;
    Taro.showLoading({
      title: "loading"
    });
    beginDate = new Date(beginDate + " " + beginTime).getTime();
    endDate = new Date(endDate + " " + endTime).getTime();
    Server.applyVisit({
      uid: 4,
      room_Id: roomId,
      note,
      beginDate,
      endDate
    })
      .then(res => {
        this.handleNextStep();
      })
      .catch(err => {
        console.log("服务出错啦", err);
        Taro.showToast({
          title: "请核对信息是否正确...",
          icon: "none",
          duration: 2000
        });
      })
      .then(() => Taro.hideLoading());
  }

  // 进入行程页
  handleToJourney() {
    setTimeout(() => {
      Taro.navigateTo({
        url: "/packageC/pages/journey/index"
      });
    }, 200);
  }

  // 获取酒店列表
  componentDidMount() {
    Taro.showLoading({
      title: "loading"
    });
    Server.getHotelsList()
      .then(data => {
        this.initPage2State(data);
      })
      .catch(err => {
        console.log("服务出错啦", err);
        Taro.showToast({
          title: "网络开小差了...",
          icon: "none",
          duration: 2000
        });
      })
      .then(() => Taro.hideLoading());
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("TripForm", nextProps, nextState);

    return flag;
  }

  componentWillUpdate() {
    console.time("TripForm");
  }

  componentDidUpdate() {
    console.timeEnd("TripForm");
  }

  render() {
    const {
      stepIndex,
      hotelList,
      vagueRoomName,
      rooms,
      beginDate,
      beginTime,
      endDate,
      endTime,
      security
    } = this.state;
    return (
      <View className="trip-form-container">
        <View className="process-container">
          <View
            className={
              "process-mark " +
              this.getClass(stepIndex, 0) +
              (security ? "" : " error")
            }
          ></View>
          <View
            className={"process-mark " + this.getClass(stepIndex, 1)}
          ></View>
          <View
            className={"process-mark " + this.getClass(stepIndex, 2)}
          ></View>
          <View
            className={"process-mark " + this.getClass(stepIndex, 3)}
          ></View>
          <View
            className={"process-mark " + this.getClass(stepIndex, 4)}
          ></View>
          <View className={"process-mark-last " + this.getClass(stepIndex, 5)}>
            <View className="icon">
              <AtIcon
                style={{ transform: "translate(10Px,10Px)" }}
                value="check"
                size="12"
                color="#67c23a"
              />
            </View>
          </View>
          <View
            className={
              "process-roll " + "p" + stepIndex + (security ? "" : " error")
            }
          ></View>
        </View>
        <View className="btn1" onClick={this.handlePreStep.bind(this)}>
          <AtIcon value="chevron-up" size="28" color="#303133" />
        </View>
        <View className="btn2" onClick={this.handleNextStep.bind(this)}>
          <AtIcon value="chevron-down" size="28" color="#303133" />
        </View>
        {/* 身份认证 */}
        <View className={"form-page " + (stepIndex >= 0 ? "" : "ready")}>
          <View className="identity">
            <View className="icon-box">
              <Image className="icon" src={security ? ok : error} />
            </View>
            <View className="tip-box">
              <Text className="title">
                {security ? "验证成功" : "验证失败"}
              </Text>
              <Text>
                {security
                  ? "身份认证已通过"
                  : "请先完成身份认证开启app所有功能"}
              </Text>
            </View>
            {security ? null : (
              <View
                className="btn-simple"
                onClick={this.handleToVerify.bind(this)}
              >
                前往认证
              </View>
            )}
          </View>
        </View>
        {/* 酒店选择 */}
        <View className={"form-page " + (stepIndex >= 1 ? "" : "ready")}>
          <AtList>
            {hotelList.map(hotel => (
              <AtListItem
                note={hotel.location}
                title={hotel.name}
                thumb={hotel.img}
                arrow="right"
                onClick={this.handleChooseHotel.bind(this, hotel.id)}
              />
            ))}
          </AtList>
        </View>
        {/* 房间选择 */}
        <View className={"form-page " + (stepIndex >= 2 ? "" : "ready")}>
          <AtSearchBar
            placeholder="请输入房间号"
            actionName="搜一下"
            value={vagueRoomName}
            onChange={this.handleChangeRoomName.bind(this)}
            onConfirm={this.handleSearchRoom.bind(this)}
            onActionClick={this.handleSearchRoom.bind(this)}
          />
          <AtList>
            {rooms.map(room => (
              <AtListItem
                note={room.content}
                title={room.name}
                arrow="right"
                extraText={room.roomType}
                iconInfo={{
                  size: 25,
                  color: "#78A4FA",
                  value: "calendar"
                }}
                onClick={this.handleChooseRoom.bind(this, room.id)}
              />
            ))}
          </AtList>
        </View>
        {/* 访问时间 */}
        <View className={"form-page " + (stepIndex >= 3 ? "" : "ready")}>
          <View className="picker-group">
            <View className="label-box">
              <Text className="label">访问日期 :</Text>
              <Text className="label">访问时间 :</Text>
              <Text className="label">结束日期 :</Text>
              <Text className="label">结束时间 :</Text>
            </View>
            <View className="picker-box">
              <Picker
                mode="date"
                start={dateFormat("YYYY-mm-dd", new Date())}
                onChange={this.handleChooseBeginDate}
              >
                <View className="picker"> {beginDate}</View>
              </Picker>
              <Picker
                mode="time"
                value="13:00"
                onChange={this.handleChooseBeginTime}
              >
                <View className="picker"> {beginTime} </View>
              </Picker>
              <Picker
                mode="date"
                start={dateFormat("YYYY-mm-dd", new Date())}
                onChange={this.handleChooseEndDate}
              >
                <View className="picker"> {endDate} </View>
              </Picker>
              <Picker
                mode="time"
                value="12:00"
                onChange={this.handleChooseEndTime}
              >
                <View className="picker"> {endTime}</View>
              </Picker>
            </View>
          </View>
          <View className="tip">
            <Text>Tip: 请填写正确时间范围</Text>
          </View>
          <View className="page-btn" onClick={this.handleSubmitTime.bind(this)}>
            确认时间
          </View>
        </View>
        {/* 访问备注 */}
        <View className={"form-page " + (stepIndex >= 4 ? "" : "ready")}>
          <View className="note-title">备注:</View>
          <View className="note-content">
            <Textarea
              className="note-area"
              autoHeight
              onInput={this.handleChangeNote.bind(this)}
              onConfirm={this.handleConfirm.bind(this)}
            />
          </View>
          <View className="page-btn" onClick={this.handleConfirm.bind(this)}>
            确认提交
          </View>
        </View>
        {/* 最终确认 */}
        <View className={"form-page " + (stepIndex >= 5 ? "" : "ready")}>
          <View className="confirm-box">
            <View className="icon-box">
              <Image className="icon" src={ok} />
            </View>
            <View className="tip-box">
              <Text className="title">发送成功</Text>
              <Text>正在等待您的朋友确认申请请求😄</Text>
            </View>
            <View
              className="btn-simple"
              onClick={this.handleToJourney.bind(this)}
            >
              查看行程
            </View>
          </View>
        </View>
      </View>
    );
  }
}

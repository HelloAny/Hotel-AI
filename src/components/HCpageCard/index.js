import Taro, { Component } from "@tarojs/taro";
import {
  AtButton,
  AtAccordion,
  AtList,
  AtListItem,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtFloatLayout,
  AtCard,
  AtRate,
  AtTextarea,
} from "taro-ui";
import {
  View,
  Text,
  Image,
  Swiper,
  SwiperItem,
  CoverView,
} from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { locker, getLocker, getLockerList, cacelLocker } from "@actions/api";

import "./index.sass";

@inject("cardPage")
@observer
class HCpageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      openone: false,
      opentwo: false,
      openthree: false,
      modal: false,
      modalLockerInfo: false,
      lockerList: [],
      atRateFloat: false,
      atRate: 0,
      textarea: "",
    };
  }

  static options = {
    addGlobalClass: true,
  };

  static defaultProps = {};

  currentChange = (event) => {
    this.setState({
      index: event.detail.current,
    });
  };

  close = () => {
    const { cardPage } = this.props;
    this.setState(
      {
        currentIndex: 0,
      },
      () => {
        setTimeout(() => {
          cardPage.setOrScroll(true);
          cardPage.setAllDisplay("opacity:1");
          cardPage.setDisplay("display:none");
        }, 200);
      }
    );
  };
  hotelSwiper() {
    const {
      cardPage: {
        info: {
          hotel: {
            imgs: { Upright },
          },
        },
      },
    } = this.props;

    return (
      <View>
        {Upright.map((item, index) => (
          <SwiperItem taroKey={index}>
            <Image
              mode="aspectFill"
              style="width:100vw;height:600rpx"
              src={item}
            ></Image>
          </SwiperItem>
        ))}
      </View>
    );
  }

  /**
   * 第一个折叠栏
   */
  handleClickone = (value) => {
    this.setState({
      openone: value,
    });
  };
  /**
   * 第二个折叠栏
   */
  handleClicktwo = (value) => {
    this.setState({
      opentwo: value,
    });
  };
  /**
   * 第三个折叠栏
   */
  handleClickthree = (value) => {
    this.setState({
      openthree: value,
    });
  };
  /**
   * 打开拟态框
   */
  openModalLocker() {
    this.setState({
      modal: true,
    });
  }

  /**
   * 打开寄存柜订单列表
   */
  openLockerInfo() {
    const param = {
      token: Taro.getStorageSync("token"),
      hotel_id: this.props.cardPage.info.order.id,
    };
    getLockerList(param).then((res) => {
      console.log(res);
      this.setState(
        {
          lockerList: res.data.data.list,
          modalLockerInfo: true,
        },
        () => {
          console.log(this.state.lockerList);
        }
      );
    });
  }
  /**
   * 集合 关闭拟态框或者浮动框
   */
  closeModal() {
    this.setState({
      modal: false,
      modalLockerInfo: false,
    });
  }
  /**
   * 预约寄存柜
   */
  postLocker = () => {
    console.log(this.props.cardPage.info.order.id);
    const param = {
      token: Taro.getStorageSync("token"),
      hotel_id: this.props.cardPage.info.order.id,
    };
    locker(param).then((res) => {
      if (res.data.status == 0) {
        Taro.showToast({
          title: "预约成功",
          icon: "success",
          duration: 2000,
        });
      } else if (res.data.status == 103) {
        Taro.showToast({
          title: "已有预约",
          icon: "none",
          duration: 2000,
        });
      } else {
        Taro.showToast({
          title: "参数错误",
          icon: "none",
          duration: 2000,
        });
      }
      this.setState({
        modal: false,
      });
    });
  };

  /**
   * 取消寄存柜
   */
  cacelLockerOrder(apply_id) {
    const param = {
      token: Taro.getStorageSync("token"),
      apply_id: apply_id,
    };
    cacelLocker(param).then((res) => {
      if (res.data.status == 0) {
        const param2 = {
          token: Taro.getStorageSync("token"),
          hotel_id: this.props.cardPage.info.order.id,
        };
        getLockerList(param2).then((resquest) => {
          this.setState(
            {
              lockerList: resquest.data.data.list,
            },
            () => {
              console.log(resquest.data.data.list);
            }
          );
        });
      }
    });
  }
  /**
   * 关闭评分窗口
   */
  atRateClose() {
    this.setState({
      atRateFloat: false,
    });
  }

  /**
   * 打开评分窗口
   */
  atRateOpen() {
    this.setState({
      atRateFloat: true,
    });
  }

  /**
   * 改变评价星级
   */
  atRateChange(value) {
    this.setState({
      atRate: value,
    });
    return value;
  }

  textareaChange(event) {
    this.setState({
      textarea: event.target.value,
    });
  }
  sendAtRate() {
    Taro.showToast({
      title: "感谢您的评价",
      icon: "success",
      duration: 2000,
    });
    this.setState({
      atRateFloat: false,
    });
  }
  render() {
    const {
      cardPage: {
        cardPage: { offsetTop },
        info,
      },
    } = this.props;
    const {
      currentIndex,
      modal,
      modalLockerInfo,
      lockerList,
      atRateFloat,
      atRate,
      textarea,
    } = this.state;
    return (
      <View className="hotelOrderPage_item" style={`margin-top:${offsetTop}`}>
        <View className="hotelOrderPage_container">
          <View className="hotelOrderPage_image">
            <CoverView className="close" onClick={this.close.bind(this)}>
              X
            </CoverView>
            <Swiper
              current={currentIndex}
              indicatorColor="#ffffff"
              indicatorActiveColor="#333"
              circular
              indicatorDots
              autoplay={false}
              className="swiper"
              style="width:100%;height:600rpx"
              onChange={this.currentChange.bind(this)}
            >
              {this.hotelSwiper()}
            </Swiper>
            <View className="cover_container at-row at-row__align--center">
              <View className="hotelOrderPage_title at-col at-col-8">
                {info.hotel.name}
              </View>
              <View className="hotelOrderPage_status at-col at-col-3">
                {
                  {
                    ["booking"]: (
                      <View>
                        <Text className="booking hotelOrderPage_icon iconfont icon-RectangleCopy257"></Text>
                        预约中
                      </View>
                    ),
                    ["checkin"]: (
                      <View>
                        <Text className="checkin hotelOrderPage_icon iconfont icon-RectangleCopy6"></Text>
                        入住中
                      </View>
                    ),
                    ["checkout"]: (
                      <View>
                        <Text className="checkout hotelOrderPage_icon iconfont icon-RectangleCopy1"></Text>
                        已退房
                      </View>
                    ),
                  }[info.status]
                }
              </View>
            </View>
          </View>
          <View className="hotelOrderPage_content">
            {
              {
                ["booking"]: (
                  <View>
                    <View className="hotelOrderPage_card ">
                      <View className="hotelOrderPage_title at-col at-col-12">
                        您已预约成功！酒店的全体员工欢迎您的到来!
                        <View className="hotelOrderPage_title_tips">
                          了解酒店提供服务详情
                        </View>
                      </View>
                      <View className="hr"></View>
                      <View className="at-row">
                        <View className="hotelOrderPage_backHotel at-col at-col-3">
                          <AtButton
                            type="secondary"
                            size="small"
                            style="color:black"
                            onClick={this.openModalLocker.bind(this)}
                          >
                            预约寄存柜
                          </AtButton>
                          <AtModal
                            isOpened={modal}
                            title="寄存确认"
                            cancelText="取消"
                            confirmText="确认"
                            onClose={this.closeModal.bind(this)}
                            onConfirm={this.postLocker.bind(this)}
                            onCancel={this.closeModal.bind(this)}
                            content={`寄存时间的免费开放时间仅在预约时间\n前的6小时和后3小时内，请确认自己的\n时间`}
                          />
                        </View>
                        <View className="hotelOrderPage_backHotel at-col at-col-3">
                          <AtButton
                            type="secondary"
                            size="small"
                            style="color:black"
                            onClick={this.openLockerInfo.bind(this)}
                          >
                            寄存信息
                          </AtButton>
                          <AtFloatLayout
                            isOpened={modalLockerInfo}
                            title="寄存信息"
                            onClose={this.closeModal.bind(this)}
                            scrollY={true}
                          >
                            {lockerList &&
                              lockerList.map((item, order) => {
                                return (
                                  <View taroKey={order} className="lockerList">
                                    <AtCard
                                      extra={
                                        {
                                          applying: "预约中",
                                          using: "使用中",
                                          canceled: "被取消",
                                          done: "使用完毕",
                                        }[item.status]
                                      }
                                      title={"预约单号:" + item.locker_id}
                                    >
                                      <View style="padding-bottom:20rpx;font-size:40rpx">
                                        寄存柜位置:第{item.index}柜{item.num}号
                                      </View>
                                      <View>
                                        到期时间:
                                        {new Date(
                                          item.expire_time * 1000
                                        ).getFullYear() +
                                          "." +
                                          (new Date(
                                            item.expire_time * 1000
                                          ).getMonth() +
                                            1) +
                                          "." +
                                          new Date(
                                            item.expire_time * 1000
                                          ).getDate()}
                                      </View>
                                      {item.status == "applying" ? (
                                        <View>
                                          <AtButton
                                            size="small"
                                            onClick={this.cacelLockerOrder.bind(
                                              this,
                                              item.apply_id
                                            )}
                                          >
                                            取消预订
                                          </AtButton>
                                        </View>
                                      ) : (
                                        void 0
                                      )}
                                    </AtCard>
                                  </View>
                                );
                              })}
                          </AtFloatLayout>
                        </View>
                      </View>
                    </View>
                  </View>
                ),
                ["checkin"]: (
                  <View>
                    <View className="hotelOrderPage_card ">
                      <View className="hotelOrderPage_title at-col at-col-12">
                        欢迎光临,我们将全心为您服务!
                        <View className="hotelOrderPage_title_tips">
                          了解酒店提供服务详情
                        </View>
                      </View>
                      <View className="hr"></View>
                      <View className="hotelOrderPage_backHotel at-col at-col-3">
                        <AtButton
                          type="secondary"
                          size="small"
                          style="color:black"
                        >
                          联系客服
                        </AtButton>
                      </View>
                    </View>
                  </View>
                ),
                ["checkout"]: (
                  <View>
                    <View className="hotelOrderPage_card ">
                      <View className="hotelOrderPage_title at-col at-col-12">
                        欢迎光临本酒店，期待再次光临
                        <View className="hotelOrderPage_title_tips">
                          取消及扣款政策 >
                        </View>
                      </View>
                      <View className="hr"></View>
                      <View className="hotelOrderPage_backHotel at-col at-col-3">
                        <AtButton
                          type="secondary"
                          size="small"
                          style="color:black"
                        >
                          再次预定
                        </AtButton>
                      </View>
                    </View>
                  </View>
                ),
              }[info.status]
            }
            <View className="hotelOrderPage_paylist">
              <AtAccordion
                open={this.state.openone}
                onClick={this.handleClickone.bind(this)}
                title={"在线支付  ￥" + info.order.totalprice}
                icon={{
                  value: "iconfont icon-RectangleCopy33",
                  color: "red",
                  size: "20",
                }}
              >
                <AtList hasBorder={false}>
                  <AtListItem
                    title={
                      "餐饮费及杂物费  ￥" +
                      (info.order.totalprice - info.order.price)
                    }
                  />
                  <AtListItem title={"房间价格  ￥" + info.order.price} />
                </AtList>
              </AtAccordion>
              <AtAccordion
                open={this.state.opentwo}
                onClick={this.handleClicktwo.bind(this)}
                title="住房详细信息"
                icon={{
                  value: "iconfont icon-RectangleCopy128",
                  color: "blue",
                  size: "20",
                }}
              >
                <AtList hasBorder={false}>
                  <AtListItem
                    title={
                      "酒店地址: " +
                      info.hotel.province +
                      info.hotel.city +
                      info.hotel.district
                    }
                  />
                  <AtListItem title={"入住房间: " + info.room.number} />
                  <AtListItem
                    title={"入住房间类型: " + info.room.room_type_content}
                  />
                  <AtListItem
                    title={
                      "入住时间: " +
                      new Date(info.check_in_time * 1000).getFullYear() +
                      "." +
                      (new Date(info.check_in_time * 1000).getMonth() + 1) +
                      "." +
                      new Date(info.check_in_time * 1000).getDate() +
                      "--" +
                      new Date(info.check_out_time * 1000).getFullYear() +
                      "." +
                      (new Date(info.check_out_time * 1000).getMonth() + 1) +
                      "." +
                      new Date(info.check_out_time * 1000).getDate()
                    }
                  />
                </AtList>
              </AtAccordion>
              <AtAccordion
                open={this.state.openthree}
                onClick={this.handleClickthree.bind(this)}
                title="其他"
                icon={{
                  value: "iconfont icon-RectangleCopy161",
                  color: "green",
                  size: "20",
                }}
              >
                <AtList hasBorder={false}>
                  <AtListItem title={"付款订单编号: " + info.order.id} />
                  <AtListItem
                    title={
                      "付款时间:" +
                      new Date(info.order.pay_time * 1000).getFullYear() +
                      "-" +
                      (new Date(info.order.pay_time * 1000).getMonth() + 1) +
                      "-" +
                      new Date(info.order.pay_time * 1000).getDate()
                    }
                  />
                </AtList>
              </AtAccordion>
              <View className="hotelOrderPage_goodcoin">
                <View className="hotelOrderPage_goodcoin_title">
                  积累奖励金：
                  <Text className="hotelOrderPage_goodcoin_coin">450</Text>
                </View>
                <Text className="hotelOrderPage_goodcoin_tip">
                  使用积分兑好礼
                </Text>
              </View>
              <View className="hotelOrderPage_other at-row at-row__align--center at-row__justify--center">
                <View
                  className="hotelOrderPage_other_pingjia at-col at-col-5"
                  onClick={this.atRateOpen.bind(this)}
                >
                  <View className="icon iconfont icon-RectangleCopy254"></View>
                  入住评价
                  <AtFloatLayout
                    isOpened={atRateFloat}
                    title="撰写评价"
                    onClose={this.atRateClose.bind(this)}
                  >
                    <View style="padding-bottom:45rpx">
                      <AtRate
                        value={atRate}
                        onChange={this.atRateChange.bind(this)}
                      />
                    </View>
                    <View style="padding-bottom:30rpx">
                      <AtTextarea
                        value={textarea}
                        onChange={this.textareaChange.bind(this)}
                        maxLength={200}
                        placeholder="请写下您的评价~"
                      />
                    </View>
                    <AtButton
                      type="primary"
                      onClick={this.sendAtRate.bind(this)}
                    >
                      确认
                    </AtButton>
                  </AtFloatLayout>
                </View>
                <View className="hrx">|</View>
                <View className="hotelOrderPage_other_kefu at-col at-col-5">
                  <View className="icon iconfont icon-RectangleCopy46"></View>
                  联系客服
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default HCpageCard;

import Taro from "@tarojs/taro";
import { observable, action } from "mobx";

/**
 * 基本信息
 */
class cardPage {
  @observable cardPage = {
    offsetTop: "",
    scrollTop: "",
    display: "",
    allDisplay: "",
    orScroll: true
  };

  @observable info = {
    status: "", //入住状态
    check_in_time: "", //入住时间
    check_out_time: "", //离开时间
    guest: "", //住客id
    hotel: {
      add_time: "",
      city: "", //市
      content: "", //酒店描述
      district: "", //区县市
      id: "", //酒店id
      imgs: {
        Upright: [],
        horizontal: []
      },
      lat: "" /***废弃***/,
      location: "", //酒店地址
      lon: "" /***废弃***/,
      name: "", //酒店名
      province: "", //省
      update_time: ""
    },
    name: "",
    order: {
      add_time: "", //
      date_end: "", //预定结束时间
      date_start: "", //预定开始时间
      days: "", //住几天
      guest: "", //住户人数
      guests: [], //哪几个人一起住，住户id
      hotel: "", //酒店id
      id: "", //付款订单编号
      pay_time: "", //付款时间
      price: "", //价格
      room: "", //房间id
      status: "", //付款订单状态
      totalprice: "", //总价
      update_time: "" //
    },
    room: {
      add_time: "" /***废弃***/,
      content: "", //房间信息
      floor: "", //楼层
      hotel: "", //酒店id
      id: "", //room id
      name: "", //房间名
      number: "", //房间号
      room_type_content: "", //房间类型
      room_type_name: "", //房间类型描述
      update_time: "" /***废弃***/
    }
  };

  @action.bound setOrScroll(orScroll) {
    this.cardPage.orScroll = orScroll;
  }

  @action.bound setScrollTop(scrollTop) {
    this.cardPage.scrollTop = scrollTop;
  }

  /**
   * 设置
   */
  @action.bound setTop(offsetTop) {
    this.cardPage.offsetTop = offsetTop;
  }

  @action.bound setInfo(data) {
    this.info = data;
  }

  /**
   * 更新单独隐藏
   */
  @action.bound setDisplay(display) {
    this.cardPage.display = display;
  }

  /**
   * 更新所有隐藏
   */
  @action.bound setAllDisplay(allDisplay) {
    this.cardPage.allDisplay = allDisplay;
  }

  @action.bound setDemo(display, allDisplay) {
    this.cardPage.display = display;
    this.cardPage.allDisplay = allDisplay;
  }
}

export default cardPage;

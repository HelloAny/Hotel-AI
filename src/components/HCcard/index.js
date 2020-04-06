import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import "./index.sass";
@inject("cardPage")
@observer
class HCcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ani: "",
    };
  }

  static options = {
    addGlobalClass: true,
  };

  static defaultProps = {
    data: {
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
          horizontal: [],
        },
        lat: "" /***废弃***/,
        location: "", //酒店地址
        lon: "" /***废弃***/,
        name: "", //酒店名
        province: "", //省
        update_time: "",
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
        update_time: "", //
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
        update_time: "" /***废弃***/,
      },
    },
  };

  /**
   * 路由跳转
   * @param {string} url
   */
  changeMode(event) {
    const {
      data,
      cardPage: {
        cardPage: { scrollTop },
      },
      cardPage,
    } = this.props;
    Taro.createSelectorQuery()
      .selectViewport()
      .scrollOffset((rect) => {
        const animate = Taro.createAnimation({
          transformOrigin: "50% 50%",
          duration: 400,
          timingFunction: "ease",
          delay: 0,
        });
        setTimeout(() => {
          animate
            .translateY(-(event.currentTarget["offsetTop"] - scrollTop))
            .width("100%")
            .height("100vh")
            .step();
          this.setState(
            {
              ani: animate.export(),
            },
            () => {
              setTimeout(() => {
                cardPage.setOrScroll(false);
                cardPage.setInfo(data);
                cardPage.setDisplay("display:block");
                cardPage.setAllDisplay("opacity:0");
              }, 300);
            }
          );
        }, 200);
      })
      .exec();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.cardPage.cardPage.display == "display:none") {
      const {
        cardPage: {
          cardPage: { offsetTop },
        },
      } = this.props;
      const animate = Taro.createAnimation({
        transformOrigin: "50% 50%",
        duration: 300,
        timingFunction: "ease",
        delay: 0,
      });
      animate.width("90%").height("600px").step();
      this.setState({
        ani: animate.export(),
      });
    }
  }
  render() {
    const {
      status,
      hotel: {
        name,
        imgs: { Upright },
      },
    } = this.props.data;
    const { ani } = this.state;
    return (
      <View className="hotelOrder_item" onClick={this.changeMode}>
        <View className="hotelOrder_container" animation={ani}>
          <View className="hotelOrder_image">
            <Image
              mode="aspectFill"
              style="width:100%;height:600px"
              src={Upright[0]}
              lazyLoad={true}
            ></Image>
            <View className="cover_container at-row at-row__align--center">
              <View className="hotelOrder_title at-col at-col-8">{name}</View>
              <View className="hotelOrder_status at-col at-col-3">
                {
                  {
                    ["booking"]: (
                      <View>
                        <Text className="booking hotelOrder_icon iconfont icon-RectangleCopy257"></Text>
                        预约中
                      </View>
                    ),
                    ["checkin"]: (
                      <View>
                        <Text className="checkin hotelOrder_icon iconfont icon-RectangleCopy6"></Text>
                        入住中
                      </View>
                    ),
                    ["checkout"]: (
                      <View>
                        <Text className="checkout hotelOrder_icon iconfont icon-RectangleCopy1"></Text>
                        已退房
                      </View>
                    ),
                  }[status]
                }
              </View>
            </View>
          </View>
          <View className="hotelOrder_content at-row at-row__align--center at-row__justify--center">
            {/* <View className="hotelOrder_time at-col">
              <Text>入住时间:{time}</Text>
            </View> */}
          </View>
        </View>
      </View>
    );
  }
}

export default HCcard;

/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-key */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { userHotelInfo } from "@actions/hotel";
import { HCcard, HCpageCard } from "@components";
import "./hotelOrder.sass";

@inject("cardPage", "userStore")
@observer
class hotelOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [
        {
          fields: {
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
          }
        }
      ]
    };
  }
  config = {
    navigationBarTitleText: "订单",
    navigationBarBackgroundColor: "#2d8cf0",
    navigationBarTextStyle: "white"
  };

  userHotelInfoGet() {
    const {
      userStore: {
        user: { id }
      }
    } = this.props;
    const param = {
      id: id
    };
    userHotelInfo(param).then(res => {
      console.log(res.data.res);
      this.setState({
        records: res.data.res
      });
    });
  }

  onScroll(event) {
    const { cardPage } = this.props;
    cardPage.setScrollTop(event.detail.scrollTop);
  }

  componentWillMount() {
    this.userHotelInfoGet();
  }

  hotelList() {
    const { records } = this.state;
    const list = records.map(item => {
      return (
        <View taroKey={item.status}>
          <HCcard data={item.fields}></HCcard>
        </View>
      );
    });
    return <View>{list}</View>;
  }

  render() {
    const {
      cardPage: {
        cardPage: { display, allDisplay, orScroll }
      },
      userStore: {
        user: { userName }
      }
    } = this.props;
    const { records } = this.state;
    return (
      <View>
        <navbar />
        <View className="container">
          {records ? (
            <View>
              <View className="scroll fillPage" style={display}>
                <HCpageCard></HCpageCard>
              </View>
              <View className="scroll">
                <ScrollView
                  scrollY={orScroll}
                  onScroll={this.onScroll.bind(this)}
                  className="mapCard"
                  style={allDisplay}
                >
                  {this.hotelList()}
                </ScrollView>
              </View>
            </View>
          ) : (
            <View className="noMsg">暂无订单</View>
          )}
        </View>
      </View>
    );
  }
}

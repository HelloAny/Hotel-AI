import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtSearchBar, AtIcon } from "taro-ui";
import * as Server from "../../../actions";

import "../../assets/style/lodgerFinder.scss";

export default class LodgerFinder extends Component {
  config = {
    navigationBarTitleText: "搜索同行者"
  };
  static defaultProps = {};

  state = {
    lodgerV: "",
    lodgerList: []
  };

  propsKeys = [];

  stateKeys = ["lodgerV", "lodgerList"];

  /**
   * 监听搜索输入
   */
  handleChange(v) {
    this.setState({
      lodgerV: v
    });
  }

  /**
   * 搜索好友
   */
  handleSearch() {
    Server.searchLodger(this.state.lodgerV)
      .then(res => {
        this.setState({
          lodgerList: res.list
        });
        if (res.num == 0) {
          Taro.showToast({
            title: "没搜到哦",
            icon: "none",
            duration: 2000
          });
        }
      })
      .catch(err => {
        Taro.showToast({
          title: "网络开小差了...",
          icon: "none",
          duration: 2000
        });
        console.log(err);
      });
  }

  /**
   * 跳转至发送邀请请求
   */
  handleSendInvitation(phone) {
    const { journeyId } = this.$router.params;
    Taro.redirectTo({
      url: `/packageC/pages/IM/index?phone=${phone}&action=invite&journeyId=${journeyId}`
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("LodgerFinder");
  }

  componentDidUpdate() {
    console.timeEnd("LodgerFinder");
  }

  render() {
    const { lodgerV, lodgerList } = this.state;
    return (
      <View className="container">
        <AtSearchBar
          placeholder="手机号/用户名/"
          actionName="搜一下"
          value={lodgerV}
          onChange={this.handleChange.bind(this)}
          onConfirm={this.handleSearch.bind(this)}
          onActionClick={this.handleSearch.bind(this)}
        />
        {lodgerList.map(lodger => {
          return (
            <View className="lodger-item" key={lodger.user_id}>
              <Image
                className="portrait"
                src={
                  "https://hotel.lcworkroom.cn/api/pic/get/users/?name=" +
                  lodger.user_id
                }
              />
              <View className="info">
                {lodger.nickname} {`(${lodger.user_id})`}
              </View>
              <View
                className="invite"
                onClick={this.handleSendInvitation.bind(this, lodger.user_id)}
              >
                <AtIcon value="add-circle" size="18" color="#909399" />
              </View>
            </View>
          );
        })}
        <View className="tip">没有更多内容</View>
      </View>
    );
  }
}

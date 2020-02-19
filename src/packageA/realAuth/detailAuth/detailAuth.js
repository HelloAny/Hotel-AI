import Taro, { Component } from "@tarojs/taro";
import { View, Picker } from "@tarojs/components";
import { AtInput, AtForm, AtButton } from "taro-ui";
import { realAuthUpdate } from "@actions/api";
import { reLaunch } from "@utils"; //测试用
import { observer, inject } from "@tarojs/mobx";

import "./detailAuth.sass";

@inject("userStore")
@observer
class detailAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorCap: 0,
      city: [],
      startDate: "",
      endDate: "",
      organization: "",
      nation: ""
    };
  }
  config = {
    navigationBarTitleText: "更新实名认证",
    navigationBarBackgroundColor: "#2d8cf0"
  };
  static options = {
    addGlobalClass: true
  };
  static defaultProps = {
    nextBtn: Function
  };

  /**
   * 更改姓名
   * @param {string} value 默认
   */
  nameChange(value) {
    const { verifyIdcard } = this.state;

    this.setState({
      name: value,
      verifyNextBtn: false
    });
    if (
      verifyIdcard == true &&
      /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/.test(value)
    ) {
      this.setState({
        verifyNextBtn: true
      });
    }
    return value;
  }

  /**
   * 验证姓名是否符合要求
   * @param {string} value 默认
   */
  verifyName(value) {
    if (/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/.test(value)) {
      this.setState({
        errorCap: 0,
        verifyName: true
      });
    } else if (!value) {
      this.setState({
        errorCap: 0
      });
    } else {
      this.setState({
        errorCap: 1
      });
    }
  }
  /**
   * 更改身份证号
   * @param {number} value 默认
   */
  idcardChange(value) {
    const { verifyName } = this.state;
    this.setState({
      idcard: value,
      verifyNextBtn: false
    });
    if (
      verifyName == true &&
      /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(
        value
      )
    ) {
      this.setState({
        verifyNextBtn: true
      });
    }
    return value;
  }

  /**
   * 身份证验证
   * @param {number} value 默认
   */
  verifyIdcard(value) {
    if (
      /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(
        value
      )
    ) {
      this.setState({
        errorCap: 0,
        verifyIdcard: true
      });
    } else if (!value) {
      this.setState({
        errorCap: 0
      });
    } else {
      this.setState({
        errorCap: 2
      });
    }
  }

  /**
   * 发送请求更改用户信息
   */
  updateRealAuth() {
    const { city, startDate, endDate, organization, nation } = this.state;
    if (new Date(endDate).getTime() - new Date(startDate).getTime() <= 0) {
      this.setState({
        errorCap: 1
      });
      return;
    }
    const param = {
      token: Taro.getStorageSync("token"),
      nation: nation,
      organization: organization,
      address: `${city[0]}${city[1]}${city[2]}`,
      date_start: new Date(startDate).getTime() / 1000,
      date_end: new Date(endDate).getTime() / 1000
    };
    Taro.showLoading({
      title: "上传中",
      mask: true
    });
    realAuthUpdate(param).then(res => {
      Taro.hideLoading();
      console.log(res.data);
      if (res.data.status == 0) {
        Taro.showToast({
          title: "更新成功",
          icon: "success",
          duration: 2000,
          mask: true,
          success: () => {
            Taro.reLaunch({
              url: "/packageA/realAuth/realAuth"
            });
          }
        });
      } else {
        Taro.showToast({
          title: "实名更新失败",
          icon: "fail",
          duration: 2000
        });
      }
    });
  }
  /**
   * 地区修改
   * @event
   */
  changeCity(event) {
    this.setState({
      city: event.detail.value
    });
  }
  /**
   * 身份证开始日期
   * @event
   */
  changeStartDate(event) {
    this.setState({
      startDate: event.detail.value
    });
  }
  /**
   * 身份证结束日期
   * @event
   */
  changeEndDate(event) {
    this.setState({
      endDate: event.detail.value
    });
  }
  /**
   * 民族
   * @param {string} value 默认
   */
  changeNation(value) {
    this.setState({
      nation: value
    });
    return value;
  }
  /**
   * 签发机关
   * @param {string} value 默认
   */
  changeOrganization(value) {
    this.setState({
      organization: value
    });
    return value;
  }
  render() {
    const {
      userStore: {
        user: { nickName }
      }
    } = this.props;
    const {
      errorCap,
      city,
      startDate,
      endDate,
      organization,
      nation
    } = this.state;
    const { detailAuth } = this.props;
    return (
      <View className="container">
        <View className="at-row inputMargin">
          <View className="at-col at-col-11">
            <AtInput
              name="value"
              title="民族"
              type="text"
              placeholder="例如: 汉 "
              value={nation}
              onChange={this.changeNation.bind(this)}
            />
          </View>
        </View>
        <View className="at-row inputMargin">
          <View className="at-col at-col-11">
            <AtInput
              name="value"
              title="签发机关"
              type="text"
              placeholder="例如: 临海市公安局"
              value={organization}
              onChange={this.changeOrganization.bind(this)}
            />
          </View>
        </View>
        <View className="at-row inputMargin">
          <View className="at-col at-col-11">
            <Picker
              mode="region"
              onChange={this.changeCity.bind(this)}
              value={city}
            >
              <View className="pickText at-row">
                住址
                <Text className="text at-col">{city[0]}</Text>
                <Text className="text at-col">{city[1]}</Text>
                <Text className="text at-col">{city[2]}</Text>
              </View>
            </Picker>
          </View>
        </View>
        <View className="hr"></View>
        <View className="at-row pickTitle">身份证有效日期:</View>
        <View className="at-row inputMargin datePick">
          <View className="at-col at-col-5 pickerDateDom">
            <Picker
              mode="date"
              onChange={this.changeStartDate.bind(this)}
              value={startDate}
            >
              <View className="pickDateText at-row">
                起始:
                <Text className="text at-col">{startDate}</Text>
              </View>
            </Picker>
          </View>
          <View className="at-col at-col-5 pickerDateDom">
            <Picker
              mode="date"
              onChange={this.changeEndDate.bind(this)}
              value={endDate}
            >
              <View className="pickDateText at-row">
                截止:
                <Text className="text at-col">{endDate}</Text>
              </View>
            </Picker>
          </View>
        </View>
        <View className="at-row">
          {
            {
              0: <View className="tapCap at-col">姓名和身份证提醒</View>,
              1: <View className="errorCap at-col">日期判断错误</View>,
              2: <View className="errorCap at-col">不能出现空选项</View>
            }[errorCap]
          }
        </View>
        <View className="at-row realAuthInfoBtn">
          <View className="at-col">
            <AtButton
              circle
              type="primary"
              onClick={this.updateRealAuth.bind(this)}
            >
              保存
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}
export default detailAuth;

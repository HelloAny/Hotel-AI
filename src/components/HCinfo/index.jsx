import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtInput, AtForm, AtButton } from "taro-ui";
import { realAuthCreate } from "@actions/api";
import { reLaunch } from "@utils"; //测试用
import { observer, inject } from "@tarojs/mobx";

import "./index.sass";

@inject("userStore")
@observer
class HCinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      idcard: "",
      errorCap: 0,
      verifyNextBtn: false,
      verifyIdcard: false,
      verifyName: false
    };
  }
  static options = {
    addGlobalClass: true
  };
  static defaultProps = {
    nextBtn: Function,
    detailAuth: Boolean
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
  updateUserInfo() {
    const { name, idcard } = this.state;
    const {
      userStore: {
        user: { userName, nickName, email }
      },
      userStore,
      nextBtn
    } = this.props;
    const param = {
      token: Taro.getStorageSync("token"),
      idcard: idcard,
      name: name,
      gender: idcard.charAt(16) % 2 == 1 ? "male" : "female",
      birthday:
        new Date(
          `${idcard.substring(6, 10)}-${idcard.substring(
            10,
            12
          )}-${idcard.substring(12, 14)}`
        ).getTime() / 1000
    };
    Taro.showLoading({
      title: "上传中",
      mask: true
    });
    realAuthCreate(param).then(res => {
      Taro.hideLoading();
      console.log(res.data);
      if (res.data.status == 0) {
        Taro.showToast({
          title: "认证成功",
          icon: "success",
          duration: 2000,
          mask: true,
          success: () => {
            userStore.setUserID(res.data.data.real_auth_id);
            nextBtn();
          }
        });
      } else {
        Taro.showToast({
          title: "实名认证失败",
          icon: "fail",
          duration: 2000
        });
      }
    });
  }

  /**
   * 路由转跳
   * @param {string} url 路径
   */
  navgiateTo(url) {
    Taro.navigateTo({
      url: url
    });
  }
  render() {
    const {
      userStore: {
        user: { nickName }
      }
    } = this.props;
    const { name, idcard, errorCap, verifyNextBtn } = this.state;
    const { detailAuth } = this.props;
    return (
      <View className="container">
        <View className="at-row inputMargin">
          <View className="at-col at-col-11">
            <AtInput
              name="value"
              title="姓名"
              type="text"
              value={name}
              onChange={this.nameChange.bind(this)}
              onBlur={this.verifyName.bind(this)}
            />
          </View>
        </View>
        <View className="at-row inputMargin">
          <View className="at-col at-col-11">
            <AtInput
              name="value"
              title="身份证"
              type="idcard"
              value={idcard}
              onChange={this.idcardChange.bind(this)}
              onBlur={this.verifyIdcard.bind(this)}
            />
          </View>
        </View>
        <View className="at-row">
          {
            {
              0: <View className="tapCap at-col">姓名和身份证提醒</View>,
              1: <View className="errorCap at-col">姓名判断错误</View>,
              2: <View className="errorCap at-col">身份证格式错误</View>
            }[errorCap]
          }
        </View>
        <View className="at-row realAuthInfoBtn">
          <View className="at-col">
            {verifyNextBtn ? (
              <AtButton type="primary" onClick={this.updateUserInfo.bind(this)}>
                下一步
              </AtButton>
            ) : (
              <AtButton
                type="primary"
                disabled={true}
                onClick={this.updateUserInfo.bind(this)}
              >
                下一步
              </AtButton>
            )}
          </View>
        </View>
        {detailAuth ? (
          <View
            className="at-row moreDetailAuth at-row__justify--center"
            onClick={this.navgiateTo.bind(
              this,
              "/packageA/realAuth/detailAuth/detailAuth"
            )}
          >
            <View
              className="at-col at-col-3"
              onClick={this.navgiateTo.bind(
                this,
                "/packageA/realAuth/detailAuth/detailAuth"
              )}
            >
              增加详细资料
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  }
}
export default HCinfo;

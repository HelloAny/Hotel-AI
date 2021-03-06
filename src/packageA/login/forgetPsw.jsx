import Taro, { Component } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { AtButton, AtInput, AtForm, AtCountdown, AtToast } from "taro-ui";
import { SmsValidate, ForgetPsw, Sms } from "@actions/api";
import { HCerror, HCinterval, Navbar } from "@components";
import "./forgetPsw.sass";

class Login extends Component {
  config = {
    navigationStyle: "custom",
  };
  constructor() {
    super(...arguments);
    this.state = {
      phone: "", //电话
      captcha: "", //验证码
      finalPhone: "", //发送号码
      errorCap: 0, //错误代码
      rand: "", //rand值
      show_resBtn: false, //是否开启的登录按钮
      pswChange: false, //密码是否一致
      smsStatus: 0, //验证码按钮
      passWordAgain: "", //再次输入密码
      passWord: "", //密码
      validation: true, //界面是否跳转(手机号验证成功)
    };
  }
  /**
   * 电话号码修改检测
   * @event
   * @param {number} value 默认
   */
  phoneChange(value) {
    this.setState({
      phone: value,
      errorCap: 0,
    });
    if (value.length == 11) {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        this.setState({
          errorCap: 2,
        });
        return;
      }
      if (this.state.showBtn == 0) {
        this.setState({
          showBtn: 1,
        });
      }
    }

    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return value;
  }

  /**
   * 验证码修改检测
   * @event
   * @param {number} value 默认
   */
  captchaChange(value) {
    this.setState({
      captcha: value,
      show_resBtn: false,
      errorCap: 0,
    });
    if (value.length == 5 && (this.state.smsStatus == 1 || 2)) {
      this.setState({
        show_resBtn: true,
      });
    }
  }

  /**
   * 跳转到密码界面
   * @event
   * @param event
   */
  next(event) {
    const param = {
      code: this.state.captcha,
      rand: this.state.rand,
    };
    SmsValidate(param).then((res) => {
      console.log(res.data);
      if (res.data.status == 100) {
        this.setState({
          errorCap: 1,
        });
      } else if (res.data.status == 0) {
        this.setState({
          pswChange: true,
        });
      }
    });
  }

  /**
   * 修改密码
   * @event
   */
  changePsw() {
    const param = {
      phone: this.state.finalPhone,
      code: this.state.captcha,
      rand: this.state.rand,
      passWord: this.state.passWord,
    };
    //忘记密码接口
    ForgetPsw(param).then((res) => {
      console.log(res);
      if (res.data.status == 0) {
        Taro.navigateTo({
          url: "/pages/login/login",
        });
      } else if (res.data.status == 100) {
        this.setState({
          error: 0,
        });
        console.log("未知错误!");
      }
    });
  }
  /**
   * 请求验证码接口
   * @event
   */
  smsCaptcha() {
    if (this.state.phone.length !== 11) {
      return 1;
    } else if (this.state.phone.length == 11) {
      let count = this.state.btnMsg.count;
      //幕布
      Taro.showLoading({
        title: "loading",
        mask: true,
      });
      this.setState(
        {
          finalPhone: this.state.phone,
        },
        () => {
          // showBtn是false时会出现灰色按钮，当倒计时结束又变成可以触发的按钮
          //验证码接口
          Sms(this.state.phone).then((res) => {
            if (res.data.status == 0) {
              this.setState(
                {
                  rand: res.data.data.rand,
                  smsStatus: 2,
                },
                () => {
                  Taro.hideLoading();
                  Taro.showToast({
                    title: "验证码发送成功",
                    icon: "none",
                    duration: 2000,
                    mask: true,
                  });
                }
              );
            }
          });
        }
      );
    }
  }

  /**
   * 输入密码检测
   * @event
   */
  passWordChange(value) {
    this.setState({
      passWord: value,
    });
    return value;
  }

  /**
   * 再次输入密码检测
   * @event
   */
  passWordChangeAgain(value) {
    this.setState({
      passWordAgain: value,
      smsStatus: 0,
    });
    if (
      this.state.passWord == value &&
      /^1[3456789]\d{9}$/.test(this.state.phone)
    ) {
      this.setState({
        smsStatus: 1,
        validation: true,
        errorCap: 5,
      });
    } else if (!value) {
      this.setState({
        validation: true,
        errorCap: 5,
      });
    }
  }

  /**
   * 计时器函数
   */
  changeIntervalStatus() {
    this.setState({
      smsStatus: 1,
    });
  }

  /**
   * 再次输入密码失焦时触发
   * @event
   */
  passWordValidation(value) {
    if (this.state.passWord !== value) {
      this.setState({
        validation: false,
        errorCap: 5,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  renderA() {
    const {
      phone,
      captcha,
      selector,
      selectorChecked,
      numberChecked,
      btnMsg,
      show_resBtn,
      smsStatus,
      errorCap,
      pswChange,
      passWordAgain,
      passWord,
      validation,
    } = this.state;
    if (!pswChange) {
      return (
        <View>
          <View className="at-row">
            <View className="quickLogin_title at-col">忘记密码</View>
          </View>
          <View className="phone_input at-row at-row__align--center">
            <View className="at-col">
              <AtInput
                name="value6"
                border={true}
                maxLength="13"
                type="phone"
                placeholder="输入手机号码"
                value={phone}
                onChange={this.phoneChange.bind(this)}
              />
            </View>
          </View>
          <View className="at-row at-row__align--center">
            <View className="at-col at-col-9">
              <AtInput
                clear
                type="text"
                border={false}
                maxLength="5"
                placeholder="输入验证码"
                value={captcha}
                onChange={this.captchaChange.bind(this)}
              ></AtInput>
            </View>
            <View className="btn-sendCap at-col at-col-3">
              {
                {
                  0: (
                    <AtButton size="small" circle={true} disabled={true}>
                      发送验证码
                    </AtButton>
                  ),
                  1: (
                    <AtButton
                      size="small"
                      type="secondary"
                      circle={true}
                      onClick={this.smsCaptcha.bind(this)}
                    >
                      发送验证码
                    </AtButton>
                  ),
                  2: (
                    <AtButton
                      disabled={true}
                      size="small"
                      type="secondary"
                      circle={true}
                    >
                      <HCinterval
                        changeIntervalStatus={this.changeIntervalStatus}
                      />
                    </AtButton>
                  ),
                }[smsStatus]
              }
            </View>
          </View>
          <View className="phone_btn at-row">
            <View className="phone_input at-col">
              {show_resBtn ? (
                <AtButton
                  type="primary"
                  circle
                  size="normal"
                  onClick={this.next.bind(this)}
                >
                  下一步
                </AtButton>
              ) : (
                <AtButton type="primary" circle size="normal" disabled={true}>
                  下一步
                </AtButton>
              )}
            </View>
          </View>
        </View>
      );
    } else if (pswChange) {
      return (
        <View>
          <View className="at-row">
            <View className="quickLogin_title at-col">重置密码</View>
          </View>
          <View className="passWord_input at-row at-row__align--center">
            <View className="at-col">
              <AtInput
                name="密码"
                border={true}
                type="password"
                placeholder="输入密码"
                value={passWord}
                onChange={this.passWordChange.bind(this)}
              />
            </View>
          </View>
          <View className="passWord_input_again at-row at-row__align--center">
            <View className="at-col">
              {validation ? (
                <AtInput
                  name="密码"
                  border={true}
                  type="password"
                  placeholder="再次输入密码"
                  value={passWordAgain}
                  onChange={this.passWordChangeAgain.bind(this)}
                  onBlur={this.passWordValidation.bind(this)}
                />
              ) : (
                <AtInput
                  name="密码"
                  border={true}
                  type="password"
                  placeholder="再次输入密码"
                  value={passWordAgain}
                  error={true}
                  onChange={this.passWordChangeAgain.bind(this)}
                />
              )}
            </View>
          </View>
          <View className="phone_btn at-row">
            <View className="phone_input at-col">
              {show_resBtn ? (
                <AtButton
                  type="primary"
                  circle
                  size="normal"
                  onClick={this.changePsw.bind(this)}
                >
                  确认
                </AtButton>
              ) : (
                <AtButton type="primary" circle size="normal" disabled={true}>
                  确认
                </AtButton>
              )}
            </View>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View className="container">
        <Navbar title="忘记密码" isBackBtn={false} weight={true}></Navbar>
        {this.renderA()}
        <HCerror error={this.state.errorCap} />>
      </View>
    );
  }
}

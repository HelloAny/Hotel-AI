import Taro, { Component, login } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { AtButton, AtInput } from "taro-ui";
import { Sms, RegisterPsw } from "@actions/api";
import { Navbar } from "@components";
import "./loginByPsw.sass";

class LoginByPsw extends Component {
  config = {
    navigationStyle: "custom",
  };
  constructor() {
    super();
    this.state = {
      phone: "", //电话
      passWord: "", //密码
      passWordAgain: "", //再次输入密码
      errorCap: 0, //错误代码
      captcha: "", //验证码
      show_btn: 0, //验证码按钮
      validation: true, //验证
      rand: "", //rand值
      show_resBtn: false, //注册按钮
      btnMsg: {
        //计时器
        phone_no: "",
        icode: "",
        code_ts: "获取验证码",
        toast: false,
        count: 60,
      },
    };
  }

  /**
   * 电话改变检测
   * @event
   * @param {number} value 默认
   */
  phoneChange(value) {
    this.setState({
      phone: value,
    });
    return value;
  }

  /**
   * 密码改变检测
   * @event
   * @param {number} value 默认
   */
  passWordChange(value) {
    this.setState({
      passWord: value,
    });
    return value;
  }

  /**
   * 再次输入密码
   * @event
   * @param {number} value 默认
   */
  passWordChangeAgain(value) {
    this.setState({
      passWordAgain: value,
      show_btn: 0,
    });
    if (
      this.state.passWord == value &&
      /^1[3456789]\d{9}$/.test(this.state.phone)
    ) {
      this.setState({
        show_btn: 1,
        validation: true,
        errorCap: 0,
      });
    } else if (!value) {
      this.setState({
        validation: true,
        errorCap: 0,
      });
    }
    return value;
  }

  /**
   * 密码失焦验证
   * @event
   * @param {number} value 默认
   */
  passWordValidation(value) {
    if (this.state.passWord !== value) {
      this.setState({
        validation: false,
        errorCap: 3,
      });
    }
  }

  /**
   * 验证码发送
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
                },
                () => {
                  const timer = setInterval(() => {
                    this.setState(
                      {
                        showBtn: 2,
                        btnMsg: {
                          count: count--,
                          code_ts: count + "S重发",
                        },
                      },
                      () => {
                        if (count === 0) {
                          clearInterval(timer);
                          this.setState({
                            showBtn: 1,
                            btnMsg: {
                              count: 60,
                              code_ts: "获取验证码",
                            },
                          });
                        }
                      }
                    );
                  }, 1000);
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
   * 验证码改变检测
   * @event
   */
  captchaChange(value) {
    this.setState({
      captcha: value,
      show_resBtn: false,
      errorCap: 0,
    });
    if (value.length == 5 && (this.state.show_btn == 1 || 2)) {
      this.setState({
        show_resBtn: true,
      });
    }
    return value;
  }

  /**
   * 注册按钮
   * @event
   * @param event 默认
   */
  resginer(event) {
    const param = {
      phone: this.state.finalPhone,
      code: this.state.captcha,
      rand: this.state.rand,
      password: this.state.passWord,
    };
    RegisterPsw(param).then((res) => {
      console.log(res.data);
      if (res.data.status == -4) {
        this.setState({
          errorCap: 1,
        });
      } else if (res.data.status == 0) {
        if (!this.props.navigate) {
          Taro.navigateTo({
            url: "/pages/account/account",
          });
        }
      }
    });
  }
  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  renderInfo() {
    const {
      phone,
      passWord,
      passWordAgain,
      captcha,
      show_btn,
      validation,
      show_resBtn,
      btnMsg,
    } = this.state;
    return (
      <View>
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
                    {btnMsg.code_ts}
                  </AtButton>
                ),
              }[show_btn]
            }
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View className="container">
        <Navbar title="密码注册" isBackBtn={false} weight={true}></Navbar>
        <View className="at-row">
          <View className="loginByPsw_title at-col">密码注册</View>
        </View>
        {this.renderInfo()}
        <View className="at-row">
          {
            {
              0: <View className="tapCap at-col">验证码和手机号提醒</View>,
              1: <View className="errorCap at-col">验证码错误</View>,
              2: <View className="errorCap at-col">手机号错误</View>,
              3: <View className="errorCap at-col">密码不一致</View>,
            }[errorCap]
          }
        </View>
        <View className="phone_btn at-row">
          <View className="phone_input at-col">
            {this.state.show_resBtn ? (
              <AtButton
                type="primary"
                circle
                size="normal"
                onClick={this.resginer.bind(this)}
              >
                登录/注册
              </AtButton>
            ) : (
              <AtButton type="primary" circle size="normal" disabled={true}>
                登录/注册
              </AtButton>
            )}
          </View>
        </View>
        <View className="forgetPsw at-row">
          <View className="at-col" onClick={this.forgetPsw.bind(this)}>
            忘记密码?
          </View>
        </View>
      </View>
    );
  }
}

export default LoginByPsw;

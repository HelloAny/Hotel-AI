import http from "../service/api";
import netUrl from "../constants/api";
import { setMd5 } from "../utils";
import loginByPsw from "../pages/login/loginByPsw";

export default {
  /**
   * 获取验证码
   * @param {string} param 电话号码
   */
  Sms(param) {
    const url = "/api/captcha/";
    const config = {
      id: 1234,
      type: "sms",
      subtype: "generate",
      data: {
        phone: param,
        command_type: 1
      }
    };
    return http.post(url, config);
  },
  /**
   * 快捷(注册/登录)接口
   * @param {string} param 包含{ phone, code, rand }
   */
  Register(param) {
    const { phone, code, rand } = param;
    const url = "/api/user/login/";
    const config = {
      id: 1234,
      type: "login",
      subtype: "sms",
      data: {
        username: phone,
        hash: setMd5(code, rand),
        enduring: 1
      }
    };
    return http.post(url, config);
  },
  /**
   * 密码注册
   * @param {string} param 包含{ phone, password, code, rand }
   */
  RegisterPsw(param) {
    const { phone, password, code, rand } = param;
    const url = "/api/user/register/";
    const config = {
      id: 0,
      status: 0,
      type: "register",
      subtype: "phone",
      data: {
        username: phone,
        hash: setMd5(code, rand),
        pass: password
      }
    };
    return http.post(url, config);
  },
  /**
   * 忘记密码
   * @param {string} param 包含{ phone, passWord, code, rand }
   */
  ForgetPsw(param) {
    const { phone, passWord, code, rand } = param;
    const url = "/api/user/password/";
    const config = {
      id: 1234,
      type: "password",
      subtype: "forget",
      data: {
        username: phone,
        hash: setMd5(code, rand),
        pass: passWord
      }
    };
    return http.post(url, config);
  },
  /**
   * 确定验证码正确性
   * @param {string} param 包含{ code, rand }
   */
  SmsValidate(param) {
    const { code, rand } = param;
    const url = "/api/captcha/";
    const config = {
      id: 1234,
      type: "sms",
      subtype: "validate",
      data: {
        hash: setMd5(code, rand)
      }
    };
    return http.post(url, config);
  },
  /**
   * 密码登录
   * @param {string} param 包含{ phone, passWord }
   */
  loginByPsw(param) {
    const { phone, passWord } = param;
    const url = "/api/user/login/";
    const config = {
      id: 1234,
      type: "login",
      subtype: "pass",
      data: {
        username: phone,
        pass: passWord,
        enduring: 1
      }
    };
    return http.post(url, config);
  },
  /**
   * 验证token
   * @param {string} param token值
   */
  tokenValidate(param) {
    const url = `/api/user/doki/?token=${param}`;
    return http.get(url);
  },
  /**
   * 通过token获取用户信息
   * @param {string} param token值
   */
  infoByToken(param) {
    const url = `api/user/info/?token=${param}`;
    return http.get(url);
  }
  /**
   * 通过
   */
};

import http from "../service/api";
import netUrl from "../constants/api";
import { setMd5, image2Base64 } from "../utils";

export default {
  /**
   * 获取验证码
   * @param {string} param 电话号码
   */
  Sms(param) {
    const url = "/api/captcha/";
    const request = {
      id: 1234,
      type: "sms",
      subtype: "generate",
      data: {
        phone: param,
        command_type: 1
      }
    };
    return http.post(url, request);
  },
  /**
   * 快捷(注册/登录)接口
   * @param {string} param 包含{ phone, code, rand }
   */
  Register(param) {
    const { phone, code, rand } = param;
    const url = "/api/user/login/";
    const request = {
      id: 1234,
      type: "login",
      subtype: "sms",
      data: {
        username: phone,
        hash: setMd5(code, rand),
        enduring: 1
      }
    };
    return http.post(url, request);
  },
  /**
   * 密码注册
   * @param {string} param 包含{ phone, password, code, rand }
   */
  RegisterPsw(param) {
    const { phone, password, code, rand } = param;
    const url = "/api/user/register/";
    const request = {
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
    return http.post(url, request);
  },
  /**
   * 忘记密码
   * @param {string} param 包含{ phone, passWord, code, rand }
   */
  ForgetPsw(param) {
    const { phone, passWord, code, rand } = param;
    const url = "/api/user/password/";
    const request = {
      id: 1234,
      type: "password",
      subtype: "forget",
      data: {
        username: phone,
        hash: setMd5(code, rand),
        pass: passWord
      }
    };
    return http.post(url, request);
  },
  /**
   * 确定验证码正确性
   * @param {string} param 包含{ code, rand }
   */
  SmsValidate(param) {
    const { code, rand } = param;
    const url = "/api/captcha/";
    const request = {
      id: 1234,
      type: "sms",
      subtype: "validate",
      data: {
        hash: setMd5(code, rand)
      }
    };
    return http.post(url, request);
  },
  /**
   * 密码登录
   * @param {string} param 包含{ phone, passWord }
   */
  loginByPsw(param) {
    const { phone, passWord } = param;
    const url = "/api/user/login/";
    const request = {
      id: 1234,
      type: "login",
      subtype: "pass",
      data: {
        username: phone,
        pass: passWord,
        enduring: 1
      }
    };
    return http.post(url, request);
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
    const url = `/api/user/info/?token=${param}`;
    return http.get(url);
  },
  /**
   * 通过token更新用户信息
   * @param {string} param { token, username, nickname, email, ID }
   */
  infoUpdataByToken(param) {
    const { token, username, nickname, email, ID } = param;
    const url = `/api/user/info/?token=${token}`;
    const request = {
      id: 1234,
      type: "info",
      subtype: "update",
      data: {
        username: username,
        nickname: nickname,
        email: email,
        real_auth_id: ID
      }
    };
    return http.post(url, request);
  },
  /**
   * 获取用户头像
   * @param {string} param username
   */
  userPortraitGet(param) {
    const url = `/api/user/portrait/?username=${param}`;
    return http.get(url);
  },
  /**
   * 上传用户头像
   * @param {string} param image和token
   */
  userPortraitUpload(param) {
    const { token, image } = param;
    return image2Base64(image).then(res => {
      const url = `/api/user/portrait/?token=${token}`;
      const request = {
        id: 1234,
        type: "portrait",
        subtype: "upload",
        data: {
          base64: res
        }
      };
      return http.post(url, request);
    });
  },
  /**
   * 注册实名认证信息
   * @param {string} param {token,idcard,name,gender,birthday}
   */
  realAuthCreate(param) {
    const { token, idcard, name, gender, birthday } = param;
    const url = `/api/realauth/?token=${token}`;
    const request = {
      id: 1234,
      type: "realauth",
      subtype: "create",
      data: {
        id_type: "sfz",
        id: idcard,
        name: name,
        gender: gender,
        birthday: birthday
      }
    };
    return http.post(url, request);
  },
  /**
   * 注册人脸验证
   * @param {string} param {token,imagePath}
   */
  faceRegister(param) {
    const { token, imagePath } = param;
    return image2Base64(imagePath).then(res => {
      const url = `/api/face/?token=${token}`;
      const request = {
        id: 1234,
        type: "face",
        subtype: "register",
        data: {
          base64: res,
          db: 1,
          content: "人脸数据描述"
        }
      };
      return http.post(url, request);
    });
  },
  /**———————————————————————————————————————————————————————————journey start——————————————————————————————————————————————————————————————— */
  getJourneyList(param) {
    const { uid } = param;
    const url = "/visit/user_info";
    const request = {
      uid
    };
    return http.post(url, request).then(res =>{
      let data = res.data
      if(data && data.code != 200) return data
      data.records.forEach(r =>{
        r.check_in_time *= 1000
        r.check_out_time *= 1000
      })
      return data
    });
  },
  getJourneyDetails(param) {
    const { journey_id } = param;
    const url = "/visit/journey_info";
    const request = {
      journey_id
    };
    return http.post(url, request).then(res => {
      let data = res.data;
      if (data && data.code != 200) return data;
      data.journey_info.check_in_time *= 1000;
      data.journey_info.check_out_time *= 1000;
      data.journey_info.order_time *= 1000;
      data.journey_info.out_back_time *= 1000;
      return data;
    });
  }
};

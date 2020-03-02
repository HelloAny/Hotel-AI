import { get, post } from "@service/api";
import { USERAPI } from "@constants/api";
import { setMd5, image2Base64 } from "@utils";

/**
 * originApi --- USERAPI
 */
const request = (method, url, data) => {
  return method(USERAPI + url, data);
};
/**
 * 获取验证码
 * @param {string} param 电话号码
 */
export const Sms = param => {
  const url = "/api/captcha/";
  const data = {
    id: 1234,
    type: "sms",
    subtype: "generate",
    data: {
      phone: param,
      command_type: 1
    }
  };
  return request(post, url, data);
};
/**
 * 快捷(注册/登录)接口
 * @param {string} param 包含{ phone, code, rand }
 */
export const Register = param => {
  const { phone, code, rand } = param;
  const url = "/api/user/login/";
  const data = {
    id: 1234,
    type: "login",
    subtype: "sms",
    data: {
      username: phone,
      hash: setMd5(code, rand),
      enduring: 1
    }
  };
  return request(post, url, data);
};
/**
 * 密码注册
 * @param {string} param 包含{ phone, password, code, rand }
 */
export const RegisterPsw = param => {
  const { phone, password, code, rand } = param;
  const url = "/api/user/register/";
  const data = {
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
  return request(post, url, data);
};
/**
 * 忘记密码
 * @param {string} param 包含{ phone, passWord, code, rand }
 */
export const ForgetPsw = param => {
  const { phone, passWord, code, rand } = param;
  const url = "/api/user/password/";
  const data = {
    id: 1234,
    type: "password",
    subtype: "forget",
    data: {
      username: phone,
      hash: setMd5(code, rand),
      pass: passWord
    }
  };
  return request(post, url, data);
};
/**
 * 确定验证码正确性
 * @param {string} param 包含{ code, rand }
 */
export const SmsValidate = param => {
  const { code, rand } = param;
  const url = "/api/captcha/";
  const data = {
    id: 1234,
    type: "sms",
    subtype: "validate",
    data: {
      hash: setMd5(code, rand)
    }
  };
  return request(post, url, data);
};
/**
 * 密码登录
 * @param {string} param 包含{ phone, passWord }
 */
export const loginByPsw = param => {
  const { phone, passWord } = param;
  const url = "/api/user/login/";
  const data = {
    id: 1234,
    type: "login",
    subtype: "pass",
    data: {
      username: phone,
      pass: passWord,
      enduring: 1
    }
  };
  return request(post, url, data);
};
/**
 * 验证token
 * @param {string} param token值
 */
export const tokenValidate = param => {
  const url = `/api/user/doki/?token=${param}`;
  return request(get, url);
};
/**
 * 通过token获取用户信息
 * @param {string} param token值
 */
export const infoByToken = param => {
  const url = `/api/user/info/?token=${param}`;
  return request(get, url);
};
/**
 * 通过token更新用户信息
 * @param {string} param { token, username, nickname, email, ID }
 */
export const infoUpdataByToken = param => {
  const { token, username, nickname, email, ID } = param;
  const url = `/api/user/info/?token=${token}`;
  const data = {
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
  return request(post, url, data);
};
/**
 * ******************废弃废弃*************************
 * 获取用户头像
 * @param {string} param username
 */
export const userPortraitGet = param => {
  const url = `/api/user/portrait/?username=${param}`;
  return request(get, url);
};
/**
 * ******************废弃废弃*************************
 * 上传用户头像
 * @param {string} param image和token
 */
export const userPortraitUpload = param => {
  const { token, image } = param;
  return image2Base64(image).then(res => {
    const url = `/api/user/portrait/?token=${token}`;
    const data = {
      id: 1234,
      type: "portrait",
      subtype: "upload",
      data: {
        base64: res
      }
    };
    return request(post, url, data);
  });
};
/**
 * 注册实名认证信息
 * @param {string} param {token,idcard,name,gender,birthday}
 */
export const realAuthCreate = param => {
  const { token, idcard, name, gender, birthday } = param;
  const url = `/api/realauth/?token=${token}`;
  const data = {
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
  return request(post, url, data);
};
/**
 * 注册人脸验证
 * @param {string} param {token,imagePath}
 */
export const faceRegister = param => {
  const { token, imagePath } = param;
  return image2Base64(imagePath).then(res => {
    const url = `/api/face/?token=${token}`;
    const data = {
      id: 1234,
      type: "face",
      subtype: "register",
      data: {
        base64: res,
        db: 1,
        content: "人脸数据描述"
      }
    };
    return request(post, url, data);
  });
};
/**
 * 更新实名信息
 * @param {object} param {token,nation,address,organization,date_start,date_end}
 */
export const realAuthUpdate = param => {
  const { token, nation, address, organization, date_start, date_end } = param;
  const url = `/api/realauth/?token=${token}`;
  const data = {
    id: 1234,
    type: "realauth",
    subtype: "update",
    data: {
      nation: nation,
      address: address,
      organization: organization,
      date_start: date_start,
      date_end: date_end
    }
  };
  return request(post, url, data);
};
/**
 * 上传头像或图片
 * @param {object} param {name,content,type,upload_to,if_loacl,base64}
 */
export const picUpload = param => {
  const { imagePath, name, content, type, upload_to, if_local, base64 } = param;
  return image2Base64(imagePath).then(res => {
    const url = "/api/pic/";
    const data = {
      id: 1234,
      type: "pic",
      subtype: "upload",
      data: {
        name: name,
        content: content || "",
        type: type,
        upload_to: upload_to,
        if_local: if_local || false,
        base64: res
      }
    };
    return request(post, url, data);
  });
};

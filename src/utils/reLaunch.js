import Taro from "@tarojs/taro";
import { tokenValidate } from "../actions/api";

/**
 * 特殊转跳，用于检测token并跳转,token不存在时转跳login界面
 * @param {callback} iteratee 当TOKEN验证正确时发起回调
 * @return {callback} itreratee(token,arguments)
 */
let reLaunch = iteratee => {
  const token = Taro.getStorageSync("token");
  if (!!token) {
    tokenValidate(token).then(res => {
      if (res.data.status == 0) {
        return iteratee(token, arguments);
      } else if (res.data.status == -101) {
        Taro.reLaunch({
          url: "/packageA/login/login"
        });
      }
    });
  } else {
    Taro.reLaunch({
      url: "/packageA/login/login"
    });
  }
};

export { reLaunch };

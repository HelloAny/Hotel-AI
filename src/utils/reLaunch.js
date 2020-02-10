import Taro from "@tarojs/taro";
import api from "../actions/api";

/**
 * 特殊转跳，用于检测token并跳转,token不存在时转跳login界面
 * @param {callback} iteratee 当TOKEN验证正确时发起回调
 * @return {callback} itreratee(token,arguments)
 */
let reLaunch = iteratee => {
  const token = Taro.getStorageSync("token");
  if (!!token) {
    api.tokenValidate(token).then(res => {
      if (res.data.status == 0) {
        return iteratee(token, arguments);
      } else if (res.data.status == -101) {
        Taro.showToast({
          title: "参数验证失败",
          icon: "none",
          duration: 2000
        });
      }
    });
  } else {
    Taro.reLaunch({
      url: "/pages/login/login"
    });
  }
};

export { reLaunch };

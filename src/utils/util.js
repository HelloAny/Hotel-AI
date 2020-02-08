//工具类
import Taro from "@tarojs/taro";
import md5 from "blueimp-md5";
import api from "../acitons/api";

export default {
  /**
   * MD5加密
   * @param {number} code 验证码*
   * @param {string} rand 加密值*
   */
  setMd5(code, rand) {
    return code && rand ? md5(code + rand) : -1;
  },
  /**
   * 特殊转跳，用于检测token并跳转,token不存在时转跳login界面
   * @param {callback} iteratee 当TOKEN验证正确时发起回调
   */
  reLaunch(iteratee) {
    const token = Taro.getStorage({
      key: "token",
      success: function(res) {
        return res;
      },
      fail: function() {
        console.log("调用错误");
      }
    });
    if (!!token) {
      api.tokenValidate(token).then(res => {
        if (res.data.status == 0) {
          return iteratee(arguments);
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
  }
};

import Taro from "@tarojs/taro";
import { observable, action } from "mobx";

/**
 * 暂时解决,后期协商
 */
function saveInfo(info) {
  Taro.setStorageSync("userInfo", info);
}

function getInfo() {
  let info = {
    id: "",
    userName: "",
    nickName: "",
    email: "",
    phone: "",
    ID: "",
    Portrait: "",
    if_face: ""
  };
  return Object.assign(info, Taro.getStorageSync("userInfo"));
}

/**
 * 个人信息存储
 */
class userInfo {
  /**
   * @type {{
      id: "",
      userName: "",
      nickName: "",
      email: "",
      phone: "",
      ID: "",
      Portrait: "",
      if_face: ""
    }}
   */
  @observable user = getInfo();

  /**
   * 设置个人信息
   */
  @action.bound setUserInfo(user) {
    this.user.id = user.id;
    this.user.userName = user.username;
    this.user.nickName = user.nickname || "游客B243";
    this.user.email = user.email;
    this.user.phone = user.phone;
    this.user.ID = user.ID;
    this.user.if_face = user.if_face;
    saveInfo(this.user); // 暂时
  }

  /**
   * 更新个人信息
   */
  @action.bound updateUserInfo(user) {
    this.user.userName = user.username;
    this.user.nickName = user.nickname;
    this.user.email = user.email;
    this.user.ID = user.real_auth_id;
  }

  @action.bound setUserPortrait(user) {}
  @action.bound setUserID(idcard) {
    this.user.ID = idcard;
  }
}

export default new userInfo();

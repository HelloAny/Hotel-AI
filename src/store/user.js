import { observable, action } from "mobx";

/**
 * 个人信息存储
 */
class userInfo {
  @observable user = {
    id: "",
    userName: "",
    nickName: "",
    email: "",
    phone: "",
    ID: "",
    Portrait: "",
    if_face: ""
  };

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

export default userInfo;

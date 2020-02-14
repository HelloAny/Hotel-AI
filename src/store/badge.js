import { observable, action } from "mobx";

class userInfo {
  @observable user = {
    userName: "",
    nickName: "",
    email: "",
    phone: "",
    ID: ""
  };

  @action.bound setUserInfo(user) {
    this.user.userName = user.username;
    this.user.nickName = user.nickname;
    this.user.email = user.email;
    this.user.phone = user.phone;
    this.user.ID = user.ID;
  }

  @action.bound updateUserInfo(user) {
    this.user.userName = user.username;
    this.user.nickName = user.nickname;
    this.user.email = user.email;
    this.user.ID = user.real_auth_id;
  }
}

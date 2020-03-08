import Taro, { Component } from "@tarojs/taro";
import { Provider, onError } from "@tarojs/mobx";
import { autorun } from "mobx";
import * as store from "@store";
import { objectDeepCompare } from "@utils";
import Server from "@service/SocketServer";
import Index from "./pages/index";
// import "taro-ui/dist/style/index.scss";
import "./app.scss";

//*************taro-ui组件按需引入！！！！*****************

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// 自动开始连接socket,尝试初始化身份信息
!(function() {
  Server.connect();
  Server.emit(
    "preLogin",
    Object.assign({}, store.userStore.user, {
      token: Taro.getStorageSync("token")
    })
  );
  autorun(() => {
    let userInfo = store.userStore.user;
    if (Server.status == "login") Server.emit("updateInfo", userInfo);
  });
})();

onError(error => {
  console.log("mobx global error listener:", error);
});

class App extends Component {
  componentDidMount() {}

  config = {
    pages: [
      "pages/notify/index",
      "pages/journey/index",
      "pages/account/account"
    ],
    subpackages: [
      {
        root: "packageA",
        pages: [
          "login/registerByPsw",
          "login/forgetPsw",
          "login/loginByPsw",
          "login/login",
          "hotelOrder/hotelOrder",
          "user/user",
          "user/changeName/changeName",
          "user/changeEmail/changeEmail",
          "realAuth/realAuth",
          "realAuth/detailAuth/detailAuth"
        ]
      },
      {
        root: "packageB",
        pages: ["ActivityService/activityService"]
      },
      {
        root: "packageC",
        pages: [
          "pages/details/index",
          "pages/traveler/index",
          "pages/lodgerFinder/index",
          "pages/addTrip/chose",
          "pages/addTrip/tripForm",
          "pages/IM/index",
          "pages/receipt/index",
          "pages/receipt/result"
        ]
      }
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black",
      enablePullDownRefresh: true,
      backgroundTextStyle: "dark"
    },
    tabBar: {
      color: "#ccc",
      selectedColor: "#00f",
      backgroundColor: "#fff",
      borderStyle: "black",
      position: "bottom",
      list: [
        {
          pagePath: "pages/account/account",
          text: "我的"
        },
        {
          pagePath: "pages/journey/index",
          text: "行程"
        },
        {
          pagePath: "pages/notify/index",
          text: "消息"
        }
      ]
    }
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));

// 对象深度比较函数，注入到所有组件
Component.prototype.compare = function(nextProps, nextState) {
  return (
    objectDeepCompare(this.props, nextProps, this.propsKeys) &&
    objectDeepCompare(this.state, nextState, this.stateKeys)
  );
};

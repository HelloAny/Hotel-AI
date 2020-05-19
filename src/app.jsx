import Taro, { Component } from "@tarojs/taro";
import { Provider, onError } from "@tarojs/mobx";
import { autorun } from "mobx";
import * as store from "@store";
import { objectDeepCompare } from "@utils";
import Server from "@service/SocketServer";
import Index from "./pages/index";
import "taro-ui/dist/style/index.scss";

import "./app.scss";
// import "./assets/icons/fontsOne/iconfont.css";
// import "./assets/icons/fonts/iconfont.css";

//*************taro-ui组件按需引入！！！！*****************

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

let onNotify = () => {
  Taro.showModal({
    title: "通知",
    content: "您有一条新的通知，点击确定立刻前往查看"
  }).then(res => {
    if (res.confirm) Taro.switchTab({ url: "/pages/notify/index" });
  });
};

// 自动开始连接socket,尝试初始化身份信息,绑定全局事件
!(function() {
  Server.connect();
  Server.on("notify", onNotify);
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
  config = {
    pages: ["pages/home/index", "pages/journey/index", "pages/notify/index"],
    permission: {
      "scope.userLocation": {
        desc: "你的位置信息将用于小程序位置接口的效果展示"
      }
    },
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
          "realAuth/detailAuth/detailAuth",
          "bill/bill",
          "setting/setting"
        ]
      },
      {
        root: "packageB",
        pages: [
          "Reservation/page/homePage/homePage",
          "Reservation/page/bookHotel/bookHotel",
          "Reservation/page/hotelDetail/hotelDetail",
          "Reservation/page/searchHotel/searchHotel",
          "Reservation/page/hotelFilter/hotelFilter",
          "ActivityService/activityService"
        ]
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
          "pages/receipt/result",
          "pages/servicePanel/index",
          "pages/servicePanel/pages/cleaner",
          "pages/servicePanel/pages/conv",
          "pages/servicePanel/pages/hotelStore",
          "pages/servicePanel/pages/medicine",
          "pages/servicePanel/pages/order",
          "pages/servicePanel/pages/SOS",
          "pages/servicePanel/pages/tool",
          "pages/servicePanel/pages/vip"
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
          pagePath: "pages/home/index",
          text: "首页"
        },
        {
          pagePath: "pages/journey/index",
          text: "行程",
          iconPath: "assets/icons/journey.png",
          selectedIconPath: "assets/icons/journey-active.png"
        },
        {
          pagePath: "pages/notify/index",
          text: "消息",
          iconPath: "assets/icons/msg.png",
          selectedIconPath: "assets/icons/msg-active.png"
        },
        {
          pagePath: "pages/account/account",
          text: "我的"
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

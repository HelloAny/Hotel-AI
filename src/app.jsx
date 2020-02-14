import Taro, { Component } from "@tarojs/taro";
import { Provider, onError } from "@tarojs/mobx";
import "taro-ui/dist/style/index.scss";
import Index from "./pages/index";

import userInfo from "./store/user";
import "./assets/icons/fonts/iconfont.css";
import "./app.sass";

//*************taro-ui组件按需引入！！！！*****************

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  userStore: new userInfo()
};

onError(error => {
  console.log("mobx global error listener:", error);
});

class App extends Component {
  componentDidMount() {}

  config = {
    pages: [
      "pages/realAuth/realAuth",
      "pages/account/account",
      "pages/user/user",
      "pages/user/HCchangeName/HCchangeName",
      "pages/login/registerByPsw",
      "pages/login/forgetPsw",
      "pages/login/loginByPsw",
      "pages/login/login",
      "pages/CustomerService/index",
      "pages/index/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      color: "#ccc",
      selectedColor: "#00f",
      backgroundColor: "#fff",
      borderStyle: "black",
      position: "top",
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页"
        },
        {
          pagePath: "pages/account/account",
          text: "我的"
        },
        {
          pagePath: "pages/realAuth/realAuth",
          text: "修改个人信息"
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

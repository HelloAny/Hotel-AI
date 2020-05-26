import Taro, { PureComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";
// import { CommonEventFunction，ITouchEvent } from "@tarojs/components/types/common";
import { observer, inject } from "@tarojs/mobx";

import "./index.sass";

export default class HClist extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static defaultProps = {
    lists: [
      {
        id: Number,
        name: String,
        icon: String,
        hr: Boolean
      }
    ]
  };

  static options = {
    addGlobalClass: true
  };

  // onClick=(event:ITouchEvent)=>{
  //   CommonEventFunction(event)
  // }

  /**
   * 路由跳转
   * @param {string} url
   */
  navgiateTo(url) {
    if (url == "kefu") {
      Taro.showToast({
        title: "系统升级中",
        duration: 2000
      })
      return
    }
    Taro.navigateTo({
      url: url
    });
  }

  renderList = () => {
    const { lists, url } = this.props;
    const list = lists.map(item => {
      return (
        <View taroKey={item.id} onClick={this.navgiateTo.bind(this, item.url)}>
          <View className="account_list at-row at-row__align--center">
            <View className="at-col at-col-2">
              <View className={"icon " + "iconfont " + item.icon}></View>
            </View>
            <View className="at-col at-col-8">
              <View className="information_title">{item.name}</View>
            </View>
            <View className="at-col at-col-1">
              <View className="arch">›</View>
            </View>
          </View>
          {item.hr ? (
            <View>
              <View className="hr"></View>
              <View className="hr"></View>
            </View>
          ) : (
              <View></View>
            )}
        </View>
      );
    });
    return <View className="">{list}</View>;
  };
  render() {
    return <View className="container">{this.renderList()}</View>;
  }
}

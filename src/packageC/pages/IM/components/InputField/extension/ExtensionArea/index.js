import Taro, { Component } from "@tarojs/taro";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";

import "../../../../assets/style/extension/extensionArea.scss";

export default class ExtensionArea extends Component {
  static options = {
    addGlobalClass: true
  };

  static defaultProps = {
    play: false,
    list: {},
    onSelect: () => {}
  };

  state = {
    list: [[]]
  };

  propsKeys = ["play", "list"];

  stateKeys = [];

  setTabList(list) {
    let res = [[]];
    let index = 0;
    for (const key in list) {
      let item = list[key];
      if (item.tab && item.position === "base") {
        if (res[index].length >= 8) {
          index++;
        }
        res[index].push(Object.assign({ name: key }, item.tab));
      }
    }
    this.setState({
      list: res
    });
  }

  componentWillReceiveProps(nextProps) {
    const list = nextProps.list || {};
    this.setTabList(list);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    if (flag) console.log("ExtensionArea", { nextProps, nextState });
    return flag;
  }

  componentWillUpdate() {
    console.time("ExtensionArea");
  }

  componentDidUpdate() {
    console.timeEnd("ExtensionArea");
  }

  render() {
    const { play, onSelect } = this.props;
    const { list } = this.state;
    return (
      <View
        className="extension-box"
        style={{ display: play ? "block" : "none" }}
      >
        <Swiper className="swiper" indicatorDots circular>
          {list.map(swiper => {
            return (
              <SwiperItem>
                <View className="swiper-item">
                  {swiper.map(listItem => {
                    return (
                      <View className="list-item" onClick={onSelect.bind(null,listItem.name)}>
                        <Image
                          className={`icon iconfont ${
                            listItem.iconType === "class" ? listItem.icon : ""
                          }`}
                          src={listItem.iconType === "src" ? listItem.icon : ""}
                        />
                        <Text className="title">{listItem.tip}</Text>
                      </View>
                    );
                  })}
                </View>
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
    );
  }
}

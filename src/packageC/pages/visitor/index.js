import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import NavBar from "../../components/Navbar";

export default class Visitor extends Component {
  static defaultProps = {};

  state = {}

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Visitor",nextProps, nextState);
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("Visitor");
  }

  componentDidUpdate() {
    console.timeEnd("Visitor");
  }

  render() {
    return (
      <View>
        <NavBar/>
      </View>
    );
  }
}

import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import NavBar from "../../components/Navbar";

export default class AddTrip extends Component {
  static defaultProps = {};

  state = {};

  propsKeys = [];

  stateKeys = [];

  shouldComponentUpdate(nextProps, nextState) {
    let flag = !this.compare(nextProps, nextState);
    return flag;
  }

  componentWillUpdate() {
    console.time("AddTrip");
  }

  componentDidUpdate() {
    console.timeEnd("AddTrip");
  }

  render() {
    return <View>AddTrip</View>;
  }
}

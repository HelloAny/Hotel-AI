import Taro, { Component } from "@tarojs/taro";
import { View, PickerView, PickerViewColumn } from "@tarojs/components";
import { getDistrict } from "../../../../actions/map";
import { reLaunch } from "../../../../utils"; //测试用
import { observer, inject } from "@tarojs/mobx";

import "./HCdistrict.sass";

@inject("userStore")
@observer
class HCdistrict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      province: [],
      city: [],
      district: [],
      json: [],
      value: [0, 0, 0]
    };
  }
  static options = {
    addGlobalClass: true
  };
  static defaultProps = {};

  /**
   * 监听地区变动
   * @event {object}
   */
  district(event) {
    const { json, value } = this.state;
    let order = event.detail.value;
    for (let tip = 0; tip < order.length; tip++) {
      if (order[tip] !== value[tip]) {
        for (let tipAgain = tip + 1; tipAgain < order.length; tipAgain++) {
          order[tipAgain] = 0;
        }
        break;
      }
    }
    this.setState({
      province: json,
      city: json[order[0]].districts,
      district: json[order[0]].districts[order[1]].districts,
      value: order
    });
  }

  componentWillMount() {
    //获取接口
    getDistrict().then(res => {
      this.setState(
        {
          json: res.data.data.districts[0].districts
        },
        () => {
          const { json } = this.state;
          this.setState({
            province: json,
            city: json[0].districts,
            district: json[0].districts[0].districts
          });
        }
      );
    });
  }
  render() {
    const { province, city, district, value } = this.state;
    return (
      <View>
        <PickerView
          indicator-style="height: 50px;"
          style="width: 100%; height: 300px;"
          onChange={this.district}
          value={value}
          maskClass="pickView"
        >
          <PickerViewColumn>
            {province.map(item => {
              return (
                <View taroKey={item.name} className="pickViewColumn">
                  {item.name}
                </View>
              );
            })}
          </PickerViewColumn>
          <PickerViewColumn>
            {city.map(item => {
              return (
                <View taroKey={item.name} className="pickViewColumn">
                  {item.name}
                </View>
              );
            })}
          </PickerViewColumn>
          <PickerViewColumn>
            {district.map(item => {
              return (
                <View taroKey={item.name} className="pickViewColumn">
                  {item.name}
                </View>
              );
            })}
          </PickerViewColumn>
        </PickerView>
      </View>
    );
  }
}

export default HCdistrict;

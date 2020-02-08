import Taro, { Component } from "@tarojs/taro";
import "./account.sass";
import { View } from "@tarojs/components";
import { AtAvatar } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";

import "./HClistline";

class HClistline extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }

  renderListMaxNumber = (MaxNumber)=>{
    const flexNumber = MaxNumber || 3
    return flexNumber
  }

  renderList = ()=>{
    if(this.props.listLine.length>this.renderListMaxNumber(this.props.MaxNumber)){
      console.log("超过最大数量!")
      return
    }
    const list = this.props.listLine.map(item=>{
      return(
        <View className="at-col" onClick={}>{item.name}</View>
      )
    })
    return(
      <View className="at-row">
        {list}
      </View>
    )
  }
  render() {

    return (

    );
  }
}

export default HClistline

import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";

import "./index.sass";

@inject("counterStore")
@observer
class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor: '#ffc',
  }

  state = {
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello World!'
      }]
    }]
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render () {
    const { counterStore: { counter } } = this.props
    return (
      <View className='index'>
        <RichText nodes={this.state.nodes} />
        < View >
        < View className="iconfont icon-jian" style="font-size:30px;color:red" >
        </View >
      </View >
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
      </View>
    )
  }
}

export default Index;

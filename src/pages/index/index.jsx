import Taro, {
  Component
} from '@tarojs/taro'
import {
  View,
  Button,
  Text
} from '@tarojs/components'
import {
  observer,
  inject
} from '@tarojs/mobx'
import {
  AtButton
} from 'taro-ui'
import './index.sass'



@inject('counterStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  render() {
    return (
      < View >
        < View className="iconfont icon-jian" style="font-size:30px;color:red" >
        </View >
      </View >

    )

  }
}
export default Index

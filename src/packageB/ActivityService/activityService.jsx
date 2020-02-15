import Taro, { Component } from '@tarojs/taro'
import { Text, View  } from '@tarojs/components'

import Kinds from './Kinds/kinds'
import List from './List/list'

import './activityService.css'
import './body.css'
 class ActivityService extends Component {

  constructor(){
    super(...arguments);
    this.state={
      currentKind:null
    };
  }


  selectId(selectKinds){  //父组件传给kinds方法获取id
    this.setState({
      currentKind:selectKinds   //把拿到的id存在currentId中
    })
  }



  config = {
    navigationBarTitleText: '活动',
    navigationBarBackgroundColor: '#ffc',
  }




  render () {
    return (
      <View className='activityService'>

        <View className='kinds_body'>
          <View className='kinds'>
           <Kinds onSelectId={this.selectId.bind(this)} />   {/* 给子组件绑定获取id的方法 */}
          </View>

          <View className='at-col'>
            <List positionKind={this.state.currentKind}/>   {/* 声明一个属性positionId，把kind子组件传过来的Id传到list子组件中 */}
          </View>

        </View>
      </View>
    )
  }
}
export default ActivityService;



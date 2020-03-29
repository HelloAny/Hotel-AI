import Taro, { Component, setBackgroundColor } from '@tarojs/taro'
import { Text, View,ScrollView  } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtCard } from 'taro-ui'

import '../list.css'
 class List extends Component {

  constructor(){
    super(...arguments);
    this.state={
      tabList:[{ title: '目前情况' }, { title: '今日菜单' }]
    };

  }

  onScrollToUpper() {}// or 使用箭头函数  // onScrollToUpper = () => {}
  onScroll(e){
    console.log(e.detail)
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    const scrollStyle = {
      height: '748px'
    }
    const scrollTop = 10
    const Threshold = 10

    let {current,tabList}=this.state;

    return (
    <ScrollView
    className='scrollview'
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        style={scrollStyle}
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
        onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
        onScroll={this.onScroll}
        scrollIntoView={this.props.positionKind.id}

    >



      <View className='list'>
            <AtTabs  current={current} onClick={this.handleClick.bind(this)} tabList={tabList}>
                <AtTabsPane>
                    <View id={this.props.positionKind.id}>{/* 做定位所以包一层View */}
                        <View className='list_items' >
                            <View className='item' >
                                <View className='title'><Text >{this.props.positionKind.name}使用情况：</Text></View>
                                <Text className='num'>78/100</Text>
                            </View>
                            <View className='item'>
                            <View className='title'><Text >{this.props.positionKind.name}目前人数：</Text></View>
                                <Text className='num'>100人</Text>
                            </View>
                            <View className='item'>
                                <Text className='num' decode="true">目前时段空位较多</Text>
                                <Text className='suggest'>建议用餐😁</Text>
                            </View>
                        </View>
                    </View>
    {/* 不同的定位*/}
                    <View id=''>   {/* 做定位所以包一层View */}
                        <View className='list_items' >
                            <View className='item' >
                                <Text>哈哈哈哈哈哈哈哈：</Text>
                                <Text className='num'>78/100</Text>
                            </View>
                            <View className='item'>
                                <Text>哈哈哈哈哈哈哈哈：</Text>
                                <Text className='num'>100人</Text>
                            </View>
                            <View className='item'>
                                <Text>哈哈哈哈哈哈哈哈</Text>
                            </View>
                        </View>
                        <View className='list_items' >
                            <View className='item' >
                                <Text>哈哈哈哈哈哈哈哈：</Text>
                                <Text className='num'>78/100</Text>
                            </View>
                            <View className='item'>
                                <Text>哈哈哈哈哈哈哈哈：</Text>
                                <Text className='num'>100人</Text>
                            </View>
                            <View className='item'>
                                <Text>哈哈哈哈哈哈哈哈</Text>
                            </View>
                        </View>
                    </View>
                </AtTabsPane>
                <AtTabsPane>菜单</AtTabsPane>
            </AtTabs>
      </View>
    </ScrollView>
    )
  }
}
export default List;




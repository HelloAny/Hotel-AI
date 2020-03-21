import { Block, View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import SettingItemTmpl from '../../imports/SettingItemTmpl.js'
import './hotelFilter.scss'


class HotelFilter extends Taro.Component {
  config = {}

  render() {
    return (
      <Block>
        <View className="filterContent">
          <SettingItemTmpl
            state={{ caption: '酒店位置', value: '', needIcon: false }}
          ></SettingItemTmpl>
          <SettingItemTmpl
            state={{ caption: '行政区域 ', value: '南山区 ', needIcon: false }}
          ></SettingItemTmpl>
          <SettingItemTmpl
            state={{ caption: '商圈 ', value: 'xx商圈 ', needIcon: false }}
          ></SettingItemTmpl>
          <SettingItemTmpl
            state={{ caption: '地铁 ', value: '地铁站 ', needIcon: false }}
          ></SettingItemTmpl>
        </View>
        <View className="filterMenu">
          <Text className="clear">清除筛选</Text>
          <Text className="confirm">确定</Text>
        </View>
      </Block>
    )
  }
} // pages/hotelFilter/hotelFilter.js

export default HotelFilter;

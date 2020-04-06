import { Block, View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import SettingItemTmpl from '../../imports/SettingItemTmpl'
import './hotelFilter.scss'


class HotelFilter extends Taro.Component {
  config = {}

  render() {
    return (
      <Block>
        <View className="filterContent">
          <SettingItemTmpl
            caption='酒店位置' value=''
          />
          <SettingItemTmpl
            caption='行政区域' value='南山区 '
          />
          <SettingItemTmpl
            caption='商圈' value='xx商圈 '
          />
          <SettingItemTmpl
            caption='地铁' value='地铁站 '
          />
        </View>
        <View className="filterMenu">
          <Text className="clear">清除筛选</Text>
          <Text className="confirm">确定</Text>
        </View>
      </Block>
    )
  }
}

export default HotelFilter;

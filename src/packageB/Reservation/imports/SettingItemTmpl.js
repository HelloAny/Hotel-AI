import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class SettingItemTmpl extends Taro.Component {
  render() {
    const {
     caption, value, needIcon
    } = this.props.state
    return (
      <Block>
        <View className="settingItem">
          <Text className="caption">{caption}</Text>
          <Text className="value">{value}</Text>
          {needIcon && (
            <Image
              src="../../res/images/ic_right_arrow.png"
              mode="widthFix"
              className="icon"
            ></Image>
          )}
        </View>
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}

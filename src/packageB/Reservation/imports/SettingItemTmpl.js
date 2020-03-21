import { Block, View, Image, Text,Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ic_right_arrow from '../../res/images/ic_right_arrow.png'

export default class SettingItemTmpl extends Taro.Component {
  render() {
    const {
     caption, value, needIcon,isInput,hint,inputType
    } = this.props.state
    return (
      <Block>
        <View className="settingItem">
          <Text className="caption">{caption}</Text>
          {value && (
            <Text className="value">{value}</Text>
          )}

          {needIcon && (
            <Image
              //src={ic_right_arrow}
              mode="widthFix"
              className="icon"
            ></Image>
          )}
          {isInput && (
            <Input
            placeholder={hint}
            type={inputType}
            >
            </Input>
          )}
        </View>
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}

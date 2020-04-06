import { Block, View, Swiper, Image, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class SearchInputTmpl extends Taro.Component {
  render() {
    const {
      data: { hint, confirmTap }
    } = this.props
    return (
      <Block>
        <View className="common_search_input">
          <Image
            src="../../res/images/search.png"
            mode="scaleToFill"
            className="common_search_img"
          ></Image>
          <Input
            placeholder={hint}
            onConfirm={confirmTap}
            style="width:100%;"
          ></Input>
        </View>
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}

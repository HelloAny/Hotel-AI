import { Block, View, Image, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './clearInput.scss'
import clear from './clear.png'
import search from  './search.png'


class ClearInput extends Taro.Component {
  static defaultProps ={
    inputHint: {
      type: String,
      value: '搜索'
    },
    // inputIcon: {
    //   type: String,
    //   value: search.png
    // },
    inputType: {
      type: String,
      value: 'text'
    },
    isPassword: {
      type: Boolean,
      value: false
    },
    confirmType: {
      type: String,
      value: 'done'
    }
  }
  static externalClasses= ['input-class', 'icon-class']

  constructor(){
    super(...arguments);
    this.state={
      isClearShow: false,
      inputValue: ''
    };
  }
  config = {
    component: true
  }

inputListener(e) {
  var value = e.detail.value
  var cursor = e.detail.cursor
  if (value === null || value === undefined || value.length === 0) {
    this.setState({
      isClearShow: false
    })
  } else {
    this.setState({
      isClearShow: true
    })
  }
  var detail = {
    value: value,
    cursor: cursor
  }
  this.triggerEvent('inputListener', detail)
}

inputConfirm(e) {
  var value = e.detail.value
  var detail = {
    value: value
  }
  this.triggerEvent('inputConfirm', detail)
}

clearTap() {
  this.setState({
    isClearShow: false,
    inputValue: ''
  })
}
  render() {
    const {
      //inputIcon,
      inputHint,
      confirmTap,
      inputValue,
      inputType,
      isPassword,
      confirmType,
      isClearShow
    } = this.state
    return (
      <View className="input-class">
        {/* <Image
          src={search}
          //mode="scaleToFill"
          className="img"
        ></Image> */}
        <Input
          className='input'
          placeholder={inputHint}
          onConfirm={confirmTap}
          style="flex:1;width:100%;padding-left:12rpx;"
          onInput={this.inputListener}
          onConfirm={this.inputConfirm}
          value={inputValue}
          type={inputType}
          password={isPassword}
          confirmType={confirmType}
        ></Input>
        {/* <Image
          className={isClearShow ? 'clearImgShow' : 'clearImgHide'}
          src={clear}
          onClick={this.clearTap}
          mode="widthFix"
        ></Image> */}
      </View>
    )
  }
}

export default ClearInput;

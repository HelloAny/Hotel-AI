import Taro from "@tarojs/taro";
import { View, Image, Text, Input, Picker } from "@tarojs/components";

export default class SettingItemTmpl extends Taro.Component {
  static options = {
    addGlobalClass: true,
  };

  defaultProps = {
    onInput: () => {},
  };

  state = {
    caption: "",
    v: "",
    value: "",
    hint: "",
    inputType: "text",
    needIcon: false,
    isInput: false,
    isPicker: false,
  };

  constructor(props) {
    super();
    Object.assign(this.state, { ...props });
  }

  handleInput(e) {
    this.setState({
      v: e.detail.value,
    });
    if (this.props.onInput) this.props.onInput(e.detail.value);
  }

  handleTimeChange(e) {
    this.setState({
      hint: e.detail.value,
    });
    if (this.props.onInput) this.props.onInput(e.detail.value);
  }

  componentWillReceiveProps(props) {
    this.setState({ ...props });
  }

  render() {
    const {
      caption,
      v,
      value,
      isInput,
      hint,
      inputType,
      needIcon,
    } = this.state;
    return (
      <View>
        <View className="settingItem">
          <Text className="caption">{caption}</Text>
          {value && <Text className="value">{value}</Text>}
          {needIcon && (
            <Image
              src="https://hotel-ai-1257814705.cos.ap-shanghai.myqcloud.com/%E5%89%8D%E7%AB%AF/reservation/ic_right_arrow.png"
              mode="widthFix"
              className="icon"
            ></Image>
          )}
          {isInput && (
            <Input
              placeholder={hint}
              value={v}
              type={inputType}
              onInput={this.handleInput.bind(this)}
            />
          )}
          {isPicker && (
            <Picker
              mode="time"
              value={hint}
              start="13:00"
              onChange={this.handleTimeChange.bind(this)}
            >
              {hint}
            </Picker>
          )}
        </View>
      </View>
    );
  }
}

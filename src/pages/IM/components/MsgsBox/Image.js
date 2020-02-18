import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { getDeviceInfo } from "../../../../utils";

export default class ImageMsg extends Component {
  static defaultProps = {
    description: null
  };

  compute(width = 90, height = 90) {
    let { windowWidth } = getDeviceInfo();
    let scale = width / height;
    if (scale < 0.8) {
      if (width) width = Math.min(windowWidth * 0.5, width);
      if (height) height = width / scale;
    } else {
      if (width) width = Math.min(windowWidth * 0.7, width);
      if (height) height = width / scale;
    }
    return { width, height };
  }

  render() {
    const { description } = this.props;
    if (!description) return;
    const { width, height, path } = description;
    const size = this.compute(width, height);
    return (
      <View>
        <Image
          style={{
            ...styles.img,
            height: size.height + "Px",
            width: size.width + "Px"
          }}
          mode="widthFix"
          src={path}
        />
      </View>
    );
  }
}

const styles = {
  img: {
    maxWidth: "100%"
  }
};

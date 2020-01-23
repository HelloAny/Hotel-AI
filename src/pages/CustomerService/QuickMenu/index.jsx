import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";

export default class QuickMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [
        {
          title: "人工服务"
        }
      ]
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...props
    });
  }

  render() {
    return (
      <View>
        <Button plain style={styles.btn}>
          人工服务
        </Button>
      </View>
    );
  }
}

const styles = {
  btn: {
    display: 'inline-block',
    borderColor: '#007DFF',
    fontSize:'12px',
    borderRadius: '20px',
    color: '#007DFF',
    margin:'5px 8px'
  }
};

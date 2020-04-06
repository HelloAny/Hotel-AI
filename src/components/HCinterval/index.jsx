import Taro, { PureComponent } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.sass";

class Interval extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counter: "",
      context: ""
    };
  }

  static defaultProps = {
    className: "",
    changeIntervalStatus: () => {},
    count: 60,
    code_ts: "获取验证码"
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      const { changeIntervalStatus } = this.props;
      this.setState(
        {
          counter: this.props.count--,
          context: this.props.count + "S重发"
        },
        () => {
          if (this.props.count === 0) {
            changeIntervalStatus();
            this.setState({
              counter: this.props.count,
              context: this.props.code_ts
            });
          }
        }
      );
    }, 1000);
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  render() {
    return <View className={this.props.className}>{this.state.context}</View>;
  }
}

export default Interval;

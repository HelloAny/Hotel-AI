import Taro, { Component } from "@tarojs/taro"
import { View, Button, Text } from '@tarojs/components'

export default class MessageBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            from: "hotel",
            content: "你好",
            time: "",
            ...props.message
        }
    }

    render() {
        let { from } = this.state
        let position = from.indexOf("hotel") == -1 ? styles.right : styles.left
        return (
            <View style={{ ...styles.MessageBox, ...position }}>
                <Text> {this.state.content} </Text>
            </View>
        );
    }
}

const styles = {
    MessageBox: {
        display: 'inline-block',
        borderRadius: "16px",
        padding: "10px",
        fontSize: "14px",
        maxWidth: "70%",
        margin: "15px 10px",
    },
    left: {
        color: "#000",
        backgroundColor: "#fff",
        borderBottomLeftRadius: "6px",
        float: "left"
    },
    right: {
        color: "#fff",
        backgroundColor: "#007DFF",
        borderBottomRightRadius: "6px",
        float: "right"
    }
}
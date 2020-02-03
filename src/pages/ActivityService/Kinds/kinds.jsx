import Taro,{Component} from '@tarojs/taro';
import {View,Text,Image} from '@tarojs/components';

import '../kinds.css'

class Kinds extends Component{
  constructor(){
    super(...arguments);
    this.state={
      selectKinds:null,    //默认不选中
      kinds:[
            {name:"餐厅",id:"restaurant"},
            {name:"健身房",id:"gym"},
            {name:"游泳池",id:"swimming"},
            {name:"会议厅",id:"conference"},
            {name:"美容按摩",id:"spa"},
            {name:"洗衣房",id:"laundry"}]
    };
  }
  clickHandle(item){
      if(this.state.selectKinds&&this.state.selectKinds.id!=item.id){
        this.setState({selectKinds:item},()=>{
          this.props.onSelectId&&this.props.onSelectId(this.state.selectKinds)
        })  //先判断onSelectId这个函数是否存在
      }else if(!this.state.selectKinds){
        this.setState({selectKinds:item},()=>{
          this.props.onSelectId&&this.props.onSelectId(this.state.selectKinds)
        })
      }
      //console.log(item.id)
  }

  render(){
    let {kinds,selectKinds}=this.state;
    return (
      <View className="kinds">{
        //对state中数组进行循环
        kinds.map((item,index)=>{
            return (
            <Text onClick={this.clickHandle.bind(this,item)}
                  className={"kinds_name " + ((selectKinds&&selectKinds.id == item.id)?"select":"")}
                  key={item.id}>
            {item.name}
            </Text>
            )
        })
      }

      </View>
    )
  }
}
export default Kinds;

// import {
//   Block,
//   View,
//   Swiper,
//   Image,
//   Input,
//   SwiperItem,
//   Text,
//   ScrollView,
//   Navigator
// } from '@tarojs/components'
// import Taro from '@tarojs/taro'
// import ClearInput from '../../components/clearInput/clearInput'
// import OrderListTmpl from '../../imports/OrderListTmpl.js'
// import SearchInputTmpl from '../../imports/SearchInputTmpl.js'
// import './orderList.scss'


// class OrderList extends Taro.Component {
// constructor(){
//   super(...arguments);
//   this.state={
//     stateList: ['全部', '待入住', '已入住', '已取消'],
//     common_row: {
//       caption_class: 'caption',
//       value_class: 'value'
//     },
//     selectedIndex: 0,

//     //数据列表数组
//     orderAll: undefined,
//     orderTodo: undefined,
//     orderDone: undefined,
//     orderCancel: undefined,

//     //是否可以上拉加载
//     allLoadEnable: false,
//     todoLoadEnable: false,
//     doneLoadEnable: false,
//     cancelLoadEnable: false,

//     //数据为空或请求失败的提示语
//     allEmpty: '全部订单为空',
//     todoEmpty: '未入住订单为空',
//     doneEmpty: '已入住订单为空',
//     cancelEmpty: '已取消订单为空'
//   };
// }

// componentWillMount(options) {
//   console.log(options)
//   var pageType = options.type
//   if (pageType == 'all') {
//     this.setState({
//       selectedIndex: 0
//     })
//   } else if (pageType == 'todo') {
//     this.setState({
//       selectedIndex: 1
//     })
//   }

//   var that = this
//   wx: setTimeout(function() {
//     that.setState({
//       orderAll: [],
//       orderTodo: [],
//       orderDone: [],
//       orderCancel: []
//     })
//   }, 2000)
// }

// swiperChange(e) {
//   var detailIndex = e.detail.current
//   var source = e.detail.source
//   if (this.selectedIndex != detailIndex && source == 'touch') {
//     this.setSate({
//       selectedIndex: detailIndex
//     })
//   }
// }

// turnPage(e) {
//   var that = this
//   var dataIndex = e.currentTarget.dataset.index
//   if (this.state.selectedIndex != dataIndex) {
//     this.setState({
//       selectedIndex: dataIndex
//     })
//   } else {
//     if (this.state.selectedIndex == 0) {
//       this.setState({
//         orderAll: null
//       })
//       wx: setTimeout(function() {
//         that.setState({
//           orderAll: []
//         })
//       }, 2000)
//     } else if (this.state.selectedIndex == 1) {
//       this.setState({
//         orderTodo: null
//       })
//       wx: setTimeout(function() {
//         that.setState({
//           orderTodo: []
//         })
//       }, 2000)
//     } else if (this.state.selectedIndex == 2) {
//       this.setState({
//         orderDone: null
//       })
//       wx: setTimeout(function() {
//         that.setState({
//           orderDone: []
//         })
//       }, 2000)
//     } else if (this.state.selectedIndex == 3) {
//       this.setState({
//         orderCancel: null
//       })
//       wx: setTimeout(function() {
//         that.setState({
//           orderCancel: []
//         })
//       }, 2000)
//     }
//   }
// }

// /**
//  * 搜索订单
//  */
// searchEvent(e) {}
// /**
//  * 搜索框输入监听
//  */
// inputListener(e) {}
//   config = {
//     navigationBarTitleText: '我的订单'
//   }

//   render() {
//     const {
//       stateList,
//       selectedIndex,
//       orderAll,
//       allLoadEnable,
//       common_row,
//       allEmpty,
//       orderTodo,
//       todoLoadEnable,
//       todoEmpty,
//       orderDone,
//       doneLoadEnable,
//       doneEmpty,
//       orderCancel,
//       cancelLoadEnable,
//       cancelEmpty
//     } = this.state
//     return (
//       <View className="order_contain">
//         <View style="width:100%;background:#f2f2f2;">
//           <Clearinput
//             inputHint="搜索订单"
//             iconClass="common_search_img"
//             inputClass="common_search_input"
//             confirmType="search"
//             onInputListener={this.inputListener}
//             onInputConfirm={this.searchEvent}
//           ></Clearinput>
//           <View className="header_tab">
//             {stateList.map((item, index) => {
//               return (
//                 <Block>
//                   <View
//                     className={
//                       selectedIndex == index
//                         ? 'tab_item_selected'
//                         : 'tab_item_default'
//                     }
//                     onClick={this.turnPage}
//                     data-index={index}
//                     hoverClass="tab_item_hover"
//                   >
//                     {item}
//                   </View>
//                 </Block>
//               )
//             })}
//           </View>
//         </View>
//         <Swiper
//           current={selectedIndex}
//           onChange={this.swiperChange}
//           style="flex:1;"
//         >
//           <OrderListTmpl
//             state={{
//               orderList: orderAll,
//               loadEnable: allLoadEnable,
//               common_row: common_row,
//               scrolltolower: 'allScrollLower',
//               emptyMessage: allEmpty,
//               currentIndex: 1
//             }}
//           ></OrderListTmpl>
//           <OrderListTmpl
//             state={{
//               orderList: orderTodo,
//               loadEnable: todoLoadEnable,
//               common_row: common_row,
//               scrolltolower: 'todoScrollLower',
//               emptyMessage: todoEmpty,
//               currentIndex: 2
//             }}
//           ></OrderListTmpl>
//           <OrderListTmpl
//             state={{
//               orderList: orderDone,
//               loadEnable: doneLoadEnable,
//               common_row: common_row,
//               scrolltolower: 'doneScrollLower',
//               emptyMessage: doneEmpty,
//               currentIndex: 3
//             }}
//           ></OrderListTmpl>
//           <OrderListTmpl
//             state={{
//               orderList: orderCancel,
//               loadEnable: cancelLoadEnable,
//               common_row: common_row,
//               scrolltolower: 'cancelScrollLower',
//               emptyMessage: cancelEmpty,
//               currentIndex: 4
//             }}
//           ></OrderListTmpl>
//         </Swiper>
//       </View>
//     )
//   }
// } // pages/orderList/orderList.js

// export default OrderList;

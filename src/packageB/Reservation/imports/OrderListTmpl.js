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

// export default class OrderListTmpl extends Taro.Component {
//   constructor(){
//     super(...arguments);
//     this.state={

//     };
//   }
//   render() {
//     const {
//         orderList,
//         undefined,
//         emptyMessage,
//         scrollTap,
//         scrolltolower,
//         scrolltoupper,
//         scrollTop,
//         scrollTouchEnd,
//         scrollTouchStart,
//         item,
//         index,
//         currentIndex,
//         loadenable
//     } = this.props

//     return (
//       <Block>
//         <SwiperItem style="height:100%;width:100%;display: flex; justify-content: center; align-content: center;">
//           {orderList == undefined || orderList == null ? (
//             <View className="empty_view">
//               <Image
//                 style="width:100rpx;height:100rpx;margin:0 auto;"
//                 src="../../res/images/loading.gif"
//               ></Image>
//               <Text style="color:gray;font-size:32rpx;margin-top:16rpx; margin:0 auto;">
//                 订单加载中...
//               </Text>
//             </View>
//           ) : orderList.length == 0 ? (
//             <View className="empty_view">
//               <Image
//                 src="../../res/images/ic_empty.png"
//                 style="width:130rpx;height:130rpx;margin:0 auto"
//                 mode="scaleToFill"
//               ></Image>
//               <Text style="color:gray;font-size:28rpx; margin:6rpx auto;">
//                 {emptyMessage}
//               </Text>
//             </View>
//           ) : (
//             <ScrollView
//               className="common_b2b_scroll"
//               scrollY="true"
//               onScroll={scrollTap}
//               onScrollToLower={scrolltolower}
//               onScrollToUpper={scrolltoupper}
//               scrollTop={scrollTop}
//               upperThreshold="5"
//               onTouchEnd={scrollTouchEnd}
//               onTouchStart={scrollTouchStart}
//             >
//               {orderList.map((item, index) => {
//                 return (
//                   <Navigator
//                     url={
//                       '../purchase_detail/purchase_detail?id=' +    //支付url
//                       item.id +
//                       '&state=' +
//                       item.billState +
//                       '&json=' +
//                       item.jsonData +
//                       '&index=' +
//                       index +
//                       '&moduleIndex=' +
//                       currentIndex
//                     }
//                     className="module_item"
//                   ></Navigator>
//                 )
//               })}
//               {loadenable ? (
//                 <View className="loadmore">
//                   <Image
//                     src="../../res/images/loading.gif"
//                     className="loading"
//                     mode="scaleToFill"
//                     style="margin:auto 0;"
//                   ></Image>
//                   <Text style="margin-left:20rpx;">正在加载更多</Text>
//                 </View>
//               ) : (
//                 <Text className="loadmore">没有更多数据</Text>
//               )}
//             </ScrollView>
//           )}
//         </SwiperItem>
//       </Block>
//     )
//   }

//   static options = {
//     addGlobalClass: true
//   }
// }

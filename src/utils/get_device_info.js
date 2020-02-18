import Taro from "@tarojs/taro";
// 设备信息
// brand	手机品牌
// model	手机型号
// system	操作系统版本
// pixelRatio	设备像素比
// screenWidth	屏幕宽度
// screenHeight	屏幕高度
// windowWidth	可使用窗口宽度
// windowHeight	可使用窗口高度
// version	微信版本号
// statusBarHeight	状态栏的高度
// platform	客户端平台
// language	微信设置的语言
// fontSizeSetting	用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px
// SDKVersion	客户端基础库版本
Taro.getSystemInfo().then(res => {
  Taro.setStorageSync("DEVICE_INFO",res)
});

export default Taro.getStorageSync.bind(Taro,"DEVICE_INFO")
[TOC]

# IM即时通讯

​	一对一可拓展聊天页面



## assets 

​	静态资源集合

- font
- icon
- style

## config

​	配置文件

## extension 

​	拓展模块，位于输入区 或 新页面，自定义组件

### EmojiBox

### ImgPicker

### SoundRecorder

## module

​	基本模块

### Header

顶部栏

| 参数            | 说明               | 类型      | 可选值 | 默认值 | 必填 |
| :-------------- | ------------------ | --------- | ------ | ------ | ---- |
| title           | 中央标题（居中）   | String    | -      | -      | -    |
| subTitle        | 次级小标题（居中） | String    | -      | -      | -    |
| leftTitle       | 左侧文字           | String    | -      | -      | -    |
| leftIcon        | 左侧图标路径或类名 | String    | “back“ | -      | -    |
| rightTitle      | 右侧文字           | String    | -      | -      | -    |
| rightIcon       | 右侧图标路径或类名 | String    | ”more“ | -      | -    |
| backgroundColor | 背景颜色           | String    | -      | #fff   | -    |
| children        | 中央自定义组件     | Component | -      | -      | -    |

| 事件          | 说明         | 返回参数 |
| ------------- | ------------ | -------- |
| onClickLeft   | 左侧区域点击 | Event    |
| onClickCenter | 中心区域点击 | Event    |
| onClickRight  | 右侧区域点击 | Event    |

### MsgsBox

| 参数        | 说明                           | 类型           | 可选值 | 默认值 | 必填 |
| ----------- | ------------------------------ | -------------- | ------ | ------ | ---- |
| messageList | 消息列表                       | Array[Message] | -      | -      | 是   |
| timer       | 自动消息间穿插时间             | Boolean        | -      | true   | -    |
| max         | 每次加载最大消息数             | Number         | -      | 25     | -    |
| replenish   | 根据时间在最早消息添加邻近消息 | Boolean        | -      | false  | -    |



### Noticebar

顶部浮动块

[文档]: https://taro-ui.jd.com/#/docs/noticebar	"即 Taro UI Noticebar"

### InputField

输入框，使用View隐藏Input组件，可插入自定义内容（再说吧）

| 参数  | 说明       | 类型          | 可选值 | 默认值 | 必填 |
| ----- | ---------- | ------------- | ------ | ------ | ---- |
| value | 输入框内值 | String \| xml | -      | -      | -    |
|       |            |               |        |        |      |
|       |            |               |        |        |      |
|       |            |               |        |        |      |
|       |            |               |        |        |      |
|       |            |               |        |        |      |



### ExpandAreas

拓展模块，显示菜单选项，可自定义具体组件内容

内容将嵌入输入框下方活动区域 或 打开新的页面

| 参数       | 说明                                                     | 类型      | 可选值                | 默认值 | 必填 |
| ---------- | -------------------------------------------------------- | --------- | --------------------- | ------ | ---- |
| active     | 激活状态                                                 | Boolean   | -                     | false  | -    |
| icon       | 菜单图标路径                                             | String    | -                     | -      | -    |
| activeIcon | 菜单激活图标路径                                         | Sting     | -                     | -      | -    |
| title      | 标题                                                     | String    | -                     | -      | -    |
| position   | 菜单位置<br>*当用户输入内容后位于base区的菜单将不再展示* | String    | "left","right","base" | "base" | -    |
| hidden     | 激活后组件是否覆盖输入框                                 | Boolean   | -                     | false  | -    |
| mode       | 激活组件所在位置，新页面或输入区下方                     | String    | “page”，“base”        | false  | -    |
| reset      | 关闭组件后，是否收起菜单项                               | Boolean   | -                     | false  | -    |
| children   | 激活后渲染的组件                                         | Component | -                     | -      | -    |

| 事件    | 说明                                            | 返回参数 |
| ------- | ----------------------------------------------- | -------- |
| onClose | 自定义组件事件                                  | 自定义   |
| onClick | 点击菜单后回调，返回 false 将不会调起自定义组件 | Event    |
| onBack  | 组件激活在新页面后点击返回                      | -        |



## message

​	消息类

### 消息类型

+ TEXT
+ EMOJI
+ IMAGE
+ VOICE
+ ~~FILE~~
+ ~~VIDEO~~
+ EXTENSION
  - LINK + TEXT
  - QRCODE+LINK+TEXT

## server

​	通讯接口


[TOC]



## 访客API文档v4.0

### user_info

**url:** http://129.211.14.92:8000/visit/user_info

**param:**

| 名称 | 类型          | 示例     |
| ---- | ------------- | -------- |
| uid  | int or string | 4 or '4' |

**succ:**

1.这个uid对应的用户曾经住过，或者已入住，或者已经预订

```json
{
    "code":200,
    "records":[
        {
            "id":3,
            "status":"booking",
            "check_in_time":1582971360,
            "check_out_time":1585908960,
            "hotel":"杭州西子湖四季酒店",
          	"name":"甜蜜情人节",
          	"imgs": 图片集
        },
        {
            "id":2,
            "status":"checkin",
            "check_in_time":1581850260,
            "check_out_time":1582336800,
            "hotel":"杭州西子湖四季酒店",
          	"name":"甜蜜情人节",
            "imgs": 图片集 
        },
        {
            "id":1,
            "status":"checkout",
            "check_in_time":1581652800,
            "check_out_time":1581732000,
            "hotel":"杭州西子湖四季酒店",
          	"name":"甜蜜情人节",
          	"imgs": 图片集
        }
    ],
    "ambitus":[
        {
            "id":4,
            "name":"π club",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/6_3.jpg",
            "tabs":[
                "嗨翻夜场"
            ]
        },
        {
            "id":2,
            "name":"浙江医院",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/4_3.jpg",
            "tabs":[
                "重点医院"
            ]
        },
        {
            "id":3,
            "name":"浙江大学",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/5_4.jpg",
            "tabs":[
                "名牌大学"
            ]
        },
        {
            "id":1,
            "name":"西湖风景名胜区",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/3_3.jpg",
            "tabs":[
                "文化古迹",
                "5A级风景区"
            ]
        },
        {
            "id":8,
            "name":"武林广场",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/WX20200218-215309%402x.png",
            "tabs":[
                "魅力广场"
            ]
        },
        {
            "id":9,
            "name":"西湖文化广场",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/342123vx.png",
            "tabs":[
                "一个地铁站"
            ]
        },
        {
            "id":6,
            "name":"西溪湿地",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/timg%20(6).jpeg",
            "tabs":[
                "生态优美",
                "放松心情"
            ]
        }
    ]
}
```

2.这个uid对应的用户未曾入住也未曾预约

```json
{
    "code":100,
    "ambitus":[
        {
            "id":4,
            "name":"π club",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/6_3.jpg",
            "tabs":[
                "嗨翻夜场"
            ]
        },
        {
            "id":2,
            "name":"浙江医院",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/4_3.jpg",
            "tabs":[
                "重点医院"
            ]
        },
        {
            "id":3,
            "name":"浙江大学",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/5_4.jpg",
            "tabs":[
                "名牌大学"
            ]
        },
        {
            "id":1,
            "name":"西湖风景名胜区",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/3_3.jpg",
            "tabs":[
                "文化古迹",
                "5A级风景区"
            ]
        },
        {
            "id":8,
            "name":"武林广场",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/WX20200218-215309%402x.png",
            "tabs":[
                "魅力广场"
            ]
        },
        {
            "id":9,
            "name":"西湖文化广场",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/342123vx.png",
            "tabs":[
                "一个地铁站"
            ]
        },
        {
            "id":6,
            "name":"西溪湿地",
            "img":"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/timg%20(6).jpeg",
            "tabs":[
                "生态优美",
                "放松心情"
            ]
        }
    ]
}
```

**error:**

```json
{"code":0}
```





### journey_info

**url:** http://129.211.14.92:8000/visit/journey_info

**param:**

| 名称       | 类型          | 示例     |
| ---------- | ------------- | -------- |
| journey_id | int or string | 4 or '4' |

**succ:**

```json
{"code":200,"journey_info":{
	"journey_id": 行程id,
	"name": 行程标题,
	"status": 行程状态,
	"hotel": 酒店名称,
	"imgs": 酒店图片集,
	"room": 房间号,
	"address": 酒店地址,
	"content": 酒店介绍,
	"check_in_time": 开始时间,
	"check_out_time": 结束时间,
	"order_time": 预订时间,
	"out_back_time": 退订时间
	}
}
```

**error**:

行程id不存在

```json
{"code":-100} 
```

订单id不存在

```json
{"code":-200}
```

 酒店id或房间id不存在

```json
{"code":-300} 
```

未收到参数journey_id或接收错误

```json
{"code":-400}
```





### hotels_info

**url:** http://129.211.14.92:8000/visit/hotels_info

**param:**

**succ:**

```json
{"code":200,"results":{
"code": 200,
"results": [
{
"model": "visit.hotels",
"pk": 3,
"fields": {
"add_time": "2020-02-17T16:55:46Z",
"update_time": "2020-02-17T16:55:50Z",
"name": "杭州西子湖四季酒店",
"content": "杭州西子湖四季酒店隐匿于西湖西北角——灵隐路，依湖建邸，望山建园。居于此，徒步，即可赏“曲院风荷”，观“岳墓栖霞”，探“北街梦寻”。延续南宋定都后西湖皇家园林艺术的演绎风格，杭州西子湖四季酒店所筑亭台楼阁，并多曲线与斜线，使之与山水的灵动线条相称，共秀并灵。客房以江南丝缎绣品为墙饰，借中国传统花鸟画的立意灵感，构筑低调奢华之居。酒店金沙厅以创意江南菜著称。西湖餐厅提供欧陆风味菜肴，与大堂酒廊相通，于庭院深 处，为宾客带来悠享时光。酒店还为小客人特设儿童活动中心及户外游乐场，更有夺宝奇兵儿童活动项目，为小朋友开启趣味旅程。",
"location": "浙江省杭州市西湖区灵隐路5号",
"imgs": {
"Upright": [
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/6_2.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/7_2.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/8_2.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/9_2.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/10_2.png"
],
"horizontal": [
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/6_1.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/7_1.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/8_1.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/9_1.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/10_1.png"
]
},
"lat": "30.257689",
"lon": "120.134863",
"province": "浙江省",
"city": "杭州市",
"district": "西湖区"
}
},
{
"model": "visit.hotels",
"pk": 4,
"fields": {
"add_time": "2020-02-17T17:31:32Z",
"update_time": "2020-02-17T17:31:36Z",
"name": "杭州鱼儿的家2019度假别墅",
"content": "“既能感受大自然的美丽淳朴，也像家一样舒适温暖，有灵魂亦有温度是【鱼儿的家】坚持到底的匠心理念” 我们主打天然、质朴、归真、醇厚的匠心理念，是位于杭州5A级景区千岛湖畔的精品设计型民宿。 地处青山绿水，人杰地灵的兰川村。全湖景的房型的绝佳位置条件，推窗即是山水环绕。淳朴的原始乡村建筑经过设计师重新加固改造，在保留原始乡村风格的建筑基础上，增添厚实的质感。 为了给您足够舒适特别的行程体验，我们房间设施均采用智能家居及五 星级酒店标准的床品，结合的私人管家式配套服务，使得在感受乡村淳朴归真天然的环境同时，也不失现代的方便智能。 我们致力于做一家有灵魂亦有温度的民宿，是【鱼儿的家】坚持匠心精神的经营理念。",
"location": "浙江省杭州市淳安县宋村乡云港口兰川村鱼儿的家民宿",
"imgs": {
"Upright": [
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/100%E5%89%AF%E6%9C%AC.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/101%E5%89%AF%E6%9C%AC.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/102%E5%89%AF%E6%9C%AC.png"
],
"horizontal": [
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/100.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/101.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/102.png"
]
},
"lat": "29.689607",
"lon": "118.86885",
"province": "浙江省",
"city": "杭州市",
"district": "淳安县"
}
},
{
"model": "visit.hotels",
"pk": 5,
"fields": {
"add_time": "2020-02-17T17:59:10Z",
"update_time": "2020-02-17T17:59:13Z",
"name": "杭州木守西溪酒店",
"content": "杭州木守西溪位于西溪湿地公园，龙舌嘴入口内。由GOA大象设计、张唐景观联袂出品。在创造初期，主设计师特地去往国内外探访极富设计感的酒店。以“让每一位来酒店的人都能感受从前那种慢慢的，没有太多压力，简单又美好的生活方式”的初心，秉承“东方美学”所主张的让人与自然和谐相处的理念，巧妙的将整个酒店的设计与自然景观融合在一起， 演绎全新的旅游度假产品。 酒店建筑面积占地约7000多平米，拥有43间豪华套房；1个主打浙江菜系 的“溪隐”中餐厅；1个全明宴会厅“林宴厅”330平米相连户外，融于西溪湿地满足各类创意活动及商务会议需求；200平米独立下午茶区域，晚间专门为住店客人提供酒吧服务；心形草坪、无边泳池等为宾客带来与众不同的身心放松与享受。 酒店的运营团队秉承让客户“身心所致、皆有惊喜”的服务宗旨带您走进木守西溪，远离烦嚣，独享属于您的慢生活之旅。",
"location": "浙江省杭州市五常街道寿堤33号",
"imgs": {
"Upright": [
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/1%E5%89%AF%E6%9C%AC.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/2%E5%89%AF%E6%9C%AC.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/3%E5%89%AF%E6%9C%AC.png"
],
"horizontal": [
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/1.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/2.png",
"https://hotel-1258976754.cos.ap-shanghai.myqcloud.com/hotels/3.png"
]
},
"lat": "30.260707",
"lon": "120.059603",
"province": "浙江省",
"city": "杭州市",
"district": "余杭区"
}
}
]
}}
```

**error:**

查询数据错误

```json
{"code":-100}
```

解析数据错误

```json
{"code":0}
```





### room_info

选择房间

**url:** http://129.211.14.92:8000/visit/room_info

**param:**

| 名称     | 类型          | 示例     |
| -------- | ------------- | -------- |
| hotel_id | string or int | 4 or '4' |
| inp      | tring         | 'b10'    |

**succ:**

```json
{"code":200, "rooms":{
"code": 200,
"rooms": [
{
"model": "visit.room",
"pk": 1,
"fields": {
"add_time": 1580729995,
"update_time": 1580729995,
"floor": 1,
"number": "101",
"name": "大汉之家",
"content": "住着很舒服",
"room_type_name": "单人房",
"room_type_content": "朝阳，有窗，无餐",
"hotel": 3
}
},
{
"model": "visit.room",
"pk": 2,
"fields": {
"add_time": 1582158967,
"update_time": 1582158967,
"floor": 1,
"number": "102",
"name": "大汉102",
"content": "这是大汉第102",
"room_type_name": "单人房",
"room_type_content": "单人房很舒服的102",
"hotel": 3
}
},
{
"model": "visit.room",
"pk": 3,
"fields": {
"add_time": 1582159011,
"update_time": 1582159011,
"floor": 1,
"number": "102",
"name": "大汉102",
"content": "这是大汉第102",
"room_type_name": "单人房",
"room_type_content": "单人房很舒服的102",
"hotel": 3
}
},
{
"model": "visit.room",
"pk": 4,
"fields": {
"add_time": 1582159011,
"update_time": 1582159011,
"floor": 1,
"number": "103",
"name": "大汉103",
"content": "这是大汉第103",
"room_type_name": "单人房",
"room_type_content": "单人房很舒服的103",
"hotel": 3
}
},
{
"model": "visit.room",
"pk": 5,
"fields": {
"add_time": 1582159011,
"update_time": 1582159011,
"floor": 1,
"number": "104",
"name": "大汉104",
"content": "这是大汉第104",
"room_type_name": "单人房",
"room_type_content": "单人房很舒服的104",
"hotel": 3
}
},
{
"model": "visit.room",
"pk": 6,
"fields": {
"add_time": 1582159011,
"update_time": 1582159011,
"floor": 1,
"number": "105",
"name": "大汉105",
"content": "这是大汉第105",
"room_type_name": "单人房",
"room_type_content": "单人房很舒服的105",
"hotel": 3
}
},
{
"model": "visit.room",
"pk": 7,
"fields": {
"add_time": 1582159011,
"update_time": 1582159011,
"floor": 1,
"number": "106",
"name": "大汉106",
"content": "这是大汉第106",
"room_type_name": "单人房",
"room_type_content": "单人房很舒服的106",
"hotel": 3
}
},
{
"model": "visit.room",
"pk": 8,
"fields": {
"add_time": 1582159012,
"update_time": 1582159012,
"floor": 1,
"number": "107",
"name": "大汉107",
"content": "这是大汉第107",
"room_type_name": "单人房",
"room_type_content": "单人房很舒服的107",
"hotel": 3
}
},
{
"model": "visit.room",
"pk": 9,
"fields": {
"add_time": 1582159012,
"update_time": 1582159012,
"floor": 1,
"number": "108",
"name": "大汉108",
"content": "这是大汉第108",
"room_type_name": "单人房",
"room_type_content": "单人房很舒服的108",
"hotel": 3
}
},
{
"model": "visit.room",
"pk": 10,
"fields": {
"add_time": 1582159012,
"update_time": 1582159012,
"floor": 1,
"number": "109",
"name": "大汉109",
"content": "这是大汉第109",
"room_type_name": "单人房",
"room_type_content": "单人房很舒服的109",
"hotel": 3
}
},
{
"model": "visit.room",
"pk": 11,
"fields": {
"add_time": 1582159012,
"update_time": 1582159012,
"floor": 1,
"number": "110",
"name": "大汉110",
"content": "这是大汉第110",
"room_type_name": "单人房",
"room_type_content": "单人房很舒服的110",
"hotel": 3
}
}
]
}}
```

error:

参数接收错误

```json
{"code":-100}
```

数据查询解析错误

```json
{"code":0}
```


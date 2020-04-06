## 行程API文档v1.0

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
            "hotel":"杭州西子湖四季酒店"
        },
        {
            "id":2,
            "status":"checkin",
            "check_in_time":1581850260,
            "check_out_time":1582336800,
            "hotel":"杭州西子湖四季酒店"
        },
        {
            "id":1,
            "status":"checkout",
            "check_in_time":1581652800,
            "check_out_time":1581732000,
            "hotel":"杭州西子湖四季酒店"
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






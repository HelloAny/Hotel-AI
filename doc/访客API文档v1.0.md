### 访客API文档v1.0



- ##### send_visit

Description : 访客发起访问申请

Param :

| 参数名称 | 类型   | 是否必需 | 备注             | 示例             |
| -------- | ------ | -------- | ---------------- | ---------------- |
| user_id  | Int    | 是       | 用户ID           | 3                |
| host_id  | Int    | 是       | 想访问的房号     | 630              |
| remarks  | String | 是       | 访问者的申请说明 | "我想来看看你"   |
| name     | String | 是       | 访问者姓名       | 爱二灵           |
| phone    | String | 是       | 访问者号码       | 13008988189      |
| time     | String | 是       | 访问时间         | 2019-10-05 14:04 |

Sucess :

```json
{"code":200}
```

Error :

```json
{"code":0}
```





receive_allow

Description : 给node发同意的消息

Param:

无


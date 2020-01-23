## 客服系统

- #### create ：创建某用户与客服的聊天会话

Param：

int uid   用户ID

success：{"code":200}

Error：{"code":0}



- #### send_receive : 用户发送消息，返回智能回复

Param:

 int uid

String content  用户发送消息的内容

Sucess: {"code":200,"results":智能回复文本}

Error: {"code":0}



- #### show_records : 加载聊天记录，同时把所有未读标记为已读

Param:

int uid

Sucess:{"code":200,"results":聊天记录下为示例}

```json
[

{"message_type":"a","datetime":"2020/02/14 05:20:21","content":"餐厅在哪里"},

{"message_type":"b","datetime":"2020/02/14 05:20:21","content":"电梯出门右转"}

]
```

> 说明：单条聊天记录中，message_type为a时表明该条消息由用户发送，为b时表明由系统无人客服自动回复，人工回复都为数字，数字代表客服编号，正数表示已读，负数表示未读，如3为3号客服发的消息，用户已读，-3 为3号客服发的消息，用户未读。

Error:{"code":0}



- #### timing_out_inspect: http暴力刷，在聊天窗口之外，如果有人工回复消息，显示小红点

Param:

Int uid

Success:

1. 有未读情况  {"code":200,"results":未读条数}

2. 无未读情况  {"code":100}

Error: {"code":0}



- #### timing_in_inspect: http暴力刷，在聊天窗口中，如果有人工回复消息，先标记为已读再返回未读的人工回复消息

Param:

Int uid

Success: json格式的聊天记录数组，形式为String，下为示例

```json
[

{"message_type":"1","datetime":"2020/02/14 05:20:21","content":"餐厅在哪里"},

{"message_type":"1","datetime":"2020/02/14 05:20:21","content":"电梯出门右转"}

]
```

Error: {"code":0}



- #### manual_work_reply: 人工客服发送消息

Param:

int uid 用户ID

int serverid 客服ID

String content 客服回复内容

Success: {"code":200}

Error: {"code":0}



- #### image_receive : 接收图片

Param:

 int uid

file  image

Success: {"code":200}

Error: {"code":0}



- #### audio_recognize : 接收音频文件，返回识别结果

Param:

file audio_file

Success:{"code":200,"results":识别结果}
Error: {"code":0}或{"code":xxxx（ps：xxxx为错误的状态码）}

可能会有特殊情况code等于100的时候，也算出错
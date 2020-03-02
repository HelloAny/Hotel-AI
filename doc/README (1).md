# Service-Outsourcing API Document
Service outsourcing competition - Hotel visual AI solution

[TOC]

# Common Request Json Format

```python
{
  "id":1234,
  "type":"xxx",
  "subtype":"xxxx",
  "data":{
      "key":"value"
  }
}
```

# Common Response Json Format

```python
{
  "id":1234,
  "status":0,
  "message":"successful",
  "data":{
      "key":"value"
  }
}
```

# Param Description

|  Field  |  Type  |                         Description                          |   Caller   |             Example              |
| :-----: | :----: | :----------------------------------------------------------: | :--------: | :------------------------------: |
|   id    |  int   |      事件处理id，整型，请求端发送，接收端返回时原样返回      | 请求、返回 |           "id":123456            |
| status  |  int   | 返回请求处理状态，请求时status填写0。默认返回0时为请求处理成功，若失败返回错误码 |    返回    |            "status":0            |
| message | string | 状态简略信息，若成功调用则返回"successful"，失败返回错误信息 |    返回    |      "message":"successful"      |
|  type   | string |                           请求类型                           |    请求    |          "type":"user"           |
| subtype | string |                          请求子类型                          |    请求    |        "subtype":"login"         |
|  data   |  json  |                   包含附加或返回的请求数据                   | 请求、返回 | "data":{"token":"xxxxxxxxxxxxx"} |

# Start

## Ping - Pong

> **API Description**

`GET`&`POST`

​	此API用于检验是否能够成功连接上服务器，事实上然并卵。

> **URL**

`https://hotel.lcworkroom.cn/api/ping`/

> **GET Response Success**

```html
pong
```

> **POST Response Success**

```python
{
    "id": -1, 
    "status": 0, 
    "message": "pong", 
    "data": {}
}
```

> **Notice**

+ 不同的访问方式会获得不同的返回结果
+ 这个API没有实际用处，仅用于让使用者熟悉此文档中API的请求与返回格式
+ 顺便可以判断能不能API有没有部署成功？

# Token

**用户许可类**

## Token Doki

> **API Description**

`GET`&`POST`

​	此API用于检验`token`是否有效，若有效并刷新`token`有效时间。

> **URL**

`https://hotel.lcworkroom.cn/api/user/doki/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Response Success Example**

```python
{
    "id": -1, 
    "status": 0, 
    "message": "Successful", 
    "data": {}
}
```

> **Response Failed Example**

```python
{
    "id": -1, 
    "status": -101, 
    "message": "Error token", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status | Method     |
| ------ | ---------- |
| -101   | GET / POST |
| -100   | GET / POST |

> **Local Status**

Null

# User

**用户类**

## User Register

> **API Description**

`POST`

​	以手机号为字段注册一个新账号

> **URL**

`https://hotel.lcworkroom.cn/api/user/register/`

> **Request Json Text Example**

```python
{
    "id":0,
    "status":0,
    "type":"register",
    "subtype":"phone",
    "data":{
        "username":"13750687010",
        "hash":"cffb7f1eb316fd45bbfbd43082e36f9c",
        "pass":"wlc570Q0"
    }
}
```

> **Data Param**

|  Field   |  Type  | Length | Null | Default | **Description** |
| :------: | :----: | :----: | :--: | :-----: | :-------------: |
| username | string |   11   |      |         |    账号名称     |
|   hash   | String |   32   |      |         |    校验文本     |
|   pass   | String |        |      |         |    用户密码     |

> **Notice**

+ `hash`生成规则： `hash = MD5(code+rand)`。`code`为短信验证码内容，`rand`为发送短信验证码请求时附带的随机字符串

+ `pass`为用户设置的明文密码，长度由前端决定限制，后端只取其加密结果

> **Response Success Example**

```python
{
    "id": 0, 
    "status": 0, 
    "message": "Successful", 
    "data": {}
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 100, 
    "message": "Create User Failed", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -200   |
| -4     |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |      Message       | Description  |
| :----: | :----------------: | :----------: |
|  100   | Create User Failed | 创建账号失败 |

## User Login - Password

> **API Description**

`POST`

​	此API用于以手机号作为登录凭证时的登录请求，成功返回token值

> **URL**

`https://hotel.lcworkroom.cn/api/user/login/`

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"login",
    "subtype":"pass",
    "data":{
        "username":"13750687010",
        "pass":"wlc570Q0",
        "enduring":0,
    }
}
```

> **Data Param**

|  Field   |  Type  | Length | Null | Default |              **Description**              |
| :------: | :----: | :----: | :--: | :-----: | :---------------------------------------: |
| username | string |   11   |      |         |                 账号名称                  |
|   pass   | String |        |      |         |                 用户密码                  |
| enduring |  int   |   1    |      |    √    | 是否长效登录，`0`为否，`1`为是。默认为`0` |

> **Notice**

+ `pass`为明文密码
+ `enduring`为`0`时，当用户无操作(未使用token向服务器发送任何请求)10min时自动取消其登录状态；为`1`时则保持token不失效(目前设置为永久有效)
+ 若想保持token有效，可使用`Doki`刷新token有效时间
+ 获取的`token`用于后期所有需要用户验证的请求操作。  
+ 账号每登录一次即可获得一个`token`
+ 一个账号同时获得10个以上的`token`时，自动删除早期的`token`，维持`token`数在10以内
+ 获得的`token`未被用于任何操作超过`10min`后将被自动删除（设置为长效token的除外）
+ 若`enduring`传递了非`int`类型数据，则自动为`0`

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        "token": "debc454ea24827b67178482fd73f37c3"
    }
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 100, 
    "message": "Incorrect user", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -200   |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |     Message      |  Description   |
| :----: | :--------------: | :------------: |
|  100   |   No such user   |  无该账号记录  |
|  101   | Password not set | 用户密码未设置 |
|  102   |  Error password  |  用户密码错误  |
|  300   | Add token failed | 创建token失败  |

## User Login - Sms

> **API Description**

`POST`

​	此API用于以手机号作为登录凭证时的登录请求，成功返回token值以及登录状态`login_type`

> **URL**

`https://hotel.lcworkroom.cn/api/user/login/`

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"login",
    "subtype":"sms",
    "data":{
        "username":"13750687010",
        "hash":"23jjf455...",
        "enduring":0,
    }
}
```

> **Data Param**

|  Field   |  Type  | Length | Null | Default |              **Description**              |
| :------: | :----: | :----: | :--: | :-----: | :---------------------------------------: |
| username | string |   11   |      |         |                 账号名称                  |
|   hash   | String |        |      |         |                 校验文本                  |
| enduring |  int   |   1    |      |    √    | 是否长效登录，`0`为否，`1`为是。默认为`0` |

> **Notice**

+ `hash`生成规则： `hash = MD5(code+rand)`。`code`为短信验证码内容，`rand`为发送短信验证码请求时附带的随机字符串
+ `enduring`为`0`时，当用户无操作(未使用token向服务器发送任何请求)10min时自动取消其登录状态；为`1`时则保持token不失效(目前设置为永久有效)
+ 若想保持token有效，可使用`Doki`刷新token有效时间
+ 获取的`token`用于后期所有需要用户验证的请求操作。  
+ 账号每登录一次即可获得一个`token`
+ 一个账号同时获得10个以上的`token`时，自动删除早期的`token`，维持`token`数在10以内
+ 获得的`token`未被用于任何操作超过`10min`后将被自动删除（设置为长效token的除外）
+ 若`enduring`传递了非`int`类型数据，则自动为`0`

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        "token": "debc454ea24827b67178482fd73f37c3",
        "login_type":"create"
    }
}
```

> **Notice**

+ `login_type`取值有：`create`、`login`
  + `create`：用户原先不存在，自动创建
  + `login`：用户已存在，自动登录

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 100, 
    "message": "Create User Failed", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -200   |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |      Message       |  Description  |
| :----: | :----------------: | :-----------: |
|  100   | Create User Failed | 创建用户失败  |
|  300   |  Add token failed  | 创建token失败 |

## User Info - Get（有修改）

> **API Description**

`GET`

​	通过`token`值获取对应用户信息

`POST`

​	通过`token`（url参数）或`username`值（POST字段）获取对应或指定的用户信息

**修改：**

**2020年1月26日12:11:01**

**1.更新信息返回**

**2.已修改请求返回值的错误**

> **URL**

`https://hotel.lcworkroom.cn/api/user/info/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"info",
    "subtype":"get",
    "data":{
        "username":"13750687010",
    }
}
```

> **Data Param**

|  Field   |  Type  | Length | Null | Default | **Description** |
| :------: | :----: | :----: | :--: | :-----: | :-------------: |
| username | string |   11   |      |    √    |    账号名称     |

> **Notice**

+ `token`为必传字段，不论是否以`token`获取用户信息
+ 若`token`与`username`同时存在，则查询`username`对应用户信息
+ `username`缺省则自动获取`token`对应的用户信息，不缺省可查指定用户的信息
+ `POST`模式可查其他用户信息，`GET`模式只能查询自己的信息
+ **返回信息中，新增ID字段，用于查询实名认证与人脸认证（新增）**

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        "id": 3, 
        "username": "13750687010", 
        "nickname": "FatBallFish", 
        "email": "893721708@qq.com", 
        "phone": "13750687010",
        "ID": "33108219991127089X", 
        }
}

```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": -100, 
    "message": "Missing necessary args", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status | Method     |
| ------ | ---------- |
| -101   | GET / POST |
| -100   | GET / POST |
| -3     | POST       |
| -2     | POST       |
| -1     | POST       |

> **Local Status**

| Status |   Message    | Description  |
| :----: | :----------: | :----------: |
|  100   | No Such User | 无该账号记录 |

## User Info - Update（有修改）

> **API Description**

`POST`

​	通过`token`或`username`值更新对应或指定的用户信息

**--修改日志--**

**2020年2月13日00:13:40**

+ 将`real_auth_id`和`face_id`字段改为Null字段，若将这两个字段设置null，表示解绑实名认证库与人脸认证库。且若实名认证库解绑，人脸认证库自动解绑，反之不会。

**2020年1月28日01:00:21**

+ 可更新字段中增加了`face_id`，`real_auth_id`两个字段

> **URL**

`https://hotel.lcworkroom.cn/api/user/info/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"info",
    "subtype":"update",
    "data":{
        "username":"13750687010",
        "nickname":"FatBallFish",
        "email":"893721708@qq.com",
        "real_auth_id":"33108219991127089X"
    }
}
```

> **Data Param**

|    Field     |  Type  | Length | Null | Default |        **Description**         |
| :----------: | :----: | :----: | :--: | :-----: | :----------------------------: |
|   username   | string |        |      |    √    |            账号名称            |
|    phone     | string |   11   |      |    √    | 用户手机号，**暂不允许被修改** |
|   nickname   | string |   20   |  √   |    √    |            用户昵称            |
|    email     | string |   50   |  √   |    √    |            邮箱地址            |
| real_auth_id | string |   18   |  √   |    √    |    实名认证库id（身份证号）    |
|   face_id    | string |   18   |  √   |    √    |     人脸数据id（身份证号）     |

> **Notice**

+ `username`用作检验字段，不可被修改
+ `username`缺省则自动更新`token`对应的用户信息，不缺省可更新指定用户的信息，不过需要**拥有管理员权限**，无权限返回`status 102`
+ `phone`字段内容与`username`字段一致，暂不允许被修改
+ `email`字段在后端不会进行检验格式的正确与否，若需要请前端自行检验
+ `real_auth_id`若不存在返回`status 103`状态
+ `face_id`若不存在返回`status 104`状态
+ 建议不要自行修改`face_id`字段值，因为在注册人脸的时候，我会先判断是否已实名，若真则以实名的身份证号作为人脸数据的id值，若假则返回`此用户未实名`之类的错误

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {}
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 100, 
    "message": "No Such User", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -101   |
| -100   |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |         Message         |   Description    |
| :----: | :---------------------: | :--------------: |
|  100   |      No Such User       |   无该账号记录   |
|  101   | Update UserInfo Failed  | 更新用户信息失败 |
|  102   | No Permission Operation |    无权限操作    |
|  103   |      No Such Face       |   无此人脸信息   |
|  104   |    No Such RealAuth     | 无此实名认证信息 |

## User Password - Forget

> **API Description**

`POST`

​	通过手机短信验证码形式找回用户密码**（仅限于用手机号注册的账号）**

> **URL**

`https://hotel.lcworkroom.cn/api/user/password/`

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"password",
    "subtype":"forget",
    "data":{
        "username":"13750687010",
        "hash":"h2xf24rf..",
        "pass":"wanglingchao"
    }
}
```

> **Data Param**

|  Field   |  Type  | Length | Null | Default | **Description** |
| :------: | :----: | :----: | :--: | :-----: | :-------------: |
| username | string |   11   |      |         | 账号(即手机号)  |
|   hash   | string |   32   |      |         |    教研文本     |
|   pass   | string |        |      |         |     新密码      |

> **Notice**

+ `hash`生成规则： `hash = MD5(code,rand)`。`code`为短信验证码内容，`rand`为发送短信验证码请求时附带的随机字符串。**发送短信时需将短信接口中`command_type`设置为`2`**
+ `pass`为用户要设置的新密码，可与原密码相同且不会提示
+ 改密成功后该账户往期的所有`token`记录将被清空，即强制退出用户在所有设备的登录状态，包括长效登录

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {}
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 100, 
    "message": "No Such User", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -4     |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |   Message    | Description  |
| :----: | :----------: | :----------: |
|  100   | No Such User | 无该账号记录 |

## User Password - Change

> **API Description**

`POST`

​	通过验证用户名和原密码进行用户新密码修改

> **URL**

`https://hotel.lcworkroom.cn/api/user/password/`

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"password",
    "subtype":"change",
    "data":{
        "username":"13750687010",
        "old_pass":"wanglingchao",
        "new_pass":"wanglingchao123"
    }
}
```

> **Data Param**

|  Field   |  Type  | Length | Null | Default | **Description** |
| :------: | :----: | :----: | :--: | :-----: | :-------------: |
| username | string |   11   |      |         | 账号(即手机号)  |
| old_pass | string |        |      |         |     原密码      |
| new_pass | string |        |      |         |     新密码      |

> **Notice**

+ `old_pass`为用户要设置的原密码，输入错误返回`status 100`状态码且改密失败
+ `new_pass`为用户要设置的新密码，可与原密码相同且不会提示
+ 改密成功后该账户往期的所有`token`记录将被清空，即强制退出用户在所有设备的登录状态，包括长效登录

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {}
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 100, 
    "message": "No Such User", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |                Message                 |    Description     |
| :----: | :------------------------------------: | :----------------: |
|  100   |              No such user              |     没有此用户     |
|  101   |            Password not set            |   用户密码未设置   |
|  102   |             Error password             |     错误的密码     |
|  103   | Password cannot be the same as account | 密码不能与账号一致 |

## User Portrait - Get

> **API Description**

`GET`

​	通过传递`username`参数获取指定用户头像，返回头像二进制数据

>  **URL**

`https://hotel.lcworkroom.cn/api/user/portrait/?username=`

> **URL Param**

|  Field   |  Type  | Length | Null | Default | **Description** |
| :------: | :----: | :----: | :--: | :-----: | :-------------: |
| username | string |   11   |      |         |      账号       |

> **Notice**

+ `username`字段不存在或者字段值错误将返回参数错误提示图片`error.jpg`
+ 访问此API的ip若非允许内的ip将被阻截（后期想改成返回禁止访问图片`ban.jpg`）
+ 若用户未上传过头像时将返回默认头像数据

## User Portrait - Upload

> **API Description**

`POST`

​	通过传递的`token`参数以及图片base64数据对指定用户进行图片更新

> **URL**

`https://hotel.lcworkroom.cn/api/user/portrait/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"portrait",
    "subtype":"upload",
    "data":{
        "base64":"...",
    }
}
```

> **Data Param**

| Field  |  Type  | Length | Null | Default | **Description** |
| :----: | :----: | :----: | :--: | :-----: | :-------------: |
| base64 | string |        |      |         | 图片base64数据  |

> **Notice**

+ API自动根据`token`值更新对应用户的头像
+ `base64`数据是否去除头信息都无所谓。（头信息例子：`image/jpg;base64,`)
+ 用户多次上传头像则之前的头像数据将被覆写，只保留最后一次上传的数据

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        "url": "/api/user/portrait/?username=19857160634"
    }
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 100, 
    "message": "No Such User", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |        Message         |            Description             |
| :----: | :--------------------: | :--------------------------------: |
|  100   |   Error base64 data    |          错误的base64数据          |
|  101   | Upload portrait failed | 上传头像失败（服务器文件存储失败） |

# Captcha

**验证码类**

## Image Captcha - Generate

> **API Description**

`POST`

此API用于生成一个`5位字母数字混合`的图形验证码

成功则返回图片的`base64数据`和一个`5位rand`值。

> **URL**

`https://hotel.lcworkroom.cn/api/captcha/`

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"img",
    "subtype":"generate",
    "data":{}
}
```

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        "imgdata":"iVBORw0yrfmx5m7975n32/23Y+cdf1Rv9oA6.....(以下省略)",
        "rand":"CST43"  # 随机文本
    }
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 100, 
    "message": "No Such User", 
    "data": {}
}
```

> **Notice**

+ `imgdata`为验证码base64图片数据，前端获得数据后进行转码再显示;  

+ `rand`为随机字符串，前端获得验证码后需要将验证码和`rand`文本MD5加密后传给后端进行验证，`hash = MD5(code+rand)`。  
+ 验证码**不区分大小写**，请自行将验证码转换成`全部小写`再进行hash操作。

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -404   |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |      Message       |    Description     |
| :----: | :----------------: | :----------------: |
|  100   | Error captcha hash | 错误的验证码`hash` |

## Image Captcha - Validate

> **API Description**

`POST`

此API用于校验用户输入的验证码是否正确，**在目前版本中，此API可以暂时不用**

> **URL**

`https://hotel.lcworkroom.cn/api/captcha/`

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"img",
    "subtype":"validate",
    "data":{
        "hash":"asddwfw……"
    }
}
```

> **Data Param**

| Field |  Type  | Length | Null | Default |                 **Description**                 |
| :---: | :----: | :----: | :--: | :-----: | :---------------------------------------------: |
| hash  | string |   32   |      |    √    | 图片验证码hash<br />`hash = MD5(imgcode + rand` |

> **Notice**

- `hash`字段的数据要求是用户填写的验证码内容与`rand`文本进行MD5加密获得。即`hash = MD5(code + rand)`

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {}
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 100, 
    "message": "Error captcha hash", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -404   |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |      Message       |   Description    |
| :----: | :----------------: | :--------------: |
|  100   | Error captcha hash | 错误的验证码hash |

## Sms Captcha - Generate

> **API Description**

`POST`

此API用于以手机号作为账号进行`注册`或`找回密码`时发送短信验证码

成功则向指定手机发送短信，并返回一个5位`rand`值

> **URL**

`https://hotel.lcworkroom.cn/api/captcha/`

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"sms",
    "subtype":"generate",
    "data":{
        "phone":"137xxxxxxxx",
        "command_type":1
    }
}
```

> **Data Param**

|    Field     |  Type  | Length | Null | Default |                       **Description**                        |
| :----------: | :----: | :----: | :--: | :-----: | :----------------------------------------------------------: |
|    phone     | string |   11   |      |         |                            手机号                            |
| command_type |  int   |  1-2   |      |    √    |   短信类型。`1`为注册账号;`2`为找回密码；`3`为账号短信登录   |
|     hash     | string |   32   |      |    √    | 图片验证码hash，**该字段目前不使用**<br />`hash = MD5(imgcode + rand` |

> **Notice**

- `phone`字段需用文本型传递，且只能为中国大陆手机号，不支持国外手机号
- `hash`字段的数据要求是用户填写的验证码内容与`rand`文本进行MD5加密获得。即`hash = MD5(code + rand)`

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        "imgdata":"iVBORw0yrfmx5m7975n32/23Y+cdf1Rv9oA6.....(以下省略)",
        "rand":"CST43"  # 随机文本
    }
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 1016, 
    "message": "手机号格式错误", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -404   |
| -204   |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status                                                       |
| ------------------------------------------------------------ |
| 具体错误码请看腾讯云[短信错误码](http://cloud.tencent.com/document/product/382/3771 "腾讯短信API文档") |

> **Notice**

+ 腾讯云[短信错误码](http://cloud.tencent.com/document/product/382/3771 "腾讯短信API文档")中的`message`皆为中文字符

## Sms Captcha - Validate

> **API Description**

`POST`

此API用于校验用户输入的验证码是否正确，**在目前版本中，此API可以暂时不用**

> **URL**

`https://hotel.lcworkroom.cn/api/captcha/`

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"sms",
    "subtype":"validate",
    "data":{
        "hash":"asddwfw……"
    }
}
```

> **Data Param**

| Field |  Type  | Length | Null | Default |                 **Description**                 |
| :---: | :----: | :----: | :--: | :-----: | :---------------------------------------------: |
| hash  | string |   32   |      |    √    | 短信验证码hash<br />`hash = MD5(imgcode + rand` |

> **Notice**

- `hash`字段的数据要求是用户填写的验证码内容与`rand`文本进行MD5加密获得。即`hash = MD5(code + rand)`

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {}
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 100, 
    "message": "Error captcha hash", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -404   |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |      Message       |   Description    |
| :----: | :----------------: | :--------------: |
|  100   | Error captcha hash | 错误的验证码hash |

# RealAuth

**实名认证类**

## RealAuth Create

> **API Description**

`POST`

此API用于创建一个实名认证信息，成功自动与用户绑定，暂不可解绑，并返回`real_auth_id`

> **URL**

`https://hotel.lcworkroom.cn/api/realauth/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"realauth",
    "subtype":"create",
    "data":{
        "id_type":"sfz",
        "id":"33108219991127089X",
        "name":"王凌超",
        "gender":"male",
        "birthday":1580140800.0,
    }
}
```

> **Data Param**

|    Field     |  Type  | Length | Null | Default |                       **Description**                        |
| :----------: | :----: | :----: | :--: | :-----: | :----------------------------------------------------------: |
|   id_type    | string |        |      |         |        身份证件种类，目前只有`sfz`，其他返回`200`错误        |
|      id      | string |   18   |      |         |                          身份证件号                          |
|     name     | string |   30   |      |         |                             姓名                             |
|    gender    | string |   6    |      |         |    年龄，只有`male`和`female`两个选项，其他返回`201`错误     |
|   birthday   | float  |        |      |         |           生日时间戳，精确到日，时分秒信息将被忽略           |
|    nation    | string |   10   |  √   |    √    |                             民族                             |
|   address    | string |  100   |  √   |    √    |                             住址                             |
| organization | string |   30   |  √   |    √    |                           签发机关                           |
|  date_start  | float  |        |  √   |    √    | 证件有效期·起始 时间戳，精确到日，时分秒信息将被忽略，失败返回`202`错误 |
|   date_end   | float  |        |  √   |    √    | 证件有效期·终止 时间戳，精确到日，时分秒信息将被忽略，失败返回`203`错误 |

> **Notice**

- `id`为不可重复字段，若创建的实名认证信息与已有的重复，将返回`100`状态码
- `id_type`、`id`、`name`、`gender`、`birthday`为必填字段，且不能为空，**且创建后无法修改更新**
- `nation`、`address`、`organization`、`date_start`、`date_end`为可选字段，且可为空（不过建议不要为空）
- 各字段的长度限制需由前端校验设置好后再传，否则若有异常会返回`100`状态码
- 后端不校验`date_start`与`date_end`之间的先后逻辑关系，请前端自行校验

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        "real_auth_id":"3310821999..."
    }
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": -1, 
    "message": "Error JSON key", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |         Message         |   Description    |
| :----: | :---------------------: | :--------------: |
|  100   | Create RealAuth failed  | 创建实名认证失败 |
|  200   | Error id_type |  错误的证件类型  |
| 201 | Error gender | 错误的性别 |
| 202 | Error birthday | 错误的出生年月 |
| 203 | Error date_start | 错误的有效期开始 |
| 204 | Error date_end | 错误的有效期终止 |

## RealAuth Update

> **API Description**

`POST`

此API用于更新与用户绑定的实名认证信息，若用户未绑定实名认证信息，返回`100`状态码

> **URL**

`https://hotel.lcworkroom.cn/api/realauth/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"realauth",
    "subtype":"update",
    "data":{
        "nation":"汉",
        "address":"浙江省临海市...."
		"organization":"临海市公安局",
        "date_start":185551654...
        "date_end":15068956...
    }
}
```

> **Data Param**

|    Field     |  Type  | Length | Null | Default |                       **Description**                        |
| :----------: | :----: | :----: | :--: | :-----: | :----------------------------------------------------------: |
|    nation    | string |   10   |  √   |    √    |                             民族                             |
|   address    | string |  100   |  √   |    √    |                             住址                             |
| organization | string |   30   |  √   |    √    |                           签发机关                           |
|  date_start  | float  |        |  √   |    √    | 证件有效期·起始 时间戳，精确到日，时分秒信息将被忽略，失败返回`202`错误 |
|   date_end   | float  |        |  √   |    √    | 证件有效期·终止 时间戳，精确到日，时分秒信息将被忽略，失败返回`203`错误 |

> **Notice**

- 此API只能更新与用户自身绑定的实名认证信息，若无则返回`100`状态码
- 此API不能更新`id_type`、`id`、`name`、`gender`、`birthday`等字段
- `nation`、`address`、`organization`、`date_start`、`date_end`为可选字段，且可为空（不过建议不要为空）
- 各字段的长度限制需由前端校验设置好后再传，否则若有异常会返回`100`状态码
- 后端不校验`date_start`与`date_end`之间的先后逻辑关系，请前端自行校验

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {}
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": -1, 
    "message": "Error JSON key", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |        Message         |   Description    |
| :----: | :--------------------: | :--------------: |
|  100   | RealAuth not certified |    实名未认证    |
|  200   |     Error date_start/date_end      |  错误的有效期开始/终止  |

## RealAuth - Get

> **API Description**

`POST`

此API用于获取用户绑定的实名认证信息

> **URL**

`https://hotel.lcworkroom.cn/api/realauth/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"realauth",
    "subtype":"get",
    "data":{}
}
```

> **Data Param**

null

> **Notice**

- 此API只能获取与用户自身绑定的实名认证信息，若无则返回`100`状态码

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        "id_type": "sfz", 
        "id": "3310821999....", 
        "name": "王凌超", 
        "gender": "male", 
        "nation": "汉", 
        "birthday": 943632000.0, 
        "address": "浙江省临海市....", 
        "organization": "临海市公安局", 
        "date_start": 1467907200.0, 
        "date_end": 1783440000.0
    }
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": -1, 
    "message": "Error Json key", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |        Message         | Description |
| :----: | :--------------------: | :---------: |
|  100   | RealAuth not certified | 实名未认证  |

# Face

**人脸数据类**

## Group - Create

> **API Description**

`POST`

此API用于创建一个人员库，成功返回人员库id

**此API有权限限制，仅管理员可用，其他人调用此API将返回`-103`状态码**

> **URL**

`https://hotel.lcworkroom.cn/api/face/group/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"group",
    "subtype":"create",
    "data":{
        "group_name": "西和5幢人员库",
        "group_content": "浙江科技学院西和公寓5幢人脸数据库"
    }
}
```

> **Data Param**

|     Field     |  Type  | Length | Null | Default | **Description** |
| :-----------: | :----: | :----: | :--: | :-----: | :-------------: |
|  group_name   | string |   20   |      |         |   人员库名称    |
| group_content | string |        |  √   |         |   人员库描述    |

> **Notice**

- `group_name`为不可重复字段，若创建的人员库名称与已有的重复，将返回`100`状态码

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        "group_id":5
    }
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": -103, 
    "message": "No Permission Operate", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -103   |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |          Message           |   Description    |
| :----: | :------------------------: | :--------------: |
|  100   | FaceGroup name has existed | 人员库名称已存在 |
|  101   |  Create FaceGroup Failed   |  创建人员库失败  |

## Group - Delete

> **API Description**

`POST`

此API用于以`group_id`或者`group_name`为检索条件删除一个人员库，并同步删除里面所有的人脸数据

**此API有权限限制，仅管理员可用，其他人调用此API将返回`-103`状态码**

> **URL**

`https://hotel.lcworkroom.cn/api/face/group/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"group",
    "subtype":"delete",
    "data":{
        "group_id":5,
        "group_name": "西和5幢人员库"
    }
}
```

> **Data Param**

|   Field    |  Type  | Length | Null | Default | **Description** |
| :--------: | :----: | :----: | :--: | :-----: | :-------------: |
|  group_id  |  int   |        |      |    √    |    人员库id     |
| group_name | string |   20   |      |    √    |   人员库名称    |

> **Notice**

- `group_id`与`group_name`二选一即可，若都传值过来，则选择`group_id`为检索条件。
- `group_id`字段类型为`int`型，但若传递了整型字符串过来，也会自动转为`int`类型，转换失败返回`100`状态码
- 若两个参数都没传过来，返回`101`状态码

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {}
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": -103, 
    "message": "No Permission Operate", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -103   |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |           Message           |        Description         |
| :----: | :-------------------------: | :------------------------: |
|  100   |       Error Group ID        |       错误的人员库ID       |
|  101   | Need Group ID or Group name | 需要人员库ID或者人员库名称 |
|  102   |        No such Group        |         无此人员库         |
|  103   |     Delete Group Failed     |       删除人员库失败       |

## Group - Update

> **API Description**

`POST`

此API用于以`group_id`或者`group_name`为检索条件更新一个人员库描述（`group_content`）

**此API有权限限制，仅管理员可用，其他人调用此API将返回`-103`状态码**

> **URL**

`https://hotel.lcworkroom.cn/api/face/group/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"group",
    "subtype":"update",
    "data":{
        "group_id":5,
        "group_name": "西和5幢人员库",
        "group_content":"浙江科技学院西和公寓5幢人脸数据库123"
    }
}
```

> **Data Param**

|     Field     |  Type  | Length | Null | Default | **Description** |
| :-----------: | :----: | :----: | :--: | :-----: | :-------------: |
|   group_id    |  int   |        |      |    √    |    人员库id     |
|  group_name   | string |   20   |      |    √    |   人员库名称    |
| group_content | string |        |      |         |   人员库描述    |

> **Notice**

- `group_id`与`group_name`二选一即可，若都传值过来，则选择`group_id`为检索条件。
- `group_id`字段类型为`int`型，但若传递了整型字符串过来，也会自动转为`int`类型，转换失败返回`100`状态码
- 若两个参数都没传过来，返回`101`状态码
- 只能修改`group_content`的值，`group_name`与`group_id`只作为检索条件使用

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {}
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": -103, 
    "message": "No Permission Operate", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -103   |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |           Message           |        Description         |
| :----: | :-------------------------: | :------------------------: |
|  100   |       Error Group ID        |       错误的人员库ID       |
|  101   | Need Group ID or Group name | 需要人员库ID或者人员库名称 |
|  102   |        No such Group        |         无此人员库         |

## Group - Get

> **API Description**

`POST`

此API用于以`group_id`或者`group_name`为检索条件获取一个人员库信息

> **URL**

`https://hotel.lcworkroom.cn/api/face/group/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"group",
    "subtype":"get",
    "data":{
        "group_id":5,
        "group_name": "西和5幢人员库"
    }
}
```

> **Data Param**

|     Field     |  Type  | Length | Null | Default | **Description** |
| :-----------: | :----: | :----: | :--: | :-----: | :-------------: |
|   group_id    |  int   |        |      |    √    |    人员库id     |
|  group_name   | string |   20   |      |    √    |   人员库名称    |
| group_content | string |        |      |         |   人员库描述    |

> **Notice**

- `group_id`与`group_name`二选一即可，若都传值过来，则选择`group_id`为检索条件。
- `group_id`字段类型为`int`型，但若传递了整型字符串过来，也会自动转为`int`类型，转换失败返回`100`状态码
- 若两个参数都没传过来，返回`101`状态码

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        "group_id": 5, 
        "group_name": "西和5幢人员库", 
        "group_content": "浙江科技学院西和公寓5幢人脸数据库"
    }
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": -103, 
    "message": "No Permission Operate", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |           Message           |        Description         |
| :----: | :-------------------------: | :------------------------: |
|  100   |       Error Group ID        |       错误的人员库ID       |
|  101   | Need Group ID or Group name | 需要人员库ID或者人员库名称 |
|  102   |        No such Group        |         无此人员库         |

## Group - List

> **API Description**

`POST`

此API用于返回所有人员库信息

> **URL**

`https://hotel.lcworkroom.cn/api/face/group/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"group",
    "subtype":"list",
    "data":{}
}
```

> **Data Param**

null

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        "num": 2, 
        "list": [
            {
                "group_id": 5, 
                "group_name": "西和5幢人员库", 
                "group_content": "浙江科技学院西和公寓5幢人脸数据库"
            }, 
            {
                "group_id": 6, 
                "group_name": "西和6幢人员库", 
                "group_content": "浙江科技学院西和公寓6幢人脸数据库"
            }
        ]
    }
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": -103, 
    "message": "No Permission Operate", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -3     |
| -2     |
| -1     |

> **Local Status**

null

## Face - Register（重要更新）

> **API Description**

`POST`

此API用于以`base64`为人脸数据注册用户的人脸信息，成功返回`face_id(身份证号)`

**调用此API前需保证用户已进行实名认证，否则将返回`100`状态码**



**修改**

2020年2月2日00:03:20

新增注册时人脸个数判断，详情看api的局部返回值

> **URL**

`https://hotel.lcworkroom.cn/api/face/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"face",
    "subtype":"register",
    "data":{
        "base64":"sdfj32...",
        "db": 1,
        "content":"人脸数据描述"
    }
}
```

> **Data Param**

|  Field  |  Type  | Length | Null | Default |   **Description**   |
| :-----: | :----: | :----: | :--: | :-----: | :-----------------: |
| base64  | string |        |      |         |   图片base64文本    |
|   db    |  int   |        |      |    √    | 人员库id，默认为`1` |
| content | string |        |      |    √    |    人脸数据描述     |

> **Notice**

- 用户若未进行过**实名认证**，则返回`100`状态码
- 用户可重复调用此API对人脸数据进行覆盖注册，若图片中无人脸数据或人脸数据过多将返回下面状态码，原人脸数据不受影响。
- **确保人脸图像中只有一张人脸数据，无人脸返回`102`状态码，大于1张人脸返回`103`状态码**
- `db`为人员库id，可缺省，若有不可为`null`，默认为`1`(默认人员库)，详情人员库信息可通过[获取人员库列表API](#Group - List)获取
- `content`为人员描述信息，可缺省，若有不可为`null`，默认为空文本
- 若两个参数都没传过来，返回`101`状态码
- 只能修改`group_content`的值，`group_name`与`group_id`只作为检索条件使用

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        "face_id":"3310821999..."
    }
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 100, 
    "message": "No Permission Operate", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |           Message            |    Description     |
| :----: | :--------------------------: | :----------------: |
|  100   |    Faces group not exist     |    人员库不存在    |
|  101   |     Register face failed     |  注册人员数据失败  |
|  102   |    No face data in base64    |  图片中无人脸数据  |
|  103   | Too much face data in base64 | 图片中人脸数据过多 |

## Face - Find（重要更新）

> **API Description**

`POST`

此API用于以`base64`为人脸数据查找指定人员库中的的人脸信息，成功返回人脸相关信息

**此API慎用，因为会返回用户的隐私信息**



**修改**

2020年2月2日00:05:55

新增人脸数的判断，修复只能识别一张人脸的情况

更新返回的json文本格式

> **URL**

`https://hotel.lcworkroom.cn/api/face/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"face",
    "subtype":"find",
    "data":{
        "base64":"sdfj32...",
        "db": 1,
        "ret_type":0
    }
}
```

> **Data Param**

|  Field   |  Type  | Length | Null | Default |                      **Description**                      |
| :------: | :----: | :----: | :--: | :-----: | :-------------------------------------------------------: |
|  base64  | string |        |      |         |                      图片base64文本                       |
|    db    |  int   |        |      |    √    |                   人员库id，默认为`-1`                    |
| ret_type |  int   |        |      |    √    | 数据返回模式：`0 精简返回`,`1 全部返回`，默认`0 精简返回` |

> **Notice**

- **没有人脸将返回`100`错误**
- `db`为人员库id，可缺省，若有不可为`null`，默认为`-1`(所有人员库)，详情人员库信息可通过[获取人员库列表API](#Group - List)获取
- `ret_type`为数据返回模式，`0`为精简返回，`1`为完全返回。**后期打算将`1 全部返回`限制为仅管理员可用，目前无限制**

> **Response Data Param**
>
> **0 精简返回**

|   Field   |  Type   | Length | Null | Default |               **Description**               |
| :-------: | :-----: | :----: | :--: | :-----: | :-----------------------------------------: |
|    ID     | string  |   18   |      |         |  人脸数据id（身份证号），若没找到默认为""   |
|   name    | string  |        |      |    √    |         人脸姓名，若没找到默认为""          |
| liveness  | boolean |        |      |         | 活体检测，`true`为真人，`false`为照片等假人 |
| threshold |  float  |        |      |         |       人脸相似度，若没找到默认为0.00        |

> **Notice**

1. 返回的`ID`为私密信息，请慎用
2. 若人员库中未找到此人信息，仍然会返回人脸数据信息，但`ID`,`name`将为空字符串，`threshold`为`0.00`，`liveness`仍然有效
3. `threshold`精确到小数点后两位，最高为`1(完全匹配)`，最低为`0(匹配失败时将会返回)`，一般匹配程度超过0.8才算匹配成功返回匹配值，否则一律返回`0.00`

> **Example**

```python
{
    "num": 2, 
    "list": [
        {
            "ID": "",
            "name": "", 
            "liveness": false, 
            "threshold": 0.0
        }, 
        {
            "ID": "", 
            "name": "", 
            "liveness": true, 
            "threshold": 0.0
        }
    ]
}
```

> **Notice**

+ 在简要返回中，若图片中的人脸数据有部分识别失败时，并不能准确判断。但在完全返回中可以进行判断
+ 若人脸数据有部分识别失败，`ID`为"",`name`为“”，`liveness`为false`threshold`为0.0
+ 识别失败与匹配失败不同，但在简单返回中返回值类似，唯一区别在于`liveness`，但若识别的为照片中人物且识别失败，两者返回值将无法分辨。
+ 识别失败属于程序算法中问题，暂无更优解，匹配失败是指人脸数据不在人员库中
+ 上面例子中，第一组数据为识别失败，第二组数据为匹配失败

> **Response Data Param**
>
> **1 完全返回**

|    Field     |    Type    | Length | Null | Default |               **Description**               |
| :----------: | :--------: | :----: | :--: | :-----: | :-----------------------------------------: |
|      ID      |   string   |   18   |      |         |  人脸数据id（身份证号），若没找到默认为""   |
|     name     |   string   |        |      |    √    |         人脸姓名，若没找到默认为""          |
|     age      |    int     |        |      |         |       人脸预测年龄（非人脸真实年龄）        |
|   liveness   |  boolean   |        |      |         | 活体检测，`true`为真人，`false`为照片等假人 |
|  threshold   |   float    |        |      |         |       人脸相似度，若没找到默认为0.00        |
|    gender    |   string   |        |      |         | 用户性别，仅两种选择：`male`男，`female`女  |
|   top_left   | tuple/list |        |      |         |           人脸出现位置左上角坐标            |
|  top_right   | tuple/list |        |      |         |           人脸出现位置右上角坐标            |
| bottom_left  | tuple/list |        |      |         |           人脸出现位置左下角坐标            |
| bottom_right | tuple/list |        |      |         |           人脸出现位置右下角坐标            |

> **Notice**

1. 完全返回中有很多私密信息，请慎用！
2. 若人员库中未找到此人信息，仍然会返回人脸数据信息，但`ID`,`name`将为空字符串，`threshold`为`0.00`，`liveness`仍然有效
3. `threshold`精确到小数点后两位，最高为`1(完全匹配)`，最低为`0(匹配失败时将会返回)`，一般匹配程度超过0.8才算匹配成功返回匹配值，否则一律返回`0.00`

> **Example**

```python
{
    "num": 2, 
    "list": [
        {
            "ID": "", 
            "age": null, 
            "threshold": 0.0, 
            "gender": "", 
            "liveness": false, 
            "top_left": [61, 94], 
            "top_right": [157, 94], 
            "bottom_left": [61, 189], 
            "bottom_right": [157, 189], 
            "name": ""
        }, 
        {
            "ID": "", 
            "age": 26, 
            "threshold": 0.0,
            "gender": "male", 
            "liveness": true, 
            "top_left": [209, 60], 
            "top_right": [308, 60], 
            "bottom_left": [209, 159], 
            "bottom_right": [308, 159], 
            "name": ""
        }
    ]
}
```

> **Notice**

+ 在完全返回中，若图片中的人脸数据有部分识别失败时，`age`字段将返回null值，但人脸矩阵依旧有数据
+ 若人脸数据有部分识别失败，`ID`为`""`，`age`为`null`，`gender`为`""`，`name`为`""`，`liveness`为`false`，`threshold`为`0.0`
+ 识别失败与匹配失败不同，识别失败属于程序算法中问题，暂无更优解，匹配失败是指人脸数据不在人员库中
+ 上面例子中，第一组数据为识别失败，第二组数据为匹配失败

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        返回数据见上方example
    }
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 100, 
    "message": "No face authentication", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |        Message         |   Description    |
| :----: | :--------------------: | :--------------: |
|  100   | No face data in base64 | 图片中无人脸信息 |

## Face - Verify（重要更新）

> **API Description**

`POST`

此API用于以`base64`为人脸数据核验是否与用户人脸认证信息匹配，成功返回相关信息

**没有人脸将返回`101`错误**



**修改**

2020年2月2日00:22:20

新增多张人脸时返回`102`状态码

> **URL**

`https://hotel.lcworkroom.cn/api/face/?token=`

> **URL Param**

| Field |  Type  | Length | Null | Default | **Description** |
| :---: | :----: | :----: | :--: | :-----: | :-------------: |
| token | string |   32   |      |         |    用户凭证     |

> **Request Json Text Example**

```python
{
    "id":1234,
    "type":"face",
    "subtype":"verify",
    "data":{
        "base64":"sdfj32...",
        "ret_type":0
    }
}
```

> **Data Param**

|  Field   |  Type  | Length | Null | Default |                      **Description**                      |
| :------: | :----: | :----: | :--: | :-----: | :-------------------------------------------------------: |
|  base64  | string |        |      |         |                      图片base64文本                       |
| ret_type |  int   |        |      |    √    | 数据返回模式：`0 精简返回`,`1 全部返回`，默认`0 精简返回` |

> **Notice**

- 若用户未进行过人脸认证，返回`100`状态码。
- **没有人脸将返回`101`错误，多张人脸返回`102`错误**
- `ret_type`为数据返回模式，`0`为精简返回，`1`为完全返回。**后期打算将`1 全部返回`限制为仅管理员可用，目前无限制**

> **Response Data Param**
>
> **0 精简返回**

|   Field   |  Type   | Length | Null | Default |                **Description**                |
| :-------: | :-----: | :----: | :--: | :-----: | :-------------------------------------------: |
|  result   | boolean |        |      |         | 匹配结果，`true`为匹配成功，`false`为匹配失败 |
| liveness  | boolean |        |      |         |  活体检测，`true`为真人，`false`为照片等假人  |
| threshold |  float  |        |      |         |        人脸相似度，若没找到默认为0.00         |

> **Notice**

1. 若人员库中未找到此人信息，`result`为`false`，`threshold`为`0.00`，`liveness`仍然有效
2. `result`为真时并不表示通过验证，请结合`liveness`字段进行判断
3. `threshold`精确到小数点后两位，最高为`1(完全匹配)`，最低为`0(匹配失败时将会返回)`，一般匹配程度超过0.8才算匹配成功返回匹配值，否则一律返回`0.00`

> **Example**

```python
{
    "result": true, 
    "liveness": true,
    "threshold": 0.98
}
```



> **Response Data Param**
>
> **1 完全返回**

|    Field     |    Type    | Length | Null | Default |                **Description**                |
| :----------: | :--------: | :----: | :--: | :-----: | :-------------------------------------------: |
|    result    |  boolean   |        |      |         | 匹配结果，`true`为匹配成功，`false`为匹配失败 |
|      ID      |   string   |   18   |      |         |   人脸数据id（身份证号），若没找到默认为""    |
|     age      |    int     |        |      |         |        人脸预测年龄（非人脸真实年龄）         |
|   liveness   |  boolean   |        |      |         |  活体检测，`true`为真人，`false`为照片等假人  |
|  threshold   |   float    |        |      |         |        人脸相似度，若没找到默认为0.00         |
|    gender    |   string   |        |      |         |  用户性别，仅两种选择：`male`男，`female`女   |
|   top_left   | tuple/list |        |      |         |            人脸出现位置左上角坐标             |
|  top_right   | tuple/list |        |      |         |            人脸出现位置右上角坐标             |
| bottom_left  | tuple/list |        |      |         |            人脸出现位置左下角坐标             |
| bottom_right | tuple/list |        |      |         |            人脸出现位置右下角坐标             |

> **Notice**

1. 若人员库中未找到此人信息，`result`为`false`，`threshold`为`0.00`，`liveness`仍然有效
2. `result`为真时并不表示通过验证，请结合`liveness`字段进行判断
3. `threshold`精确到小数点后两位，最高为`1(完全匹配)`，最低为`0(匹配失败时将会返回)`，一般匹配程度超过0.8才算匹配成功返回匹配值，否则一律返回`0.00`

> **Example**

```python
{
    "result": true,
    "ID": "33108219991127089X", 
    "age": 27, 
    "threshold": 0.98, 
    "gender": "male", 
    "liveness": true, 
    "top_left": [40, 88], 
    "top_right": [162, 88], 
    "bottom_left": [40, 210], 
    "bottom_right": [162, 210]
}
```

> **Notice**

+ 在完全返回中，若图片中的人脸数据有部分识别失败时，`age`字段将返回null值，但人脸矩阵依旧有数据
+ 若人脸数据有部分识别失败，`ID`为`""`，`age`为`null`，`gender`为`""`，`name`为`""`，`liveness`为`false`，`threshold`为`0.0`
+ 识别失败与匹配失败不同，识别失败属于程序算法中问题，暂无更优解，匹配失败是指人脸数据不在人员库中

> **Response Success Example**

```python
{
    "id": 1234, 
    "status": 0, 
    "message": "Successful", 
    "data": {
        返回数据见上方example
    }
}
```

> **Response Failed Example**

```python
{
    "id": 1234, 
    "status": 100, 
    "message": "No face authentication", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -3     |
| -2     |
| -1     |

> **Local Status**

| Status |           Message            |    Description     |
| :----: | :--------------------------: | :----------------: |
|  100   |    No face authentication    |   人脸信息未认证   |
|  101   |    No face data in base64    |  图片中无人脸信息  |
|  102   | Too much face data in base64 | 图片中人脸数据过多 |

# Map

**地图类**

## District - Get

> **API Description**

`GET`

​	转接高德地图行政区域查询API，精简返回结果

​	点击进入[高德行政区域查询API地址](https://lbs.amap.com/api/webservice/guide/api/district)

> **URL**

`https://hotel.lcworkroom.cn/api/map/district/?params`

> **URL Param**
>
> 所有参数与高德地图api一致，若传了非高德地图api的参数，将自动忽略。具体规则请查阅[高德行政区域查询API地址](https://lbs.amap.com/api/webservice/guide/api/district)

|    Field    |  Type  | Length | Null | Default |         **Description**          |
| :---------: | :----: | :----: | :--: | :-----: | :------------------------------: |
|     key     | string |   32   |      |    √    | 请求服务权限标识。**已内置初始值** |
|  keywords   | srting |        |      |    √    |            查询关键字            |
| subdistrict |  int   |        |      |    √    |            子级行政区            |
|    page     |  int   |        |      | √ |          需要第几页数据          |
|   offset    |  int   |        |      | √        |        最外层返回数据个数        |
| extensions  |   string    |        |      |   √      |           返回结果控制           |
|   filter    | int |        |      | √ |           根据区划过滤           |
|  callback   | function |        |      | √ |             回调函数。**请勿使用**             |
|   output    | string |        |      | √ |        返回数据格式类型。**已内置初始值，不可修改**        |

> **Notice**

+ 以上字段中`key`与`output`已二次封装内置，可忽略。
+ 其他字段若缺省则使用高德api默认字段值
+ `callback`字段请勿传值

> **Response Success Example**
>
> 已对高德api的返回值进行了精简，外层处理成与api相同样式，内层删除不必要的字段值

```python
{
    "id": -1, 
    "status": 0, 
    "message": "OK",
    "data": {
        "districts": [
            {
                "name": "\u6d59\u6c5f\u7701", 
                "districts": [
                    {
                        "name": "\u821f\u5c71\u5e02", 
                        "districts": []
                    }, 
                    {
                        "name": "\u5b81\u6ce2\u5e02", 
                        "districts": []
                    }, 
                    {
                        "name": "\u5609\u5174\u5e02", 
                        "districts": []
                    }, 
                    {
                        "name": "\u53f0\u5dde\u5e02", 
                        "districts": []
                    }, 
                    {
                        "name": "\u6e29\u5dde\u5e02", 
                        "districts": []
                    }, 
                    {
                        "name": "\u4e3d\u6c34\u5e02", 
                        "districts": []
                    }, 
                    {
                        "name": "\u7ecd\u5174\u5e02", 
                        "districts": []
                    }, 
                    {
                        "name": "\u6e56\u5dde\u5e02", 
                        "districts": []
                    },
                    {
                        "name": "\u8862\u5dde\u5e02", 
                        "districts": []
                    }, 
                    {
                        "name": "\u91d1\u534e\u5e02", 
                        "districts": []
                    }, 
                    {
                        "name": "\u676d\u5dde\u5e02", 
                        "districts": []
                    }
                ]
            }
        ]
    }
}


```

> **Response Failed Example**

```python
{
    "id": -1, 
    "status": 1000, 
    "message": "Missing necessary args", 
    "data": {}
}
```

> **Used Global Status**

Please refer to [Global Status Table](#Global Status Table)

| Status |
| ------ |
| -100   |

> **Local Status**
>
> 二次封装时将高德中的`status`去除，将`infocode`改为`status`并从`string`转为了`int`型数据，将`info`改为`message`。并加入了`100`状态码

| Status |    Message     | Description |
| :----: | :------------: | :---------: |
|  100   | Get Json Error |     API请求失败     |

**其余状态码与状态信息请查阅[高德行政区域查询错误码](https://lbs.amap.com/api/webservice/guide/tools/info)**

# 硬件终端接口暂不写说明文档

**因为随时有可能会调整**

# Global Status Table

**所有的全局status值皆小于0**

**大于 0 的status值皆为请求局部status值**

| Status |              Message               |             Description             | Method    |
| :----: | :--------------------------------: | :---------------------------------: | --------- |
|   0    |             successful             |            函数处理正确             | POST、GET |
|   -1   |           Error JSON key           |         json文本必需key缺失         | POST      |
|   -2   |          Error JSON value          |          json文本value错误          | POST      |
|   -3   |           Error data key           |      data中有非预料中的key字段      | POST      |
|   -4   |             Error Hash             |          Hash校验文本错误           | POST      |
|  -100  |       Missing necessary args       |  api地址中缺少token或其他必需参数   | POST、GET |
|  -101  |            Error token             |             token不正确             | POST、GET |
|  -102  |  Get userid failed for the token   |       使用token获取userid失败       | POST、GET |
|  -103  |      No permission to operate      |            用户无权操作             | POST      |
|  -104  |       Error device_id token        |         错误的设备id token          | POST      |
|  -200  |    Failure to operate database     | 数据库操作失败，检查SQL语句是否正确 | POST、GET |
|  -201  | Necessary key-value can't be empty |        关键键值对值不可为空         | POST      |
|  -202  |  Missing necessary data key-value  |          缺少关键的键值对           | POST      |
|  -203  |       Arg's value type error       |         键值对数据类型错误          | POST      |
|  -204  |         Arg's value error          |           键值对数据错误            | POST      |
|  -404  |           Unknown Error            |           未知的Redis错误           | POST      |
|  -500  |          COS upload Error          |           COS储存上传失败           | POST      |

------

- `status`传递的错误码类型为整型。

- 手机验证码相关的错误码详见[短信错误码](http://cloud.tencent.com/document/product/382/3771 "腾讯短信API文档")
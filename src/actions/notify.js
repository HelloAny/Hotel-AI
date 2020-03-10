import Taro from "@tarojs/taro";
import { post } from "@service/api";
import { USERAPI } from "@constants/api";

const request = (method, url, data) => {
  return method(USERAPI + url, data);
};

const token = Taro.getStorageSync("token");
// const token = "5d84b39af168ed21477adf780423c634"
/**
 * 获取通知和私信未读数量
 */
export function getNewsNumber() {
  const url = "/api/msg/?token=" + token;

  return request(post, url, {
    id: 1234,
    type: "msg",
    subtype: "has_new",
    data: {}
  }).then(res => {
    if (res.data.status == 0) {
      return res.data.data;
    } else {
      return Promise.reject(res.data);
    }
  });
}

/**
 * 获取所有通知列表
 */
export function getNotifyList() {
  const url = "/api/msg/?token=" + token;

  return request(post, url, {
    id: 1234,
    type: "msg",
    subtype: "sys",
    data: {
      if_new: 2
    }
  }).then(res => {
    if (res.data.status == 0) {
      return res.data.data.list.reverse();
    } else {
      return Promise.reject(res.data);
    }
  });
}

/**
 * 获取私信列表
 */
export function getMsgSummaryInfo() {
  const url = "/api/msg/?token=" + token;

  return request(post, url, {
    id: 1234,
    type: "msg",
    subtype: "msg_list",
    data: {}
  }).then(res => {
    if (res.data.status == 0) {
      res.data.data.list.forEach(chat => {
        chat.add_time = chat.add_time * 1000;
      });
      return res.data.data;
    } else {
      return Promise.reject(res.data);
    }
  });
}

/**
 * 指定通知id标为已读
 * @param {Number} msg_id 消息id
 */
export function markedNotifyAsRead(msg_id) {
  if (!msg_id) return Promise.reject("msg_id is undefined!");

  const url = "/api/msg/?token=" + token;
  return request(post, url, {
    id: 1234,
    type: "msg",
    subtype: "sign",
    data: {
      msg_id
    }
  }).then(res => {
    if (res.data.status == 0) {
      return res.data;
    } else {
      return Promise.reject(res.data);
    }
  });
}

/**
 * 所有通知标为已读
 */
export function markedAllNotifyAsRead() {
  const url = "/api/msg/?token=" + token;

  return request(post, url, {
    id: 1234,
    type: "msg",
    subtype: "sign_batch",
    data: {
      sys: 1,
      private: 0,
      people: ""
    }
  }).then(res => {
    if (res.data.status == 0) {
      return res.data;
    } else {
      return Promise.reject(res.data);
    }
  });
}

/**
 * 指定私聊对象所有信息标为已读
 * @param {string} people 用户id 通常为手机号
 */
export function markedChatAsRead(people) {
  if (!people) return Promise.reject("people is undefined!");
  const url = "/api/msg/?token=" + token;

  return request(post, url, {
    id: 1234,
    type: "msg",
    subtype: "sign_batch",
    data: {
      sys: 0,
      private: 1,
      people: people
    }
  }).then(res => {
    console.log(res.data);
  });
}

/**
 * 指定私聊消息设为已读
 * @param {number} msg_id 消息id
 */
export function markedChatMsgAsRead(msg_id) {
  if (!msg_id) return Promise.reject("msg_id is undefined!");

  const url = "/api/msg/?token=" + token;
  return request(post, url, {
    id: 1234,
    type: "msg",
    subtype: "sign",
    data: {
      msg_id
    }
  }).then(res => {
    if (res.data.status == 0) {
      return res.data;
    } else {
      return Promise.reject(res.data);
    }
  });
}

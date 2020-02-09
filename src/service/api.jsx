<<<<<<< HEAD
//API实现和路由拦截
//统一书写
import Taro from "@tarojs/taro";
import { HOST, DEFAULT_REQUEST_CONFIG } from "./config";

/**
 * @description 创建某用户与客服的聊天会话
 * @param {Object} data { uid } 用户uid
 */
async function connectToCustomerService(data) {
  let { uid } = data;

  if (!uid) console.error("connectToCustomerService 参数错误");

  const res = await Taro.request({
    ...DEFAULT_REQUEST_CONFIG,
    url: `${HOST}/create`,
    data: { uid }
  });

  return new Promise((resolve, reject) => {
    resolve(res.data);
  });
}

/**
 * @description 获取用户所有消息记录
 * @param {Object} data { uid } 用户uid
 */
async function getMegList(data) {
  let { uid } = data;

  if (!uid) console.error("getMegList 参数错误");

  const res = await Taro.request({
    ...DEFAULT_REQUEST_CONFIG,
    url: `${HOST}/show_records`,
    data: { uid }
  });

  return new Promise((resolve, reject) => {
    let msgList = []
    if(res.data.code == 200) msgList = JSON.parse(res.data.results)
    resolve(msgList)
  });
}

/**
 * @description 用户发送消息，返回智能回复
 * @param {Object} data 主体 
 * @param {Number} uid 用户uid
 * @param {String} content 消息内容
 * @return: {Object} msg
 */
async function getAutoResponse(data) {
  let { uid, content } = data;

  if (!uid || !content) console.error("getAutoResponse 参数错误");

  const res = await Taro.request({
    ...DEFAULT_REQUEST_CONFIG,
    url: `${HOST}/send_receive`,
    data: { uid, content }
  });

  return new Promise((resolve, reject) => {
    let content = "主人不好意思哦，我正在努力学习"
    if (res && res.data.code == 200) content = res.data.results;
    resolve(content);
  });
}

/**
 * @description 刷新获取未读消息
 * @param {Object} data { uid } 用户uid
 */
async function updateMsgList(data) {
  let { uid } = data;

  if (!uid) console.error("updateMsgList 参数错误");

  const res = await Taro.request({
    ...DEFAULT_REQUEST_CONFIG,
    url: `${HOST}/timing_in_inspect`,
    data: { uid }
  });

  return new Promise((resolve, reject) => {
    //数据转化
  });
}

/**
 *
 * @param {Object} params
 */
async function uploadImage(params) {}

export { getMegList, connectToCustomerService, getAutoResponse, updateMsgList };
=======
//*********API实现和路由拦截***********

import Taro from "@tarojs/taro";
import { HTTP_STATUS } from "../constants/status";
import { HTTP } from "../constants/api";

export default {
  baseOptions(param, method = "GET") {
    let { url, data } = param;
    let contentType = "application/json";
    contentType = param.contentType || contentType;
    const option = {
      // url: url.indexOf("http") !== -1 ? url : "http://" + url,
      url: HTTP + url,
      data: data,
      method: method,
      header: {
        "content-type": contentType,
        Authorization: ""
      },
      success(res) {
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return console.log("api", "请求资源不存在");
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return console.log("api", "服务端出现了问题");
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          let path = getCurrentPageUrl();
          if (path !== "pages/login/login") {
            Taro.navigateTo({
              url: "/pages/login/login"
            });
          }
          return console.log("api", "没有权限访问");
        } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
          let path = getCurrentPageUrl();
          if (path !== "pages/login/login") {
            Taro.navigateTo({
              url: "/pages/login/login"
            });
          }
          return console.log("api", "需要鉴权");
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data;
        } else if (res.statusCode === HTTP_STATUS.SERVER_ERROR) {
          console.log(1111);
          return console.log("请求失败");
        }
      },
      fail(e) {
        console.log("api", "请求接口出现问题", e);
      }
    };
    return Taro.request(option);
  },
  get(url, data = "") {
    let option = {
      url,
      data
    };
    return this.baseOptions(option);
  },
  post(url, data, contentType) {
    let params = {
      url,
      data,
      contentType
    };
    console.log(params);
    return this.baseOptions(params, "POST");
  },
  put(url, data = "") {
    let option = {
      url,
      data
    };
    return this.baseOptions(option, "PUT");
  },
  delete(url, data = "") {
    let option = {
      url,
      data
    };
    return this.baseOptions(option, "DELETE");
  }
};
>>>>>>> 5db1c7679f470928859e31178d81c5d88a9ff1e9

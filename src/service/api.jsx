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

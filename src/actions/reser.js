import { get, post } from "@service/api";
import { HOTELAPI, USERAPI, QQMAPAPI } from "@constants/api";

const request = (method, url, data) => {
  return method(HOTELAPI + url, data);
};

/**
 * 地理坐标转文字坐标描述
 * @param {{latitude:String, longitude:String}} param 纬度
 */
export function getLocation(param) {
  const { latitude, longitude } = param;
  const req = {
    location: latitude + "," + longitude,
    key: "6XNBZ-QHPKS-5B2O4-6V622-DOVLQ-ZXBVF",
    output: "json"
  };
  return get(QQMAPAPI, req).then(res => {
    return res.data;
  });
}

// 获取酒店列表
export function getHotels() {
  const url = "/visit/hotels_info";
  const req = {};

  return request(post, url, req).then(res => {
    let data = res.data;
    if (!data || data.code != 200) return Promise.reject(data);
    return data.results;
  });
}

/**
 * 获取酒店房间信息
 * @param {{ hotel_id:int }} param 酒店id
 */
export function getRooms(param) {
  const { hotel_id } = param;
  const url = "/order/get_room_type";
  const req = { hotel_id };

  return request(post, url, req).then(res => {
    let data = res.data;
    if (!data || data.code != 200) return Promise.reject(data);
    return data.res;
  });
}

/**
 * 计算房价, 预定房间
 * @param {{uid: string, room_type: string, start_date: number, end_date: number}} param
 */
export function calculatePrices(param) {
  const { uid, room_type, start_date, end_date } = param;
  const url = "/order/pay_info";
  const req = {
    uid,
    room_type,
    start_time: Math.floor(start_date / 1000),
    end_time: Math.floor(end_date / 1000)
  };

  return request(post, url, req).then(res => {
    let data = res.data;
    if (!data || data.code != 200) return Promise.reject(data);
    return data;
  });
}

/**
 * 支付成功
 * @param {{uid: string, room_id: string, start_time: number, end_time: number}} param
 */
export function succPay(param) {
  const { uid, room_id, start_time, end_time } = param;
  const url = "/order/pay_succ";
  const req = {
    uid,
    room_id,
    start_time: Math.floor(start_time / 1000),
    end_time: Math.floor(end_time / 1000)
  };

  return request(post, url, req).then(res => {
    let data = res.data;
    if (!data || data.code != 200) return Promise.reject(data);
    return data;
  });
}

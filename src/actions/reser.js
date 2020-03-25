import { get, post } from "@service/api";
import { HOTELAPI, USERAPI } from "@constants/api";

const request = (method, url, data) => {
  return method(HOTELAPI + url, data);
};

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
export function getRooms(param){
  const {hotel_id} = param;
  const url ="/order/get_room_type";
  const req = {hotel_id};
  return request(post,url,req).then(res => {
    let data = res.data;
    if (!data || data.code != 200) return Promise.reject(data);
    return data.res;
  })
}
